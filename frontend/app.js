// ======= ДАННЫЕ УЧАСТНИКОВ (отредактируйте под себя) =======
const team = {
	sato: {
		initials: 'С',
		name: 'Сато',
		role: 'Участник проекта',
		bio: 'Отвечает за свою часть Python-проекта. Здесь можно рассказать подробнее: чем занимается, какие задачи решает в команде, интересы в программировании.',
		tags: ['Python', 'Командная работа'],
	},
	nargiz: {
		initials: 'Н',
		name: 'Наргиз',
		role: 'Участница проекта',
		bio: 'Отвечает за свою часть Python-проекта. Здесь можно рассказать подробнее: чем занимается, какие задачи решает в команде, интересы в программировании.',
		tags: ['Python', 'Командная работа'],
	},
	danialt: {
		initials: 'ДТ',
		name: 'Даниал Т',
		role: 'Участник проекта',
		bio: 'Отвечает за свою часть Python-проекта. Здесь можно рассказать подробнее: чем занимается, какие задачи решает в команде, интересы в программировании.',
		tags: ['Python', 'Командная работа'],
	},
	danialn: {
		initials: 'ДН',
		name: 'Даниал Н',
		role: 'Участник проекта',
		bio: 'Отвечает за свою часть Python-проекта. Здесь можно рассказать подробнее: чем занимается, какие задачи решает в команде, интересы в программировании.',
		tags: ['Python', 'Командная работа'],
	},
}

// ======= ГЕНЕРАЦИЯ HTML ДЛЯ ВКЛАДКИ "О ГРУППЕ" =======
function renderTeamPanel() {
	const cards = Object.keys(team)
		.map(key => {
			const m = team[key]
			return `
      <div class="team-card">
        <div class="team-card__avatar">${m.initials}</div>
        <div class="team-card__name">${m.name}</div>
        <div class="team-card__role">${m.role}</div>
      </div>
    `
		})
		.join('')

	return `
    <div class="panel active" id="panel-team">
      <div class="section-title">О нашей группе</div>
      <p class="section-desc">
        Мы — команда из четырёх человек, работающая над совместным проектом на Python.
        Каждый из нас отвечает за свою часть работы, но результат мы создаём вместе.
        На вкладках выше можно узнать подробнее про каждого участника.
      </p>
      <div class="team-grid">
        ${cards}
      </div>
    </div>
  `
}

// ======= ГЕНЕРАЦИЯ HTML ДЛЯ ПРОФИЛЯ УЧАСТНИКА =======
function renderProfilePanel(key) {
	const m = team[key]
	const tags = m.tags.map(t => `<span class="tag">${t}</span>`).join('')

	return `
    <div class="panel" id="panel-${key}">
      <div class="profile">
        <div class="profile__avatar">${m.initials}</div>
        <div class="profile__info">
          <div class="profile__name">${m.name}</div>
          <div class="profile__role">${m.role}</div>
          <p class="profile__bio">${m.bio}</p>
          <div class="profile__tags">${tags}</div>
        </div>
      </div>
    </div>
  `
}

// ======= РЕНДЕР ВСЕГО КОНТЕНТА =======
function renderContent() {
	const content = document.getElementById('content')
	let html = renderTeamPanel()
	Object.keys(team).forEach(key => {
		html += renderProfilePanel(key)
	})
	content.innerHTML = html
}

// ======= ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =======
function setupTabs() {
	const buttons = document.querySelectorAll('.tab-btn')
	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			const tab = btn.getAttribute('data-tab')

			// Кнопки
			buttons.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')

			// Панели
			document
				.querySelectorAll('.panel')
				.forEach(p => p.classList.remove('active'))
			const target = document.getElementById(`panel-${tab}`)
			if (target) target.classList.add('active')
		})
	})
}

// ======= ИНИЦИАЛИЗАЦИЯ =======
document.addEventListener('DOMContentLoaded', () => {
	renderContent()
	setupTabs()
})
