'use strict'

const API_BASE = '/api'
const CATEGORY_LABEL = { frontend: 'Frontend', backend: 'Backend' }
const DEFAULT_TITLE = 'Наша команда — разработчики'

const tabsNav = document.getElementById('tabsNav')
const tabContent = document.getElementById('tabContent')

let team = null
let members = []

/* ---------- Вспомогательные функции ---------- */

async function getJSON(path) {
	const res = await fetch(`${API_BASE}${path}`)
	if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`)
	return res.json()
}

// Создаёт элемент; текст задаётся через textContent (без риска XSS)
function el(tag, className = '', text = '') {
	const node = document.createElement(tag)
	if (className) node.className = className
	if (text) node.textContent = text
	return node
}

function bulletList(items) {
	const ul = el('ul', 'list')
	items.forEach(item => ul.append(el('li', '', item)))
	return ul
}

function tagList(items) {
	const wrap = el('div', 'tags')
	items.forEach(item => wrap.append(el('span', 'tag', item)))
	return wrap
}

function setStatus(online, text) {
	document.querySelectorAll('.status-chip').forEach(chip => {
		chip.classList.toggle('online', online)
		chip.classList.toggle('offline', !online)
		chip.querySelector('.status-text').textContent = text
	})
}

/* ---------- Отрисовка ---------- */

function renderTeam() {
	const stats = team.roles_stats
	const view = el('div', 'view')

	view.append(
		el('h1', 'view-title', team.title),
		el('p', 'lead', team.description),
		el('p', 'muted', `Участников в команде: ${stats.total_members}`),
	)

	// Две группы: Frontend и Backend, каждый участник — ссылка на свою вкладку
	const groups = el('div', 'groups')
	for (const category of ['frontend', 'backend']) {
		const group = el('section', 'group')
		group.dataset.category = category

		const title = el('h2', 'group-title', CATEGORY_LABEL[category])
		title.append(el('span', 'count', String(stats[`${category}_count`])))
		group.append(title)

		const people = el('ul', 'people')
		members
			.filter(m => m.category === category)
			.forEach(m => {
				const link = el('a', 'person')
				link.href = `#${m.id}`
				link.append(
					el('span', 'person-name', m.name),
					el('span', 'person-role', m.role),
				)
				const li = el('li')
				li.append(link)
				people.append(li)
			})

		group.append(people)
		groups.append(group)
	}
	view.append(groups)

	view.append(el('h2', '', 'Технологии'), tagList(team.technologies))

	const columns = el('div', 'columns')
	const principles = el('div')
	principles.append(
		el('h2', '', 'Принципы работы'),
		bulletList(team.work_principles),
	)
	const strengths = el('div')
	strengths.append(el('h2', '', 'Сильные стороны'), bulletList(team.strengths))
	columns.append(principles, strengths)
	view.append(columns)

	return view
}

function renderMember(member) {
	const profile = el('article', 'profile view')
	profile.dataset.category = member.category

	profile.append(
		el('h1', 'view-title', member.name),
		el('p', 'role', member.role),
		el('h2', '', 'Чем занимается'),
		bulletList(member.does),
		el('h2', '', 'Технологии и навыки'),
		tagList(member.tags),
	)

	return profile
}

function buildTabs() {
	const items = [
		{ id: 'team', label: 'Команда', category: '' },
		...members.map(m => ({ id: m.id, label: m.name, category: m.category })),
	]

	tabsNav.replaceChildren()
	items.forEach(({ id, label, category }) => {
		const tab = el('button', 'tab', label)
		tab.type = 'button'
		tab.setAttribute('role', 'tab')
		tab.dataset.id = id
		if (category) tab.dataset.category = category
		tab.addEventListener('click', () => {
			location.hash = id
		})
		tabsNav.append(tab)
	})
}

function show(id) {
	const member = members.find(m => m.id === id)
	const activeId = member ? member.id : 'team'

	tabContent.replaceChildren(member ? renderMember(member) : renderTeam())
	document.title = member ? `${member.name} — ${team.title}` : DEFAULT_TITLE

	tabsNav.querySelectorAll('.tab').forEach(tab => {
		const isActive = tab.dataset.id === activeId
		tab.classList.toggle('active', isActive)
		tab.setAttribute('aria-selected', String(isActive))
	})
}

function showError() {
	const box = el('div', 'error-box')
	box.append(
		el('p', '', 'Не удалось загрузить данные с сервера.'),
		el(
			'p',
			'muted',
			'Проверьте, что backend запущен: python main.py (папка backend).',
		),
	)
	const retry = el('button', 'btn', 'Повторить')
	retry.type = 'button'
	retry.style.marginLeft = '0'
	retry.addEventListener('click', init)
	box.append(retry)

	tabContent.replaceChildren(box)
	setStatus(false, 'API недоступен')
}

/* ---------- Запуск ---------- */

let routerReady = false
const currentId = () => location.hash.slice(1) || 'team'

async function init() {
	try {
		;[team, members] = await Promise.all([
			getJSON('/team'),
			getJSON('/members'),
		])
	} catch (err) {
		console.error(err)
		showError()
		return
	}

	document.querySelector('.footer-title').textContent = team.title
	document.querySelector('.footer-desc').textContent = team.description
	setStatus(true, 'API онлайн')

	buildTabs()
	show(currentId())

	if (!routerReady) {
		window.addEventListener('hashchange', () => show(currentId()))
		routerReady = true
	}
}

init()
