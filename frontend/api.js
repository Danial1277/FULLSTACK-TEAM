const BASE_URL = 'https://dummyjson.com/products';

async function getDummyProducts(limit = 6, skip = 0) {
    try {
        const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        return [];
    }
}

async function createDummyProduct(title, price, description = '') {
    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                price: Number(price),
                description: description,
                rating: 5.0,
                category: 'пользовательский'
            })
        });

        if (!response.ok) throw new Error(`Ошибка HTTP при создании: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при отправке POST-запроса:', error);
        return null;
    }
}

async function updateDummyProduct(id, title, price, description) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                price: Number(price),
                description: description
            })
        });

        if (!response.ok) {
            return { id: id, title: title, price: Number(price), description: description };
        }
        return await response.json();
    } catch (error) {
        console.error(`Ошибка при отправке PUT-запроса (ID ${id}):`, error);
        return { id: id, title: title, price: Number(price), description: description };
    }
}

async function deleteDummyProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            return { id: id, isDeleted: true };
        }
        return await response.json();
    } catch (error) {
        console.error(`Ошибка при отправке DELETE-запроса (ID ${id}):`, error);
        return { id: id, isDeleted: true };
    }
}