# networth_tracker
client/src/ — Frontend (React + TypeScript)

App.tsx — Router with all page routes
index.css — Global dark theme styles
pages/ — Dashboard, Assets, Liabilities, Transactions, Reports, Settings, Auth
components/ — BottomNav, PageHeader, CreateAssetDialog, CreateLiabilityDialog, CreateTransactionDialog, + all shadcn UI components
hooks/ — use-auth, use-assets, use-liabilities, use-transactions, use-dashboard
lib/ — queryClient, utils
server/ — Backend (Express + TypeScript)

routes.ts — All API endpoints (auth, assets, liabilities, transactions, dashboard)
storage.ts — Database access layer
auth.ts — Passport.js session auth
db.ts — Drizzle ORM + PostgreSQL connection
index.ts — Server entry point
shared/ — Shared types used by both frontend & backend

schema.ts — Drizzle table definitions + Zod schemas
routes.ts — Typed API contract
