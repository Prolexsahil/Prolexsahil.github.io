(() => {
"use strict";

const P = window.PROFILE, PROJ = window.PROJECTS, CFG = window.SITE_CONFIG || {};
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const mouse = { x: -9999, y: -9999, active: false };

/* =========================================================
   BOOT SEQUENCE (the one orchestrated moment)
   ========================================================= */
function boot() {
  const el = $("#boot"), txt = $("#boot-text");
  if (reduced || sessionFlag()) { el.remove(); return Promise.resolve(); }
  const lines = [
    "loading tokenizer .............. <b>ok</b>",
    "mounting indictalk ............. <b>1,328,602 convs</b>",
    "scripts: देवनागरी বাংলা ગુજરાતી தமிழ் తెలుగు",
    "waking the fireflies ........... <b>ok</b>"
  ];
  return new Promise(res => {
    let i = 0;
    const step = () => {
      if (i < lines.length) { txt.innerHTML += lines[i++] + "\n"; setTimeout(step, 230); }
      else setTimeout(() => { el.classList.add("done"); setTimeout(() => el.remove(), 500); res(); }, 280);
    };
    step();
    el.addEventListener("click", () => { el.classList.add("done"); setTimeout(() => el.remove(), 500); res(); }, { once: true });
  });
}
// only show boot once per tab session (in-memory flag via window.name, no storage APIs)
function sessionFlag() { if (window.name === "sg-booted") return true; window.name = "sg-booted"; return false; }

/* =========================================================
   FIREFLIES + CURSOR LIGHT
   ========================================================= */
function fireflies() {
  const c = $("#fireflies"), ctx = c.getContext("2d"), light = $("#cursor-light");
  let W, H, dpr, flies = [];
  const count = () => Math.round(Math.min(110, (innerWidth * innerHeight) / 16000));
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = reduced ? 40 : count();
    while (flies.length < n) flies.push(newFly());
    flies.length = n;
  }
  function newFly() {
    return { x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: 0, vy: 0,
      a: Math.random() * Math.PI * 2, sp: .15 + Math.random() * .35, r: .8 + Math.random() * 1.8,
      ph: Math.random() * Math.PI * 2, blink: .006 + Math.random() * .02, warm: Math.random() < .75 };
  }
  addEventListener("resize", resize); resize();
  addEventListener("pointermove", e => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
    if (e.pointerType === "mouse") { light.style.opacity = 1; light.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }
  });
  document.addEventListener("pointerleave", () => { mouse.active = false; light.style.opacity = 0; });

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const R = 170;
    for (const f of flies) {
      f.a += (Math.random() - .5) * .25;
      let ax = Math.cos(f.a) * f.sp * .05, ay = Math.sin(f.a) * f.sp * .05;
      const dx = mouse.x - f.x, dy = mouse.y - f.y, d = Math.hypot(dx, dy);
      let near = 0;
      if (mouse.active && d < R) {
        near = 1 - d / R;
        // gentle swirl toward the cursor
        ax += (dx / d) * near * .06 - (dy / d) * near * .05;
        ay += (dy / d) * near * .06 + (dx / d) * near * .05;
      }
      f.vx = (f.vx + ax) * .96; f.vy = (f.vy + ay) * .96;
      f.x += f.vx + Math.cos(f.a) * f.sp * .3; f.y += f.vy + Math.sin(f.a) * f.sp * .3;
      if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20;
      if (f.y < -20) f.y = H + 20; if (f.y > H + 20) f.y = -20;
      f.ph += f.blink;
      const glow = Math.max(0, Math.sin(f.ph)) * .8 + .15 + near * .9;
      const col = f.warm ? "242,208,107" : "143,179,255";
      const rad = f.r * (3 + near * 4);
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad * 3);
      g.addColorStop(0, `rgba(${col},${Math.min(1, glow)})`);
      g.addColorStop(.25, `rgba(${col},${glow * .35})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, rad * 3, 0, 7); ctx.fill();
      if (near > .15) {
        ctx.strokeStyle = `rgba(${col},${near * .22})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    if (!reduced) requestAnimationFrame(frame);
  }
  frame();
}

/* =========================================================
   TYPED ROLE LINE
   ========================================================= */
function typed() {
  const el = $("#typed");
  const words = ["chatbots for Indian languages.", "datasets at million-conversation scale.", "models that run offline on small devices.", "simulators from page tables up."];
  if (reduced) { el.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1800); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 28 : 55);
  })();
}

/* =========================================================
   3D INDIC GLYPH SPHERE (no overlaps)
   ========================================================= */
