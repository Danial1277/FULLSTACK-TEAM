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
    // Task 5. DummyJSON (С Рейтингом, Описанием и Модальным окном)
    // ==========================================

    const dummyContainer = document.getElementById('dummy-products-container');
    const dummyForm = document.getElementById('dummy-create-form');
    const btnRefreshDummy = document.getElementById('btn-refresh-dummy');

    let currentLoadedProductsMap = {};

    function renderStars(rating = 0) {
        const numericRating = Number(rating) || 0;
        const fullStars = Math.floor(numericRating);
        const hasHalfStar = numericRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHtml = '★'.repeat(fullStars);
        if (hasHalfStar) starsHtml += '½';
        starsHtml += '☆'.repeat(Math.max(0, emptyStars));

        return `<span style="color: #facc15; font-size: 16px;">${starsHtml}</span> <span style="font-size: 13px; color: var(--text-muted, #888);">(${numericRating.toFixed(1)})</span>`;
    }

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

    function openProductModal(product) {
        let modal = document.getElementById('product-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'product-detail-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '10000';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div style="background: var(--card-bg, #1e293b); padding: 24px; border-radius: 12px; max-width: 450px; width: 90%; border: 1px solid var(--border, #334155); box-shadow: 0 10px 25px rgba(0,0,0,0.5); color: var(--text, #f8fafc); position: relative;">
                <button type="button" id="btn-close-modal" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 20px; color: #94a3b8; cursor: pointer;">✕</button>
                <p class="label" style="color: #38bdf8; margin-bottom: 6px;">ID: ${product.id} | ${product.category || 'товар'}</p>
                <h2 style="margin-bottom: 10px; font-size: 20px;">${product.title}</h2>
                <div style="margin-bottom: 12px;">
                    <strong>Рейтинг:</strong> ${renderStars(product.rating)}
                </div>
                <p style="font-size: 22px; font-weight: bold; color: #4ade80; margin-bottom: 14px;">$${product.price}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; margin-bottom: 16px;">
                    <strong style="display: block; margin-bottom: 4px; color: #94a3b8;">Описание:</strong>
                    <p style="margin: 0; line-height: 1.5; font-size: 14px;">${product.description || 'Описание отсутствует'}</p>
                </div>
                <button type="button" class="tab-btn" id="btn-modal-ok" style="width: 100%;">Закрыть</button>
            </div>
        `;

        modal.style.display = 'flex';

        const closeModal = () => { modal.style.display = 'none'; };
        document.getElementById('btn-close-modal').onclick = closeModal;
        document.getElementById('btn-modal-ok').onclick = closeModal;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    function getCreatedProducts() {
        return JSON.parse(localStorage.getItem('my_created_products') || '[]');
    }

    function saveCreatedProducts(products) {
        localStorage.setItem('my_created_products', JSON.stringify(products));
    }

    function getUpdatedProducts() {
        return JSON.parse(localStorage.getItem('my_updated_products') || '{}');
    }

    function saveUpdatedProducts(map) {
        localStorage.setItem('my_updated_products', JSON.stringify(map));
    }

    function getDeletedIds() {
        return JSON.parse(localStorage.getItem('my_deleted_ids') || '[]');
    }

    function addDeletedId(id) {
        const ids = getDeletedIds();
        if (!ids.includes(String(id))) {
            ids.push(String(id));
            localStorage.setItem('my_deleted_ids', JSON.stringify(ids));
        }
    }

    function renderProductCard(p) {
        const isCustom = p.isCustom;
        const rating = p.rating || 4.5;
        const description = p.description || 'Нажмите "Подробнее", чтобы просмотреть описание товара.';

        return `
            <div class="card dummy-card" id="dummy-item-${p.id}" data-id="${p.id}" data-is-custom="${isCustom ? 'true' : 'false'}" style="cursor: pointer; ${isCustom ? 'border-color: #4ade80;' : ''}">
                <p class="label" style="${isCustom ? 'color: #4ade80;' : ''}">ID: ${p.id} ${isCustom ? '(Созданный)' : '| ' + (p.category || 'товар')}</p>
                <h3 style="margin-bottom: 6px;" class="card-title">${p.title}</h3>
                
                <div style="margin-bottom: 8px;" class="card-rating">
                    ${renderStars(rating)}
                </div>

                <p style="font-size: 18px; font-weight: bold; color: var(--be, #38bdf8); margin-bottom: 8px;" class="card-price">$${p.price}</p>
                
                <p style="font-size: 13px; color: var(--text-muted, #888); margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" class="card-description">
                    ${description}
                </p>

                <div style="display: flex; gap: 8px; flex-wrap: wrap;" class="card-actions">
                    <button type="button" class="tab-btn btn-view-dummy" data-id="${p.id}" style="background: rgba(56, 189, 248, 0.1); border-color: #38bdf8; color: #38bdf8;">👁️</button>
                    <button type="button" class="tab-btn btn-edit-dummy" data-id="${p.id}">✏️</button>
                    <button type="button" class="tab-btn btn-delete-dummy" data-id="${p.id}" style="border-color: #f87171; color: #f87171;">🗑️</button>
                </div>
            </div>
        `;
    }

    async function loadDummyProducts() {
        if (!dummyContainer) return;
        dummyContainer.innerHTML = '<p style="color: var(--text-muted, #888)">Загрузка товаров с DummyJSON...</p>';

        let apiProducts = [];
        if (typeof getDummyProducts === 'function') {
            apiProducts = await getDummyProducts(6, 0) || [];
        }

        const createdProducts = getCreatedProducts();
        const updatedMap = getUpdatedProducts();
        const deletedIds = getDeletedIds();

        const filteredApiProducts = apiProducts
            .filter(p => !deletedIds.includes(String(p.id)))
            .map(p => updatedMap[p.id] ? { ...p, ...updatedMap[p.id] } : p);

        const allProducts = [...createdProducts, ...filteredApiProducts];

        currentLoadedProductsMap = {};
        allProducts.forEach(p => {
            currentLoadedProductsMap[p.id] = p;
        });

        if (allProducts.length === 0) {
            dummyContainer.innerHTML = '<p style="color: var(--text-muted, #888)">Список товаров пуст</p>';
            return;
        }

        dummyContainer.innerHTML = allProducts.map(p => renderProductCard(p)).join('');
    }

    if (btnRefreshDummy) {
        btnRefreshDummy.addEventListener('click', () => {
            showNotification('Данные обновлены с сервера', '#38bdf8');
            loadDummyProducts();
        });
    }

    if (dummyForm) {
        dummyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('dummy-title-input');
            const priceInput = document.getElementById('dummy-price-input');
            const descInput = document.getElementById('dummy-desc-input');

            const title = titleInput ? titleInput.value.trim() : '';
            const price = priceInput ? priceInput.value : '';
            const description = descInput ? descInput.value.trim() : 'Пользовательский товар';

            if (!title || !price) return;

            if (typeof createDummyProduct === 'function') {
                await createDummyProduct(title, price, description);
            }

            const createdProducts = getCreatedProducts();
            const uniqueId = createdProducts.length > 0 
                ? Math.max(...createdProducts.map(p => p.id)) + 1 
                : 101;

            const newProduct = {
                id: uniqueId,
                title: title,
                price: Number(price),
                description: description,
                rating: 5.0,
                category: 'пользовательский',
                isCustom: true
            };

            createdProducts.unshift(newProduct);
            saveCreatedProducts(createdProducts);

            showNotification(`Товар создан! [ID: ${uniqueId}]`, '#4ade80');

            if (titleInput) titleInput.value = '';
            if (priceInput) priceInput.value = '';
            if (descInput) descInput.value = '';

            loadDummyProducts();
        });
    }

    if (dummyContainer) {
        dummyContainer.addEventListener('click', async (e) => {
            const btnView = e.target.closest('.btn-view-dummy');
            const btnEdit = e.target.closest('.btn-edit-dummy');
            const btnDelete = e.target.closest('.btn-delete-dummy');
            const btnSave = e.target.closest('.btn-save-dummy');
            const btnCancel = e.target.closest('.btn-cancel-dummy');
            const card = e.target.closest('.dummy-card');

            if (btnView || (card && !btnEdit && !btnDelete && !btnSave && !btnCancel)) {
                const id = btnView ? btnView.dataset.id : card.dataset.id;
                const product = currentLoadedProductsMap[id];
                if (product) {
                    openProductModal(product);
                }
                return;
            }

            if (btnEdit) {
                e.stopPropagation();
                const id = btnEdit.dataset.id;
                const product = currentLoadedProductsMap[id] || {};
                const targetCard = document.getElementById(`dummy-item-${id}`);

                targetCard.dataset.originalHtml = targetCard.innerHTML;

                targetCard.innerHTML = `
                    <p class="label" style="color: var(--be, #38bdf8);">Редактирование ID: ${id}</p>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
                        <input type="text" class="edit-title-input" value="${product.title || ''}" placeholder="Название" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border, #334155); background: var(--input-bg, #0f172a); color: var(--text, #fff);">
                        <input type="number" class="edit-price-input" value="${product.price || ''}" placeholder="Цена" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border, #334155); background: var(--input-bg, #0f172a); color: var(--text, #fff);">
                        <textarea class="edit-desc-input" placeholder="Описание товара" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border, #334155); background: var(--input-bg, #0f172a); color: var(--text, #fff); resize: vertical; min-height: 60px;">${product.description || ''}</textarea>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="tab-btn btn-save-dummy" data-id="${id}" style="background: var(--be, #38bdf8); color: #0f172a;">💾</button>
                        <button type="button" class="tab-btn btn-cancel-dummy" data-id="${id}">❌</button>
                    </div>
                `;
            }

            if (btnSave) {
                e.stopPropagation();
                e.preventDefault();

                const id = btnSave.dataset.id;
                const targetCard = document.getElementById(`dummy-item-${id}`);
                const isCustom = targetCard.dataset.isCustom === 'true';

                const newTitle = targetCard.querySelector('.edit-title-input').value.trim();
                const newPrice = targetCard.querySelector('.edit-price-input').value;
                const newDesc = targetCard.querySelector('.edit-desc-input').value.trim();

                if (!newTitle || !newPrice) return;

                if (typeof updateDummyProduct === 'function') {
                    await updateDummyProduct(id, newTitle, newPrice, newDesc);
                }

                if (isCustom) {
                    const createdProducts = getCreatedProducts();
                    const item = createdProducts.find(p => String(p.id) === String(id));
                    if (item) {
                        item.title = newTitle;
                        item.price = Number(newPrice);
                        item.description = newDesc;
                        saveCreatedProducts(createdProducts);
                    }
                } else {
                    const updatedMap = getUpdatedProducts();
                    updatedMap[id] = { title: newTitle, price: Number(newPrice), description: newDesc };
                    saveUpdatedProducts(updatedMap);
                }

                showNotification(`Товар ID ${id} обновлен!`, '#38bdf8');
                loadDummyProducts();
            }

            if (btnCancel) {
                e.stopPropagation();
                e.preventDefault();
                const id = btnCancel.dataset.id;
                const targetCard = document.getElementById(`dummy-item-${id}`);
                if (targetCard && targetCard.dataset.originalHtml) {
                    targetCard.innerHTML = targetCard.dataset.originalHtml;
                }
            }

            if (btnDelete) {
                e.stopPropagation();
                const id = btnDelete.dataset.id;
                const targetCard = document.getElementById(`dummy-item-${id}`);
                const isCustom = targetCard.dataset.isCustom === 'true';

                if (typeof deleteDummyProduct === 'function') {
                    await deleteDummyProduct(id);
                }

                if (isCustom) {
                    let createdProducts = getCreatedProducts();
                    createdProducts = createdProducts.filter(p => String(p.id) !== String(id));
                    saveCreatedProducts(createdProducts);
                } else {
                    addDeletedId(id);
                }

                showNotification(`Товар ID ${id} удален!`, '#f87171');
                if (targetCard) targetCard.remove();
            }
        });
    }

    loadDummyProducts();
});