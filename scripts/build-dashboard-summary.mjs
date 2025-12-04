import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sbomPath = path.join(root, 'sbom.json');
const grypePath = path.join(root, 'grype-output.json');
const outdatedPath = path.join(root, 'outdated.json');

const outputDir = path.join(root, 'docs', 'dependency-dashboard', 'data');
const outputPath = path.join(outputDir, 'summary.json');

if (!fs.existsSync(sbomPath)) {
    console.error('sbom.json not found');
    process.exit(1);
}

const sbom = JSON.parse(fs.readFileSync(sbomPath, 'utf8'));

let outdated = {};
if (fs.existsSync(outdatedPath)) {
    try {
        outdated = JSON.parse(fs.readFileSync(outdatedPath, 'utf8'));
    } catch (e) {
        console.warn('Could not parse outdated.json, using empty data');
        outdated = {};
    }
}

// Extract dependencies
const deps = (sbom.components || [])
    .filter(c => c.type === 'library' && c.purl && c.version)
    .map(c => ({
        name: c.name,
        version: c.version,
        purl: c.purl,
        license: (c.licenses?.[0]?.license?.id) || null
    }));

// Vulnerability aggregation
let vulnByPurl = {};
if (fs.existsSync(grypePath)) {
    const grype = JSON.parse(fs.readFileSync(grypePath, 'utf8'));
    const matches = grype.matches || [];
    const order = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    for (const m of matches) {
        const purl = m.artifact?.purl;
        const sev = m.vulnerability?.severity;
        if (!purl || !sev) continue;

        if (!vulnByPurl[purl]) vulnByPurl[purl] = { count: 0, maxSeverity: null };

        vulnByPurl[purl].count++;
        const current = vulnByPurl[purl].maxSeverity;

        if (!current || order.indexOf(sev) > order.indexOf(current)) {
            vulnByPurl[purl].maxSeverity = sev;
        }
    }
}

// helper
function getLatest(name) {
    return outdated[name]?.latest || null;
}

const dependencies = deps.map(d => {
    const v = vulnByPurl[d.purl] || { count: 0, maxSeverity: null };
    return {
        name: d.name,
        version: d.version,
        latest: getLatest(d.name),
        license: d.license,
        vulnCount: v.count,
        maxSeverity: v.maxSeverity
    };
});

fs.mkdirSync(outputDir, { recursive: true });

const summary = {
    application: path.basename(root),
    generated: new Date().toISOString(),
    dependencies
};

fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
console.log(`Wrote ${outputPath}`);
