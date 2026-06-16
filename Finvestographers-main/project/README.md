# Deploying this Vite app to GitHub Pages

This project includes scripts and a GitHub Actions workflow to publish the built `dist` folder to GitHub Pages.

Quick setup

- Update `package.json` `homepage` to your Pages URL, for example:

  https://<GITHUB_USERNAME>.github.io/<REPO_NAME>

- Install the `gh-pages` package locally:

```bash
npm install --save-dev gh-pages
```

- To deploy manually from your machine:

```bash
npm run predeploy
npm run deploy
```

- Or push to `main` — the workflow at `.github/workflows/gh-pages.yml` will build and publish automatically.

Notes

- `vite.config.ts` reads the `homepage` field and sets the `base` automatically so routes and assets load correctly when served from `/REPO_NAME/`.
- The workflow uses the built-in `GITHUB_TOKEN` so no extra secrets are required for standard Pages deployment.
