# Shourya Engineering Autobody — Website

Static website (HTML + CSS + JS). No build step, no server code, no database.

## Project structure

Keep `index.html` and the hosting configuration files in the project root; static hosts expect them there.

```text
.
├── index.html
├── favicon.svg
├── robots.txt
├── .well-known/
│   └── security.txt
├── assets/
│   ├── logo.svg
│   ├── css/
│   │   └── style.css
│   ├── images/vehicles/
│   └── js/
│       ├── config.js
│       └── main.js
└── security-configs/
    └── nginx.conf.example
```

`_headers`, `vercel.json` and `.htaccess` are root-level hosting configuration files. `security-configs/` contains server-specific examples, not website assets. Keep only `security.txt` in `.well-known/`.

## Run locally
Best: run `python -m http.server` in this folder and open http://localhost:8000.
Double-clicking `index.html` also works in most browsers.

## Make changes
- **Phone numbers, email, address, WhatsApp, vehicle gallery** -> edit `assets/js/config.js` only.
- **Texts / headings** -> edit `index.html`.
- **Colours** -> top of `assets/css/style.css` (`--red`, `--amber`, `--ink`).

## Replace photos
Put new JPG/PNG/WebP photos in `assets/images/vehicles/` (about 1400 px wide).
Keep the same file name to replace one, or add a new entry in `vehicles` in `assets/js/config.js`.
Image paths must stay inside `assets/images/` (the site blocks anything else on purpose).

## Security (already built in)
- **Content-Security-Policy**: only this site's own scripts and styles run. Google Fonts and Google Maps are the only outside sources allowed, so injected scripts are blocked.
- **No backend, no database, no login**: nothing for a hacker to break into. The quote form only opens WhatsApp or email.
- **Input cleaning**: name, vehicle and message are stripped of `<` `>` and control characters and length-limited; the phone field accepts digits only; all text shown on the page is escaped.
- **Anti-clickjacking**: the site cannot be embedded inside another website.
- **Safe links**: WhatsApp and Maps open with `noopener noreferrer`.
- **Server headers** (HTTPS-only, no content sniffing, no framing, etc.) are included for every host:
  - Netlify / Cloudflare Pages: `_headers` (automatic)
  - Vercel: `vercel.json` (automatic)
  - Apache / cPanel hosting: `.htaccess` (upload with the files)
  - nginx VPS: `security-configs/nginx.conf.example`
- After going live, test at https://securityheaders.com and https://observatory.mozilla.org (aim for A or A+).

### Your own checklist (most real hacks happen here, not in the code)
1. Use hosting with free **HTTPS** (Cloudflare Pages, Netlify, Vercel).
2. Turn on **2-step verification** for hosting, domain registrar, GitHub and Gmail; use unique strong passwords.
3. Put the domain behind **Cloudflare** (free): DDoS protection, bot filter, auto-HTTPS.
4. Never put passwords or API keys inside these files (this site needs none).
5. Keep a backup zip of this folder somewhere safe.

## Launch (free options)
- **GitHub Pages**: push to the `main` branch; the included GitHub Actions workflow publishes the site automatically. Find the URL under the repository's **Settings → Pages** after the first deployment.
- **Netlify Drop**: app.netlify.com/drop, drag this whole folder in.
- **Cloudflare Pages / Vercel / GitHub Pages**: upload the folder and publish.
- Own domain: buy one (e.g. shouryaautobody.in) and connect it in the host's settings.