function glyphSphere() {
  const canvas = $("#glyphs"), ctx = canvas.getContext("2d"), orb = $("#orb");
  const scripts = [
    ["Devanagari", "अ क ग त न म र स ह ज्ञ ॐ"],
    ["Bengali", "অ ক গ ত ন ম র স হ"],
    ["Gujarati", "અ ક ગ ત ન મ ર સ"],
    ["Gurmukhi", "ਅ ਕ ਗ ਤ ਨ ਮ ਰ ਸ"],
    ["Tamil", "அ க ங த ந ம ர ழ"],
    ["Telugu", "అ క గ త న మ ర స"],
    ["Kannada", "ಅ ಕ ಗ ತ ನ ಮ ರ ಸ"],
    ["Malayalam", "അ ക ഗ ത ന മ ര സ"],
    ["Odia", "ଅ କ ଗ ତ ନ ମ ର ସ"]
  ];
  // interleave scripts so neighbours on the sphere differ
  const pools = scripts.map(([name, s]) => s.split(" ").map(ch => ({ ch, name })));
  const items = [];
  for (let k = 0; items.length < 76; k++) {
    const pool = pools[k % pools.length];
    const g = pool[(Math.floor(k / pools.length)) % pool.length];
    items.push({ ...g, a: 0 });
  }
  const N = items.length, golden = Math.PI * (3 - Math.sqrt(5));
  items.forEach((it, i) => {
    const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = golden * i;
    it.x = Math.cos(th) * rr; it.y = y; it.z = Math.sin(th) * rr;
  });

  let S, dpr, rotY = 0, rotX = -.25, velY = reduced ? 0 : .0035, velX = 0, drag = null, hover = null;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); S = orb.clientWidth;
    canvas.width = S * dpr; canvas.height = S * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(resize).observe(orb); resize();

  canvas.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    hover = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!drag) return;
    velY = (e.clientX - drag.x) * .0009; velX = (e.clientY - drag.y) * .0009;
    rotY += velY * 4; rotX += velX * 4; rotX = Math.max(-1.2, Math.min(1.2, rotX));
    drag = { x: e.clientX, y: e.clientY };
  });
  const end = () => { drag = null; };
  canvas.addEventListener("pointerup", end); canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", () => { hover = null; });

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(frame); }).observe(orb);

  function frame() {
    if (!visible) return;
    if (!drag) { velY += ((reduced ? 0 : .0035) - velY) * .02; velX *= .95; rotY += velY; rotX += velX; }
    const cx = S / 2, cy = S / 2, R = S * .4, f = R * 3.2, photoR = S * .21 + 10;
    const cy_ = Math.cos(rotY), sy = Math.sin(rotY), cx_ = Math.cos(rotX), sx = Math.sin(rotX);
    for (const it of items) {
      const x1 = it.x * cy_ - it.z * sy, z1 = it.x * sy + it.z * cy_;
      const y2 = it.y * cx_ - z1 * sx, z2 = it.y * sx + z1 * cx_;
      const sc = f / (f - z2 * R);
      it.sx = cx + x1 * R * sc; it.sy = cy + y2 * R * sc; it.depth = z2; it.size = S * .05 * sc;
      it.rad = it.size * .62 + 6; // collision radius includes padding
    }
    const order = [...items].sort((a, b) => b.depth - a.depth);
    const taken = [];
    const collides = it => {
      if (Math.hypot(it.sx - cx, it.sy - cy) < photoR + it.rad) return true;
      for (const t of taken) if (Math.hypot(it.sx - t.sx, it.sy - t.sy) < it.rad + t.rad) return true;
      return false;
    };
    // pass 1: glyphs already on screen keep their place (front first)
    for (const it of order) {
      if (it.a <= .02) continue;
      it.target = (it.depth > -.35 && !collides(it)) ? 1 : 0;
      taken.push(it); // still occupies space while fading out
    }
    // pass 2: new glyphs appear only where nothing is drawn
    for (const it of order) {
      if (it.a > .02) continue;
      it.target = 0;
      if (it.depth > -.35 && !collides(it)) { it.target = 1; taken.push(it); }
    }
    ctx.clearRect(0, 0, S, S);
    // faint orbit ring
    ctx.strokeStyle = "rgba(242,208,107,.08)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.05, R * 1.05 * Math.abs(Math.sin(rotX + 1.3)) * .35 + 8, 0, 0, 7); ctx.stroke();

    let hoverItem = null;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const it of order.slice().reverse()) {
      it.a += (it.target - it.a) * (it.target ? .08 : .2);
      if (it.a < .01) continue;
      const depthAlpha = .35 + ((it.depth + .35) / 1.35) * .65;
      const isHover = hover && Math.hypot(hover.x - it.sx, hover.y - it.sy) < it.size * .7 && it.a > .5;
      if (isHover) hoverItem = it;
      ctx.font = `500 ${it.size}px ${getComputedStyle(document.body).getPropertyValue("--indic")}`;
      ctx.shadowColor = "rgba(242,208,107,.7)"; ctx.shadowBlur = isHover ? 22 : it.depth * 10 + 2;
      ctx.fillStyle = isHover ? `rgba(255,236,170,${it.a})` : `rgba(242,208,107,${it.a * depthAlpha})`;
      ctx.fillText(it.ch, it.sx, it.sy);
    }
    ctx.shadowBlur = 0;
    if (hoverItem) {
      const label = hoverItem.name + " script";
      ctx.font = `500 13px "Geist Mono", monospace`;
      const w = ctx.measureText(label).width + 16, lx = Math.min(S - w / 2 - 4, Math.max(w / 2 + 4, hoverItem.sx)), ly = hoverItem.sy + hoverItem.size * .9;
      ctx.fillStyle = "rgba(0,0,0,.85)"; ctx.strokeStyle = "rgba(242,208,107,.4)";
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(lx - w / 2, ly - 11, w, 22, 6) : ctx.rect(lx - w / 2, ly - 11, w, 22); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#ECE8DF"; ctx.fillText(label, lx, ly + 1);
    }
    requestAnimationFrame(frame);
  }
  const start = () => requestAnimationFrame(frame);
  document.fonts ? document.fonts.ready.then(start) : start();
}

