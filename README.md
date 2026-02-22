# မြန်မာ Burmese Study

## Quick Start (Local)

```bash
cd burmese-app
npm install
npm run dev
```
Opens at `http://localhost:5173`

## Deploy to GitHub Pages

### One-time setup:
1. Create a new repo on GitHub (e.g. `burmese-study`)
2. Edit `vite.config.js` — set `base` to your repo name:
   ```js
   base: '/burmese-study/',
   ```
3. Push the code:
   ```bash
   cd burmese-app
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/burmese-study.git
   git push -u origin main
   ```

### Deploy:
```bash
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/burmese-study/`

### Or use GitHub Actions (auto-deploy on push):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```
Then enable Pages in repo Settings → Pages → Source: GitHub Actions.
