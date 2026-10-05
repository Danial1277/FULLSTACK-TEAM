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
    // Task 3. Таблица, палитра и счетчики
    // ==========================================

    const btnGenerateTable = document.getElementById('btn-generate-table');
    const tableContainer = document.getElementById('table-container');
    const paintColorInput = document.getElementById('paint-color');
    const colorCountResult = document.getElementById('color-count-result');
    const totalPaintedCount = document.getElementById('total-painted-count');
    const colorPalette = document.getElementById('color-palette');

    let currentColor = paintColorInput ? paintColorInput.value.toLowerCase() : '#38bdf8';

    function updateCounters() {
        const cells = document.querySelectorAll('.custom-table td');
        let selectedColorCount = 0;
        let totalPainted = 0;

        cells.forEach(cell => {
            const cellColor = cell.getAttribute('data-color');
            if (cellColor) {
                totalPainted++;
                if (cellColor.toLowerCase() === currentColor.toLowerCase()) {
                    selectedColorCount++;
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

    if (paintColorInput) {
        paintColorInput.addEventListener('input', (e) => {
            currentColor = e.target.value.toLowerCase();
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            updateCounters();
        });
    }

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

                td.addEventListener('click', () => {
                    const previousColor = td.getAttribute('data-color');

                    if (previousColor && previousColor.toLowerCase() === currentColor.toLowerCase()) {
                        td.style.backgroundColor = '';
                        td.removeAttribute('data-color');
                    } else {
                        td.style.backgroundColor = currentColor;
                        td.setAttribute('data-color', currentColor);
                    }

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


    // ==========================================
    // Task 5. DummyJSON CRUD с постоянным сохранением в localStorage
    // ==========================================

    const dummyContainer = document.getElementById('dummy-products-container');
    const dummyForm = document.getElementById('dummy-create-form');
    const btnRefreshDummy = document.getElementById('btn-refresh-dummy');

    function showNotification(message, color = '#4ade80') {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.padding = '12px 20px';
            toast.style.borderRadius = '6px';
            toast.style.color = '#0f172a';
            toast.style.fontWeight = 'bold';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            toast.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(toast);
        }

        toast.style.backgroundColor = color;
        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }

    // Методы работы с локальным хранилищем
    function getLocalProducts() {
        return JSON.parse(localStorage.getItem('my_created_products') || '[]');
    }

    function saveLocalProducts(products) {
        localStorage.setItem('my_created_products', JSON.stringify(products));
    }

    function getUpdatedProducts() {
        return JSON.parse(localStorage.getItem('my_updated_products') || '{}');
    }

    function saveUpdatedProducts(updatedObj) {
        localStorage.setItem('my_updated_products', JSON.stringify(updatedObj));
    }

    function getDeletedIds() {
        return JSON.parse(localStorage.getItem('my_deleted_ids') || '[]');
    }

    function addDeletedId(id) {
        const ids = getDeletedIds();
        ids.push(String(id));
        localStorage.setItem('my_deleted_ids', JSON.stringify(ids));
    }

    // Генерация карточки товара
    function renderProductCard(p) {
        const isCustom = p.isCustom;
        return `
            <div class="card dummy-card" id="dummy-item-${p.id}" data-id="${p.id}" data-is-custom="${isCustom ? 'true' : 'false'}" style="${isCustom ? 'border-color: #4ade80;' : ''}">
                <p class="label" style="${isCustom ? 'color: #4ade80;' : ''}">ID: ${p.id} ${isCustom ? '(Созданный)' : '| ' + (p.category || 'товар')}</p>
                <h3 style="margin-bottom: 8px;" class="card-title">${p.title}</h3>
                <p style="font-size: 18px; font-weight: bold; color: var(--be); margin-bottom: 12px;" class="card-price">$${p.price}</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;" class="card-actions">
                    <button type="button" class="tab-btn btn-edit-dummy" data-id="${p.id}">✏️ Изменить</button>
                    <button type="button" class="tab-btn btn-delete-dummy" data-id="${p.id}" style="border-color: #f87171; color: #f87171;">🗑️ Удалить</button>
                </div>
            </div>
        `;
    }

    // Полный рендер всех товаров (Созданные вручную + Загруженные из API)
    async function loadDummyProducts() {
        if (!dummyContainer) return;
        dummyContainer.innerHTML = '<p style="color: var(--text-muted)">Загрузка товаров с DummyJSON...</p>';

        const apiProducts = await getDummyProducts(6, 0) || [];
        const createdProducts = getLocalProducts();
        const updatedMap = getUpdatedProducts();
        const deletedIds = getDeletedIds();

        // 1. Фильтруем и обновляем сетевые товары из DummyJSON
        const filteredApiProducts = apiProducts
            .filter(p => !deletedIds.includes(String(p.id)))
            .map(p => updatedMap[p.id] ? { ...p, ...updatedMap[p.id] } : p);

        // 2. Объединяем: Созданные пользователем ставим в самое начало
        const allProducts = [...createdProducts, ...filteredApiProducts];

        if (allProducts.length === 0) {
            dummyContainer.innerHTML = '<p style="color: var(--text-muted)">Список товаров пуст</p>';
            return;
        }

        dummyContainer.innerHTML = allProducts.map(p => renderProductCard(p)).join('');
    }

    if (btnRefreshDummy) {
        btnRefreshDummy.addEventListener('click', loadDummyProducts);
    }

    // Создание товара (POST + Гарантированное сохранение в localStorage)
    if (dummyForm) {
        dummyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('dummy-title-input');
            const priceInput = document.getElementById('dummy-price-input');

            const title = titleInput.value.trim();
            const price = priceInput.value;

            if (!title || !price) return;

            // Вызываем POST к DummyJSON
            const apiRes = await createDummyProduct(title, price);

            const newProduct = {
                id: apiRes && apiRes.id ? apiRes.id : Date.now(),
                title: title,
                price: Number(price),
                category: 'пользовательский',
                isCustom: true
            };

            // Записываем в localStorage
            const createdProducts = getLocalProducts();
            createdProducts.unshift(newProduct);
            saveLocalProducts(createdProducts);

            showNotification(`Товар сохранен локально (POST): "${title}"`, '#4ade80');

            titleInput.value = '';
            priceInput.value = '';

            // Обновляем список
            loadDummyProducts();
        });
    }

    // Обработчик редактирования и удаления карточек
    if (dummyContainer) {
        dummyContainer.addEventListener('click', async (e) => {
            const btnEdit = e.target.closest('.btn-edit-dummy');
            const btnDelete = e.target.closest('.btn-delete-dummy');
            const btnSave = e.target.closest('.btn-save-dummy');
            const btnCancel = e.target.closest('.btn-cancel-dummy');

            // 1. Открытие инлайн формы
            if (btnEdit) {
                const id = btnEdit.dataset.id;
                const card = document.getElementById(`dummy-item-${id}`);
                const currentTitle = card.querySelector('.card-title').textContent;
                const currentPriceText = card.querySelector('.card-price').textContent.replace('$', '');

                card.dataset.originalHtml = card.innerHTML;

                card.innerHTML = `
                    <p class="label" style="color: var(--be);">Редактирование ID: ${id}</p>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
                        <input type="text" class="edit-title-input" value="${currentTitle}" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text);">
                        <input type="number" class="edit-price-input" value="${currentPriceText}" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text);">
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="tab-btn btn-save-dummy" data-id="${id}" style="background: var(--be); color: #0f172a;">💾 Сохранить</button>
                        <button type="button" class="tab-btn btn-cancel-dummy" data-id="${id}">❌ Отмена</button>
                    </div>
                `;
            }

            // 2. Нажатие кнопки Сохранить (PUT + Перезапись в localStorage)
            if (btnSave) {
                e.preventDefault();

                const id = btnSave.dataset.id;
                const card = document.getElementById(`dummy-item-${id}`);
                const isCustom = card.dataset.isCustom === 'true';

                const newTitle = card.querySelector('.edit-title-input').value.trim();
                const newPrice = card.querySelector('.edit-price-input').value;

                if (!newTitle || !newPrice) return;

                // Запрос PUT к сетевому API
                updateDummyProduct(id, newTitle, newPrice);

                if (isCustom) {
                    // Обновляем в списке созданных вручную
                    const createdProducts = getLocalProducts();
                    const item = createdProducts.find(p => String(p.id) === String(id));
                    if (item) {
                        item.title = newTitle;
                        item.price = Number(newPrice);
                        saveLocalProducts(createdProducts);
                    }
                } else {
                    // Сохраняем патч для стандартов из DummyJSON
                    const updatedMap = getUpdatedProducts();
                    updatedMap[id] = { title: newTitle, price: Number(newPrice) };
                    saveUpdatedProducts(updatedMap);
                }

                showNotification(`Изменения для ID ${id} успешно сохранены!`, '#38bdf8');
                loadDummyProducts();
            }

            // 3. Отмена редактирования
            if (btnCancel) {
                e.preventDefault();
                const id = btnCancel.dataset.id;
                const card = document.getElementById(`dummy-item-${id}`);
                if (card && card.dataset.originalHtml) {
                    card.innerHTML = card.dataset.originalHtml;
                }
            }

            // 4. Удаление (DELETE + Фиксация в localStorage)
            if (btnDelete) {
                const id = btnDelete.dataset.id;
                const card = document.getElementById(`dummy-item-${id}`);
                const isCustom = card.dataset.isCustom === 'true';

                deleteDummyProduct(id);

                if (isCustom) {
                    let createdProducts = getLocalProducts();
                    createdProducts = createdProducts.filter(p => String(p.id) !== String(id));
                    saveLocalProducts(createdProducts);
                } else {
                    addDeletedId(id);
                }

                showNotification(`Товар ID ${id} удален!`, '#f87171');
                if (card) card.remove();
            }
        });
    }

    loadDummyProducts();
});