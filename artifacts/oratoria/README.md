# Оратория — сайт клуба публичных выступлений

Публичный сайт клуба Оратория. Построен на Next.js 15 (App Router), TypeScript, Tailwind CSS v4 и Prisma + PostgreSQL.

## Технологии

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styles**: Tailwind CSS v4
- **ORM**: Prisma
- **Database**: PostgreSQL

## Начало работы

### 1. Установка зависимостей

```bash
# В корне monorepo
pnpm install
```

### 2. Настройка переменных окружения

```bash
cp artifacts/oratoria/.env.example artifacts/oratoria/.env
```

Отредактируйте `.env` и укажите реальный `DATABASE_URL`.

### 3. Применение схемы базы данных

```bash
pnpm --filter @workspace/oratoria run db:push
```

### 4. Заполнение демонстрационными данными

```bash
pnpm --filter @workspace/oratoria run db:seed
```

### 5. Запуск сервера разработки

```bash
pnpm --filter @workspace/oratoria run dev
```

Сайт будет доступен по адресу `http://localhost:3000`.

## Маршруты

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница |
| `/admin` | Панель администратора (заглушка) |
| `/legal/privacy` | Политика конфиденциальности |
| `/legal/terms` | Условия использования |

## Prisma модели

| Модель | Назначение |
|--------|-----------|
| `Event` | Мероприятия клуба |
| `Registration` | Записи участников на мероприятия |
| `NewsletterSubscriber` | Подписчики рассылки |
| `SiteContent` | Редактируемый контент сайта |
| `FaqItem` | Вопросы и ответы |

## Сборка для продакшена

```bash
pnpm --filter @workspace/oratoria run build
```
