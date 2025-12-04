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

// ---- Determine top-level dependencies from package.json ----
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
function normalizeName(name) {
    if (name.includes('__')) {
        const [scope, pkg] = name.split('__');
        return `@${scope}/${pkg}`;
    }
    return name;
}

// Build a PURL → component map
const componentsByPurl = {};
(sbom.components || []).forEach(c => {
    if (c.purl) componentsByPurl[c.purl] = c;
});

// Extract components as dependency list
const sbomDeps = (sbom.components || [])
    .filter(c => c.type === 'library' && c.name && c.version)
    .map(c => ({
        purl: c.purl,
        name: normalizeName(c.name),
        rawName: c.name,
        version: c.version,
        license: (c.licenses?.[0]?.license?.id) || null
    }));

// ---- Dependency Graph (forward + reverse) ----
const forwardDeps = {}; // purl -> [purl...]
const reverseDeps = {}; // purl -> [purl...]

(sbom.dependencies || []).forEach(dep => {
    const parent = dep.ref;
    const children = dep.dependsOn || [];

    if (!forwardDeps[parent]) forwardDeps[parent] = [];
    forwardDeps[parent].push(...children);

    children.forEach(child => {
        if (!reverseDeps[child]) reverseDeps[child] = [];
        reverseDeps[child].push(parent);
    });
});

// ---- Resolve top-level ancestry for each component ----
function findTopLevelAncestors(purl) {
    const result = new Set();
    const visited = new Set();

    function walk(node) {
        if (!node || visited.has(node)) return;
        visited.add(node);

        const comp = componentsByPurl[node];
        if (!comp) return;

        const name = normalizeName(comp.name);

        if (topLevelNames.has(name)) {
            result.add(name);
        }

        const parents = reverseDeps[node] || [];
        parents.forEach(walk);
    }

    walk(purl);
    return Array.from(result);
}

// ---- Vulnerability aggregation ----
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

        const current = vulnByPurl[purl].maxSeverity;
        if (!current || order.indexOf(sev) > order.indexOf(current)) {
            vulnByPurl[purl].maxSeverity = sev;
        }

        vulnByPurl[purl].vulns.push({
            id: m.vulnerability?.id || null,
            severity: sev,
            link: m.vulnerability?.dataSource || null
        });
    }
}

// ---- Latest version only for top-level deps ----
function getLatest(name, currentVersion) {
    const entry = outdated[name];
    if (!entry) return null;
    return entry.latest || currentVersion;
}

// ---- Build final results ----
let topLevel = [];
let transitive = [];

for (const d of sbomDeps) {
    const vul = vulnByPurl[d.purl] || { count: 0, maxSeverity: null, vulns: [] };
    const ancestors = findTopLevelAncestors(d.purl);

    const record = {
        name: d.name,
        version: d.version,
        latest: null,
        requiredBy: ancestors,   // NEW!
        license: d.license,
        vulnCount: vul.count,
        maxSeverity: vul.maxSeverity,
        vulnerabilities: vul.vulns
    };

    if (topLevelNames.has(d.name)) {
        record.latest = getLatest(d.name, d.version);
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
