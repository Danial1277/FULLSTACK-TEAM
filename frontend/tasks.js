document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// Task 1. Работа с DOM и добавление в <body>
	// ==========================================

	const helloContainer = document.getElementById('hello-container')
	const btnCreate = document.getElementById('btn-create')
	const btnChange = document.getElementById('btn-change')
	const btnDelete = document.getElementById('btn-delete')
	const toggleParagraph = document.getElementById('toggle-paragraph')

	// 1. Создание элемента "Привет, мир!"
	function createHelloElement() {
		if (!helloContainer) return
		if (document.getElementById('my-element')) return // Проверка на дубликаты

		const newElem = document.createElement('div')
		newElem.id = 'my-element'
		newElem.textContent = 'Исходный текст элемента'
		newElem.style.fontSize = '18px'
		newElem.style.fontWeight = 'bold'
		helloContainer.appendChild(newElem)
	}

	// 2. Изменение текста элемента на "Привет, мир!"
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

	// 3. Удаление элемента из DOM
	if (btnDelete) {
		btnDelete.addEventListener('click', () => {
			const elem = document.getElementById('my-element')
			if (elem) {
				elem.remove()
			}
		})
	}

	// Кнопка пересоздания элемента
	if (btnCreate) {
		btnCreate.addEventListener('click', createHelloElement)
	}

	// Инициализация элемента при старте
	createHelloElement()

	// 4. Изменяемый абзац: смена цвета и стиля при нажатии туда и обратно
	let isParagraphChanged = false
	if (toggleParagraph) {
		toggleParagraph.addEventListener('click', () => {
			isParagraphChanged = !isParagraphChanged

			if (isParagraphChanged) {
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

	// 5. Добавление слова/элемента в конец <body> при каждом клике
	const task1Card = document.querySelector('#tab-task1 .card')
	if (task1Card) {
		const btnAppendBody = document.createElement('button')
		btnAppendBody.className = 'tab-btn'
		btnAppendBody.style.marginTop = '15px'
		btnAppendBody.textContent = 'Добавить элемент в конец <body>'

		btnAppendBody.addEventListener('click', () => {
			const newDiv = document.createElement('div')
			newDiv.classList.add('new-div')
			newDiv.textContent = 'Я новый элемент (добавлен в конец body)'
			document.body.appendChild(newDiv)
		})

		task1Card.appendChild(btnAppendBody)
	}

	// ==========================================
	// Task 2. Управление классами, смена слов и цвета
	// ==========================================

	function manageClasses(element) {
		if (!element) return

		// 1. Переключение класса active
		element.classList.toggle('active')

		// 2. Проверка активного состояния
		const isActive = element.classList.contains('active')

		// 3. Изменение текста/слов внутри карточки при нажатии
		const paragraph = element.querySelector('p') || element
		if (isActive) {
			paragraph.textContent =
				'Класс ACTIVE АКТИВИРОВАН! (Цвет и стиль изменены)'
		} else {
			paragraph.textContent = 'Класс active ВЫКЛЮЧЕН. Нажми, чтобы включить'
		}

		// 4. Получение списка текущих классов
		const currentClasses = element.className || 'Классов нет'
		console.log('Текущий список классов:', currentClasses)

		// 5. Вывод информации о классах под карточкой
		let infoP = element.nextElementSibling
		if (!infoP || !infoP.classList.contains('class-info-p')) {
			infoP = document.createElement('p')
			infoP.classList.add('class-info-p')
			infoP.style.marginTop = '10px'
			infoP.style.color = '#888'
			element.after(infoP)
		}

		infoP.textContent = `Список классов: ${currentClasses}`
	}

	const demoCard = document.getElementById('demo-card')
	if (demoCard) {
		// Назначаем обработчик нажатия
		demoCard.onclick = e => {
			e.stopPropagation()
			manageClasses(demoCard)
		}

		// Начальный вывод списка классов без переключения состояния
		let infoP = demoCard.nextElementSibling
		if (!infoP || !infoP.classList.contains('class-info-p')) {
			infoP = document.createElement('p')
			infoP.classList.add('class-info-p')
			infoP.style.marginTop = '10px'
			infoP.style.color = '#888'
			demoCard.after(infoP)
		}
		infoP.textContent = `Список классов: ${demoCard.className || 'card'}`
	}
})
