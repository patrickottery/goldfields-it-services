# Goldfields IT Services

Static website for Goldfields IT Services.

## Editing the navbar or footer

- **Navbar:** Edit `partials/navbar.html` — all pages load it from this single file.
- **Footer:** Edit `partials/footer.html` — all pages load it from this single file.

No need to change each page when you update links, contact details, or layout.

## Running locally

The navbar and footer are loaded with JavaScript. For that to work, open the site over HTTP (not by double‑clicking the HTML file). For example:

- **VS Code:** Use the “Live Server” extension and “Go Live”.
- **Command line:** From this folder run `npx serve` or `python -m http.server 8000`, then open `http://localhost:8000` (or the port shown).

If you open `index.html` directly from the file system, the shared navbar and footer may not appear.
