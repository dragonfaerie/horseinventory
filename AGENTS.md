# Repository Guidelines

## Project Structure & Module Organization
Kotlin/Spring Boot sources live in `src/main/kotlin`, configuration in `src/main/resources`, and SQL updates in `migrations/`. JVM tests belong in `src/test/kotlin`. The React client is isolated in `frontend/src` with static assets under `frontend/public`. Maven outputs land in `target/`, while web builds go to `frontend/build/`. Keep backend-only work outside `frontend/` and mirror that separation for UI tasks.

## Build, Test, and Development Commands
- `./mvnw spring-boot:run` – boot the API with hot reload and the local Postgres profile.
- `./mvnw clean verify` – compile Kotlin sources, execute tests, and package the service.
- `cd frontend && npm install` – sync UI dependencies whenever `package-lock.json` changes.
- `cd frontend && npm start` – run the React dev server proxied to `http://localhost:8080`.
- `cd frontend && npm test` – execute Jest/RTL suites in watch mode.

## Coding Style & Naming Conventions
Backend code uses 4-space indents, UpperCamelCase classes, and lowerCamelCase members; keep Spring annotations adjacent to the declaration they describe. Run `./mvnw spotless:apply` before committing for ktlint parity. Frontend TypeScript favors functional components per file, `.tsx` extensions, and the current feature-based folders. Run `npx prettier . --write` and `npx eslint .` inside `frontend/` to enforce formatting and lint rules.

## Testing Guidelines
Use JUnit 5 and Spring Boot test slices; name classes `<Thing>Tests` and methods `should<Action>When<Condition>()`. Place React specs next to components as `ComponentName.test.tsx` and rely on Testing Library queries (`screen.getByRole`). Cover the happy path plus one failure path per feature, and add integration tests for any DB change so `./mvnw verify` catches regressions.

## Commit & Pull Request Guidelines
Recent history (`git log`) shows informal messages; prefer concise imperative lines such as `horse: add stable assignment validation`. Keep the subject ≤ 60 characters, expand with details or migration steps in the body, and reference tickets via `Refs #123`. PRs should explain the change, attach screenshots or curl samples for UI/API updates, flag breaking changes, and list new environment variables.

## Security & Configuration Tips
Do not commit secrets; keep frontend overrides in `.env.local` and backend credentials in environment variables referenced by `application.properties`. Maintain `migrations/` in lockstep with schema updates so new developers inherit the same dev data. When gathering logs, redact customer identifiers before sharing them.
