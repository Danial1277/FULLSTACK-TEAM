document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Task 1. Работа с DOM
    // ==========================================

    const helloContainer = document.getElementById('hello-container');
    const btnCreate = document.getElementById('btn-create');
    const btnChange = document.getElementById('btn-change');
    const btnDelete = document.getElementById('btn-delete');
    const toggleParagraph = document.getElementById('toggle-paragraph');

    function createHelloElement() {
        if (!helloContainer) return;
        if (document.getElementById('my-element')) return;

        const newElem = document.createElement('div');
        newElem.id = 'my-element';
        newElem.textContent = 'Исходный текст элемента';
        newElem.style.fontSize = '18px';
        newElem.style.fontWeight = 'bold';
        helloContainer.appendChild(newElem);
    }

    if (btnChange) {
        btnChange.addEventListener('click', () => {
            const elem = document.getElementById('my-element');
            if (elem) elem.textContent = 'Привет, мир!';
            else alert('Сначала создайте элемент!');
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            const elem = document.getElementById('my-element');
            if (elem) elem.remove();
        });
    }

    if (btnCreate) btnCreate.addEventListener('click', createHelloElement);
    createHelloElement();

    let isParagraphChanged = false;
    if (toggleParagraph) {
        toggleParagraph.addEventListener('click', () => {
            isParagraphChanged = !isParagraphChanged;
            if (isParagraphChanged) {
                toggleParagraph.style.color = '#7c8cff';
                toggleParagraph.style.fontSize = '22px';
                toggleParagraph.style.fontWeight = 'bold';
            } else {
                toggleParagraph.style.color = '';
                toggleParagraph.style.fontSize = '';
                toggleParagraph.style.fontWeight = '';
            }
        });
    }

    const task1Card = document.querySelector('#tab-task1 .card');
    if (task1Card) {
        const btnAppendBody = document.createElement('button');
        btnAppendBody.className = 'tab-btn';
        btnAppendBody.style.marginTop = '15px';
        btnAppendBody.textContent = 'Добавить элемент в конец <body>';

        btnAppendBody.addEventListener('click', () => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('new-div');
            newDiv.textContent = 'Я новый элемент (добавлен в конец body)';
            document.body.appendChild(newDiv);
        });

        task1Card.appendChild(btnAppendBody);
    }


    // ==========================================
    // Task 2. Управление классами
    // ==========================================

    function manageClasses(element) {
        if (!element) return;
        element.classList.toggle('active');
        const isActive = element.classList.contains('active');
        const paragraph = element.querySelector('p') || element;

        if (isActive) {
            paragraph.textContent = 'Класс ACTIVE АКТИВИРОВАН! (Цвет изменен)';
            element.style.backgroundColor = '#1d3557';
            element.style.borderColor = '#45e0c4';
            element.style.color = '#ffffff';
        } else {
            paragraph.textContent = 'Класс active ВЫКЛЮЧЕН. Нажми, чтобы включить';
            element.style.backgroundColor = '';
            element.style.borderColor = '';
            element.style.color = '';
        }

        const currentClasses = element.className || 'Классов нет';
        let infoP = element.nextElementSibling;
        if (!infoP || !infoP.classList.contains('class-info-p')) {
            infoP = document.createElement('p');
            infoP.classList.add('class-info-p');
            infoP.style.marginTop = '10px';
            infoP.style.color = '#888';
            element.after(infoP);
        }
        infoP.textContent = `Список классов: ${currentClasses}`;
    }

    const demoCard = document.getElementById('demo-card');
    if (demoCard) {
        demoCard.onclick = (e) => {
            e.stopPropagation();
            manageClasses(demoCard);
        };
    }


    // ==========================================
    // Task 3. Таблица, палитра, снятие цвета и 2 счетчика
    // ==========================================

    const btnGenerateTable = document.getElementById('btn-generate-table');
    const tableContainer = document.getElementById('table-container');
    const paintColorInput = document.getElementById('paint-color');
    const colorCountResult = document.getElementById('color-count-result');
    const totalPaintedCount = document.getElementById('total-painted-count');
    const colorPalette = document.getElementById('color-palette');

    // Текущий выбранный цвет в формате HEX (например, #38bdf8)
    let currentColor = paintColorInput ? paintColorInput.value.toLowerCase() : '#38bdf8';

    // Функция пересчета ВСЕХ счетчиков
    function updateCounters() {
        const cells = document.querySelectorAll('.custom-table td');
        let selectedColorCount = 0;
        let totalPainted = 0;

        cells.forEach(cell => {
            const cellColor = cell.getAttribute('data-color');
            if (cellColor) {
                totalPainted++; // Считаем любую закрашенную ячейку
                if (cellColor.toLowerCase() === currentColor.toLowerCase()) {
                    selectedColorCount++; // Считаем только ячейки с текущим выбранным цветом
                }
            }
        });

        if (colorCountResult) {
            colorCountResult.textContent = `Ячеек выбранного цвета (${currentColor.toUpperCase()}): ${selectedColorCount}`;
        }
        if (totalPaintedCount) {
            totalPaintedCount.textContent = `Всего закрашено ячеек: ${totalPainted}`;
        }
    }

    // 1. Выбор цвета из круглых кнопок палитры
    if (colorPalette) {
        colorPalette.addEventListener('click', (e) => {
            const swatch = e.target.closest('.color-swatch');
            if (!swatch) return;

            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            currentColor = swatch.dataset.color.toLowerCase();
            if (paintColorInput) paintColorInput.value = currentColor;

            updateCounters();
        });
    }

    // 2. Выбор цвета через инпут пипетки
    if (paintColorInput) {
        paintColorInput.addEventListener('input', (e) => {
            currentColor = e.target.value.toLowerCase();
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            updateCounters();
        });
    }

    // 3. Генерация таблицы
    function generateTable(rows, cols) {
        if (!tableContainer) return;
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'custom-table';

        let cellIndex = 1;
        for (let r = 0; r < rows; r++) {
            const tr = document.createElement('tr');
            for (let c = 0; c < cols; c++) {
                const td = document.createElement('td');
                td.textContent = `Ячейка ${cellIndex++}`;

                // Логика клика по ячейке (Покраска / Снятие цвета)
                td.addEventListener('click', () => {
                    const previousColor = td.getAttribute('data-color');

                    // Если ячейка уже закрашена ЭТИМ ЖЕ цветом -> СНИМАЕМ ЦВЕТ
                    if (previousColor && previousColor.toLowerCase() === currentColor.toLowerCase()) {
                        td.style.backgroundColor = '';
                        td.removeAttribute('data-color');
                    } else {
                        // Иначе закрашиваем в выбранный цвет
                        td.style.backgroundColor = currentColor;
                        td.setAttribute('data-color', currentColor);
                    }

                    // Сразу пересчитываем счетчики
                    updateCounters();
                });

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        tableContainer.appendChild(table);
        updateCounters();
    }

    if (btnGenerateTable) {
        btnGenerateTable.addEventListener('click', () => {
            const rows = parseInt(document.getElementById('input-rows').value) || 1;
            const cols = parseInt(document.getElementById('input-cols').value) || 1;
            generateTable(rows, cols);
        });

        // Запуск по умолчанию
        generateTable(4, 4);
    }


    // ==========================================
    // Task 4. Переключатель темы
    // ==========================================

    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');

            if (isLight) {
                themeToggleBtn.textContent = '☀️ Включить темную тему';
            } else {
                themeToggleBtn.textContent = '🌙 Включить светлую тему';
            }
        });
    }
});