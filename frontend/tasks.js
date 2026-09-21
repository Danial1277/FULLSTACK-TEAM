// Заворачиваем всё в функцию, которая точно выполнится после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
	console.log('tasks.js загружен и выполняется!')

	// ==========================================
	// Task 1. Работа с элементами DOM
	// ==========================================

	// 1. Изменение текста элемента по ID
	const elementById = document.getElementById('my-element')
	if (elementById) {
		elementById.textContent = 'Привет, мир!'
	}

	// 2. Создание <div> с классом new-div и текстом "Я новый элемент"
	const newDiv = document.createElement('div')
	newDiv.classList.add('new-div')
	newDiv.textContent = 'Я новый элемент'
	document.body.appendChild(newDiv)

	// 3. Удаление элемента с классом old-element
	const oldElement = document.querySelector('.old-element')
	if (oldElement) {
		oldElement.remove()
	}

	// 4. Создание <p> с текстом "Это изменяемый абзац."
	const dynamicParagraph = document.createElement('p')
	dynamicParagraph.textContent = 'Это изменяемый абзац.'
	dynamicParagraph.style.cursor = 'pointer'
	dynamicParagraph.style.marginTop = '10px'

	// 5. При клике меняем цвет текста и размер шрифта
	dynamicParagraph.addEventListener('click', () => {
		dynamicParagraph.style.color = '#7c8cff'
		dynamicParagraph.style.fontSize = '20px'
	})

	const tasksContainer =
		document.getElementById('tasks-container') || document.body
	tasksContainer.appendChild(dynamicParagraph)

	// ==========================================
	// Task 2. Управление классами элементов
	// ==========================================

	function manageClasses(element) {
		if (!element) return

		// Переключаем класс active
		element.classList.toggle('active')

		// Получаем список классов
		const classListText = element.className || 'Классов нет'

		console.log('Список классов элемента:', classListText)

		let infoP = element.nextElementSibling
		if (!infoP || !infoP.classList.contains('class-info-p')) {
			infoP = document.createElement('p')
			infoP.classList.add('class-info-p')
			infoP.style.marginTop = '8px'
			element.after(infoP)
		}

		infoP.textContent = `Список классов: ${classListText}`
	}

	const demoCard = document.getElementById('demo-card')
	if (demoCard) {
		// Навешиваем клик на карточку
		demoCard.addEventListener('click', () => {
			manageClasses(demoCard)
		})

		// Первичный вызов для отображения начального состояния
		manageClasses(demoCard)
	}
})
