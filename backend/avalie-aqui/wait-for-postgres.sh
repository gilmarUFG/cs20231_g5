#!/bin/sh

# wait-for-postgres.sh
until PGPASSWORD=avalieaqui PGUSER=avalieaqui PGHOST=postgres-avalieaqui PGDATABASE=avalieaqui psql -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up"
bash -c "npx prisma migrate dev"
exec "$@"