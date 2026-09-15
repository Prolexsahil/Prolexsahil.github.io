/* =========================================================
   AI CONFIG
   ---------------------------------------------------------
   1. Get a free key at https://aistudio.google.com/apikey
   2. Paste it below.
   3. IMPORTANT: in Google Cloud Console → Credentials, restrict
      the key to "HTTP referrers" = https://prolexsahil.github.io/*
      and to the "Generative Language API" only. Keys in a static
      site are visible to anyone, so the restriction is what
      keeps it from being misused.
   If the key is empty or a request fails, the site answers
   from a built-in knowledge base instead (offline mode).
   ========================================================= */
window.SITE_CONFIG = {
  GEMINI_API_KEY: "",
  // Tried in order until one responds. Update if Google renames models.
  GEMINI_MODELS: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
  GITHUB_USER: "Prolexsahil"
};
