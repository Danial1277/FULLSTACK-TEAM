const tags = a => a.map(t => `<span class="tag">${t}</span>`).join('')
const list = a => a.map(t => `<li>${t}</li>`).join('')

const memberHTML = m => {
  const colorClass = m.category === 'frontend' ? 'fe' : 'be'
  return `<section id="tab-${m.id}" style="--c:var(--${colorClass})">
  <div class="hero"><div class="avatar"></div><div><h1>${m.name}</h1><p class="role">${m.role}</p><div class="tags">${tags(m.tags)}</div></div></div>
  <div class="card"><p class="label">Чем занимается</p><ul class="list">${list(m.does)}</ul></div></section>`
}

const teamHTML = team => `<section id="tab-team">
  <h1>${team.title}</h1>
  <div class="card"><p class="label">Структура команды</p><div class="kids">
    <div><div class="node" style="color:var(--fe)">Frontend</div>${team.structure.frontend.map(n => `<div class="node">${n}</div>`).join('')}</div>
    <div><div class="node" style="color:var(--be)">Backend</div>${team.structure.backend.map(n => `<div class="node">${n}</div>`).join('')}</div>
  </div></div>
  <div class="grid2">
    <div class="card"><p class="label">Технологии</p><div class="tags">${tags(team.technologies)}</div></div>
    <div class="card"><p class="label">Роли</p>Frontend <span class="bar"><b style="--c:var(--fe);width:50%"></b></span> ${team.roles_stats.frontend_count}<br>Backend <span class="bar"><b style="--c:var(--be);width:50%"></b></span> ${team.roles_stats.backend_count}</div>
    <div class="card"><p class="label">Как мы работаем</p><ul class="list">${list(team.work_principles)}</ul></div>
    <div class="card"><p class="label">Сильные стороны</p><ul class="list">${list(team.strengths)}</ul></div>
  </div></section>`

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [membersRes, teamRes] = await Promise.all([
            fetch('/api/members'),
            fetch('/api/team'),
        ])

        const M = await membersRes.json()
        const teamData = await teamRes.json()

        // Формирование всех вкладок (участники + команда + задачи 1-5)
        const tabs = [
            ...M, 
            { id: 'team', name: 'Команда' },
            { id: 'task1', name: 'Task 1' },
            { id: 'task2', name: 'Task 2' },
            { id: 'task3', name: 'Task 3' },
            { id: 'task4', name: 'Task 4' },
            { id: 'task5', name: 'Task 5 (DummyJSON)' }
        ]

        document.querySelector('nav').innerHTML = tabs
            .map(
                (t, i) =>
                    `<button class="tab-btn${i ? '' : ' active'}" data-tab="${t.id}">${t.name}</button>`,
            )
            .join('')

        const task1Sec = document.getElementById('tab-task1')
        const task2Sec = document.getElementById('tab-task2')
        const task3Sec = document.getElementById('tab-task3')
        const task4Sec = document.getElementById('tab-task4')
        const task5Sec = document.getElementById('tab-task5')

        document.getElementById('tabContent').innerHTML =
            M.map(memberHTML).join('') + teamHTML(teamData)
        
        if (task1Sec) document.getElementById('tabContent').appendChild(task1Sec)
        if (task2Sec) document.getElementById('tabContent').appendChild(task2Sec)
        if (task3Sec) document.getElementById('tabContent').appendChild(task3Sec)
        if (task4Sec) document.getElementById('tabContent').appendChild(task4Sec)
        if (task5Sec) document.getElementById('tabContent').appendChild(task5Sec)

        document.querySelector('nav').onclick = e => {
            const id = e.target.closest('.tab-btn')?.dataset.tab
            if (!id) return
            document
                .querySelectorAll('.tab-btn')
                .forEach(b => b.classList.toggle('active', b.dataset.tab === id))
            document
                .querySelectorAll('section')
                .forEach(s => s.classList.toggle('active', s.id === 'tab-' + id))
        }

        document.querySelector('nav').firstElementChild.click()
    } catch (err) {
        console.error('Ошибка загрузки данных с API:', err)
    }
})