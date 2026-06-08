# Jammming
In this project, you will build a React web application called Jammming. You will use your knowledge of React components, passing state, and requests with the Spotify API to build a website that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.

---
<img width="438" height="329" alt="jamming-project-four-three-preview" src="https://github.com/user-attachments/assets/e142e4f9-2471-4f1e-b9ae-d63853408ee7" />


## Project Requirements
Build a web app using React
Version control your application with Git and host the repository on GitHub
Integrate with Spotify or another API
Deploy your application
Write a README (using Markdown) that documents your project, including:
The purpose of your project
Technologies used

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)


## Features
Future work
Features:
Users can search for songs by song title.
You can also include functionality to search by other attributes like artist’s name, genre, etc.
Users can see information about each song like title, artist, and album for songs they queried
You can also include other information – the design is up to you
Users can export their custom playlist to their personal Spotify account

## Prerequisites:
* HTML
* CSS
* JavaScript
* React
HTTP Requests and Responses
Authentication
