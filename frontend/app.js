// Функция переключения вкладок
function switchTab(tabId) {
	// Убираем класс active у всех кнопок и контента
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.classList.remove('active')
	})
	document.querySelectorAll('.tab-content').forEach(content => {
		content.classList.remove('active')
	})

	// Находим нужную кнопку и вкладку
	const targetBtn = document.querySelector(`[data-tab="${tabId}"]`)
	const targetContent = document.getElementById(tabId)

	if (targetBtn && targetContent) {
		targetBtn.classList.add('active')
		targetContent.classList.add('active')
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
}

// Слушатели событий для кликов по кнопкам навигации
document.querySelectorAll('.tab-btn').forEach(button => {
	button.addEventListener('click', () => {
		const tabId = button.getAttribute('data-tab')
		switchTab(tabId)
	})
})
