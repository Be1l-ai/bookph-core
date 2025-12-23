# Quick Start: Using @bookph/core from GitHub

## ✅ Fixes Applied

The following critical issues have been fixed in `@bookph/core`:

1. ✅ Hardcoded monorepo paths now have fallbacks
2. ✅ All TypeScript configs use relative paths
3. ✅ Package.json properly configured for distribution
4. ✅ Comprehensive usage documentation added

## 🚀 Next Steps for Your App (bookph-web)

### 1. Update Your next.config.js

Ensure `@bookph/core` is in transpilePackages (already done ✅):

```js
const nextConfig = {
  transpilePackages: ["@bookph/core"],
  // ... rest of config
};
```

### 2. Reinstall the Package

If you had issues before, reinstall to get the fixes:

```bash
pnpm remove @bookph/core
pnpm add github:Be1l-ai/bookph-core
```

Or to use a specific commit:

```bash
pnpm add github:Be1l-ai/bookph-core#main
```

### 3. Generate Prisma Client

After installing, generate the Prisma client:

```bash
cd node_modules/@bookph/core
npx prisma generate
cd ../../..
```

Or from your project root:

```bash
npx prisma generate --schema=./node_modules/@bookph/core/prisma/schema.prisma
```

### 4. Verify Environment Variables

Ensure your `.env` has all required variables from `@bookph/core/.env.example`:

```bash
# Check what's needed
cat node_modules/@bookph/core/.env.example

# Compare with your .env
diff <(cat node_modules/@bookph/core/.env.example | grep "^[A-Z]" | cut -d= -f1 | sort) <(cat .env | grep "^[A-Z]" | cut -d= -f1 | sort)
```

### 5. Test the Build

```bash
pnpm build
# or
npm run build
```

If you get errors:

- **Module not found**: Check transpilePackages is set
- **TypeScript errors**: Add `"skipLibCheck": true` to tsconfig.json
- **Prisma errors**: Run `npx prisma generate` again

## 📚 Reference Documentation

- [PACKAGE_USAGE.md](./PACKAGE_USAGE.md) - Detailed usage guide
- [PACKAGE_FIXES_SUMMARY.md](./PACKAGE_FIXES_SUMMARY.md) - Technical details of fixes
- [README.md](./README.md) - General package information

## 🐛 Common Issues After Update

### Issue: "Cannot find module '@bookph/core/...'"

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

### Issue: TypeScript errors in node_modules

**Solution:**
Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### Issue: Prisma Client errors

**Solution:**

```bash
# Regenerate Prisma client
npx prisma generate --schema=./node_modules/@bookph/core/prisma/schema.prisma

# Or install in the package directory
cd node_modules/@bookph/core && npx prisma generate && cd ../..
```

### Issue: Runtime errors about missing translations

**Expected behavior** - The package now gracefully falls back to dynamic loading when translations aren't bundled. Check browser console for warnings.

**To fix:** Ensure `WEBAPP_URL` environment variable is set to your app's URL.

## ✅ Verification Checklist

Run through this checklist to verify everything works:

- [ ] Package installs without errors
- [ ] `pnpm build` or `npm run build` succeeds
- [ ] TypeScript has no compilation errors
- [ ] Prisma client is generated
- [ ] Development server starts: `pnpm dev`
- [ ] No runtime errors in browser console
- [ ] Database operations work (test a query)

## 🔄 Keeping Up to Date

To update to the latest version:

```bash
pnpm update @bookph/core
```

Or to a specific commit:

```bash
pnpm add github:Be1l-ai/bookph-core#<commit-hash>
```

## 💡 Tips

1. **Pin to commits in production**: Use specific commit hashes instead of `main` branch

   ```json
   {
     "dependencies": {
       "@bookph/core": "github:Be1l-ai/bookph-core#abc1234567890"
     }
   }
   ```

2. **Local development**: For active development on both packages, use workspace:\*

   ```json
   {
     "dependencies": {
       "@bookph/core": "workspace:*"
     }
   }
   ```

3. **Cache issues**: If you see stale code, clear all caches:
   ```bash
   rm -rf .next node_modules/.cache
   pnpm install
   ```

## 📞 Need Help?

- Check [PACKAGE_USAGE.md](./PACKAGE_USAGE.md) for detailed configuration
- Review [PACKAGE_FIXES_SUMMARY.md](./PACKAGE_FIXES_SUMMARY.md) for what was fixed
- Check GitHub issues: https://github.com/Be1l-ai/bookph-core/issues
