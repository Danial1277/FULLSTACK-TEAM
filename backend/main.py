from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
import json

app = FastAPI(title="Multi-Tab Profile App")

# Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Папка для загрузки фото
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Простейшая "База данных" в оперативной памяти (можно заменить на SQLite/PostgreSQL)
db = {
    "tab1": {"name": "", "bio": "", "photo": None},
    "tab2": {"name": "", "bio": "", "photo": None},
    "tab3": {"name": "", "bio": "", "photo": None},
    "tab4": {"name": "", "bio": "", "photo": None},
    "tab5": {"name": "", "bio": "", "photo": None},
}

# Получение данных конкретной вкладки
@app.get("/api/tabs/{tab_id}")
async def get_tab_data(tab_id: str):
    if tab_id not in db:
        raise HTTPException(status_code=404, detail="Вкладка не найдена")
    return db[tab_id]

# Сохранение данных и загрузка фотографии
@app.post("/api/tabs/{tab_id}")
async def save_tab_data(
    tab_id: str,
    name: str = Form(""),
    bio: str = Form(""),
    photo: UploadFile = File(None)
):
    if tab_id not in db:
        raise HTTPException(status_code=404, detail="Вкладка не найдена")

    tab_data = db[tab_id]
    tab_data["name"] = name
    tab_data["bio"] = bio

    # Если загружено новое фото
    if photo and photo.filename:
        # Генерируем уникальное имя файла
        file_extension = os.path.splitext(photo.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as f:
            content = await photo.read()
            f.write(content)

        # Сохраняем URL фотографии
        tab_data["photo"] = f"/uploads/{unique_filename}"

    return {"message": "Данные успешно сохранены", "data": tab_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)