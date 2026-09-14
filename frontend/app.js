const API_BASE_URL = 'http://127.0.0.1:8000'

const sidebarList = document.getElementById('sidebar-list')
const panel = document.getElementById('panel')
const appPath = document.getElementById('app-path')

let members = []

init()

async function init() {
	try {
		const [teamRes, membersRes] = await Promise.all([
			fetch(`${API_BASE_URL}/api/team`),
			fetch(`${API_BASE_URL}/api/members`),
		])

		if (teamRes.ok) {
			const team = await teamRes.json()
			appPath.textContent = `${team.name || 'team'} / участники`
		}

		if (!membersRes.ok) throw new Error('Не удалось загрузить участников')
		members = await membersRes.json()

		if (!members.length) {
			panel.innerHTML = `<p class="panel__error">Список участников пуст.</p>`
			return
		}

		renderSidebar()
		showMember(members[0].id)
	} catch (err) {
		console.error(err)
		panel.innerHTML = `
            <p class="panel__error">
                Не удалось подключиться к серверу по адресу ${API_BASE_URL}.<br>
                Проверьте, что бэкенд (uvicorn) запущен.
            </p>`
	}
}

function renderSidebar() {
	sidebarList.innerHTML = ''
	members.forEach((member, index) => {
		const btn = document.createElement('button')
		btn.className = 'member-btn' + (index === 0 ? ' active' : '')
		btn.type = 'button'
		btn.dataset.id = member.id

		const dot = document.createElement('span')
		dot.className = 'member-btn__dot ' + roleDotClass(member.role)

		const name = document.createElement('span')
		name.className = 'member-btn__name'
		name.textContent = member.name || `Участник ${index + 1}`

		btn.appendChild(dot)
		btn.appendChild(name)

		btn.addEventListener('click', () => {
			document
				.querySelectorAll('.member-btn')
				.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')
			showMember(member.id)
		})

		sidebarList.appendChild(btn)
	})
}

function showMember(memberId) {
	const member = members.find(m => m.id === memberId)
	if (!member) return

	const photoUrl = member.photo
		? member.photo.startsWith('http')
			? member.photo
			: `${API_BASE_URL}${member.photo}`
		: ''

	const badgeClass = roleBadgeClass(member.role)

	const stackHtml =
		member.skills && member.skills.length
			? `
            <div class="panel__stack-label">стек</div>
            <ul class="panel__stack">
                ${member.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>`
			: ''

	panel.innerHTML = `
        <div class="panel__tabbar">
            <span class="panel__filename">${escapeHtml(member.id)}.member</span>
            <span class="panel__badge ${badgeClass}">${escapeHtml(member.role || '')}</span>
        </div>
        <div class="panel__body">
            <img class="panel__photo" src="${photoUrl}" alt="${escapeHtml(member.name || '')}"
                 onerror="this.style.opacity=0.25; this.alt='Фото недоступно';">
            <div class="panel__info">
                <h2 class="panel__name">${escapeHtml(member.name || '')}</h2>
                <p class="panel__bio">${escapeHtml(member.bio || '')}</p>
                ${stackHtml}
            </div>
        </div>
    `
}

function roleDotClass(role) {
	const r = (role || '').toLowerCase()
	if (r.includes('frontend') || r.includes('фронт'))
		return 'member-btn__dot--frontend'
	if (r.includes('backend') || r.includes('бэк') || r.includes('бек'))
		return 'member-btn__dot--backend'
	return ''
}

function roleBadgeClass(role) {
	const r = (role || '').toLowerCase()
	if (r.includes('frontend') || r.includes('фронт'))
		return 'panel__badge--frontend'
	if (r.includes('backend') || r.includes('бэк') || r.includes('бек'))
		return 'panel__badge--backend'
	return 'panel__badge--neutral'
}

function escapeHtml(str) {
	const div = document.createElement('div')
	div.textContent = str
	return div.innerHTML
}
