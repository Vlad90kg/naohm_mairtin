# Frontend Preview Deployment

Build the preview frontend:

```bash
npm run build
```

This project is configured with Vite `base: '/preview/'`, so production assets are emitted as `/preview/assets/...`.

Deployment steps:

1. Upload the contents of `frontend/dist/` to `/home/n606379/public_html/preview/`.
2. Copy `frontend/preview.htaccess` to `/home/n606379/public_html/preview/.htaccess`.
3. Keep `/home/n606379/public_html/index.html` unchanged so the under-construction main domain page remains active.

API base URL for production is read from `VITE_API_BASE_URL` in `frontend/.env.production` and currently points to:

`http://www.naomhmairtin.com/backend/api`

If HTTPS is available and stable in production, you can switch it to:

`https://www.naomhmairtin.com/backend/api`
