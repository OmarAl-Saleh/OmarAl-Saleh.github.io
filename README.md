# Omar Al-Saleh — Portfolio

A single-page academic portfolio using HTML, CSS, JavaScript, and Vite. Fonts are bundled locally. Research interests use a formal text-based layout; no images are needed for that section.

## Local preview

Open a terminal in this folder:

```powershell
npm install
npm run dev
```

Open the address printed in the terminal (usually http://127.0.0.1:5173). Keep the terminal open. Press Ctrl+C to stop. If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`.

To preview the production build:

```powershell
npm run build
npm run preview
```

## Add your portrait

Copy your professional portrait to **public/images/portrait.jpeg** (exact lowercase name, .jpeg extension). Suggested dimensions: 1200 x 1500 pixels. The portrait is cropped to fit; keep important content near the center. Refresh after adding it and rebuild before publication.

The portrait is the only portfolio image. Research, publications, and projects use text-only layouts. Every navigation link scrolls within the homepage.

## Color themes

Dark mode is the default for first-time visitors. A saved theme preference takes precedence. Use the header icon button to cycle through System, Light, and Dark. Its tooltip identifies the current mode and next mode. System follows your device appearance, including changes while the page is open. Your choice is saved in the browser. Photographs and screenshots keep their original colors in every theme.

## CV

The original uploaded PDF is copied unchanged to **public/documents/Omar-Al-Saleh-CV.pdf**. The website omits TraceWeaver and teaching; the original downloadable CV still contains both. Replace this PDF at the same path if you prepare a revised public CV.

## Editing

- `index.html`: biography, GPA, dates, experience, links.
- `styles.css`: colors, typography, spacing, responsive layout.
- `script.js`: navigation, portrait loading.
- `public/images/`: your JPEG assets.

The GPA and academic details reflect the provided CV. Update the doctoral GPA here as your record changes. No unpublished research results have been added.

## Publish to GitHub Pages

The included `.github/workflows/deploy.yml` builds and deploys the site when pushed to `main`. In your GitHub repository, select **Settings → Pages → Source → GitHub Actions**. Then push the project to `main` or run the workflow manually. Do not upload `node_modules` or `dist`.

The relative Vite base supports both `USERNAME.github.io` and `USERNAME.github.io/REPOSITORY/` addresses. The site has not been published by this implementation.

## Before publication

Add your portrait, review the CV, and check your academic information. Test the mobile menu, contact links, locally. Use the production preview to check the final build.