/* =========================================================
   EDUCATION, ROLES, ACHIEVEMENTS
   ========================================================= */
function staticContent() {
  $("#edu").innerHTML = P.education.map(e =>
    `<li><span class="tl-years">${esc(e.years)}</span><span class="tl-title">${esc(e.title)}</span><span class="tl-place">${esc(e.place)}</span><span class="tl-score">${esc(e.score)}</span></li>`).join("");
  $("#roles").innerHTML = P.roles.map(r =>
    `<div class="role"><h3>${esc(r.title)}</h3><span class="org">${esc(r.org)}, ${esc(r.when)}</span><p>${esc(r.text)}</p></div>`).join("");
  $("#achievements").innerHTML = P.achievements.map(a => `<li>${esc(a)}</li>`).join("");
}

/* =========================================================
   LIVE DATASET COUNTER + STREAM
   ========================================================= */
function datasetCounter() {
  const el = $("#counter"), target = 1328602;
  const fmt = n => n.toLocaleString("en-IN");
  if (reduced) { el.textContent = fmt(target); return; }
  let done = false;
  new IntersectionObserver(([en], obs) => {
    if (!en.isIntersecting || done) return;
    done = true; obs.disconnect();
    const t0 = performance.now(), dur = 2600;
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(target * e));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }, { threshold: .4 }).observe(el);

  const lines = [
    ["Hinglish", "yaar kal ka plan kya hai? movie chalein?"],
    ["Hindi", "आज बहुत traffic था, office late पहुँचा"],
    ["Gujarati", "tame kyare aavsho? hu station par wait karu chhu"],
    ["Bengali", "ami ektu busy achhi, pore call korbo"],
    ["Tamil", "நாளைக்கு meeting இருக்கா?"],
    ["Telugu", "naaku ee movie chala nachindi bro"],
    ["Kannada", "ಇವತ್ತು weather ತುಂಬಾ nice ಆಗಿದೆ"],
    ["Marathi", "mi thoda late yeto, tu order kar"],
    ["Punjabi", "ਕੱਲ੍ਹ class cancel ਹੋ ਗਈ ਸੀ"],
    ["Malayalam", "phone charge theernnu, later message ayakkam"]
  ];
  const list = $("#stream");
  let i = 0, on = false, timer;
  const push = () => {
    const [lang, msg] = lines[i % lines.length];
    const li = document.createElement("li");
    if (i % 2) li.className = "b";
    li.innerHTML = `<span class="who">${esc(lang)}</span><span class="msg">${esc(msg)}</span>`;
    list.appendChild(li);
    while (list.children.length > 8) list.firstChild.remove();
    i++;
  };
  for (let k = 0; k < 4; k++) push();
  new IntersectionObserver(([en]) => {
    on = en.isIntersecting; clearInterval(timer);
    if (on && !reduced) timer = setInterval(push, 1600);
  }).observe(list);
}

/* =========================================================
   AI ENGINE (Gemini with offline fallback)
   ========================================================= */
