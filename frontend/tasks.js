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
	// Task 5. DummyJSON (Товары, Рейтинги, Редактирование, Модальное окно)
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
		const rating = (p.rating !== undefined && p.rating !== null)
			? p.rating
			: Number((Math.random() * (5.0 - 3.0) + 3.0).toFixed(1));

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
                    <button type="button" class="tab-btn btn-view-dummy" data-id="${p.id}" style="background: rgba(56, 189, 248, 0.1); border-color: #38bdf8; color: #38bdf8;">👁️ Подробнее</button>
                    <button type="button" class="tab-btn btn-edit-dummy" data-id="${p.id}">✏️ Изменить</button>
                    <button type="button" class="tab-btn btn-delete-dummy" data-id="${p.id}" style="border-color: #f87171; color: #f87171;">🗑️ Удалить</button>
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

			let apiRes = null;
			if (typeof createDummyProduct === 'function') {
				apiRes = await createDummyProduct(title, price, description);
			}

			const randomRating = (apiRes && apiRes.rating)
				? apiRes.rating
				: Number((Math.random() * (5.0 - 3.0) + 3.0).toFixed(1));

			const createdProducts = getCreatedProducts();
			const uniqueId = createdProducts.length > 0
				? Math.max(...createdProducts.map(p => p.id)) + 1
				: 101;

			const newProduct = {
				id: uniqueId,
				title: title,
				price: Number(price),
				description: description,
				rating: randomRating,
				category: 'пользовательский',
				isCustom: true
			};

			createdProducts.unshift(newProduct);
			saveCreatedProducts(createdProducts);

			showNotification(`Товар создан! Рейтинг: ${randomRating} ★`, '#4ade80');

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

			const isEditingMode = card && card.querySelector('.edit-title-input');

			if (!isEditingMode && (btnView || (card && !btnEdit && !btnDelete && !btnSave && !btnCancel))) {
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
                        <input type="number" step="0.1" min="1" max="5" class="edit-rating-input" value="${product.rating || 4.5}" placeholder="Рейтинг (1.0 - 5.0)" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border, #334155); background: var(--input-bg, #0f172a); color: var(--text, #fff);">
                        <textarea class="edit-desc-input" placeholder="Описание товара" style="padding: 6px; border-radius: 4px; border: 1px solid var(--border, #334155); background: var(--input-bg, #0f172a); color: var(--text, #fff); resize: vertical; min-height: 60px;">${product.description || ''}</textarea>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="tab-btn btn-save-dummy" data-id="${id}" style="background: var(--be, #38bdf8); color: #0f172a;">💾 Сохранить</button>
                        <button type="button" class="tab-btn btn-cancel-dummy" data-id="${id}">❌ Отмена</button>
                    </div>
                `;
				return;
			}

			if (btnSave) {
				e.stopPropagation();
				e.preventDefault();

				const id = btnSave.dataset.id;
				const targetCard = document.getElementById(`dummy-item-${id}`);
				const isCustom = targetCard.dataset.isCustom === 'true';

				const newTitle = targetCard.querySelector('.edit-title-input').value.trim();
				const newPrice = targetCard.querySelector('.edit-price-input').value;
				const newRating = parseFloat(targetCard.querySelector('.edit-rating-input').value) || 4.5;
				const newDesc = targetCard.querySelector('.edit-desc-input').value.trim();

				if (!newTitle || !newPrice) return;

				if (typeof updateDummyProduct === 'function') {
					await updateDummyProduct(id, newTitle, newPrice, newDesc, newRating);
				}

				if (isCustom) {
					const createdProducts = getCreatedProducts();
					const item = createdProducts.find(p => String(p.id) === String(id));
					if (item) {
						item.title = newTitle;
						item.price = Number(newPrice);
						item.rating = newRating;
						item.description = newDesc;
						saveCreatedProducts(createdProducts);
					}
				} else {
					const updatedMap = getUpdatedProducts();
					updatedMap[id] = { title: newTitle, price: Number(newPrice), rating: newRating, description: newDesc };
					saveUpdatedProducts(updatedMap);
				}

				showNotification(`Товар ID ${id} обновлен!`, '#38bdf8');
				loadDummyProducts();
				return;
			}

			if (btnCancel) {
				e.stopPropagation();
				e.preventDefault();
				const id = btnCancel.dataset.id;
				const targetCard = document.getElementById(`dummy-item-${id}`);
				if (targetCard && targetCard.dataset.originalHtml) {
					targetCard.innerHTML = targetCard.dataset.originalHtml;
				}
				return;
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


	// ==========================================
	// Task 6. Премиальный Тудушник
	// ==========================================

	let allUsersCache = [];
	const assignTaskForm = document.getElementById('assign-task-form');
	const taskTextInput = document.getElementById('task-text-input');
	const taskUserSelect = document.getElementById('task-user-select');
	const assignedTasksContainer = document.getElementById('assigned-tasks-container');
	const tasksCountBadge = document.getElementById('tasks-count-badge');

	function getAssignedTasks() {
		return JSON.parse(localStorage.getItem('my_assigned_tasks') || '[]');
	}

	function saveAssignedTasks(tasks) {
		localStorage.setItem('my_assigned_tasks', JSON.stringify(tasks));
	}

	async function loadUsersForSelect() {
		if (typeof getDummyUsers === 'function') {
			allUsersCache = await getDummyUsers(200);
		}

		if (taskUserSelect && allUsersCache.length > 0) {
			taskUserSelect.innerHTML = '<option value="">Назначить исполнителя...</option>' +
				allUsersCache.map(u => `<option value="${u.id}">${u.firstName} ${u.lastName} (ID: ${u.id})</option>`).join('');
		}
	}

	function renderAssignedTasks() {
		if (!assignedTasksContainer) return;
		const tasks = getAssignedTasks();

		if (tasksCountBadge) {
			tasksCountBadge.textContent = `Всего задач: ${tasks.length}`;
		}

		if (tasks.length === 0) {
			assignedTasksContainer.innerHTML = '<p style="color: #64748b; text-align: center; padding: 20px 0;">Задач пока нет</p>';
			return;
		}

		assignedTasksContainer.innerHTML = tasks.map(t => `
            <div class="todo-item ${t.completed ? 'completed' : 'pending'}">
                <div style="display: flex; align-items: center; gap: 14px; flex: 1; padding-right: 15px;">
                    <input type="checkbox" class="todo-checkbox task-checkbox" data-id="${t.id}" ${t.completed ? 'checked' : ''}>
                    <span style="font-size: 15px; color: ${t.completed ? '#94a3b8' : '#f8fafc'}; text-decoration: ${t.completed ? 'line-through' : 'none'}; line-height: 1.4;">
                        ${t.text}
                    </span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <button type="button" class="tab-btn btn-edit-task" data-id="${t.id}" style="padding: 6px 12px; font-size: 13px;">✏️ Изменить</button>
                    <button type="button" class="tab-btn btn-delete-task" data-id="${t.id}" style="padding: 6px 12px; font-size: 13px; border-color: rgba(248, 113, 113, 0.4); color: #f87171;">🗑️ Удалить</button>
                    
                    <button type="button" class="btn-user-badge btn-view-user-modal" data-userid="${t.userId}">
                        👤 ${t.userName}
                    </button>
                </div>
            </div>
        `).join('');
	}

	if (assignedTasksContainer) {
		assignedTasksContainer.addEventListener('click', (e) => {
			const btnUserModal = e.target.closest('.btn-view-user-modal');
			const btnEdit = e.target.closest('.btn-edit-task');
			const btnDelete = e.target.closest('.btn-delete-task');
			const checkbox = e.target.closest('.task-checkbox');

			if (btnUserModal) {
				const userId = btnUserModal.dataset.userid;
				const user = allUsersCache.find(u => String(u.id) === String(userId));
				if (user) {
					openUserProfileModal(user);
				} else {
					alert(`Пользователь с ID ${userId} загружается с сервера...`);
				}
				return;
			}

			if (checkbox) {
				const taskId = checkbox.dataset.id;
				const tasks = getAssignedTasks();
				const task = tasks.find(t => String(t.id) === String(taskId));
				if (task) {
					task.completed = checkbox.checked;
					saveAssignedTasks(tasks);
					renderAssignedTasks();
				}
				return;
			}

			if (btnDelete) {
				const taskId = btnDelete.dataset.id;
				let tasks = getAssignedTasks();
				tasks = tasks.filter(t => String(t.id) !== String(taskId));
				saveAssignedTasks(tasks);
				renderAssignedTasks();
				return;
			}

			if (btnEdit) {
				const taskId = btnEdit.dataset.id;
				const tasks = getAssignedTasks();
				const task = tasks.find(t => String(t.id) === String(taskId));
				if (task) openEditTaskModal(task, tasks);
			}
		});
	}

	// Модальное окно профиля
	function openUserProfileModal(user) {
		let modal = document.getElementById('user-profile-modal');
		if (!modal) {
			modal = document.createElement('div');
			modal.id = 'user-profile-modal';
			modal.className = 'glass-modal';
			modal.style.position = 'fixed';
			modal.style.top = '0';
			modal.style.left = '0';
			modal.style.width = '100vw';
			modal.style.height = '100vh';
			modal.style.display = 'flex';
			modal.style.justifyContent = 'center';
			modal.style.alignItems = 'center';
			modal.style.zIndex = '10000';
			document.body.appendChild(modal);
		}

		const renderModalContent = () => {
			const allTasks = getAssignedTasks();
			const userTasks = allTasks.filter(t => String(t.userId) === String(user.id));

			modal.innerHTML = `
                <div class="glass-modal-content" style="padding: 28px; max-width: 450px; width: 90%; max-height: 90vh; overflow-y: auto; color: #f8fafc; position: relative;">
                    <button type="button" id="btn-close-user-modal" style="position: absolute; top: 16px; right: 16px; background: transparent; border: none; font-size: 20px; color: #94a3b8; cursor: pointer;">✕</button>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${user.image || 'https://via.placeholder.com/100'}" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #38bdf8; margin-bottom: 10px; box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">${user.firstName} ${user.lastName}</h2>
                        <span style="color: #38bdf8; font-size: 13px; font-weight: 600;">ID пользователя: ${user.id}</span>
                    </div>

                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px; border-radius: 12px; font-size: 13px; display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px;">
                        <div><strong style="color: #94a3b8;">Email:</strong> ${user.email}</div>
                        <div><strong style="color: #94a3b8;">Телефон:</strong> ${user.phone || 'Не указан'}</div>
                        <div><strong style="color: #94a3b8;">Возраст:</strong> ${user.age} лет</div>
                        <div><strong style="color: #94a3b8;">Город:</strong> ${user.address?.city || 'Не указан'}</div>
                        <div><strong style="color: #94a3b8;">Компания:</strong> ${user.company?.name || 'Не указана'}</div>
                        <div><strong style="color: #94a3b8;">Должность:</strong> ${user.company?.title || 'Сотрудник'}</div>
                    </div>

                    <h4 style="margin: 0 0 10px 0; font-size: 15px; color: #f8fafc;">Задачи исполнителя (${userTasks.length})</h4>
                    
                    <div id="modal-user-tasks-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 140px; overflow-y: auto; margin-bottom: 15px;">
                        ${userTasks.length === 0 ? '<p style="color: #64748b; font-size: 13px;">Задач для этого пользователя пока нет</p>' :
					userTasks.map(t => `
                                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                    <span style="${t.completed ? 'text-decoration: line-through; color: #64748b;' : ''}">${t.text}</span>
                                    <button type="button" class="modal-del-task" data-id="${t.id}" style="background: transparent; border: none; color: #f87171; cursor: pointer; font-size: 14px;">✕</button>
                                </div>
                            `).join('')}
                    </div>

                    <form id="modal-add-task-form" style="display: flex; gap: 8px; margin-bottom: 15px;">
                        <input type="text" id="modal-new-task-text" class="todo-input" placeholder="Новая задача..." style="flex: 1; padding: 8px 12px !important;" required>
                        <button type="submit" class="tab-btn active" style="font-size: 13px; padding: 8px 14px; background: #38bdf8; color: #0f172a; font-weight: bold; border-radius: 8px;">Добавить</button>
                    </form>

                    <button type="button" class="tab-btn" id="btn-user-modal-close" style="width: 100%; padding: 10px; border-radius: 10px;">Закрыть профиль</button>
                </div>
            `;

			document.getElementById('btn-close-user-modal').onclick = closeModal;
			document.getElementById('btn-user-modal-close').onclick = closeModal;

			document.getElementById('modal-add-task-form').onsubmit = (e) => {
				e.preventDefault();
				const taskInput = document.getElementById('modal-new-task-text');
				const text = taskInput.value.trim();
				if (!text) return;

				const tasks = getAssignedTasks();
				tasks.unshift({
					id: Date.now(),
					userId: user.id,
					userName: `${user.firstName} ${user.lastName}`,
					text: text,
					completed: false
				});
				saveAssignedTasks(tasks);
				renderAssignedTasks();
				renderModalContent();
			};

			document.getElementById('modal-user-tasks-list').onclick = (e) => {
				const btnDel = e.target.closest('.modal-del-task');
				if (btnDel) {
					const taskId = btnDel.dataset.id;
					let tasks = getAssignedTasks();
					tasks = tasks.filter(t => String(t.id) !== String(taskId));
					saveAssignedTasks(tasks);
					renderAssignedTasks();
					renderModalContent();
				}
			};
		};

		const closeModal = () => { modal.style.display = 'none'; };
		renderModalContent();
		modal.style.display = 'flex';
		modal.onclick = (e) => { if (e.target === modal) closeModal(); };
	}

	// Модальное окно редактирования задачи
	function openEditTaskModal(task, allTasks) {
		let modal = document.getElementById('edit-task-modal');
		if (!modal) {
			modal = document.createElement('div');
			modal.id = 'edit-task-modal';
			modal.className = 'glass-modal';
			modal.style.position = 'fixed';
			modal.style.top = '0';
			modal.style.left = '0';
			modal.style.width = '100vw';
			modal.style.height = '100vh';
			modal.style.display = 'flex';
			modal.style.justifyContent = 'center';
			modal.style.alignItems = 'center';
			modal.style.zIndex = '10000';
			document.body.appendChild(modal);
		}

		modal.innerHTML = `
            <div class="glass-modal-content" style="padding: 28px; max-width: 420px; width: 90%; color: #f8fafc; position: relative;">
                <h3 style="margin-top: 0; margin-bottom: 18px; font-size: 18px; font-weight: 700;">Редактирование задачи</h3>
                <form id="edit-task-form" style="display: flex; flex-direction: column; gap: 14px;">
                    <div>
                        <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 4px;">Текст задачи:</label>
                        <input type="text" id="modal-edit-text" class="todo-input" value="${task.text}" style="width: 100%;" required>
                    </div>

                    <div>
                        <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 4px;">ID пользователя (userId):</label>
                        <input type="number" id="modal-edit-userid" class="todo-input" value="${task.userId}" style="width: 100%;" required>
                    </div>

                    <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                        <input type="checkbox" class="todo-checkbox" id="modal-edit-completed" ${task.completed ? 'checked' : ''}> Выполнено
                    </label>

                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button type="button" class="tab-btn" id="btn-cancel-edit" style="flex: 1; padding: 10px; border-radius: 10px;">Отмена</button>
                        <button type="submit" class="tab-btn active" style="flex: 1; padding: 10px; border-radius: 10px; background: #38bdf8; color: #0f172a; font-weight: bold;">Сохранить</button>
                    </div>

                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; display: flex; align-items: center; justify-content: space-between;">
                        <span style="color: #94a3b8;">Исполнитель:</span>
                        <button type="button" id="btn-modal-open-user" class="btn-user-badge">
                            👤 ${task.userName}
                        </button>
                    </div>
                </form>
            </div>
        `;

		modal.style.display = 'flex';

		const closeModal = () => { modal.style.display = 'none'; };
		document.getElementById('btn-cancel-edit').onclick = closeModal;
		modal.onclick = (e) => { if (e.target === modal) closeModal(); };

		document.getElementById('btn-modal-open-user').onclick = () => {
			closeModal();
			const user = allUsersCache.find(u => String(u.id) === String(task.userId));
			if (user) openUserProfileModal(user);
		};

		document.getElementById('edit-task-form').onsubmit = (e) => {
			e.preventDefault();
			const newText = document.getElementById('modal-edit-text').value.trim();
			const newUserId = document.getElementById('modal-edit-userid').value.trim();
			const isCompleted = document.getElementById('modal-edit-completed').checked;

			const foundUser = allUsersCache.find(u => String(u.id) === String(newUserId));
			const newUserName = foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : `ID: ${newUserId}`;

			task.text = newText;
			task.userId = newUserId;
			task.userName = newUserName;
			task.completed = isCompleted;

			saveAssignedTasks(allTasks);
			renderAssignedTasks();
			closeModal();
		};
	}

	if (assignTaskForm) {
		assignTaskForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const text = taskTextInput ? taskTextInput.value.trim() : '';
			const userId = taskUserSelect ? taskUserSelect.value : '';

			if (!text || !userId) {
				alert('Пожалуйста, введите текст задачи и выберите исполнителя!');
				return;
			}

			const user = allUsersCache.find(u => String(u.id) === String(userId));
			const userName = user ? `${user.firstName} ${user.lastName}` : `ID: ${userId}`;

			const tasks = getAssignedTasks();
			tasks.unshift({
				id: Date.now(),
				userId: userId,
				userName: userName,
				text: text,
				completed: false
			});

			saveAssignedTasks(tasks);
			if (taskTextInput) taskTextInput.value = '';
			renderAssignedTasks();
		});
	}

	loadUsersForSelect();
	renderAssignedTasks();
});