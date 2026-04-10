# YoloHome — Smart AIoT Dashboard

A smart home monitoring and control dashboard built with React, TypeScript, and TanStack Router.

## Features

- **Dashboard** — Overview of all devices, climate stats, and power consumption
- **Lights** — Room-by-room light control with brightness and color temperature
- **Temperature** — Real-time temperature & humidity charts with trend insights
- **Camera** — Live preview, face detection alerts, and security event log

## Tech Stack

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

## Project Structure

```
SmartAIOT-YoloHome/
└── frontend/
    └── src/
        ├── routes/          # File-based route definitions
        │   ├── index.tsx    # Dashboard
        │   ├── lights.tsx
        │   ├── temperature.tsx
        │   └── camera.tsx
        ├── components/      # Feature components
        │   ├── dashboard/
        │   ├── lights/
        │   ├── temperature/
        │   ├── camera/
        │   └── forms/       # Shared form components
        ├── schemas/         # Zod validation schemas
        ├── services/        # API service layer
        └── types/           # Shared TypeScript types
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
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
// Define schema
const schema = z.object({ name: z.string().min(2) })
type FormValues = z.infer<typeof schema>

// Use in component
const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: '' },
})
```
