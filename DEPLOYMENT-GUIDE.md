# Keka's Blessings From Heaven — Deployment & Owner Guide

This is a fast, secure website with a built-in, no-code admin portal. Edits made in
the admin are saved to GitHub, and Netlify automatically rebuilds the live site.

- Site framework: Eleventy (static site generator)
- Admin portal: Decap CMS (no-code editor) at `/admin`
- Hosting: Netlify (connected to GitHub for automatic deploys)
- Payments: Stripe (global checkout, optional)
- Chat: WhatsApp button + Tawk.to live chat (optional)
- Forms: Netlify Forms (contact form submissions appear in your Netlify dashboard)

---

## Part 1 — Put the code on GitHub

Repository: `https://github.com/AngelGerena/kekas-blessings`

If the code is not yet pushed, upload the contents of this `kekas-blessings`
folder to that repository (do NOT upload the `node_modules` or `_site` folders —
they are generated automatically).

---

## Part 2 — Connect Netlify (automatic deploys)

1. Go to https://app.netlify.com and log in (you can sign in with GitHub).
2. Click **Add new site → Import an existing project → GitHub**.
3. Authorize Netlify and pick the `kekas-blessings` repository.
4. Netlify reads `netlify.toml`, so the build settings are already correct:
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Functions directory: `netlify/functions`
5. Click **Deploy**. In about a minute your site is live on a temporary
   `*.netlify.app` address.

---

## Part 3 — Turn on the no-code Admin Portal (login for Keka)

The admin lets Keka edit everything without touching code. It uses Netlify
Identity for secure email/password login.

1. In Netlify, open your site → **Integrations / Identity** and click
   **Enable Identity**.
2. Under **Identity → Registration**, set it to **Invite only** (recommended).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
   (This is what lets the admin save changes back to GitHub.)
4. Under **Identity → Emails**, you can customize the invite email (optional).
5. Click **Invite users** and enter Keka's email address.
6. Keka opens the invite email, sets a password, and is taken straight to the
   editor at `https://YOUR-SITE/admin/`.

From then on, Keka just visits `yourdomain.com/admin`, logs in, and edits.

---

## Part 4 — Connect the custom domain (kekasblessing.com)

1. In Netlify: **Domain management → Add a domain** → enter `kekasblessing.com`.
2. Follow Netlify's instructions to point the domain's DNS to Netlify
   (either change the nameservers at GoDaddy, or add the A / CNAME records
   Netlify shows you).
3. Netlify provisions a free HTTPS certificate automatically.

---

## Part 5 — Turn on Stripe payments (when ready)

The site is already wired for Stripe. To activate online payments:

1. In your Stripe Dashboard, copy your **Secret key** (starts with `sk_live_`
   for live mode, or `sk_test_` to test first).
2. In Netlify: **Site settings → Environment variables → Add a variable**:
   - Key: `STRIPE_SECRET_KEY`
   - Value: your Stripe secret key
   - (Optional) Key: `STRIPE_CURRENCY`, Value: `usd` (or another currency)
3. Trigger a redeploy (Netlify → Deploys → Trigger deploy).
4. In the Admin Portal → **Pages & Settings → Branding** → turn ON
   **Enable Online Payments (Stripe)** and save.
5. "Buy Online" buttons now appear on the Services page. Stripe Checkout
   automatically supports cards, Apple Pay, Google Pay, and many regions.

Security note: the secret key lives only in Netlify's environment variables and
is never exposed on the website. Never paste a secret key into the code or admin.

---

## Part 6 — Turn on live chat (Tawk.to, free)

1. Create a free account at https://www.tawk.to and add a property.
2. In Tawk.to → **Administration → Channels / Chat Widget**, find your
   **Property ID** and **Widget ID** (they appear in the widget embed code).
3. In the Admin Portal → **Pages & Settings → Branding**, paste them into
   **Tawk.to Property ID** and **Tawk.to Widget ID**, and save.
4. Install the Tawk.to mobile app to chat with visitors from your phone.

The WhatsApp button works immediately using the WhatsApp number in the admin.

---

## Everyday editing (for Keka)

Visit `yourdomain.com/admin` and log in. You can:

- Upload a logo or switch between the text logo and an image logo
- Change brand colors, phone, WhatsApp number, social links
- Edit the home page banner, about section, and all page text
- Add, edit, reorder, or remove services and prices
- Create promo cards and offer buttons
- Add client reviews and gallery photos
- Edit the legal policy pages

After you click **Publish**, the live site updates automatically in about a minute.

You cannot break the layout — you are only editing content in safe form fields.
