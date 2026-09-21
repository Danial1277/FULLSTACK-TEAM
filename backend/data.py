# Хранение данных участников и общего описания команды

MEMBERS = [
    {
        "id": "satybaldy",
        "name": "Сатыбалды",
        "role": "Frontend Developer",
        "category": "frontend",
        "does": [
            "Разработка верстки и компонентов интерфейса",
            "Адаптивность под мобильные устройства и планшеты",
            "Интеграция UI с backend REST API",
            "Оптимизация скорости загрузки страниц",
        ],
        "tags": ["HTML5", "CSS3", "JavaScript", "Flexbox/Grid", "DOM API"],
    },
    {
        "id": "danial-t",
        "name": "Даниал Т",
        "role": "Backend Developer & Team Lead",
        "category": "backend",
        "does": [
            "Архитектура клиент-серверного взаимодействия",
            "Проектирование и оптимизация REST API на FastAPI",
            "Управление задачами и координация команды",
            "Настройка и работа с базами данных",
        ],
        "tags": ["Python", "FastAPI", "Team Lead", "REST API", "Database Design"],
    },
    {
        "id": "nargiz",
        "name": "Наргиз",
        "role": "Frontend Developer",
        "category": "frontend",
        "does": [
            "Проектирование пользовательского опыта (UI/UX)",
            "Стилизация и создание анимаций элементов",
            "Кроссбраузерная и чистая верстка",
            "Оформление карточек и навигации",
        ],
        "tags": ["HTML5", "CSS3", "UI/UX Design", "JavaScript", "Responsive Web"],
    },
    {
        "id": "danial-n",
        "name": "Даниал Н",
        "role": "Backend Developer",
        "category": "backend",
        "does": [
            "Разработка бизнес-логики приложения",
            "Настройка эндпоинтов и обработки запросов",
            "Валидация входящих данных и обработка ошибок",
            "Тестирование API и работа со структурой данных",
        ],
        "tags": ["Python", "FastAPI", "Data Validation", "AsyncIO", "API Routing"],
    },
]

# Индекс для быстрого поиска участника по id (вместо цикла по списку)
MEMBERS_BY_ID = {member["id"]: member for member in MEMBERS}


def _count(category: str) -> int:
    return sum(1 for member in MEMBERS if member["category"] == category)


TEAM_INFO = {
    "title": "Frontend × Backend Collaboration",
    "description": (
        "Команда fullstack-разработки, объединяющая продуманный "
        "пользовательский интерфейс и надежную серверную архитектуру."
    ),
    "structure": {
        "frontend": ["Сатыбалды", "Наргиз"],
        "backend": ["Даниал Т (Lead)", "Даниал Н"],
    },
    "technologies": [
        "HTML5",
        "CSS3 / Variables",
        "JavaScript (ES6+)",
        "Python 3.11+",
        "FastAPI",
        "Uvicorn",
        "REST API",
        "Git",
    ],
    # Считаем из MEMBERS, чтобы числа никогда не расходились с данными
    "roles_stats": {
        "frontend_count": _count("frontend"),
        "backend_count": _count("backend"),
        "total_members": len(MEMBERS),
    },
    "work_principles": [
        "Модульная структура фронтенда и бэкенда",
        "Параллельная разработка с согласованием API спецификации",
        "Качественный code review и соблюдение стандартов кода",
        "Автономность каждого участника в своей области ответственности",
    ],
    "strengths": [
        "Чёткое разделение ответственности между Frontend и Backend",
        "Внимание к деталям UI/UX и визуальному стилю",
        "Высокая скорость передачи и обработки данных",
        "Гибкая и масштабируемая архитектура",
    ],
}