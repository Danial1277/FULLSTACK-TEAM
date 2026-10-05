const DUMMY_BASE_URL = 'https://dummyjson.com/products';

// 1. READ (GET) — Получение списка товаров
async function getDummyProducts(limit = 6, skip = 0) {
    try {
        const res = await fetch(`${DUMMY_BASE_URL}?limit=${limit}&skip=${skip}`);
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data = await res.json();
        console.log('GET (DummyJSON):', data.products);
        return data.products;
    } catch (err) {
        console.error('Ошибка GET:', err);
        return [];
    }
}

// 2. CREATE (POST) — Создание нового товара
async function createDummyProduct(title, price, category = 'general') {
    try {
        const res = await fetch(`${DUMMY_BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price: Number(price), category })
        });
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data = await res.json();
        console.log('POST (DummyJSON):', data);
        return data;
    } catch (err) {
        console.error('Ошибка POST:', err);
    }
}

// 3. UPDATE (PUT) — Обновление товара по ID
async function updateDummyProduct(id, newTitle, newPrice) {
    try {
        const res = await fetch(`${DUMMY_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, price: Number(newPrice) })
        });
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data = await res.json();
        console.log(`PUT ID ${id} (DummyJSON):`, data);
        return data;
    } catch (err) {
        console.error('Ошибка PUT:', err);
    }
}

// 4. DELETE — Удаление товара по ID
async function deleteDummyProduct(id) {
    try {
        const res = await fetch(`${DUMMY_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data = await res.json();
        console.log(`DELETE ID ${id} (DummyJSON):`, data);
        return data;
    } catch (err) {
        console.error('Ошибка DELETE:', err);
    }
}