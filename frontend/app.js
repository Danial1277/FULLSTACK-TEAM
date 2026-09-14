document.addEventListener('DOMContentLoaded', () => {
	const tabsNav = document.getElementById('tabsNav')
	const tabContent = document.getElementById('tabContent')

	let teamMembers = []
	let teamInfo = {}

	async function fetchData() {
		try {
			// Запрашиваем эндпоинты бэкенда
			const membersRes = await fetch('/team')
			const infoRes = await fetch('/team-info')

			if (!membersRes.ok || !infoRes.ok) {
				throw new Error(
					`Ошибка ответа сервера: ${membersRes.status} / ${infoRes.status}`,
				)
			}

			teamMembers = await membersRes.json()
			teamInfo = await infoRes.json()

			renderTabs()
			if (teamMembers.length > 0) {
				switchTab(0)
			}
		} catch (error) {
			console.error('Детали ошибки:', error)
			tabContent.innerHTML = `
        <div style="color: #dc2626; padding: 20px; text-align: center;">
          <h3>Не удалось загрузить данные</h3>
          <p style="margin-top: 8px;">${error.message}</p>
          <p style="font-size: 13px; color: #6b7280; margin-top: 10px;">
            Убедитесь, что сервер запущен через <b>python main.py</b> и вы заходите по адресу <b>http://127.0.0.1:8000</b>
          </p>
        </div>
      `
		}
	}

	function renderTabs() {
		tabsNav.innerHTML = ''

		// Вкладки 1-4 (Участники)
		teamMembers.forEach((member, index) => {
			const btn = document.createElement('button')
			btn.className = 'tab-btn'
			btn.textContent = member.name.split(' ')[0]
			btn.addEventListener('click', () => switchTab(index))
			tabsNav.appendChild(btn)
		})

		// Вкладка 5 (О команде)
		const teamBtn = document.createElement('button')
		teamBtn.className = 'tab-btn'
		teamBtn.textContent = 'О команде'
		teamBtn.addEventListener('click', () => switchTab(teamMembers.length))
		tabsNav.appendChild(teamBtn)
	}

	function switchTab(index) {
		const buttons = tabsNav.querySelectorAll('.tab-btn')
		buttons.forEach((btn, idx) => {
			btn.classList.toggle('active', idx === index)
		})

		if (index === teamMembers.length) {
			renderTeamInfo()
		} else {
			renderMemberInfo(teamMembers[index])
		}
	}

	function renderMemberInfo(member) {
		const skillsHtml = member.skills
			? member.skills
					.map(skill => `<span class="skill-tag">${skill}</span>`)
					.join('')
			: ''

		tabContent.innerHTML = `
      <div class="profile-card">
        <img src="${member.photo}" alt="${member.name}" class="profile-photo" onerror="this.src='https://via.placeholder.com/140'">
        <div class="profile-info">
          <h2>${member.name}</h2>
          <span class="role">${member.role}</span>
          <p class="bio">${member.bio}</p>
          <div class="skills">${skillsHtml}</div>
        </div>
      </div>
    `
	}

	function renderTeamInfo() {
		tabContent.innerHTML = `
      <div class="team-card">
        <h2>${teamInfo.name}</h2>
        <p>${teamInfo.description}</p>
      </div>
    `
	}

	fetchData()
})
