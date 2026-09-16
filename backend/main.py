import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from api import router as api_router

app = FastAPI(title="Team Backend API")

# Подключаем API
app.include_router(api_router)

# Путь к папке frontend
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")

# Раздача HTML, CSS и JS из корневой директории
@app.get("/")
def read_root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

# Раздаём статические файлы напрямую (styles/js)
app.mount("/", StaticFiles(directory=FRONTEND_DIR), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)