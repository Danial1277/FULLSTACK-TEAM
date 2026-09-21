document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// Task 1. Динамическое управление DOM
	// ==========================================

	const helloContainer = document.getElementById('hello-container')
	const btnCreate = document.getElementById('btn-create')
	const btnChange = document.getElementById('btn-change')
	const btnDelete = document.getElementById('btn-delete')
	const toggleParagraph = document.getElementById('toggle-paragraph')

	// 1. Создать элемент
	function createHelloElement() {
		if (!helloContainer) return
		if (document.getElementById('my-element')) return // Элемент уже существует

		const newElem = document.createElement('div')
		newElem.id = 'my-element'
		newElem.textContent = 'Исходный текст элемента'
		newElem.style.fontSize = '18px'
		newElem.style.fontWeight = 'bold'
		helloContainer.appendChild(newElem)
	}

	// 2. Изменить текст на "Привет, мир!"
	if (btnChange) {
		btnChange.addEventListener('click', () => {
			const elem = document.getElementById('my-element')
			if (elem) {
				elem.textContent = 'Привет, мир!'
			} else {
				alert('Сначала создайте элемент!')
			}
		})
	}

	// 3. Удалить элемент
	if (btnDelete) {
		btnDelete.addEventListener('click', () => {
			const elem = document.getElementById('my-element')
			if (elem) {
				elem.remove()
			}
		})
	}

	// Кнопка создания
	if (btnCreate) {
		btnCreate.addEventListener('click', createHelloElement)
	}

	// Авто-создание элемента при старте
	createHelloElement()

	// 4. Переключение цвета и размера шрифта абзаца при повторных кликах (Toggle)
	let isChanged = false
	if (toggleParagraph) {
		toggleParagraph.addEventListener('click', () => {
			isChanged = !isChanged // переключаем состояние

			if (isChanged) {
				toggleParagraph.style.color = '#7c8cff'
				toggleParagraph.style.fontSize = '22px'
				toggleParagraph.style.fontWeight = 'bold'
			} else {
				toggleParagraph.style.color = '' // возвращаем исходный цвет
				toggleParagraph.style.fontSize = '' // возвращаем исходный размер
				toggleParagraph.style.fontWeight = ''
			}
		})
	}

	// ==========================================
	// Task 2. Управление классами
	// ==========================================

	function manageClasses(element) {
		if (!element) return

		// Переключаем класс active
		element.classList.toggle('active')

		// Получаем текущий список классов
		const currentClasses = element.className || 'Классов нет'

		// Вывод в консоль
		console.log('Список классов элемента:', currentClasses)

		// Ищем или создаем тег <p> рядом для вывода
		let infoP = element.nextElementSibling
		if (!infoP || !infoP.classList.contains('class-info-p')) {
			infoP = document.createElement('p')
			infoP.classList.add('class-info-p')
			infoP.style.marginTop = '10px'
			element.after(infoP)
		}

		infoP.textContent = `Список классов: ${currentClasses}`
	}

	const demoCard = document.getElementById('demo-card')
	if (demoCard) {
		demoCard.addEventListener('click', () => {
			manageClasses(demoCard)
		})
		manageClasses(demoCard)
	}
})