const AI = {
  get online() { return !!(CFG.GEMINI_API_KEY && CFG.GEMINI_API_KEY.trim()); },
  system() {
    return `You are the assistant on Sahil Gawande's portfolio website. Answer questions from recruiters, researchers and students about Sahil, using ONLY the facts below. Be warm, concise (under 120 words unless asked for more), and specific. Use plain language, explain jargon briefly. If something isn't in the facts, say you don't know and suggest emailing ${P.email}. Never invent numbers, employers or publications. Use simple markdown (bold, bullet lists, links) sparingly.\n\nFACTS:\n${window.buildKnowledge()}`;
  },
  async ask(history) {
    if (this.online) {
      for (const model of CFG.GEMINI_MODELS || ["gemini-2.5-flash"]) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(CFG.GEMINI_API_KEY)}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: this.system() }] },
              contents: history.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] })),
              generationConfig: { temperature: .6, maxOutputTokens: 600 }
            })
          });
          if (!res.ok) continue;
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
          if (text) return { text, source: model };
        } catch (e) { /* try next model */ }
      }
    }
    return { text: this.local(history[history.length - 1].text), source: "offline" };
  },
  local(q) {
    q = q.toLowerCase();
    const has = (...w) => w.some(x => q.includes(x));
    const proj = id => PROJ.find(p => p.id === id);
    const pText = p => `**${p.name}** (${p.kind}, ${p.when}): ${p.tagline}\n\n${p.problem}\n\n${p.built.map(b => "- " + b).join("\n")}${p.links.length ? "\n\n" + p.links.map(l => `[${l.label}](${l.url})`).join(" · ") : ""}`;
    if (has("indictalk", "thesis", "dataset", "research", "code-mix", "codemix", "indic", "conversation")) return pText(proj("indictalk"));
    if (has("sky", "scribe", "air writ", "gesture", "mediapipe", "opencv")) return pText(proj("skyscribe"));
    if (has("grammar", "hindi", "gec", "sarvam")) return pText(proj("hindigec"));
    if (has("vmsim", "virtual memory", "tlb", "page", "belady", "operating", " os")) return pText(proj("vmsim"));
    if (has("tranquil", "intern", "mental", "health", "avisk", "cbt")) return pText(proj("tranquilmind"));
    if (has("skill", "stack", "tech", "language", "tools", "python", "c++")) return "**Languages:** Python (PyTorch, Pandas, Flask), C, C++ (STL, data structures, algorithms), SQL/MySQL.\n\n**Tools:** Git, LaTeX, Microsoft Power Apps.\n\n**Areas:** machine learning, deep learning, NLP, LLM fine-tuning, reinforcement learning, quantization, computer vision, operating systems, computer networks.";
    if (has("educat", "cpi", "gpa", "college", "degree", "gate", "school", "iit")) return P.education.map(e => `- **${e.title}**, ${e.place} (${e.years}): ${e.score}`).join("\n") + "\n\nHe also qualified **GATE 2025** with a score of 694 and AIR 1350.";
    if (has("teach", "ta ", "assistant", "lead", "club", "role", "experience")) return P.roles.map(r => `- **${r.title}**, ${r.org} (${r.when}): ${r.text}`).join("\n");
    if (has("contact", "email", "hire", "reach", "phone", "linkedin")) return `Email **${P.email}**, call ${P.phone}, or connect on [LinkedIn](${P.links.linkedin}).`;
    if (has("project", "work", "built", "portfolio")) return "Sahil's main projects:\n" + PROJ.map(p => `- **${p.name}**: ${p.tagline}`).join("\n") + "\n\nAsk about any of them for details.";
    if (has("hi", "hello", "hey", "who")) return "Hi! Sahil is an M.Tech CSE student at IIT Gandhinagar building conversational AI for Indian languages. His thesis dataset, **IndicTalk**, has 1,328,602 conversations across 9 languages. Ask about his research, projects, skills or how to reach him.";
    return `I can answer questions about Sahil's research, projects, skills, education and contact details. For anything else, email **${P.email}**.`;
  }
};

