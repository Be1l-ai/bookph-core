# @bookph/core Package Usage Guide

## Overview

`@bookph/core` is a TypeScript-based package that exports raw source files for maximum flexibility. This guide explains how to properly consume this package in your applications.

## Installation

### From GitHub

```bash
pnpm add github:Be1l-ai/bookph-core
# or
npm install github:Be1l-ai/bookph-core
# or
yarn add github:Be1l-ai/bookph-core
```

### As Workspace Dependency (Monorepo)

```json
{
  "dependencies": {
    "@bookph/core": "workspace:*"
  }
}
```

## Configuration Requirements

### 1. Transpilation Setup

Since this package exports raw TypeScript files, your build tool must transpile it.

#### Next.js

```js
// next.config.js
module.exports = {
  transpilePackages: ["@bookph/core"],
  // ... other config
};
```

#### Vite

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ["@bookph/core"],
  },
};
```

#### Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@bookph/core"),
        ],
        use: "ts-loader",
      },
    ],
  },
};
```

### 2. TypeScript Configuration

Your `tsconfig.json` should include:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 3. Environment Variables

Copy `.env.example` from this package and configure:

```bash
# Required for database operations
DATABASE_URL="postgresql://..."
DATABASE_DIRECT_URL="postgresql://..."

# Required for auth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Required for email (if using email features)
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-password"
```

## Package Exports

This package uses wildcard exports, allowing you to import any file:

```typescript
// Import from lib
import { logger } from "@bookph/core/lib/logger";

// Import from features
import { someFeature } from "@bookph/core/features/someFeature";

// Import from platform
import { platformUtil } from "@bookph/core/platform/utils";

// Import Prisma client
import { prisma } from "@bookph/core/lib/prisma";
```

## Known Limitations

### 1. i18n Translations

The `lib/server/i18n.ts` file attempts to load English translations from a monorepo path. When used as an external package, it falls back to dynamic loading.

**Workaround:** Either:

- Provide your own translation files
- Configure the `WEBAPP_URL` environment variable to point to your translation endpoint
- Accept that English translations will be loaded dynamically via HTTP

### 2. TypeScript Config References

All `tsconfig.json` files now use relative paths to the internal `tsconfig/` directory, which should work when the package is installed from GitHub.

## Prisma Usage

This package includes a Prisma schema. After installation:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if you control the database)
npx prisma migrate deploy

# Or push schema changes (development)
npx prisma db push
```

## Common Issues

### "Cannot find module '@bookph/core/...'"

- Ensure the package is installed: `pnpm install`
- Verify your build tool is configured to transpile `@bookph/core`
- Check that your import path is correct

### TypeScript errors in node_modules/@bookph/core

- Add `"skipLibCheck": true` to your `tsconfig.json`
- Ensure you have compatible TypeScript version (5.x recommended)

### Prisma Client errors

```bash
# Regenerate Prisma client
npx prisma generate

# Ensure DATABASE_URL is set
echo $DATABASE_URL
```

### Build/Runtime errors about missing modules

Some dependencies might be peer dependencies. Install them in your project:

```bash
pnpm add @prisma/client zod tslog
```

## Development Workflow

When developing features in `@bookph/core` and consuming in another app:

1. Make changes in `@bookph/core`
2. No build step needed (raw TS files are used)
3. Consuming app will pick up changes immediately (hot reload may need restart)

## Best Practices

1. **Pin versions**: Use specific commit hashes when installing from GitHub

   ```json
   {
     "dependencies": {
       "@bookph/core": "github:Be1l-ai/bookph-core#abc1234"
     }
   }
   ```

2. **Environment isolation**: Don't share `.env` files between core and consuming apps

3. **Type safety**: Import types explicitly for better IDE support

   ```typescript
   import type { User } from "@bookph/core/types";
   ```

4. **Prisma schema**: If you modify the Prisma schema, regenerate:
   ```bash
   cd node_modules/@bookph/core
   npx prisma generate
   ```

## Support

For issues specific to package consumption, check:

1. This guide
2. The main [README.md](./README.md)
3. GitHub issues at https://github.com/Be1l-ai/bookph-core/issues
