(function () {
  const { players, sessions } = window.TENIS_DATA;
  const months = ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja",
                  "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca"];

  const parseDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return { y, m, d }; };
  const fmtDate = (iso) => { const { y, m, d } = parseDate(iso); return `${d}.${m}.${y}.`; };
  const initials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const firstName = (name) => name.split(" ")[0];

  // --- Izračun ukupne statistike ---
  const totalMatches = sessions.reduce(
    (sum, s) => sum + Object.values(s.wins).reduce((a, b) => a + b, 0), 0);

  const stats = players.map(name => {
    const wins = sessions.reduce((sum, s) => sum + (s.wins[name] || 0), 0);
    const played = sessions.filter(s => name in s.wins).length;
    const dayWins = sessions.filter(s => {
      const max = Math.max(...Object.values(s.wins));
      return max > 0 && s.wins[name] === max;
    }).length;
    return { name, wins, played, dayWins };
  }).sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name, "hr"));

  // Rang s izjednačenjima (1, 2, 2, 4)
  stats.forEach((s, i) => {
    s.rank = i > 0 && s.wins === stats[i - 1].wins ? stats[i - 1].rank : i + 1;
  });

  const maxWins = Math.max(1, ...stats.map(s => s.wins));
  const leader = stats[0];
  const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date));
  const lastDate = sorted.length ? fmtDate(sorted[0].date) : "—";

  // --- KPI kartice ---
  document.getElementById("kpis").innerHTML = `
    <div class="kpi accent"><div class="label">Lider</div><div class="value">${firstName(leader.name)}</div></div>
    <div class="kpi"><div class="label">Odigrano mečeva</div><div class="value">${totalMatches}</div></div>
    <div class="kpi"><div class="label">Termina</div><div class="value">${sessions.length}</div></div>
    <div class="kpi"><div class="label">Zadnji termin</div><div class="value">${lastDate}</div></div>
  `;

  // --- Poredak ---
  document.getElementById("board").innerHTML = stats.map(s => {
    const pct = totalMatches ? Math.round((s.wins / totalMatches) * 100) : 0;
    const width = (s.wins / maxWins) * 100;
    return `
      <li class="row ${s.rank === 1 ? "first" : ""}">
        <div class="rank r${s.rank}">${s.rank}</div>
        <div class="avatar">${initials(s.name)}</div>
        <div class="who">
          <div class="name">${s.name}${s.rank === 1 ? ' <span class="crown">👑</span>' : ""}</div>
          <div class="bar"><span data-w="${width}"></span></div>
        </div>
        <div class="score">
          <div class="num">${s.wins}</div>
          <div class="pct">${pct}% pobjeda</div>
        </div>
      </li>`;
  }).join("");

  // Animacija traka
  requestAnimationFrame(() => setTimeout(() => {
    document.querySelectorAll(".bar span").forEach(el => { el.style.width = el.dataset.w + "%"; });
  }, 80));

  // --- Povijest termina ---
  document.getElementById("sessionCount").textContent =
    `${sessions.length} ${sessions.length === 1 ? "termin" : "termina"}`;

  document.getElementById("history").innerHTML = sorted.map(s => {
    const { d, m, y } = parseDate(s.date);
    const total = Object.values(s.wins).reduce((a, b) => a + b, 0);
    const max = Math.max(...Object.values(s.wins));
    const chips = Object.entries(s.wins)
      .sort((a, b) => b[1] - a[1])
      .map(([name, w]) => `
        <div class="chip ${w === max && w > 0 ? "top" : ""}">
          <span>${name}</span><b>${w}</b>
        </div>`).join("");
    return `
      <article class="session">
        <div class="date">
          <div class="day">${d}.</div>
          <div class="month">${months[m - 1]} ${y}.</div>
          <div class="total">🎾 ${total} ${total === 1 ? "meč" : "mečeva"}</div>
        </div>
        <div class="chips">${chips}</div>
      </article>`;
  }).join("");

  document.getElementById("updated").textContent = `ažurirano ${lastDate}`;
})();
