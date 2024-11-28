```
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output ./prisma/migrations/0001_create_session_table.sql
```

```
wrangler d1 migrations apply envoy-db --local
wrangler d1 migrations apply envoy-db --remote
```