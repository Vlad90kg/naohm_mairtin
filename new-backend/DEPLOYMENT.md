# Deployment

This backend is currently set up to use SQLite for local development and is ready to be pointed at MySQL for production. This document covers cPanel-oriented deployment steps only. It does not migrate production data for you.

## Local Development

Local development should continue using SQLite.

Example local database settings:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

Do not delete `database/database.sqlite`.

## Production MySQL Setup (cPanel)

1. In cPanel, create a MySQL database.
2. Create a MySQL user with a strong password.
3. Add that user to the database with full privileges.
4. Note the exact cPanel-prefixed values, for example:
   - database: `accountname_appdb`
   - username: `accountname_appuser`
5. In production, set the Laravel database env vars to the MySQL values:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.example

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=accountname_appdb
DB_USERNAME=accountname_appuser
DB_PASSWORD=your-strong-password
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```

6. Ensure the deployed PHP build has:
   - `pdo`
   - `pdo_mysql`
   - `mbstring`
   - `openssl`
   - `json`
   - `fileinfo`

## Production Commands

Run these from the Laravel app root after the production `.env` is in place:

```bash
php artisan config:clear
php artisan migrate --force
php artisan storage:link
php artisan optimize:clear
```

Recommended order:

1. `php artisan config:clear`
2. `php artisan migrate --force`
3. `php artisan storage:link`
4. `php artisan optimize:clear`

## Production Safety Warning

Never run this command on production:

```bash
php artisan migrate:fresh
```

`migrate:fresh` drops all tables before recreating them.

## Migration Audit Notes

The current migration set does not contain any obvious MySQL-incompatible schema definitions. The tables use standard Laravel column types, foreign keys, booleans, JSON, text, and timestamps that are compatible with modern MySQL.

Points to be aware of:

1. The app currently uses `SESSION_DRIVER=database`, `QUEUE_CONNECTION=database`, and `CACHE_STORE=database` in `.env.example`.
2. This repository includes a cache table migration, but it does not currently include session-table or jobs-table migrations.
3. If production will keep database-backed sessions or queues, add the relevant Laravel migrations before deployment:
   - `php artisan session:table`
   - `php artisan queue:table`
4. If you do not want database-backed sessions or queues in production, set those drivers explicitly in production `.env` instead.

## What This Change Does Not Do

- It does not modify your real `.env`.
- It does not switch local development away from SQLite.
- It does not delete or recreate any database files.
- It does not perform a production data migration.
