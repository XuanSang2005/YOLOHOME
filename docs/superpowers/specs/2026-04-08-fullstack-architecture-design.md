# SmartAIOT-YoloHome — Final Revised Fullstack Architecture Design

## 1. Overview

SmartAIOT-YoloHome is a fullstack monolithic application for monitoring and controlling smart home devices (lights, temperature sensors, security cameras) through a web interface. The system requires user authentication and logs all control operations.

The system consists of two applications running independently within the same repository:

- **Backend:** REST API built with Node.js, Express, and TypeScript. Data is stored in MySQL and queried via Prisma ORM.
- **Frontend:** Single-page application built with React, Vite, and TypeScript. Communication with the backend is entirely through HTTP JSON.

Authentication uses stateless JWT. Every device control command is associated with a user account to ensure traceability.

## 2. Tech Stack

### Backend

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js 22+ |
| Framework | Express 5 |
| Language | TypeScript 5 |
| ORM | Prisma |
| Database | MySQL 8 |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| Validation | zod |
| CORS | cors middleware |

### Frontend

| Component | Technology |
|-----------|-----------|
| Framework | React 19 |
| Build tool | Vite 7+ |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Routing | TanStack Router |
| Server state | TanStack Query |
| HTTP client | Axios |

## 3. System Architecture

### Layered Architecture Model

The system applies a Layered Architecture combined with the Service Pattern. Each layer only calls the layer directly below it.

