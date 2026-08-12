# Demo and submission guide

## 60–90 second demo script

1. **Start (0–10 seconds):** Show `docker compose up --build`, then open http://localhost:3000. Explain that Compose builds and health-checks the React/Nginx frontend and Spring Boot API.
2. **Landing page (10–22 seconds):** Point out the three report cards, descriptions, row counts, and updated dates.
3. **Search (22–30 seconds):** Search for `users`, show the filtered card, then clear the query.
4. **Report tables (30–55 seconds):** Open Users and mention reusable table rendering and status badges. Return and briefly open Departments and Projects to show their distinct schemas.
5. **Responsive behavior (55–67 seconds):** Narrow the viewport. Show the stacked cards and contained horizontal table scrolling without page-level overflow.
6. **Request states (67–78 seconds):** Mention automated coverage for loading, empty, error, and retry behavior. If convenient, stop the backend briefly to demonstrate the recoverable error state, then restart it.
7. **Close (78–90 seconds):** Summarize the controller/service/repository backend, in-memory data choice, same-origin Nginx API proxy, and one-command reviewer experience.

## Screenshot checklist

- Desktop landing page showing all three cards
- Landing page filtered to one report
- Users table with status badges
- Departments or Projects table showing a distinct schema
- Narrow viewport showing responsive cards or contained table scrolling
- Optional recoverable API error state

Store screenshots in `docs/screenshots/` and embed the strongest two or three in the root README before submission. Avoid committing operating-system chrome, personal data, or unrelated browser tabs.

## Submission checklist

- [ ] Repository URL is accessible to the reviewer or a clean source archive is prepared
- [ ] `docker compose up --build` succeeds from a clean checkout
- [ ] Application is reachable at http://localhost:3000
- [ ] Backend and frontend health checks become healthy
- [ ] All three reports, search, navigation, responsive layout, and request states are verified
- [ ] Backend and frontend test/quality commands pass
- [ ] README setup, architecture, API, assumptions, tradeoffs, and AI-usage notes are current
- [ ] Final screenshots or a short demo video are attached
- [ ] No `.env`, credentials, build output, or dependency directories are committed
