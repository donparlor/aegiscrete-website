# AegisCrete corporate website

Static corporate one-page website for AegisCrete, designed for GitHub Pages and the root domain `aegiscrete.ca`.

## Current status

**Preview build.** The repository is safe to publish for design review, but three production gates remain intentionally disabled:

1. search indexing;
2. the public contact email;
3. the root-domain `CNAME` file.

## Repository structure

```text
.
├── index.html
├── 404.html
├── SITE_SETUP.md
├── .nojekyll
├── CNAME.example
├── robots.txt
├── robots.production.txt
├── sitemap.xml
├── site.webmanifest
└── assets
    ├── brand
    │   ├── aegiscrete-mark.svg
    │   └── favicon.svg
    ├── css
    │   └── styles.css
    ├── images
    │   ├── infrastructure-network.svg
    │   └── social-card.png
    └── js
        ├── site-config.js
        └── main.js
```

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## GitHub Pages dry-run

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**.
4. Save.
5. Review the temporary GitHub Pages URL before connecting the domain.

## Public-launch checklist

### 1. Add the contact email

Edit `assets/js/site-config.js`:

```js
window.AEGISCRETE_SITE = Object.freeze({
  preview: false,
  contactEmail: "PUBLIC_EMAIL_ADDRESS",
  publishToolLink: false,
  toolUrl: "https://demo.aegiscrete.ca"
});
```

### 2. Allow indexing

In `index.html`, replace:

```html
<meta name="robots" content="noindex,nofollow">
```

with:

```html
<meta name="robots" content="index,follow">
```

Then replace `robots.txt` with the contents of `robots.production.txt`.

### 3. Connect the root domain

Rename `CNAME.example` to `CNAME`. The file already contains:

```text
aegiscrete.ca
```

Then configure GitHub Pages and the DNS records for the root domain.

## Content-control rules

This public website is sanitized corporate material. Do not add:

- client, operator or project identifiers;
- report numbers, locations or report-derived images;
- confidential client information;
- proprietary formulations or detailed eligibility logic;
- unverified performance values;
- claims that any tool is an approved engineering or repair-prescription system.

Any diagnostic decision-support demonstration must remain clearly identified as a prototype and must not be linked publicly until disclosure is approved.

## Brand asset note

The included vector mark is a clean working recreation for the initial layout. Replace it with the approved master logo file before public launch if the official artwork differs.

## Technology

- semantic HTML5;
- custom responsive CSS;
- lightweight vanilla JavaScript;
- no framework;
- no external font or script dependency;
- compatible with GitHub Pages.
