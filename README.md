# Sahil Gawande · Portfolio

Static site, no build step. Works on GitHub Pages as is.

## Deploy
1. Create a repo named **Prolexsahil.github.io** (exactly your username).
2. Upload everything in this folder (index.html, css/, js/, assets/) to the repo root.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Live in a minute or two at https://prolexsahil.github.io

## Turn on the Gemini assistant (free)
1. Get a key at https://aistudio.google.com/apikey
2. Paste it into `js/config.js` → `GEMINI_API_KEY`.
3. **Restrict the key** (Google Cloud Console → APIs & Services → Credentials → your key):
   - Application restriction: HTTP referrers → `https://prolexsahil.github.io/*`
   - API restriction: Generative Language API only
   Anyone can read a key in a static site; the restriction stops it being used elsewhere.

Without a key the assistant, terminal `ask` and "Explain with AI" still work from a built-in knowledge base.

## Editing content
All text (projects, education, skills graph) lives in `js/data.js`.
