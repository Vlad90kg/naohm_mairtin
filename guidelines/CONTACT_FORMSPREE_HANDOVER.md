# Contact Form / Formspree Handover

## Current Setup
- Contact form submissions are sent to **Formspree**.
- No custom Laravel mail pipeline is required for current operation.

## Does the club need a Formspree account?
- **Yes**, if the club wants to own/manage submissions, spam settings, and destination email.
- If an agency/developer-owned endpoint is used, submissions still work, but control stays with that endpoint owner.

## Where the endpoint is configured
- Primary (editor-friendly, recommended): **Filament CMS**
  - `Content` -> `Contact Page Content` -> `Form` -> `endpoint`
- Backend default seed (used when CMS content does not exist yet):
  - env variable: `CONTACT_FORMSPREE_ENDPOINT` in backend `.env`
  - config: [contact.php](/home/vladikslon/PhpstormProjects/naohm_mairtin/new-backend/config/contact.php)
- Frontend fallback (safety fallback only):
  - env variable: `VITE_CONTACT_FORMSPREE_ENDPOINT`
  - code: [contact-form.ts](/home/vladikslon/PhpstormProjects/naohm_mairtin/frontend/src/app/config/contact-form.ts)

## What email receives submissions
- The recipient is controlled in the **Formspree form settings** for the endpoint currently configured.
- If endpoint is `https://formspree.io/f/xxxxx`, the inbox/destination email is whichever email is configured on that Formspree form.

## How to change recipient later
1. Log in to Formspree account that owns the form endpoint.
2. Update recipient email/routing in Form settings.
3. If switching to a different Formspree form, copy the new endpoint.
4. Update endpoint in Filament CMS (`Content` -> `Contact Page Content` -> `Form` -> `endpoint`).
5. Submit a test message from `/contact` and verify arrival.

## Frontend state handling
- Loading state: submit button disabled with spinner during request.
- Success state: toast + inline success message.
- Error state: toast + inline error message.

