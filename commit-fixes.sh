#!/bin/bash

# Commit all package.json export fixes
git add package.json
git commit -m "fix: add comprehensive export mappings for all @bookph/core imports

- Map all internal package paths (atoms, ee, config, dayjs, emails, etc)
- Ensure consuming apps can resolve @bookph/core/* imports correctly
- Paths mapped: atoms→platform/atoms, ee→features/ee, dayjs, emails, embed-react, features, lib, platform, prisma, sms, trpc, types, web"

git push origin main
