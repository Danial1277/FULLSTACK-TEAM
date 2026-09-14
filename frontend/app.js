const API_BASE_URL = 'http://127.0.0.1:8000'
let activeTab = 'tab1'

// Элементы DOM
const tabButtons = document.querySelectorAll('.tab-btn')
const tabTitle = document.getElementById('current-tab-title')
const form = document.getElementById('data-form')
const nameInput = document.getElementById('name')
const bioInput = document.getElementById('bio')
const photoInput = document.getElementById('photo')

const previewName = document.getElementById('preview-name')
const previewBio = document.getElementById('preview-bio')
const previewPhoto = document.getElementById('preview-photo')

// Переключение вкладок
tabButtons.forEach(btn => {
	btn.addEventListener('click', e => {
		tabButtons.forEach(b => b.classList.remove('active'))
		e.target.classList.add('active')

		activeTab = e.target.dataset.tab
		tabTitle.textContent = `Данные ${e.target.textContent}`

		// Очищаем инпут файла
		photoInput.value = ''

		// Загружаем данные активной вкладки
		loadTabData(activeTab)
	})
})

// Загрузка данных с сервера
async function loadTabData(tabId) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/tabs/${tabId}`)
		if (!response.ok) throw new Error('Ошибка загрузки')

		const data = await response.json()

		// Заполняем форму
		nameInput.value = data.name || ''
		bioInput.value = data.bio || ''

		// Обновляем превью
		previewName.textContent = data.name || 'Не указано'
		previewBio.textContent = data.bio || 'Не указано'

		if (data.photo) {
			previewPhoto.src = `${API_BASE_URL}${data.photo}`
			previewPhoto.style.display = 'block'
		} else {
			previewPhoto.style.display = 'none'
		}
	} catch (err) {
		console.error('Ошибка:', err)
	}
}

// Сохранение данных на сервер
form.addEventListener('submit', async e => {
	e.preventDefault()

	const formData = new FormData()
	formData.append('name', nameInput.value)
	formData.append('bio', bioInput.value)

	if (photoInput.files[0]) {
		formData.append('photo', photoInput.files[0])
	}

	try {
		const response = await fetch(`${API_BASE_URL}/api/tabs/${activeTab}`, {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) throw new Error('Ошибка сохранения')

		const result = await response.json()
		alert('Данные сохранены!')

		// Обновляем отображение
		loadTabData(activeTab)
	} catch (err) {
		console.error('Ошибка:', err)
		alert('Произошла ошибка при сохранении.')
	}
})

// Первоначальная загрузка
loadTabData(activeTab)
