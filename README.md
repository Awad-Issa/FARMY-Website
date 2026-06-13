# FARMY Website

Arabic-first corporate website for FARMY — Agricultural and Livestock Solutions.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma ORM + MySQL

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update values:

```bash
# macOS / Linux / Git Bash
cp .env.example .env

# Windows PowerShell
copy .env.example .env
```

Set your MySQL connection string:

```
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/farmy"
```

Create the database first:

```sql
CREATE DATABASE farmy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Set up the database

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

- URL: `/admin`
- Default credentials (after seed): `admin` / `admin123`

Change credentials in production via `.env`:

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=long-random-secret
```

## Site Structure

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/products` | Product catalog with search & filters |
| `/products/[slug]` | Product details + WhatsApp inquiry |
| `/about` | About FARMY |
| `/contact` | Contact information |
| `/admin` | Protected admin dashboard |

## WhatsApp Configuration

Update in `.env`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=966500000000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:push` | Push schema without migration |

## Architecture

```
src/
├── app/           # Routes (App Router)
├── components/    # UI components
├── lib/           # Utilities, auth, services
└── modules/       # Future feature modules (RFID, analytics, etc.)
```

Catalog logic lives in `src/lib/services/catalog.ts` — extend here or add new services under `src/lib/services/` for future modules.