```
┌─────────────────────────────────────────┐
│           React Frontend                │
│   (TanStack Router + Query + Axios)     │
└────────────────┬────────────────────────┘
                 │ HTTP JSON
┌────────────────▼────────────────────────┐
│           Express Router                │
│       (request routing)                 │
├─────────────────────────────────────────┤
│           Controller                    │
│   (validate input, format response)     │
├─────────────────────────────────────────┤
│           Service                       │
│       (sole business logic)             │
├─────────────────────────────────────────┤
│         Prisma Client                   │
│       (database queries)                │
├─────────────────────────────────────────┤
│            MySQL                        │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Does | Does Not |
|------|--------|-------------|
| **Router** | Maps URLs to the corresponding controller | Contain processing logic |
| **Controller** | Validates input with zod, calls service, returns HTTP response | Query the database directly |
| **Service** | Executes business logic, orchestrates data operations | Know about HTTP request/response |
| **Prisma** | Executes SQL queries, manages transactions | Contain business logic |

### Module Organization by Domain

The system is divided into 5 modules, each with a triplet of files: route → controller → service.

| Module | Scope of Responsibility |
|--------|---------------------|
| **auth** | Registration, login, retrieving current user information |
| **device** | Aggregated status queries for all devices. Does not contain control business logic |
| **light** | Retrieving light information, sending on/off commands, querying command history |
| **temperature** | Retrieving current readings, querying temperature and humidity history |
| **camera** | Retrieving camera information, sending on/off commands, querying command history, querying automatic event logs |

**Separation Principles:**
- `deviceService` only performs aggregated queries (`findMany` on the Device table). It does not contain device control logic.
- Specialized services (`lightService`, `cameraService`) are responsible for all logic within their respective domains: finding devices by type, creating commands, updating status.
- `temperatureService` only reads data because the sensor is a passive device — it does not receive control commands.

## 4. Final Directory Structure

```
SmartAIOT-YoloHome/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── index.ts                     # Initialize Express app
│   │   ├── lib/
│   │   │   └── prisma.ts               # Singleton Prisma Client
│   │   ├── middlewares/
│   │   │   ├── auth.ts                  # JWT authentication
│   │   │   └── errorHandler.ts          # Centralized error handling
│   │   ├── schemas/
│   │   │   ├── authSchema.ts            # Zod: register, login
│   │   │   └── commandSchema.ts         # Zod: command ON/OFF
│   │   ├── routes/
│   │   │   ├── index.ts                 # Mount all route groups
│   │   │   ├── auth.ts
│   │   │   ├── device.ts
│   │   │   ├── light.ts
│   │   │   ├── temperature.ts
│   │   │   └── camera.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── deviceController.ts
│   │   │   ├── lightController.ts
│   │   │   ├── temperatureController.ts
│   │   │   └── cameraController.ts
│   │   └── services/
│   │       ├── authService.ts
│   │       ├── deviceService.ts
│   │       ├── lightService.ts
│   │       ├── temperatureService.ts
│   │       └── cameraService.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── api/
│   │   │   ├── client.ts               # Axios instance + interceptors
│   │   │   ├── authApi.ts
│   │   │   ├── deviceApi.ts
│   │   │   ├── lightApi.ts
│   │   │   ├── temperatureApi.ts
│   │   │   └── cameraApi.ts
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── routes/
│   │   │   ├── __root.tsx
│   │   │   ├── index.tsx               # Dashboard
│   │   │   ├── lights.tsx
│   │   │   ├── temperature.tsx
│   │   │   ├── camera.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── docs/
└── README.md
```

**Structural Rules:**

- Each route group has exactly one triplet: `routes/<name>.ts`, `controllers/<name>Controller.ts`, `services/<name>Service.ts`. No route is missing a corresponding controller or service.
- `routes/index.ts` is the sole mount point — each route file exports an Express Router, and `index.ts` attaches them to their respective prefixes (`/api/auth`, `/api/devices`, etc.).
- `schemas/` contains zod schemas shared across controllers.
- `middlewares/errorHandler.ts` handles errors centrally; controllers do not need individual try/catch blocks.

## 5. Final Database Design

### Design Decision: A Single Shared Device Table

All device types (lights, sensors, cameras) reside in a single `Device` table with a `type` field as the discriminator. Rationale:

- The project manages only 3-5 devices. A single table with a discriminator is simpler and sufficient.
- All devices share common fields: `name`, `room`, `status`, `ipAddress`.
- Type-specific data (temperature readings, camera events) is stored in separate log tables, linked via `deviceId`.

### Design Decision: Separating DeviceCommand and CameraLog

These two tables serve entirely different purposes:

| Table | Purpose | Data Source | Applies To |
|------|----------|-------------------|-------------|
| **DeviceCommand** | Stores control commands sent by users | User presses on/off button | Lights and cameras |
| **CameraLog** | Stores automatic camera events | System automatic detection | Cameras only |

Specifically:
- When a user turns a light on/off → a record is created in `DeviceCommand`.
- When a user turns a camera on/off → a record is created in `DeviceCommand` (same mechanism as lights).
- When a camera automatically detects a face → a record is created in `CameraLog`.

Thanks to this separation, `DeviceCommand` is the single source of truth for all user control operations, ensuring consistent traceability and auditing.

### Design Decision: DeviceStatus Enum Uses Only ON/OFF

Instead of using 4 values `ON`, `OFF`, `ACTIVE`, `INACTIVE` (which causes semantic ambiguity depending on device type), the system standardizes on just two values:

| Device Type | ON means | OFF means |
|--------------|-------------|--------------|
| Light | Light is on | Light is off |
| Sensor | Actively sending data | Stopped sending data |
| Camera | Currently active | Turned off |

Benefit: no separate logic is needed to check which status values are valid for which device type. All devices use the same ON/OFF.

### Prisma Schema

```prisma
// ──────────────────────────────────────
// Enums
// ──────────────────────────────────────

enum DeviceType {
  LIGHT
  SENSOR
  CAMERA
}

enum DeviceStatus {
  ON
  OFF
}

enum CommandType {
  ON
  OFF
}

enum CameraEvent {
  FACE_DETECTED
}

// ──────────────────────────────────────
// Models
// ──────────────────────────────────────

model User {
  id             Int              @id @default(autoincrement())
  name           String
  email          String           @unique
  password       String
  deviceCommands DeviceCommand[]
  cameraLogs     CameraLog[]
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
}

