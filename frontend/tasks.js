'use strict'

/* ===================== Task 1 ===================== */

// 1. Найти элемент по ID и изменить его текст
const greeting = document.getElementById('greeting')
greeting.textContent = 'Привет, мир!'

// 2. Создать <div class="new-div"> и добавить в конец <body>
const newDiv = document.createElement('div')
newDiv.className = 'new-div'
newDiv.textContent = 'Я новый элемент'
document.body.appendChild(newDiv)

// 3. Удалить элемент с классом old-element
const oldElement = document.querySelector('.old-element')
if (oldElement) oldElement.remove()

// 4. Создать <p>; при клике менять цвет текста и размер шрифта
const editable = document.createElement('p')
editable.className = 'click-me'
editable.textContent = 'Это изменяемый абзац.'
document.querySelector('.tasks').appendChild(editable)

const COLORS = ['crimson', 'royalblue', 'seagreen', 'darkorange']
const SIZES = [16, 20, 26, 32] // px
let clicks = 0

editable.addEventListener('click', () => {
	editable.style.color = COLORS[clicks % COLORS.length]
	editable.style.fontSize = `${SIZES[clicks % SIZES.length]}px`
	clicks++
})

/* ===================== Task 2 ===================== */

const box = document.getElementById('box')
const classInfo = document.getElementById('classInfo')

// Вывести список всех классов в консоль и в отдельный <p>
function showClasses() {
	const classes = Array.from(box.classList)
	console.log('Классы элемента:', classes)
	classInfo.textContent = `Классы: ${classes.join(', ') || '(нет)'}`
}

// Добавить класс active, если его нет, и удалить, если есть
document.getElementById('toggleBtn').addEventListener('click', () => {
	box.classList.toggle('active')
	showClasses()
})

showClasses()
