# Naomh Mairtin Backend

This Laravel + Filament backend powers the private club CMS at `/backend/admin`.

## Admin access

- Filament login is email + password only.
- There is no public registration page.
- Only users with `is_admin = true` and `is_active = true` may access the admin panel.
- Only users with `is_super_admin = true` may manage admin accounts.

## Password reset

- The Filament login page includes a standard Laravel password reset flow.
- Reset emails depend on working mail delivery.
- If `MAIL_MAILER=log`, reset emails are written to logs and will not reach real admins.
- Production must use a real SMTP mailbox in `.env`.

## Local password reset testing

Use this when testing on localhost (`http://127.0.0.1:8000`):

1. Start Laravel:
   `php artisan serve`
2. Confirm local `.env` includes:
   `APP_URL=http://127.0.0.1:8000`
   `MAIL_MAILER=log`
3. Clear config:
   `php artisan optimize:clear`
4. Open:
   `http://127.0.0.1:8000/admin/password-reset/request`
5. Enter an email that exists in your local `users` table.
6. Open:
   `storage/logs/laravel.log`
7. Search for the password reset email and copy the reset URL.
8. Open the reset URL in browser and set a new password.

Important:
- Do not open `/admin/password-reset/reset` by itself.
- Always use the full Reset Password URL (including `email`, `token`, and `signature`).
- If copied from HTML, replace `&amp;` with `&`.

Local helper command:

```bash
php artisan mail:test-reset admin@example.com
```

- Sends a password reset notification to the specified existing user.
- Prints the full reset URL directly in terminal as plain text.
- If `MAIL_MAILER=log`, the email is also written to `storage/logs/laravel.log`.

Optional token validation:

```bash
php artisan mail:test-reset admin@example.com --validate-token
```

- Prints `tokenExists=true` when the generated raw token matches broker validation.

## Optional Mailpit (local inbox)

You can use Mailpit instead of `MAIL_MAILER=log`.

```env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=admin@example.com
MAIL_FROM_NAME="Naomh Mairtin CMS"
```

Mailpit UI:
`http://localhost:8025`

Example production mail settings:

```env
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=admin-mailbox@example.com
MAIL_PASSWORD=your-smtp-password
MAIL_FROM_ADDRESS=admin-mailbox@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Production warning:
- Do not run production with `MAIL_MAILER=log`.
- Real admins will only receive reset emails when SMTP is configured with valid credentials.

## Emergency admin user command

For emergency recovery, a developer can create or reset an admin user non-interactively:

```bash
php artisan admin:user --name="Admin" --email="admin@example.com" --password="StrongPassword" --super
```

- This command creates the user if missing.
- If the user already exists, it updates the password and admin flags.
- `--super` grants super-admin access.

## Production commands

```bash
php artisan migrate --force
php artisan optimize:clear
```
