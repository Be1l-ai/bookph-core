# bookph-core

Core package for BookPH - contains Prisma schema, types, utilities, and shared business logic.

## Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher
- PostgreSQL database (Supabase recommended)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Be1l-ai/bookph-core.git
   cd bookph-core
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   - `DATABASE_URL` - Your PostgreSQL connection string (pooler)
   - `DATABASE_DIRECT_URL` - Your PostgreSQL direct connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -hex 32`
   - `EMAIL_*` - Your SMTP credentials

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database (development)
   npx prisma db push
   
   # OR run migrations (production)
   npx prisma migrate deploy
   ```

5. **Build the package**
   ```bash
   pnpm build
   ```

## Development

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Format Prisma schema
npx prisma format

# View database in Prisma Studio
npx prisma studio
```

## Database Setup Notes

- **Supabase Users**: Use the pooler URL for `DATABASE_URL` (port 6543)
- **Direct Connection**: Only needed for migrations, use port 5432
- **IPv6 Issues**: If you get "Network is unreachable", ensure you're using the pooler connection

## Package Structure

```
bookph-core/
├── prisma/           # Prisma schema and migrations
├── platform/         # Platform-specific code
├── packages/         # Shared packages
├── lib/              # Utility libraries
└── types/            # TypeScript type definitions
```

## Troubleshooting

### Prisma Client Not Found
```bash
npx prisma generate
```

### Database Connection Issues
- Verify `DATABASE_URL` credentials
- Check if database allows connections from your IP
- For Supabase, use the pooler URL (port 6543)

### TypeScript Errors
```bash
pnpm install
pnpm build
```