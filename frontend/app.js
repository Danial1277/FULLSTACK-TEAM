const tags = a => a.map(t => `<span class="tag">${t}</span>`).join("");
const list = a => a.map(t => `<li>${t}</li>`).join("");

const memberHTML = m => `<section id="tab-${m.id}" style="--c:var(--${m.c})">
  <div class="hero"><div class="avatar"></div><div><h1>${m.name}</h1><p class="role">${m.role}</p><div class="tags">${tags(m.tags)}</div></div></div>
  <div class="card"><p class="label">Чем занимается</p><ul class="list">${list(m.does)}</ul></div></section>`;

const teamHTML = (team) => `<section id="tab-team">
  <h1>${team.title}</h1>
  <div class="card"><p class="label">Структура команды</p><div class="kids">
    <div><div class="node" style="color:var(--fe)">Frontend</div>${team.structure.frontend.map(n => `<div class="node">${n}</div>`).join("")}</div>
    <div><div class="node" style="color:var(--be)">Backend</div>${team.structure.backend.map(n => `<div class="node">${n}</div>`).join("")}</div>
  </div></div>
  <div class="grid2">
    <div class="card"><p class="label">Технологии</p><div class="tags">${tags(team.technologies)}</div></div>
    <div class="card"><p class="label">Роли</p>Frontend <span class="bar"><b style="--c:var(--fe);width:50%"></b></span> ${team.roles_stats.frontend_count}<br>Backend <span class="bar"><b style="--c:var(--be);width:50%"></b></span> ${team.roles_stats.backend_count}</div>
    <div class="card"><p class="label">Как мы работаем</p><ul class="list">${list(team.work_principles)}</ul></div>
    <div class="card"><p class="label">Сильные стороны</p><ul class="list">${list(team.strengths)}</ul></div>
  </div></section>`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Получаем данные с бэкенда
    const [membersRes, teamRes] = await Promise.all([
      fetch('/api/members'),
      fetch('/api/team')
    ]);

    const M = await membersRes.json();
    const teamData = await teamRes.json();

    const tabs = [...M, { id: "team", name: "Команда" }];
    document.querySelector("nav").innerHTML = tabs.map((t, i) => `<button class="tab-btn${i ? "" : " active"}" data-tab="${t.id}">${t.name}</button>`).join("");
    document.getElementById("tabContent").innerHTML = M.map(memberHTML).join("") + teamHTML(teamData);

    document.querySelector("nav").onclick = e => {
      const id = e.target.closest(".tab-btn")?.dataset.tab;
      if (!id) return;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
      document.querySelectorAll("section").forEach(s => s.classList.toggle("active", s.id === "tab-" + id));
    };

    document.querySelector("nav").firstElementChild.click();
  } catch (err) {
    console.error("Ошибка загрузки данных с API:", err);
  }
});