const BASE_URL = 'https://dummyjson.com/products';

// Получение списка товаров с сервера
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

// Получение списка пользователей (200 шт)
async function getDummyUsers(limit = 200) {
    try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        return [];
    }
}

// Создание товара со случайным рейтингом (от 3.0 до 5.0)
async function createDummyProduct(title, price, description = '') {
    try {
        const randomRating = Number((Math.random() * (5.0 - 3.0) + 3.0).toFixed(1));

        const response = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                price: Number(price),
                description: description,
                rating: randomRating,
                category: 'пользовательский'
            })
        });

        if (!response.ok) throw new Error(`Ошибка HTTP при создании: ${response.status}`);
        const data = await response.json();

        return {
            ...data,
            rating: randomRating
        };
    } catch (error) {
        console.error('Ошибка при отправке POST-запроса:', error);
        return null;
    }
}

// Обновление товара
async function updateDummyProduct(id, title, price, description, rating = null) {
    try {
        const bodyData = {
            title: title,
            price: Number(price),
            description: description
        };
        if (rating !== null) {
            bodyData.rating = Number(rating);
        }

        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            return { id: id, title: title, price: Number(price), description: description, rating: rating };
        }
        return await response.json();
    } catch (error) {
        console.error(`Ошибка при отправке PUT-запроса (ID ${id}):`, error);
        return { id: id, title: title, price: Number(price), description: description, rating: rating };
    }
}

// Удаление товара
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