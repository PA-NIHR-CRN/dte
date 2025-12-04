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

    // ---- Populate Top-Level Table ----
    const topTbody = document.querySelector('#top-table tbody');
    summary.topLevel
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(dep => {
            const tr = document.createElement('tr');
            if (dep.maxSeverity) tr.classList.add(`severity-${dep.maxSeverity.toUpperCase()}`);

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
    summary.transitive
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(dep => {
            const tr = document.createElement('tr');
            if (dep.maxSeverity) tr.classList.add(`severity-${dep.maxSeverity.toUpperCase()}`);

            tr.innerHTML = `
                <td>${dep.name}</td>
                <td>${dep.version}</td>
                <td>${dep.vulnCount ? `<span class="badge">${dep.vulnCount}</span>` : ''}</td>
                <td>${dep.maxSeverity || ''}</td>
            `;
            transTbody.appendChild(tr);
        });
})();
