import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sbomPath = path.join(root, 'sbom.json');
const grypePath = path.join(root, 'grype-output.json');
const outdatedPath = path.join(root, 'outdated.json');
const pkgJsonPath = path.join(root, 'package.json');

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
    } catch {
        outdated = {};
    }
}

// Load top-level deps from package.json
let topLevelNames = new Set();
if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

    const add = obj => {
        if (!obj) return;
        for (const k of Object.keys(obj)) topLevelNames.add(k);
    };

    add(pkgJson.dependencies);
    add(pkgJson.devDependencies);
    add(pkgJson.peerDependencies);
}

// Normalize scoped names "scope__pkg" → "@scope/pkg"
function normalizeForOutdated(name) {
    if (name.includes('__')) {
        const [scope, pkg] = name.split('__');
        return `@${scope}/${pkg}`;
    }
    return name;
}

// Extract SBOM libraries
const sbomDeps = (sbom.components || [])
    .filter(c => c.type === 'library' && c.name && c.version)
    .map(c => ({
        name: c.name,
        normalizedName: normalizeForOutdated(c.name),
        version: c.version,
        purl: c.purl,
        license: (c.licenses?.[0]?.license?.id) || null
    }));

// Vulnerability aggregation (from Grype)
let vulnByPurl = {};
if (fs.existsSync(grypePath)) {
    const grype = JSON.parse(fs.readFileSync(grypePath, 'utf8'));
    const matches = grype.matches || [];
    const severityOrder = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    for (const m of matches) {
        const purl = m.artifact?.purl;
        const sev = m.vulnerability?.severity;
        if (!purl || !sev) continue;

        if (!vulnByPurl[purl]) {
            vulnByPurl[purl] = { count: 0, maxSeverity: null, vulns: [] };
        }

        vulnByPurl[purl].count++;

        const current = vulnByPurl[purl].maxSeverity;
        if (!current || severityOrder.indexOf(sev) > severityOrder.indexOf(current)) {
            vulnByPurl[purl].maxSeverity = sev;
        }

        vulnByPurl[purl].vulns.push({
            id: m.vulnerability?.id || null,
            severity: sev,
            link: m.vulnerability?.dataSource || null
        });
    }
}

// Latest version only applies to top-level packages
function getLatest(name, currentVersion) {
    const entry = outdated[name];
    if (!entry) return null;
    return entry.latest || currentVersion;
}

let topLevel = [];
let transitive = [];

for (const d of sbomDeps) {
    const vul = vulnByPurl[d.purl] || { count: 0, maxSeverity: null, vulns: [] };

    const record = {
        name: d.normalizedName,
        version: d.version,
        latest: null,
        license: d.license,
        vulnCount: vul.count,
        maxSeverity: vul.maxSeverity,
        vulnerabilities: vul.vulns
    };

    if (topLevelNames.has(d.normalizedName)) {
        record.latest = getLatest(d.normalizedName, d.version);
        topLevel.push(record);
    } else {
        transitive.push(record);
    }
}

fs.mkdirSync(outputDir, { recursive: true });

const summary = {
    application: path.basename(root),
    generated: new Date().toISOString(),
    topLevel,
    transitive
};

fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
console.log(`Wrote ${outputPath}`);
