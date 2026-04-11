# YoloHome — Smart AIoT Dashboard

A smart home monitoring and control dashboard built with React, TypeScript, NestJS, and MongoDB.

## Features

- **Dashboard** — Overview of all devices, climate stats, and power consumption
- **Lights** — Room-by-room light control with brightness and color temperature
- **Temperature** — Real-time temperature & humidity charts with trend insights
- **Camera** — Live preview, face detection alerts, and security event log

## Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Routing | TanStack Router (file-based) |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Linting | ESLint + typescript-eslint |
| Git Hooks | Husky + lint-staged + commitlint |

### Backend

| Layer | Technology |
|-------|-----------|
| Framework | NestJS 11 + TypeScript |
| Database | MongoDB + Mongoose |
| Validation | class-validator + class-transformer |
| Config | @nestjs/config |

## Project Structure

```
SmartAIOT-YoloHome/
├── frontend/
│   └── src/
│       ├── routes/          # File-based route definitions
│       │   ├── index.tsx    # Dashboard
│       │   ├── lights.tsx
│       │   ├── temperature.tsx
│       │   └── camera.tsx
│       ├── components/      # Feature components
│       │   ├── dashboard/
│       │   ├── lights/
│       │   ├── temperature/
│       │   ├── camera/
│       │   └── forms/       # Shared form components
│       ├── schemas/         # Zod validation schemas
│       ├── services/        # API service layer
│       ├── lib/             # apiClient fetch wrapper
│       └── types/           # Shared TypeScript types
│
└── backend/
    └── src/
        ├── common/          # Global filters, interceptors, decorators
        ├── devices/         # Device management module
        ├── lights/          # Lights control + room settings module
        ├── temperature/     # Temperature logs module
        ├── camera/          # Camera logs module
        ├── power/           # Power consumption module
        └── health/          # Health check endpoint
```

## Architecture

```
Frontend (React + TanStack Query)
        ↕ HTTP / REST API
Backend (NestJS)
  Controller → Service → Repository
                              ↕
                          MongoDB
```

Each backend module follows the **Controller → Service → Repository** pattern:
- **Controller** — định nghĩa route, validate request
- **Service** — business logic
- **Repository** — tương tác với MongoDB qua Mongoose

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Community Server (running on `localhost:27017`)

### Backend

```bash
cd backend
npm install
npm run dev        # Starts on http://localhost:3000
```

Lần đầu chạy, backend tự động seed data vào MongoDB nếu collection còn rỗng.

### Frontend

```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:5173
```

Tạo file `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/devices` | Danh sách thiết bị |
| POST | `/devices` | Thêm thiết bị mới |
| GET | `/lights/commands` | Lịch sử lệnh đèn |
| POST | `/lights/commands` | Gửi lệnh đèn |
| GET | `/lights/rooms` | Trạng thái 3 phòng |
| POST | `/lights/rooms/:room/command` | Toggle đèn theo phòng |
| PATCH | `/lights/rooms/:room/settings` | Cập nhật brightness/colorTemp |
| GET | `/temperature/logs` | Lịch sử nhiệt độ |
| GET | `/temperature/current` | Đọc hiện tại |
| GET | `/camera/logs` | Lịch sử camera |
| POST | `/camera/commands` | Bật/tắt camera |
| GET | `/power/history` | Lịch sử tiêu thụ điện |

## Available Scripts

### Frontend

```bash
npm run dev         # Start dev server with HMR
npm run build       # Type check + production build
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

### Backend

```bash
npm run dev         # Start with watch mode
npm run build       # Compile TypeScript
npm run start       # Run compiled output
npm run type-check  # Type check only
```

## Git Hooks

| Hook | What it does |
|------|-------------|
| `pre-commit` | Runs `eslint --max-warnings=0` on staged `.ts`/`.tsx` files |
| `commit-msg` | Validates commit message format via commitlint |

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add login page
fix: resolve light toggle bug
chore: update dependencies
docs: update README
refactor: split temperature components
```

## Forms

Forms use **React Hook Form** + **Zod** for type-safe validation. Schemas live in `src/schemas/`, reusable field components in `src/components/forms/`.

```ts
const schema = z.object({ name: z.string().min(2) })
type FormValues = z.infer<typeof schema>

const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: '' },
})
```
