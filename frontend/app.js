const API_BASE_URL = 'http://127.0.0.1:8000'

// Элементы DOM
const teamNameEl = document.getElementById('team-name')
const teamDescEl = document.getElementById('team-desc')
const tabsNavContainer = document.getElementById('tabs-nav')

const memberNameEl = document.getElementById('member-name')
const memberRoleEl = document.getElementById('member-role')
const memberBioEl = document.getElementById('member-bio')
const memberPhotoEl = document.getElementById('member-photo')
const noPhotoEl = document.getElementById('no-photo')
const memberSkillsEl = document.getElementById('member-skills')

let membersData = []

// Инициализация приложения
async function initApp() {
	try {
		// 1. Получаем общую информацию о команде
		const teamResponse = await fetch(`${API_BASE_URL}/api/team`)
		if (teamResponse.ok) {
			const teamInfo = await teamResponse.json()
			teamNameEl.textContent = teamInfo.name
			teamDescEl.textContent = teamInfo.description
		}

		// 2. Получаем список всех участников
		const membersResponse = await fetch(`${API_BASE_URL}/api/members`)
		if (!membersResponse.ok) throw new Error('Не удалось загрузить участников')

		membersData = await membersResponse.json()

		// 3. Рендерим кнопки вкладок на основе полученных данных
		renderTabs(membersData)

		// 4. Показываем первого участника по умолчанию
		if (membersData.length > 0) {
			displayMember(membersData[0])
		}
	} catch (err) {
		console.error('Ошибка подключения к бэкенду:', err)
		teamNameEl.textContent = 'Ошибка загрузки'
		teamDescEl.textContent = 'Убедитесь, что FastAPI сервер запущен.'
	}
}

// Создание кнопок вкладок динамически
function renderTabs(members) {
	tabsNavContainer.innerHTML = ''

	members.forEach((member, index) => {
		const btn = document.createElement('button')
		btn.classList.add('tab-btn')
		if (index === 0) btn.classList.add('active')

		// Название кнопки — имя участника или его роль
		btn.textContent = member.name.split(' ')[0] // Берем первое слово (имя) для компактности на вкладке
		btn.dataset.id = member.id

		// Обработчик клика по вкладке
		btn.addEventListener('click', e => {
			document
				.querySelectorAll('.tab-btn')
				.forEach(b => b.classList.remove('active'))
			e.target.classList.add('active')

			// Находим выбранного участника и отображаем его
			const selectedMember = members.find(m => m.id === e.target.dataset.id)
			if (selectedMember) {
				displayMember(selectedMember)
			}
		})

		tabsNavContainer.appendChild(btn)
	})
}

// Отображение данных участника в блоке профиля
function displayMember(member) {
	memberNameEl.textContent = member.name
	memberRoleEl.textContent = member.role
	memberBioEl.textContent = member.bio || 'Информация пока не добавлена.'

	// Обработка фотографии
	if (member.photo) {
		// Проверяем, абсолютный ли путь или относительный
		const photoUrl = member.photo.startsWith('http')
			? member.photo
			: `${API_BASE_URL}${member.photo}`

		memberPhotoEl.src = photoUrl
		memberPhotoEl.style.display = 'block'
		noPhotoEl.style.display = 'none'
	} else {
		memberPhotoEl.style.display = 'none'
		noPhotoEl.style.display = 'flex'
	}

	// Рендерим навыки (скиллы)
	memberSkillsEl.innerHTML = ''
	if (member.skills && member.skills.length > 0) {
		member.skills.forEach(skill => {
			const tag = document.createElement('span')
			tag.classList.add('skill-tag')
			tag.textContent = skill
			memberSkillsEl.appendChild(tag)
		})
	} else {
		memberSkillsEl.innerHTML =
			'<span style="color: #a0aec0; font-size: 14px;">Не указаны</span>'
	}
}

// Запуск при загрузке страницы
initApp()