model Device {
  id              Int              @id @default(autoincrement())
  name            String
  type            DeviceType
  room            String
  status          DeviceStatus     @default(OFF)
  ipAddress       String?
  lastSeenAt      DateTime?
  commands        DeviceCommand[]
  temperatureLogs TemperatureLog[]
  cameraLogs      CameraLog[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model DeviceCommand {
  id         Int         @id @default(autoincrement())
  deviceId   Int
  device     Device      @relation(fields: [deviceId], references: [id], onDelete: Cascade)
  userId     Int
  user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  command    CommandType
  executed   Boolean     @default(false)
  executedAt DateTime?
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

model TemperatureLog {
  id          Int      @id @default(autoincrement())
  deviceId    Int
  device      Device   @relation(fields: [deviceId], references: [id], onDelete: Cascade)
  temperature Decimal  @db.Decimal(5, 2)
  humidity    Decimal  @db.Decimal(5, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model CameraLog {
  id        Int         @id @default(autoincrement())
  deviceId  Int
  device    Device      @relation(fields: [deviceId], references: [id], onDelete: Cascade)
  userId    Int?
  user      User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  event     CameraEvent
  faceLabel String?
  note      String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```

### Seed Data

The `prisma/seed.ts` script creates default data:

**Devices:**
1. Living room light — type: `LIGHT`, status: `OFF`
2. Temperature sensor — type: `SENSOR`, status: `ON`
3. Front door webcam — type: `CAMERA`, status: `ON`

**Sample Data:**
- 10 `DeviceCommand` records for the light (alternating ON/OFF)
- 12 `TemperatureLog` records (every 30 minutes over the last 6 hours)
- 5 `CameraLog` records (`FACE_DETECTED` events)
- 1 admin `User` for testing (email: admin@yolohome.local)

## 6. Final API Design

### Response Format

All responses follow a consistent envelope format:

**Success:**
```json
{ "success": true, "data": <T> }
```

**Error:**
```json
{ "success": false, "message": "<error description>" }
```

### Public Routes (no JWT required)

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `POST` | `/api/auth/register` | Register an account | `{ id, name, email }` |
| `POST` | `/api/auth/login` | Log in | `{ token, user: { id, name, email } }` |

### Protected Routes (JWT required)

**Auth**

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `GET` | `/api/auth/me` | Retrieve current user information from token | `{ id, name, email }` |

**Aggregated Devices**

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `GET` | `/api/devices` | List all devices | `Device[]` |

**Lights**

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `GET` | `/api/lights` | Light information + status | `Device` |
| `POST` | `/api/lights/commands` | Send on/off command | `DeviceCommand` |
| `GET` | `/api/lights/commands` | Command history. Query: `?limit=10` | `DeviceCommand[]` |

**Temperature**

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `GET` | `/api/temperature/current` | Latest reading | `TemperatureLog` |
| `GET` | `/api/temperature/logs` | Reading history. Query: `?limit=24` | `TemperatureLog[]` |

**Camera**

| Method | Endpoint | Description | Response data |
|--------|----------|-------|---------------|
| `GET` | `/api/camera` | Camera information + status | `Device` |
| `POST` | `/api/camera/commands` | Send on/off command | `DeviceCommand` |
| `GET` | `/api/camera/commands` | Command history. Query: `?limit=10` | `DeviceCommand[]` |
| `GET` | `/api/camera/logs` | Automatic event logs. Query: `?limit=20` | `CameraLog[]` |

### Query Parameters

All endpoints that return lists support the `limit` query parameter:

| Parameter | Type | Description | Default |
|-----------|------|-------|----------|
| `limit` | `number` (1-100) | Maximum number of records to return | Varies by endpoint (see table above) |

Pagination (offset/cursor) is not supported in the current version. Given the project's data scale, a simple `limit` is sufficient.

### Route Design Principles

- Command endpoints use plural nouns: `POST /commands`, `GET /commands`. GET reads the list, POST creates a new entry — same path, different method.
- Lights and cameras share the same `/commands` route structure because they both use the `DeviceCommand` table.
- Camera has an additional `/logs` endpoint because it has automatic event data (the `CameraLog` table).
- The temperature sensor has no command endpoints because it is a passive device that only sends data.
- There are no `DELETE` or `PUT` endpoints because the current scope does not require deleting/editing devices through the UI.

## 7. Final Authentication Flow

### Registration

```
Client                                Server
  │ POST /api/auth/register             │
  │ { name, email, password }           │
  ├────────────────────────────────────►│
  │                                     │ Validate with zod
  │                                     │ Check email does not already exist
  │                                     │ Hash password (bcrypt, 12 rounds)
  │                                     │ Insert User
  │  201 { success, data: { user } }    │
  │◄────────────────────────────────────┤
```

Registration **does not return a token**. The user must log in after creating an account. Rationale: separating the account creation and session creation actions reduces complexity and aligns with the typical user experience.

### Login

```
Client                                Server
  │ POST /api/auth/login                │
  │ { email, password }                 │
  ├────────────────────────────────────►│
  │                                     │ Validate with zod
  │                                     │ Find user by email → 401 if not found
  │                                     │ Compare password with bcrypt → 401 if wrong
  │                                     │ Sign JWT { userId, email }, expires in 7 days
  │  200 { success, data:               │
  │       { token, user } }             │
  │◄────────────────────────────────────┤
```

The login response returns both `token` and `user` (id, name, email). The frontend stores the token in localStorage and the user in AuthContext.

### Retrieving User Information (on page reload)

```
Client                                Server
  │ GET /api/auth/me                    │
  │ Authorization: Bearer <token>       │
  ├────────────────────────────────────►│
  │                                     │ Middleware authenticates token
  │                                     │ Query user from userId in token
  │  200 { success, data: { user } }    │
  │◄────────────────────────────────────┤
```

The `/api/auth/me` endpoint solves the following problem: when the page is reloaded, the frontend has a token in localStorage but no longer has user information in memory. Calling `/me` restores the user state.

### Logout

Logout is an entirely client-side operation: remove the token from localStorage, reset AuthContext to its initial state. There is no server-side logout endpoint because JWT is stateless — the server does not store sessions, so there is nothing to invalidate.

### JWT Payload

```json
{
  "userId": 1,
  "email": "user@example.com",
  "iat": 1744100000,
  "exp": 1744704800
}
```

## 8. Validation and Error Handling

### Input Validation with Zod

All endpoints that receive a request body are validated with a zod schema at the controller layer, before calling the service.

Key schemas:
- `authSchema.ts`: validates register (name, email, password) and login (email, password).
- `commandSchema.ts`: validates command body `{ command: "ON" | "OFF" }`. Shared by both lights and cameras.

The `limit` query parameter is also validated with zod (type number, range 1-100).

### Centralized Error Handling

The `errorHandler.ts` middleware is the sole error handling point. Controllers do not need individual try/catch blocks — when an error occurs, a typed error is thrown, and the middleware converts it into the appropriate HTTP response.

Error mapping rules:

| Error Type | HTTP Status | When |
|----------|-------------|---------|
| `ZodError` | 400 | Invalid input |
| `AuthError` | 401 | Missing, expired, or invalid token; wrong password |
| `NotFoundError` | 404 | Device does not exist, resource not found |
| Unhandled error | 500 | Unhandled exceptions, database errors |

### HTTP Status Code Reference

| Status | Meaning | Used When |
|--------|---------|-------------|
| `200` | Success | Successful GET, successful control command |
| `201` | Created | Successful account registration |
| `400` | Bad Request | Zod validation failure |
| `401` | Unauthorized | Missing/invalid/expired token, wrong credentials |
| `404` | Not Found | Device does not exist |
| `500` | Internal Server Error | Unexpected internal errors |

## 9. Frontend Integration

### Replacing Mock Data with API Client

The `frontend/src/services/` directory (containing current mock data) will be replaced by `frontend/src/api/` calling the real backend.

**`api/client.ts`** — Shared Axios instance:
- `baseURL`: read from the environment variable `VITE_API_URL` (default `http://localhost:3000/api`)
- Request interceptor: attaches the `Authorization: Bearer <token>` header from localStorage
- Response interceptor: on receiving 401 → remove token → redirect to `/login`

**API Modules** — each file corresponds to a backend route group:

| File | Functions |
|------|-----|
| `authApi.ts` | `register()`, `login()`, `getMe()` |
| `deviceApi.ts` | `getDevices()` |
| `lightApi.ts` | `getLight()`, `sendLightCommand()`, `getLightCommands()` |
| `temperatureApi.ts` | `getCurrentReading()`, `getTemperatureLogs()` |
| `cameraApi.ts` | `getCamera()`, `sendCameraCommand()`, `getCameraCommands()`, `getCameraLogs()` |

### AuthContext

`contexts/AuthContext.tsx` manages authentication state:

- **State:** `user` (from login response or `/api/auth/me`), `token` (from localStorage)
- **Derived:** `isAuthenticated` = `token !== null`
- **Initialization behavior:** Check if localStorage has a token → if yes, call `/api/auth/me` to restore user → if 401 error, remove token
- **Actions:** `login()` → save token + user, `register()` → navigate to login page, `logout()` → remove token + reset state
- **Provider:** Wraps the entire app in `main.tsx`

### Protected Routes

`components/ProtectedRoute.tsx`:
- Reads `isAuthenticated` from AuthContext
- If `false` → redirect to `/login`
- Used in `__root.tsx` to wrap all routes except `/login` and `/register`

### Pages

| Route | Page | Description |
|-------|-------|-------|
| `/` | Dashboard | Overview of all device statuses |
| `/lights` | Lights | Light control + command history table |
| `/temperature` | Temperature | Current readings + chart + history |
| `/camera` | Camera | Camera control + command history + event logs |
| `/login` | Login | Login form |
| `/register` | Register | Registration form, redirects to login on success |

### TanStack Query Keys

Query keys follow a consistent convention: `[domain]` or `[domain, resource]`.

```
['devices']                  // list of all devices
['light']                    // light information
['light', 'commands']        // light command history
['temperature', 'current']   // current reading
['temperature', 'logs']      // reading history
['camera']                   // camera information
['camera', 'commands']       // camera command history
['camera', 'logs']           // camera event logs
['auth', 'me']               // current user information
```

## 10. Security Notes

### Token Storage

JWT is stored in `localStorage`. This is an acceptable choice for a student project as it simplifies implementation (no cookie management needed, no CSRF handling required).

**Better approach for production:** Use `httpOnly` cookies combined with `SameSite=Strict` to prevent XSS token theft. This requires the backend to set cookies and the frontend to send requests with `credentials: 'include'`.

### Password Security

- Passwords are hashed with bcrypt (12 salt rounds) before storage
- Plaintext passwords never appear in logs, API responses, or storage

### Input Validation

- All user input goes through zod validation at the controller layer before reaching business logic
- Prevents injection, type confusion, and malformed data

### CORS

- The backend configures CORS to only accept requests from the frontend origin (`http://localhost:5173` during development)
- In production deployment, restrict to the actual domain

## 11. Future Extension Directions

Features outside the current scope but representing natural evolution paths:

- **Real-time updates (Socket.IO or MQTT):** Push device status and sensor data to the frontend without polling. MQTT is particularly well-suited for IoT device communication.
- **Support for multiple devices of the same type:** The current schema already supports this — the frontend needs additional UI for device selection/management.
- **Role-based access control (RBAC):** Differentiate between admin and regular users for device management.
- **Dashboard analytics:** Temperature trend charts, device usage statistics over time.
- **Responsive layout:** The current UI focuses on desktop; additional breakpoints for mobile are needed.
