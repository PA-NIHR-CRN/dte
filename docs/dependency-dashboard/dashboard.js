(async () => {
    const res = await fetch('data/summary.json', { cache: 'no-store' });

    if (!res.ok) {
        document.getElementById('meta').textContent =
            'No summary.json found yet – run the workflow.';
        return;
    }

    const summary = await res.json();
    document.getElementById('meta').textContent =
        `App: ${summary.application} · Generated: ${summary.generated}`;

    // ---- Severity ranking for sorting ----
    const severityRank = {
        "CRITICAL": 4,
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1,
        null: 0
    };

    function sortBySeverityThenName(list) {
        return list.slice().sort((a, b) => {
            const sevA = severityRank[a.maxSeverity] ?? 0;
            const sevB = severityRank[b.maxSeverity] ?? 0;

            if (sevA !== sevB) return sevB - sevA; // highest severity first
            return a.name.localeCompare(b.name);   // alphabetical fallback
        });
    }

    // ---- Populate Top-Level Table ----
    const topTbody = document.querySelector('#top-table tbody');
    topTbody.innerHTML = '';

    sortBySeverityThenName(summary.topLevel)
        .forEach(dep => {
            const tr = document.createElement('tr');
            if (dep.maxSeverity) {
                tr.classList.add(`severity-${dep.maxSeverity.toUpperCase()}`);
            }

            tr.innerHTML = `
                <td>${dep.name}</td>
                <td>${dep.version}</td>
                <td>${dep.latest || ''}</td>
                <td>${dep.vulnCount ? `<span class="badge">${dep.vulnCount}</span>` : ''}</td>
                <td>${dep.maxSeverity || ''}</td>
            `;

            topTbody.appendChild(tr);
        });

    // ---- Populate Transitive Table ----
    const transTbody = document.querySelector('#trans-table tbody');
    transTbody.innerHTML = '';

    sortBySeverityThenName(summary.transitive)
        .forEach(dep => {
            const tr = document.createElement('tr');
            if (dep.maxSeverity) {
                tr.classList.add(`severity-${dep.maxSeverity.toUpperCase()}`);
            }

            const requiredBy = dep.requiredBy?.length
                ? dep.requiredBy.join(', ')
                : '';

            tr.innerHTML = `
                <td>${dep.name}</td>
                <td>${dep.version}</td>
                <td>${dep.vulnCount ? `<span class="badge">${dep.vulnCount}</span>` : ''}</td>
                <td>${dep.maxSeverity || ''}</td>
                <td>${requiredBy}</td>
            `;

            transTbody.appendChild(tr);
        });
})();
