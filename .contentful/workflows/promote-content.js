
/**
 * Contentful Tag-Based Promotion Script
 *
 * Promotes published entries tagged with 'signedOff' from dev to test.
 *
 * Usage:
 *   node promote-content.js --source=dev --target=test --tag=signedOff [--dry-run]
 */

const contentful = require('contentful-management');
const yargs = require('yargs');

const argv = yargs
  .option('source', { describe: 'Source environment', demandOption: true, type: 'string' })
  .option('target', { describe: 'Target environment', demandOption: true, type: 'string' })
  .option('tag', { describe: 'Tag ID to filter by', demandOption: true, type: 'string' })
  .option('dry-run', { describe: 'Show what would be promoted without making changes', type: 'boolean' })
  .help()
  .argv;

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN environment variables');
  process.exit(1);
}

async function main() {
  const client = contentful.createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });
  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const sourceEnv = await space.getEnvironment(argv.source);
  const targetEnv = await space.getEnvironment(argv.target);

  const sourceEntries = await sourceEnv.getEntries({
    'metadata.tags.sys.id[in]': argv.tag,
    limit: 1000,
  });

  console.log(`Found ${sourceEntries.items.length} entries tagged with '${argv.tag}'`);

  for (const entry of sourceEntries.items) {
    if (!entry.sys.publishedAt) {
      console.log(`[SKIP] ${entry.sys.id}: Not published in source`);
      continue;
    }

    let targetEntry;
    try {
      targetEntry = await targetEnv.getEntry(entry.sys.id);
    } catch (e) {
      if (e.name !== 'NotFound') throw e;
    }

    const isNew = !targetEntry;
    const isUpdated =
      !isNew && new Date(entry.sys.updatedAt) > new Date(targetEntry.sys.updatedAt);

    if (!isNew && !isUpdated) {
      console.log(`[SKIP] ${entry.sys.id}: No changes`);
      continue;
    }

    if (argv['dry-run']) {
      console.log(`[DRY RUN] ${entry.sys.id}: ${isNew ? 'New' : 'Updated'} - would promote`);
      continue;
    }

    const contentTypeId = entry.sys.contentType.sys.id;
    const fields = entry.fields;

    if (isNew) {
      console.log(`[CREATE] ${entry.sys.id}: Creating new entry`);
      const created = await targetEnv.createEntryWithId(contentTypeId, entry.sys.id, { fields });
      await created.publish();
    } else {
      console.log(`[UPDATE] ${entry.sys.id}: Updating existing entry`);
      Object.assign(targetEntry.fields, fields);
      const updated = await targetEntry.update();
      await updated.publish();
    }
  }

  console.log('Promotion completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
