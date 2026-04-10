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
| Linting | ESLint + typescript-eslint |
| Git Hooks | Husky + lint-staged |

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
        │   └── camera/
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

Pre-commit hook runs `eslint --max-warnings=0` on all staged `.ts`/`.tsx` files. Commits are blocked if any ESLint errors or warnings exist.
