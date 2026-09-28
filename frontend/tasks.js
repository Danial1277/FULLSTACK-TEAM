document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// Task 1. Работа с DOM и добавление в <body>
	// ==========================================

	const helloContainer = document.getElementById('hello-container')
	const btnCreate = document.getElementById('btn-create')
	const btnChange = document.getElementById('btn-change')
	const btnDelete = document.getElementById('btn-delete')
	const toggleParagraph = document.getElementById('toggle-paragraph')

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

	if (btnChange) {
		btnChange.addEventListener('click', () => {
			const elem = document.getElementById('my-element')
			if (elem) elem.textContent = 'Привет, мир!'
			else alert('Сначала создайте элемент!')
		})
	}

	if (btnDelete) {
		btnDelete.addEventListener('click', () => {
			const elem = document.getElementById('my-element')
			if (elem) elem.remove()
		})
	}

	if (btnCreate) btnCreate.addEventListener('click', createHelloElement)
	createHelloElement()

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
	// Task 2. Управление классами
	// ==========================================

	function manageClasses(element) {
		if (!element) return
		element.classList.toggle('active')
		const isActive = element.classList.contains('active')
		const paragraph = element.querySelector('p') || element

		if (isActive) {
			paragraph.textContent = 'Класс ACTIVE АКТИВИРОВАН! (Цвет изменен)'
			element.style.backgroundColor = '#1d3557'
			element.style.borderColor = '#45e0c4'
			element.style.color = '#ffffff'
		} else {
			paragraph.textContent = 'Класс active ВЫКЛЮЧЕН. Нажми, чтобы включить'
			element.style.backgroundColor = ''
			element.style.borderColor = ''
			element.style.color = ''
		}

		const currentClasses = element.className || 'Классов нет'
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
		demoCard.onclick = e => {
			e.stopPropagation()
			manageClasses(demoCard)
		}
	}

	// ==========================================
	// Task 3. Динамическая таблица и подсчет ячеек
	// ==========================================

	const btnGenerateTable = document.getElementById('btn-generate-table')
	const tableContainer = document.getElementById('table-container')
	const paintColorInput = document.getElementById('paint-color')
	const btnCountCells = document.getElementById('btn-count-cells')
	const colorCountResult = document.getElementById('color-count-result')

	// Функция генерации таблицы
	function generateTable(rows, cols) {
		if (!tableContainer) return
		tableContainer.innerHTML = ''

		const table = document.createElement('table')
		table.className = 'custom-table'

		let cellIndex = 1
		for (let r = 0; r < rows; r++) {
			const tr = document.createElement('tr')
			for (let c = 0; c < cols; c++) {
				const td = document.createElement('td')
				td.textContent = `Ячейка ${cellIndex++}`

				// Клик по ячейке сменяет её цвет
				td.addEventListener('click', () => {
					const selectedColor = paintColorInput.value
					td.style.backgroundColor = selectedColor
					td.setAttribute('data-color', selectedColor.toLowerCase())
				})

				tr.appendChild(td)
			}
			table.appendChild(tr)
		}

		tableContainer.appendChild(table)
	}

	// Вспомогательная функция перевода HEX в RGB для сравнения
	function hexToRgb(hex) {
		let cleanHex = hex.replace('#', '')
		if (cleanHex.length === 3) {
			cleanHex = cleanHex
				.split('')
				.map(x => x + x)
				.join('')
		}
		const num = parseInt(cleanHex, 16)
		return `rgb(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255})`
	}

	// Функция подсчета ячеек определенного цвета
	function countCellsByColor() {
		const targetHex = paintColorInput.value.toLowerCase()
		const targetRgb = hexToRgb(targetHex)
		const cells = document.querySelectorAll('.custom-table td')

		let count = 0
		cells.forEach(cell => {
			const bg = cell.style.backgroundColor.toLowerCase()
			const dataColor = cell.getAttribute('data-color')

			if (bg === targetRgb || dataColor === targetHex) {
				count++
			}
		})

		colorCountResult.textContent = `Ячеек с цветом ${targetHex.toUpperCase()}: ${count}`
	}

	if (btnGenerateTable) {
		btnGenerateTable.addEventListener('click', () => {
			const rows = parseInt(document.getElementById('input-rows').value) || 1
			const cols = parseInt(document.getElementById('input-cols').value) || 1
			generateTable(rows, cols)
			colorCountResult.textContent = ''
		})

		// Первичная генерация по умолчанию (4x4)
		generateTable(4, 4)
	}

	if (btnCountCells) {
		btnCountCells.addEventListener('click', countCellsByColor)
	}

	// ==========================================
	// Task 4. Переключатель темной / светлой темы
	// ==========================================

	const themeToggleBtn = document.getElementById('theme-toggle')

	if (themeToggleBtn) {
		themeToggleBtn.addEventListener('click', () => {
			document.body.classList.toggle('light-theme')
			const isLight = document.body.classList.contains('light-theme')

			if (isLight) {
				themeToggleBtn.textContent = '☀️ Светлая тема'
			} else {
				themeToggleBtn.textContent = '🌙 Темная тема'
			}
		})
	}
})