function md(text) {
  let h = esc(text);
  h = h.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
       .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
       .replace(/`([^`]+)`/g, "<code>$1</code>");
  const blocks = h.split(/\n{2,}/).map(b => {
    if (/^\s*[-*] /m.test(b) && b.split("\n").every(l => /^\s*[-*] /.test(l) || !l.trim()))
      return "<ul>" + b.split("\n").filter(l => l.trim()).map(l => "<li>" + l.replace(/^\s*[-*] /, "") + "</li>").join("") + "</ul>";
    return "<p>" + b.replace(/\n/g, "<br>") + "</p>";
  });
  return blocks.join("");
}

/* =========================================================
   CHAT WIDGET
   ========================================================= */
const Chat = (() => {
  const box = $("#chat"), log = $("#chat-log"), input = $("#chat-in"), fab = $("#chat-fab");
  const history = [];
  $("#chat-mode").textContent = AI.online ? "powered by Gemini" : "offline knowledge base";
  const chips = ["What is IndicTalk?", "What's his tech stack?", "Tell me about Sky-Scribe", "How do I contact him?"];
  $("#chips").innerHTML = chips.map(c => `<button class="chip" type="button">${esc(c)}</button>`).join("");
  $("#chips").addEventListener("click", e => { if (e.target.matches(".chip")) send(e.target.textContent); });

  function add(role, html, cls = "") {
    const d = document.createElement("div");
    d.className = `bubble ${role} ${cls}`; d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function open(prefill) {
    box.hidden = false; fab.hidden = true;
    if (!log.children.length) add("bot", md("Hi, I'm Sahil's assistant. Ask me about his research, projects or skills."));
    if (prefill) send(prefill); else input.focus();
  }
  function close() { box.hidden = true; fab.hidden = false; fab.focus(); }
  async function send(text) {
    text = (text || input.value).trim(); if (!text) return;
    input.value = ""; add("user", esc(text));
    history.push({ role: "user", text });
    const t = add("bot", "thinking…", "thinking");
    const { text: reply } = await AI.ask(history.slice(-10));
    t.classList.remove("thinking"); t.innerHTML = md(reply);
    history.push({ role: "model", text: reply });
    log.scrollTop = t.offsetTop - 12;
  }
  document.addEventListener("click", e => { const b = e.target.closest("[data-open-chat]"); if (b) open(); });
  $("#chat-close").addEventListener("click", close);
  $("#chat-send").addEventListener("click", () => send());
  input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send(); } });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden) close(); });
  return { open, send };
})();

/* =========================================================
   PROJECT FILE EXPLORER
   ========================================================= */
function explorer() {
  const treeEl = $("#tree"), tabsEl = $("#tabs"), view = $("#view"), status = $("#status");
  const files = {}; // path -> {render}
  const open = []; let active = null;

  const tree = [
    { name: "projects", children: PROJ.map(p => ({ name: p.folder, children: [
        { name: "README.md", path: `projects/${p.folder}/README.md`, render: () => readme(p) },
        { name: "stack.json", path: `projects/${p.folder}/stack.json`, render: () => `<pre class="json">${jsonHL(p.stack)}</pre>` }
      ] })) },
    { name: "github", children: [{ name: "live-repos.json", path: "github/live-repos.json", render: () => repos() }] },
    { name: "about", children: [
      { name: "education.md", path: "about/education.md", render: () => `<div class="readme"><h3>Education</h3>${P.education.map(e => `<h4>${esc(e.title)}</h4><p>${esc(e.place)}, ${esc(e.years)}. ${esc(e.score)}</p>`).join("")}</div>` },
      { name: "achievements.md", path: "about/achievements.md", render: () => `<div class="readme"><h3>Achievements</h3><ul>${P.achievements.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>` },
      { name: "contact.txt", path: "about/contact.txt", render: () => `<pre class="json">email    <a href="mailto:${P.email}">${P.email}</a>\nphone    ${P.phone}\nlinkedin <a href="${P.links.linkedin}" target="_blank" rel="noopener">${P.links.linkedin}</a>\ngithub   <a href="${P.links.githubProfile}" target="_blank" rel="noopener">${P.links.githubProfile}</a></pre>` }
    ] }
  ];

  function build(nodes, depth = 0) {
    const wrap = document.createElement("div");
    for (const n of nodes) {
      const btn = document.createElement("button");
      btn.type = "button"; btn.setAttribute("role", "treeitem");
      if (n.children) {
        const expanded = depth === 0 && n.name === "projects" || n.name === "indictalk";
        btn.className = "tree-item folder";
        btn.innerHTML = `<span class="ico">${expanded ? "▾" : "▸"}</span>${esc(n.name)}/`;
        btn.setAttribute("aria-expanded", expanded);
        const kids = build(n.children, depth + 1); kids.className = "tree-children"; kids.hidden = !expanded;
        btn.addEventListener("click", () => {
          kids.hidden = !kids.hidden; btn.setAttribute("aria-expanded", !kids.hidden);
          btn.querySelector(".ico").textContent = kids.hidden ? "▸" : "▾";
        });
        wrap.append(btn, kids);
      } else {
        files[n.path] = n;
        btn.className = "tree-item"; btn.dataset.path = n.path;
        btn.innerHTML = `<span class="ico">${n.name.endsWith(".json") ? "{}" : n.name.endsWith(".md") ? "#" : "·"}</span>${esc(n.name)}`;
        btn.addEventListener("click", () => openFile(n.path));
        wrap.append(btn);
      }
    }
    return wrap;
  }
  treeEl.appendChild(build(tree));

  function openFile(path) {
    if (!open.includes(path)) open.push(path);
    active = path; renderTabs(); renderView();
  }
  function closeFile(path) {
    open.splice(open.indexOf(path), 1);
    if (active === path) active = open[open.length - 1] || null;
    renderTabs(); renderView();
  }
  function renderTabs() {
    tabsEl.innerHTML = open.map(p => `<button type="button" role="tab" class="tab ${p === active ? "active" : ""}" data-path="${p}" aria-selected="${p === active}">${esc(p.split('/').slice(-2).join('/'))}<span class="x" data-close="${p}" aria-label="Close tab">×</span></button>`).join("");
    treeEl.querySelectorAll(".tree-item[data-path]").forEach(b => b.classList.toggle("active", b.dataset.path === active));
  }
  tabsEl.addEventListener("click", e => {
    const c = e.target.closest("[data-close]"); if (c) { e.stopPropagation(); return closeFile(c.dataset.close); }
    const t = e.target.closest(".tab"); if (t) { active = t.dataset.path; renderTabs(); renderView(); }
  });
  function renderView() {
    if (!active) { view.innerHTML = `<p class="ex-empty">No file open. Pick one from the tree.</p>`; status.textContent = "ready"; return; }
    const f = files[active], out = f.render();
    if (out instanceof Promise) { view.innerHTML = `<p class="ex-empty">fetching…</p>`; out.then(h => { if (active === f.path) view.innerHTML = h; }); }
    else view.innerHTML = out;
    status.textContent = `${active}   ·   ${AI.online ? "AI: Gemini" : "AI: offline"}`;
    view.scrollTop = 0;
  }

  function readme(p) {
    return `<div class="readme">
      <h3>${esc(p.name)}</h3>
      <p class="meta">${esc(p.kind)}, ${esc(p.when)}</p>
      <p class="tagline">${esc(p.tagline)}</p>
      <p>${esc(p.who)}</p>
      <h4>The problem</h4><p>${esc(p.problem)}</p>
      <h4>What I built</h4><ul>${p.built.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      <div class="row">
        ${p.links.map(l => `<a class="btn btn-ghost btn-small" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
        <button type="button" class="btn btn-small" data-ai-explain="${p.id}">Explain with AI</button>
      </div>
      <div class="ai-slot"></div>
    </div>`;
  }
  view.addEventListener("click", async e => {
    const b = e.target.closest("[data-ai-explain]"); if (!b) return;
    const p = PROJ.find(x => x.id === b.dataset.aiExplain), slot = view.querySelector(".ai-slot");
    b.disabled = true; slot.innerHTML = `<div class="ai-box"><span class="by">${AI.online ? "gemini" : "offline"} is thinking…</span></div>`;
    const prompt = `Explain the project "${p.name}" to a non-specialist recruiter in about 90 words: what problem it solves, how it works, and why it's impressive. Then give one line "Skills shown:" listing 4-6 skills.`;
    const r = AI.online ? await AI.ask([{ role: "user", text: prompt }]) : { text: `In short: ${p.tagline} ${p.problem}\n\nSkills shown: ${Object.values(p.stack).flat().filter(v => typeof v === "string").slice(0, 6).join(", ")}.`, source: "offline" };
    slot.innerHTML = `<div class="ai-box"><span class="by">explained by ${esc(r.source)}</span>${md(r.text)}</div>`;
    b.disabled = false;
  });

  let repoCache = null;
  async function repos() {
    if (repoCache) return repoCache;
    try {
      const res = await fetch(`https://api.github.com/users/${CFG.GITHUB_USER || "Prolexsahil"}/repos?sort=updated&per_page=30`);
      if (!res.ok) throw new Error(res.status);
      const list = (await res.json()).filter(r => !r.fork);
      repoCache = `<div class="readme"><h3>Live from GitHub</h3><p class="meta">${list.length} public repositories, most recently updated first</p>` +
        list.map(r => `<div class="repo"><a href="${r.html_url}" target="_blank" rel="noopener">${esc(r.name)}</a><p>${esc(r.description || "No description yet.")}</p><small>${esc(r.language || "n/a")}   ★ ${r.stargazers_count}   updated ${new Date(r.updated_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</small></div>`).join("") + "</div>";
      return repoCache;
    } catch (e) {
      return `<p class="ex-empty">GitHub didn't respond (rate limit or offline). Open the profile directly: <a href="${P.links.github}" target="_blank" rel="noopener">github.com/Prolexsahil</a></p>`;
    }
  }

  openFile("projects/indictalk/README.md");
  window.openProjectFile = id => {
    const p = PROJ.find(x => x.id === id || x.folder === id); if (!p) return false;
    openFile(`projects/${p.folder}/README.md`); $("#projects").scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); return true;
  };
}

function jsonHL(obj) {
  return esc(JSON.stringify(obj, null, 2))
    .replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="k">$1</span><span class="p">$2</span>')
    .replace(/:\s(&quot;.*?&quot;)/g, ': <span class="s">$1</span>')
    .replace(/^(\s+)(&quot;.*?&quot;)(,?)$/gm, '$1<span class="s">$2</span>$3')
    .replace(/:\s(\d+)/g, ': <span class="n">$1</span>');
}

/* "Explain it simply" button in IndicTalk section */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-explain]"); if (!b) return;
  Chat.open("Explain IndicTalk simply. Why does it matter?");
});

