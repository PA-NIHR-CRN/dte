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
    } catch {
        console.warn('Could not parse outdated.json, using empty data');
        outdated = {};
    }
}

// Convert CycloneDX "scope__pkg" → "@scope/pkg"
function normalizeForOutdated(name) {
    if (name.includes('__')) {
        const [scope, pkg] = name.split('__');
        return `@${scope}/${pkg}`;
    }
    return name;
}

// Extract dependencies from SBOM
const deps = (sbom.components || [])
    .filter(c => c.type === 'library' && c.purl && c.version)
    .map(c => ({
        name: c.name,
        version: c.version,
        purl: c.purl,
        license: (c.licenses?.[0]?.license?.id) || null
    }));

// Process vulnerability data
let vulnByPurl = {};
if (fs.existsSync(grypePath)) {
    const grype = JSON.parse(fs.readFileSync(grypePath, 'utf8'));
    const matches = grype.matches || [];
    const order = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    for (const m of matches) {
        const purl = m.artifact?.purl;
        const sev = m.vulnerability?.severity;
        if (!purl || !sev) continue;

        if (!vulnByPurl[purl]) {
            vulnByPurl[purl] = { count: 0, maxSeverity: null, vulns: [] };
        }

        vulnByPurl[purl].count++;

        // Keep highest severity
        const current = vulnByPurl[purl].maxSeverity;
        if (!current || order.indexOf(sev) > order.indexOf(current)) {
            vulnByPurl[purl].maxSeverity = sev;
        }

        // Add linked vulnerability info
        vulnByPurl[purl].vulns.push({
            id: m.vulnerability?.id || null,
            severity: sev,
            link: m.vulnerability?.dataSource || null
        });
    }
}

// Get latest version (fallback = current version)
function getLatest(name, currentVersion) {
    const npmName = normalizeForOutdated(name);
    const entry = outdated[npmName];
    return entry?.latest || currentVersion; // fallback ensures no blanks
}

const dependencies = deps.map(d => {
    const v = vulnByPurl[d.purl] || { count: 0, maxSeverity: null, vulns: [] };

    return {
        name: d.name,
        version: d.version,
        latest: getLatest(d.name, d.version),
        license: d.license,
        vulnCount: v.count,
        maxSeverity: v.maxSeverity,
        vulnerabilities: v.vulns // array of {id, severity, link}
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
