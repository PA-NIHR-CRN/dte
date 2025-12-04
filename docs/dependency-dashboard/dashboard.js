(async () => {
    const res = await fetch('data/summary.json', { cache: 'no-store' });
    if (!res.ok) {
        document.getElementById('meta').textContent =
            'No summary.json found yet – run the workflow.';
        return;
    }

    const summary = await res.json();

    // ---- Timestamp Formatting ----
    function formatRelativeTime(timestamp) {
        const now = new Date();
        const then = new Date(timestamp);

        const diffMs = now - then;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHrs = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHrs / 24);

        const sameDay =
            now.getUTCFullYear() === then.getUTCFullYear() &&
            now.getUTCMonth() === then.getUTCMonth() &&
            now.getUTCDate() === then.getUTCDate();

        if (diffSec < 60) return "just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffHrs < 24 && sameDay) return `${diffHrs} hr ago`;
        if (sameDay) return "today";

        return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    }

    const date = new Date(summary.generated);
    const formatted = date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC"
    });

    const relative = formatRelativeTime(summary.generated);

    document.getElementById('meta').textContent =
        `App: ${summary.application} · Generated: ${formatted} UTC (${relative})`;

    // ---- Severity Ranking ----
    const severityRank = {
        "CRITICAL": 4,
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1,
        null: 0
    };

    function normalizeSeverity(val) {
        return val ? val.toUpperCase() : null;
    }

    function sortDeps(list, sortBy, ascending) {
        return list.slice().sort((a, b) => {
            if (sortBy === "severity") {
                const sevA = severityRank[normalizeSeverity(a.maxSeverity)] || 0;
                const sevB = severityRank[normalizeSeverity(b.maxSeverity)] || 0;
                return ascending ? sevA - sevB : sevB - sevA;
            }
            if (sortBy === "vulnCount") {
                return ascending ? a.vulnCount - b.vulnCount : b.vulnCount - a.vulnCount;
            }
            return ascending
                ? String(a[sortBy]).localeCompare(String(b[sortBy]))
                : String(b[sortBy]).localeCompare(String(a[sortBy]));
        });
    }

    function renderTable(tableId, data) {
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = "";

        data.forEach(dep => {
            const tr = document.createElement("tr");

            if (dep.maxSeverity) {
                tr.classList.add(`severity-${normalizeSeverity(dep.maxSeverity)}`);
            }

            const requiredBy = dep.requiredBy?.length
                ? dep.requiredBy.join(", ")
                : "";

            tr.innerHTML = tableId === "top-table"
                ? `
                    <td>${dep.name}</td>
                    <td>${dep.version}</td>
                    <td>${dep.latest || ""}</td>
                    <td>${dep.vulnCount ? `<span class="badge">${dep.vulnCount}</span>` : ""}</td>
                    <td>${dep.maxSeverity || ""}</td>
                `
                : `
                    <td>${dep.name}</td>
                    <td>${dep.version}</td>
                    <td>${dep.vulnCount ? `<span class="badge">${dep.vulnCount}</span>` : ""}</td>
                    <td>${dep.maxSeverity || ""}</td>
                    <td>${requiredBy}</td>
                `;

            tbody.appendChild(tr);
        });
    }

    // ---- Initial render ----
    renderTable("top-table", sortDeps(summary.topLevel, "severity", false));
    renderTable("trans-table", sortDeps(summary.transitive, "severity", false));

    // ---- Click-to-sort ----
    document.querySelectorAll("th[data-sort]").forEach(th => {
        let asc = false;
        th.addEventListener("click", () => {
            const sortKey = th.dataset.sort;
            asc = !asc;

            if (th.closest("table").id === "top-table") {
                renderTable("top-table", sortDeps(summary.topLevel, sortKey, asc));
            } else {
                renderTable("trans-table", sortDeps(summary.transitive, sortKey, asc));
            }
        });
    });
})();
