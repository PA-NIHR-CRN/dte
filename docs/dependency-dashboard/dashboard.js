(async () => {
    const res = await fetch('data/summary.json', { cache: 'no-store' });
    if (!res.ok) {
        document.getElementById('meta').textContent = 'No summary.json found yet – run the workflow.';
        return;
    }
    const summary = await res.json();

    document.getElementById('meta').textContent =
        `App: ${summary.application} · Generated: ${summary.generated}`;

    const tbody = document.querySelector('#deps-table tbody');
    tbody.innerHTML = '';

    summary.dependencies
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
            tbody.appendChild(tr);
        });
})();