/* =========================================================
   SKILL NETWORK (force graph)
   ========================================================= */
function skillNet() {
  const canvas = $("#net"), ctx = canvas.getContext("2d"), G = window.SKILL_GRAPH;
  const title = $("#net-title"), body = $("#net-body");
  let W, H, dpr;
  const nodes = G.nodes.map((n, i) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0, i }));
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const edges = G.edges.map(([a, b]) => [byId[a], byId[b]]).filter(([a, b]) => a && b);
  const nbrs = id => edges.filter(([a, b]) => a.id === id || b.id === id).map(([a, b]) => a.id === id ? b : a);
  const radius = n => n.type === "project" ? 9 : n.type === "area" ? 6.5 : 5;
  const color = n => n.type === "project" ? "242,208,107" : n.type === "area" ? "143,179,255" : "207,202,191";

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  nodes.forEach((n, i) => { const a = i / nodes.length * Math.PI * 2; n.x = W * .42 + Math.cos(a) * 180; n.y = H / 2 + Math.sin(a) * 160; });
  new ResizeObserver(resize).observe(canvas);

  let hover = null, selected = null, dragN = null, energy = 1;
  const pos = e => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const pick = p => nodes.find(n => Math.hypot(n.x - p.x, n.y - p.y) < radius(n) + 8);
  canvas.addEventListener("pointerdown", e => {
    const n = pick(pos(e)); if (!n) { select(null); return; }
    dragN = n; canvas.setPointerCapture(e.pointerId); select(n); energy = 1;
  });
  canvas.addEventListener("pointermove", e => {
    const p = pos(e);
    if (dragN) { dragN.x = p.x; dragN.y = p.y; dragN.vx = dragN.vy = 0; energy = 1; }
    hover = pick(p); canvas.style.cursor = hover ? "pointer" : "grab";
  });
  const up = () => { dragN = null; };
  canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("pointerleave", () => { hover = null; });

  function select(n) {
    selected = n;
    if (!n) { title.textContent = "Select a node"; body.innerHTML = "Try IndicTalk or C++."; return; }
    title.textContent = n.id;
    const ns = nbrs(n.id);
    if (n.type === "project") {
      const p = PROJ.find(x => x.id === n.ref);
      body.innerHTML = `${esc(p.tagline)}<br>${ns.map(x => `<span class="pill">${esc(x.id)}</span>`).join("")}<br><br><button type="button" class="btn btn-small" id="net-open">Open README</button>`;
      $("#net-open").onclick = () => window.openProjectFile(p.id);
    } else {
      const projs = ns.filter(x => x.type === "project"), rel = ns.filter(x => x.type !== "project");
      body.innerHTML = (projs.length ? `Used in: ${projs.map(x => `<span class="pill">${esc(x.id)}</span>`).join("")}` : "Coursework and foundations.") +
        (rel.length ? `<br><br>Related: ${rel.map(x => `<span class="pill">${esc(x.id)}</span>`).join("")}` : "");
    }
  }

  let visible = false;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(frame); }).observe(canvas);

  function physicsStep() {
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j]; let dx = b.x - a.x, dy = b.y - a.y; const d2 = dx * dx + dy * dy || .01;
      const d = Math.sqrt(d2), F = 3400 / d2;
      dx /= d; dy /= d; a.vx -= dx * F; a.vy -= dy * F; b.vx += dx * F; b.vy += dy * F;
    }
    for (const [a, b] of edges) {
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
      const rest = a.type === "project" || b.type === "project" ? 95 : 75, F = (d - rest) * .012;
      a.vx += dx / d * F; a.vy += dy / d * F; b.vx -= dx / d * F; b.vy -= dy / d * F;
    }
    const cxp = innerWidth > 960 ? W * .4 : W / 2;
    let ke = 0;
    for (const n of nodes) {
      n.vx += (cxp - n.x) * .0022; n.vy += (H / 2 - n.y) * .003;
      if (n === dragN) continue;
      n.vx *= .82; n.vy *= .82; n.x += n.vx; n.y += n.vy;
      n.x = Math.max(20, Math.min(W - 20, n.x)); n.y = Math.max(20, Math.min(H - 20, n.y));
      ke += n.vx * n.vx + n.vy * n.vy;
    }
    energy = ke / nodes.length;
  }
  for (let k = 0; k < 250; k++) physicsStep(); // settle before first paint

  function frame() {
    if (!visible) return;
    if (energy > .002 || dragN) physicsStep();
    const t = performance.now() / 1000;
    const focus = selected || hover, focusSet = focus ? new Set([focus.id, ...nbrs(focus.id).map(n => n.id)]) : null;
    ctx.clearRect(0, 0, W, H);
    for (const [a, b] of edges) {
      const lit = focusSet && (a === focus || b === focus);
      ctx.strokeStyle = lit ? "rgba(242,208,107,.65)" : focusSet ? "rgba(236,232,223,.04)" : "rgba(236,232,223,.12)";
      ctx.lineWidth = lit ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      if (lit && !reduced) { // signal pulse travelling along lit edges
        const s = (t * .8 + a.i * .13) % 1, from = a === focus ? a : b, to = a === focus ? b : a;
        ctx.fillStyle = "rgba(255,236,170,.9)";
        ctx.beginPath(); ctx.arc(from.x + (to.x - from.x) * s, from.y + (to.y - from.y) * s, 2, 0, 7); ctx.fill();
      }
    }
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (const n of nodes) {
      const dim = focusSet && !focusSet.has(n.id), r = radius(n) * (n === focus ? 1.35 : 1), col = color(n);
      ctx.shadowColor = `rgba(${col},.9)`; ctx.shadowBlur = dim ? 0 : n.type === "project" ? 18 : 8;
      ctx.fillStyle = `rgba(${col},${dim ? .2 : 1})`;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.font = `${n.type === "project" ? 600 : 400} ${n.type === "project" ? 14 : 12.5}px Geist, sans-serif`;
      ctx.fillStyle = dim ? "rgba(236,232,223,.18)" : n.type === "project" ? "#ECE8DF" : "rgba(207,202,191,.85)";
      ctx.fillText(n.id, n.x, n.y + r + 5);
    }
    requestAnimationFrame(frame);
  }
}

