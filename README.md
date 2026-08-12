# Enfos Reporting Portal

A responsive full-stack reporting portal built for the Enfos coding assessment. It provides a searchable report catalog and dedicated tabular views for users, departments, and projects, backed by a Spring Boot REST API and deterministic in-memory data.

## Quick start

Prerequisites: Git, Docker, and Docker Compose.

```bash
git clone https://github.com/Incognito-ops12/Reporting-Landing-Page.git
cd Reporting-Landing-Page
docker compose up --build
```

Open **http://localhost:3000**. Stop the stack with `Ctrl+C`, followed by `docker compose down` if needed.

No database, package manager, Java installation, or manual service startup is required for the Docker path. Optional port and CORS overrides are documented in `.env.example`.

## Features

- Searchable landing page for all available reports
- Users, Departments, and Projects data tables
- Responsive card layout and horizontally scrollable tables
- Clear loading, empty, no-results, error, and retry states
- Keyboard-friendly navigation and semantic status labels
- Four focused REST endpoints with consistent error responses
- One-command, health-checked Docker deployment

## Screenshots

Capture final submission images in `docs/screenshots/` using the checklist below. Suggested files:

- `landing-desktop.png` — full landing page and report cards
- `search-filter.png` — report-name filtering
- `users-report.png` — representative desktop table
- `projects-mobile.png` — responsive table behavior on a narrow viewport
- `error-state.png` — recoverable API failure, if practical

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19.2.8, TypeScript 5.9.3, Vite 8.2.1, Tailwind CSS 4.3.3 |
| Data fetching | TanStack Query 5.101.4 |
| Routing | React Router 7.18.2 |
| Backend | Java 21, Spring Boot 3.5.0, Maven |
| Production serving | Nginx 1.31 |
| Tests | JUnit/Spring Test, Vitest, Testing Library |
| Deployment | Multi-stage Docker builds and Docker Compose |

## Architecture

```text
Browser (localhost:3000)
          |
          v
Nginx + React static application
          |
          | /api/* reverse proxy
          v
Spring Boot REST API (backend:8080)
          |
          v
Immutable in-memory data provider
```

The browser only uses same-origin `/api` URLs. During local development, Vite proxies those requests to `localhost:8080`; in Docker, Nginx proxies them to the Compose service name `backend`. The Docker hostname is never exposed to browser code.

The backend follows controller → service → repository boundaries. React pages use shared report definitions, reusable presentation components, and TanStack Query for server-state caching and request-state handling. No global client-state library is necessary for the small amount of local UI state.

## Repository structure

```text
.
├── backend/              Spring Boot API, tests, and Dockerfile
├── frontend/             React application, tests, Nginx config, and Dockerfile
├── docs/                 Review and demo guidance
├── docker-compose.yml    Full-stack orchestration
├── .env.example          Optional non-secret configuration
└── README.md
```

## Local development

Local prerequisites are Java 21, Maven 3.9+, Node.js 22.12+, and pnpm 11.16.

Start the backend:

```bash
cd backend
mvn spring-boot:run
```

In a second terminal, start the frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

Open http://localhost:5173. The frontend dev server proxies API requests to http://localhost:8080.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/reports` | Report catalog metadata |
| `GET` | `/api/reports/users` | User report rows |
| `GET` | `/api/reports/departments` | Department report rows |
| `GET` | `/api/reports/projects` | Project report rows |

Operational health is available at `GET /actuator/health`. Report endpoints return JSON and successful requests use HTTP `200`. Unsupported report routes return a structured JSON error with HTTP `404`; unexpected server errors use the same error shape with HTTP `500`.

## Tests and quality checks

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
pnpm lint
pnpm test
pnpm exec tsc --noEmit
pnpm build
pnpm format:check
```

## Assumptions

- Fictional, deterministic in-memory data satisfies the assessment because persistence is optional.
- Authentication and authorization are outside the requested scope.
- Landing-page search filters report names and descriptions, not individual table rows.
- The dataset is intentionally small, so report endpoints return complete arrays without pagination.
- The browser accesses the Docker stack through the frontend on port 3000.

## Key decisions and tradeoffs

### In-memory data

**Decision:** Keep immutable mock records behind a repository interface. **Why:** It fulfills the reporting behavior without database deployment complexity. **Alternative:** H2 or PostgreSQL. **Why not:** Persistence, migrations, and database operations do not solve an assessment requirement. **Interview explanation:** The repository boundary allows a database implementation later without changing controllers.

### React state and data fetching

**Decision:** Use TanStack Query for server state and component state for search input. **Why:** It provides loading, error, retry, and cache behavior without mixing remote data with UI state. **Alternative:** A global store or handwritten request lifecycle. **Why not:** Both add unnecessary concepts or repeated code for this scope. **Interview explanation:** State lives at the narrowest appropriate layer.

### Backend layering

**Decision:** Separate controllers, services, and the in-memory provider. **Why:** HTTP concerns, application logic, and data access remain independently testable. **Alternative:** Return static lists directly from controllers. **Why not:** That couples transport and data concerns. **Interview explanation:** The layers create replaceable seams without speculative abstraction.

### Docker architecture

**Decision:** Build both applications in multi-stage images and use Nginx as the only public entry point. **Why:** Runtime images exclude build toolchains, React Router refreshes work, and same-origin API proxying is simple. **Alternative:** Publish both containers or run Vite in production. **Why not:** Two public origins require more CORS configuration, while a development server is not a production host. **Interview explanation:** Compose manages service discovery and health; the browser only knows `localhost:3000`.

### Responsive tables

**Decision:** Preserve meaningful columns and contain wide tables in a labeled horizontal-scroll region. **Why:** Hiding columns would remove report information. **Alternative:** Collapse rows into mobile cards. **Why not:** Cards make cross-row comparison harder and duplicate presentation logic. **Interview explanation:** The table remains semantically intact at every viewport.

## Production considerations

A production evolution would add identity-provider authentication, role-based report authorization, persistent storage and migrations, pagination and server-side filtering for large datasets, structured logs and metrics, rate limiting, automated vulnerability scanning, CI/CD, TLS, and environment-specific secret management. These are intentionally described as future work rather than implied assessment requirements.

## Demo and submission

See [docs/DEMO.md](docs/DEMO.md) for a 60–90 second walkthrough, screenshot plan, and submission checklist.

## AI usage

AI-assisted tooling was used during planning, implementation, testing, and documentation. The author reviewed the architecture, source code, decisions, and resulting behavior and is prepared to explain them.
