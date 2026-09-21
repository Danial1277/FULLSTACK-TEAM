document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// Task 1. Работа с DOM и манипуляции с <body>
	// ==========================================

	const helloContainer = document.getElementById('hello-container')
	const btnCreate = document.getElementById('btn-create')
	const btnChange = document.getElementById('btn-change')
	const btnDelete = document.getElementById('btn-delete')
	const toggleParagraph = document.getElementById('toggle-paragraph')

	// 1. Создать элемент "Привет, мир!"
	function createHelloElement() {
		if (!helloContainer) return
		if (document.getElementById('my-element')) return

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

	if (btnCreate) {
		btnCreate.addEventListener('click', createHelloElement)
	}

	createHelloElement()

	// 4. Переключение цвета и размера абзаца туда и обратно
	let isChanged = false
	if (toggleParagraph) {
		toggleParagraph.addEventListener('click', () => {
			isChanged = !isChanged

			if (isChanged) {
				toggleParagraph.style.color = '#7c8cff'
				toggleParagraph.style.fontSize = '22px'
				toggleParagraph.style.fontWeight = 'bold'
			} else {
				toggleParagraph.style.color = ''
				toggleParagraph.style.fontSize = ''
				toggleParagraph.style.fontWeight = ''
			}
		})
	}

	// 5. Добавление элемента в конец <body> при каждом клике
	const task1Card = document.querySelector('#tab-task1 .card')
	if (task1Card) {
		const btnAppendBody = document.createElement('button')
		btnAppendBody.className = 'tab-btn'
		btnAppendBody.style.marginTop = '15px'
		btnAppendBody.textContent = 'Добавить "Я новый элемент" в конец <body>'

		btnAppendBody.addEventListener('click', () => {
			const newDiv = document.createElement('div')
			newDiv.classList.add('new-div')
			newDiv.textContent = 'Я новый элемент (добавлен в конец body)'
			document.body.appendChild(newDiv)
		})

		task1Card.appendChild(btnAppendBody)
	}

	// ==========================================
	// Task 2. Управление классами, цветом и словами
	// ==========================================

	function manageClasses(element) {
		if (!element) return

		// Переключаем класс active
		element.classList.toggle('active')

		const isActive = element.classList.contains('active')

		// Меняем слова и текст внутри элемента
		const textElement = element.querySelector('p') || element
		if (isActive) {
			textElement.textContent =
				'Класс ACTIVE АКТИВИРОВАН! (Цвет и стиль изменены)'
		} else {
			textElement.textContent = 'Класс active ВЫКЛЮЧЕН. Нажми, чтобы включить'
		}

		const currentClasses = element.className || 'Классов нет'

		console.log('Список классов элемента:', currentClasses)

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