/* =========================================================
   TERMINAL
   ========================================================= */
function terminal() {
  const out = $("#term-out"), input = $("#term-in"), hist = []; let hi = 0;
  const print = (html, cls = "") => { const d = document.createElement("div"); if (cls) d.className = cls; d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const link = (u, l) => `<a href="${u}" target="_blank" rel="noopener">${esc(l || u)}</a>`;
  const cmds = {
    help: () => `available commands
  whoami          short intro
  ls              list projects
  open &lt;name&gt;     open a project README (e.g. open vmsim)
  cat stack &lt;name&gt; show a project's tech stack
  skills          tech stack
  education       degrees and scores
  contact         ways to reach Sahil
  resume          download the résumé
  ask &lt;question&gt;  ask the AI assistant
  clear           clear the screen`,
    whoami: () => `Sahil Gawande. M.Tech CSE at IIT Gandhinagar, Lingo Research Group.\nBuilds conversational AI for Indian languages and likes low-level systems.`,
    ls: () => PROJ.map(p => `<span class="ok">${p.folder.padEnd(22)}</span>${esc(p.tagline)}`).join("\n"),
    skills: () => `python   PyTorch, Pandas, Flask\nc/c++    STL, data structures, algorithms\ndata     SQL/MySQL, MongoDB\nml       fine-tuning, RL, quantization, NLP, computer vision\ntools    Git, LaTeX, Power Apps`,
    education: () => P.education.map(e => `${e.years.padEnd(13)}${esc(e.title)}, ${esc(e.place)}  <span class="ok">${esc(e.score)}</span>`).join("\n"),
    contact: () => `email     <a href="mailto:${P.email}">${P.email}</a>\nphone     ${P.phone}\nlinkedin  ${link(P.links.linkedin, "linkedin.com/in/sahil-gawande")}\ngithub    ${link(P.links.githubProfile, "github.com/Prolexsahil")}`,
    resume: () => { const a = document.createElement("a"); a.href = P.links.resume; a.download = ""; a.click(); return "downloading Sahil_Gawande_Resume.pdf"; },
    sudo: args => args.join(" ").includes("hire") ? `<span class="ok">permission granted.</span> Opening email…` + (setTimeout(() => location.href = `mailto:${P.email}?subject=Let's%20work%20together`, 700), "") : `sudo: nice try.`,
    clear: () => { out.innerHTML = ""; return null; }
  };
  async function run(raw) {
    const line = raw.trim(); if (!line) return;
    hist.push(line); hi = hist.length;
    print(`<span class="prompt">sahil@iitgn:~$</span> <span class="cmd">${esc(line)}</span>`);
    const [cmd, ...args] = line.split(/\s+/);
    if (cmd === "open") { const ok = window.openProjectFile((args[0] || "").toLowerCase()); return print(ok ? `opened ${esc(args[0])}/README.md in the explorer` : `open: no project "${esc(args[0] || "")}". try <span class="ok">ls</span>`, ok ? "ok" : "err"); }
    if (cmd === "cat" && args[0] === "stack") { const p = PROJ.find(x => x.folder === args[1] || x.id === args[1]); return print(p ? jsonHL(p.stack) : `cat: no such project`, p ? "" : "err"); }
    if (cmd === "ask") {
      const q = args.join(" "); if (!q) return print("usage: ask &lt;question&gt;", "err");
      const t = document.createElement("div"); t.textContent = "thinking…"; out.appendChild(t);
      const r = await AI.ask([{ role: "user", text: q + " (Answer in under 80 words, plain text, no markdown.)" }]);
      t.innerHTML = esc(r.text.replace(/\*\*/g, "")).replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>') + `\n<span class="ok">— ${esc(r.source)}</span>`; out.scrollTop = out.scrollHeight; return;
    }
    const fn = cmds[cmd];
    if (!fn) return print(`command not found: ${esc(cmd)}. type <span class="ok">help</span>`, "err");
    const res = fn(args); if (res) print(res);
  }
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { run(input.value); input.value = ""; }
    else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; e.preventDefault(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const all = [...Object.keys(cmds), "open", "ask", "cat"], m = all.filter(c => c.startsWith(input.value));
      if (m.length === 1) input.value = m[0] + " ";
    }
  });
  $("#term").addEventListener("click", () => { if (!getSelection().toString()) input.focus({ preventScroll: true }); });
  print(`IndicTalk shell. Type <span class="ok">help</span> to see commands, or try <span class="ok">ask what did sahil build?</span>`);
}

/* =========================================================
   NAV ACTIVE STATE
   ========================================================= */
function navSpy() {
  const links = [...document.querySelectorAll(".nav nav a")];
  const obs = new IntersectionObserver(ents => ents.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach(sec => obs.observe(sec));
}

/* ---------- start ---------- */
/* ---------- always start at the top on load/refresh ---------- */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
goTop();
window.addEventListener("load", () => { goTop(); setTimeout(goTop, 50); });

// in-page links scroll without adding #section to the URL
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = a.getAttribute("href") === "#top" ? document.body : document.querySelector(a.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});
staticContent();
fireflies();
glyphSphere();
datasetCounter();
explorer();
skillNet();
terminal();
navSpy();
boot().then(() => { goTop(); typed(); });
})();
