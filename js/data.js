/* All portfolio content lives here. Edit this file to update the site. */
window.PROFILE = {
  name: "Sahil Deepak Gawande",
  short: "Sahil Gawande",
  role: "M.Tech, Computer Science & Engineering, IIT Gandhinagar",
  email: "sahil.gawande@iitgn.ac.in",
  phone: "+91 7755984244",
  links: {
    linkedin: "https://www.linkedin.com/in/sahil-gawande-085793237/",
    github: "https://github.com/Prolexsahil?tab=repositories",
    githubProfile: "https://github.com/Prolexsahil",
    paper: "https://arxiv.org/abs/2607.23242",
    huggingface: "https://huggingface.co/datasets/LingoIITGN/IndicTalk",
    resume: "assets/Sahil_Gawande_Resume.pdf"
  },
  education: [
    { years: "2025 – now", title: "M.Tech, Computer Science & Engineering", place: "IIT Gandhinagar", score: "CPI 8.4" },
    { years: "2021 – 2025", title: "B.Tech, Computer Engineering", place: "FCRIT, Vashi", score: "CPI 9.38" },
    { years: "2020 – 2021", title: "Class XII, Physics, Chemistry, Maths", place: "Kendriya Vidyalaya", score: "88.4%" },
    { years: "2018 – 2019", title: "Class X", place: "Kendriya Vidyalaya", score: "89.4%" }
  ],
  achievements: [
    "Qualified GATE 2025 with a score of 694, All India Rank 1350.",
    "Sky-Scribe was picked for the National Board of Accreditation showcase and trialled in real classrooms."
  ],
  roles: [
    {
      title: "Teaching Assistant", org: "IIT Gandhinagar", when: "Aug 2025 – now",
      text: "Runs labs and tutorials for ES 242 (Data Structures & Algorithms), ES 199 (Principles of AI) and CS 613 (NLP). Writes assessments, grades, and mentors student project teams."
    },
    {
      title: "Technical Lead", org: "AlgoZenith Club, FCRIT Vashi", when: "Jul 2024 – May 2025",
      text: "Led the technical side of the college's official competitive-coding club."
    }
  ]
};

window.PROJECTS = [
  {
    id: "indictalk", folder: "indictalk", name: "IndicTalk",
    kind: "M.Tech thesis", when: "Jan 2026 – now",
    tagline: "A dataset and a chatbot for the way India actually chats.",
    who: "Graduate researcher, Lingo Research Group, IIT Gandhinagar. Advisor: Prof. Mayank Singh.",
    problem: "Most conversational datasets assume one language per conversation. Real chats across India switch languages mid-sentence and are typed in both native scripts and Roman letters.",
    built: [
      "Created IndicTalk: 1,328,602 persona-driven conversations across 9 Indic languages, each in native script and romanized form, including code-mixed dialogue.",
      "Generated it with LLMs talking to each other (self-play), adding a reflection and validation pass and letting multi-turn flow evolve dynamically instead of following fixed templates.",
      "Fine-tuning a conversational model on the dataset and adding reinforcement learning guided by dialogue strategies, so replies get more varied and hold up better.",
      "Shrinking the model with compression and quantization for fully offline edge use, tuning memory, latency, size and inference speed."
    ],
    stack: { data: ["LLM self-play", "reflection", "validation"], modelling: ["fine-tuning", "reinforcement learning", "dialogue strategies"], deployment: ["quantization", "model compression", "edge inference"], languages: 9, scripts: ["native", "roman"] },
    links: [{ label: "Read the paper (arXiv)", url: "https://arxiv.org/abs/2607.23242" }, { label: "Dataset on Hugging Face", url: "https://huggingface.co/datasets/LingoIITGN/IndicTalk" }]
  },
  {
    id: "skyscribe", folder: "sky-scribe", name: "Sky-Scribe",
    kind: "Project", when: "Sep 2024 – Apr 2025",
    tagline: "Write maths in the air with a finger and get it solved.",
    who: "AI/ML developer at FCRIT Vashi, guided by Prof. Prachi Verma.",
    problem: "Shared classroom devices need touching, and writing an equation into a solver is slower than just writing it.",
    built: [
      "Tracks hand pose in real time from a webcam with MediaPipe and OpenCV, turning fingertip movement into strokes on a virtual board.",
      "Sends the written expression to the Gemini API, which reads and solves it; multi-step expressions were recognised with 99% accuracy in testing.",
      "Designed for contactless teaching; it was chosen for the National Board of Accreditation showcase and trialled in classrooms."
    ],
    stack: { vision: ["OpenCV", "MediaPipe hand tracking"], ai: ["Gemini API"], language: "Python", focus: "human–AI interaction" },
    links: [{ label: "Code on GitHub", url: "https://github.com/Prolexsahil/Sky-Scribe" }]
  },
  {
    id: "hindigec", folder: "grammarly-for-hindi", name: "Grammarly for Hindi",
    kind: "Course project", when: "Aug 2025 – Dec 2025",
    tagline: "Grammar correction for a language most tools skip.",
    who: "AI/ML developer at IIT Gandhinagar, with Prof. Mayank Singh.",
    problem: "Hindi grammatical error correction has little labelled data, so standard approaches struggle.",
    built: [
      "Fine-tuned Sarvam-1B for Hindi grammatical error correction and measured how well it transfers in a low-resource setting on HiWiKiEdits.",
      "Compared it against Transformer baselines using GLEU, precision, recall and F0.5.",
      "Added about 20K synthetic error pairs made two ways, direct noise injection and round-trip translation, then shipped a real-time editor in the style of Grammarly."
    ],
    stack: { model: "Sarvam-1B", data: ["HiWiKiEdits", "~20K synthetic pairs", "round-trip translation"], metrics: ["GLEU", "Precision", "Recall", "F0.5"], framework: "PyTorch" },
    links: [{ label: "Code on GitHub", url: "https://github.com/Prolexsahil/Grammarly-for-Hindi" }]
  },
  {
    id: "vmsim", folder: "vmsim", name: "VMSim",
    kind: "Systems project", when: "May 2026 – Jul 2026",
    tagline: "A virtual memory and TLB simulator you can experiment with.",
    who: "Built at IIT Gandhinagar.",
    problem: "Operating-systems ideas like page replacement are easy to state and hard to see. A configurable simulator makes them measurable.",
    built: [
      "Simulates multi-level page tables, address translation and demand paging in C++, with configurable page size and number of physical frames.",
      "Includes a TLB cache and swappable page-replacement policies (FIFO, LRU, Clock, Optimal) plus a workload generator for controlled experiments.",
      "Reproduces Belady's anomaly under FIFO and benchmarks TLB hit rate and page-fault rate across frame counts and access patterns, checked against textbook behaviour."
    ],
    stack: { language: "C++", concepts: ["page tables", "TLB", "demand paging"], policies: ["FIFO", "LRU", "Clock", "Optimal"], result: "Belady's anomaly reproduced" },
    links: [{ label: "Code on GitHub", url: "https://github.com/Prolexsahil/Virtual-Memory" }]
  },
  {
    id: "tranquilmind", folder: "tranquilmind", name: "TranquilMind",
    kind: "Internship", when: "Aug 2023 – Apr 2024",
    tagline: "A patient-first mental health companion.",
    who: "AI/ML developer intern at Avisk Pvt. Ltd.",
    problem: "People looking for mental health support need something that feels conversational, safe and private.",
    built: [
      "Built dialogue grounded in cognitive behavioural therapy (CBT) using NLP, which improved user experience by 15%.",
      "Put together the full ML pipeline behind a Node.js and MongoDB backend designed for secure, privacy-preserving healthcare use.",
      "Designed the app interfaces in React Native and Power Apps, which increased average session length and engagement."
    ],
    stack: { ai: ["NLP", "CBT-based dialogue"], backend: ["Node.js", "MongoDB"], frontend: ["React Native", "Power Apps"] },
    links: []
  }
];

/* Skill network: nodes + edges. type: project | skill | area */
window.SKILL_GRAPH = {
  nodes: [
    { id: "IndicTalk", type: "project", ref: "indictalk" },
    { id: "Sky-Scribe", type: "project", ref: "skyscribe" },
    { id: "Grammarly for Hindi", type: "project", ref: "hindigec" },
    { id: "VMSim", type: "project", ref: "vmsim" },
    { id: "TranquilMind", type: "project", ref: "tranquilmind" },
    { id: "NLP", type: "area" }, { id: "Deep Learning", type: "area" }, { id: "Machine Learning", type: "area" },
    { id: "Operating Systems", type: "area" }, { id: "Computer Vision", type: "area" }, { id: "DSA", type: "area" },
    { id: "Computer Networks", type: "area" },
    { id: "Python", type: "skill" }, { id: "PyTorch", type: "skill" }, { id: "Pandas", type: "skill" },
    { id: "Flask", type: "skill" }, { id: "C++", type: "skill" }, { id: "C", type: "skill" },
    { id: "SQL", type: "skill" }, { id: "Git", type: "skill" }, { id: "LaTeX", type: "skill" },
    { id: "LLMs", type: "skill" }, { id: "RL", type: "skill" }, { id: "Quantization", type: "skill" },
    { id: "OpenCV", type: "skill" }, { id: "MediaPipe", type: "skill" }, { id: "Gemini API", type: "skill" },
    { id: "Node.js", type: "skill" }, { id: "MongoDB", type: "skill" }, { id: "React Native", type: "skill" },
    { id: "Power Apps", type: "skill" }
  ],
  edges: [
    ["IndicTalk", "LLMs"], ["IndicTalk", "RL"], ["IndicTalk", "Quantization"], ["IndicTalk", "NLP"], ["IndicTalk", "PyTorch"], ["IndicTalk", "Python"], ["IndicTalk", "Deep Learning"],
    ["Sky-Scribe", "OpenCV"], ["Sky-Scribe", "MediaPipe"], ["Sky-Scribe", "Gemini API"], ["Sky-Scribe", "Computer Vision"], ["Sky-Scribe", "Python"],
    ["Grammarly for Hindi", "LLMs"], ["Grammarly for Hindi", "NLP"], ["Grammarly for Hindi", "PyTorch"], ["Grammarly for Hindi", "Python"], ["Grammarly for Hindi", "Flask"],
    ["VMSim", "C++"], ["VMSim", "Operating Systems"], ["VMSim", "DSA"],
    ["TranquilMind", "NLP"], ["TranquilMind", "Node.js"], ["TranquilMind", "MongoDB"], ["TranquilMind", "React Native"], ["TranquilMind", "Power Apps"], ["TranquilMind", "Machine Learning"],
    ["PyTorch", "Deep Learning"], ["Deep Learning", "Machine Learning"], ["Pandas", "Python"], ["Flask", "Python"], ["Pandas", "Machine Learning"],
    ["C", "C++"], ["C++", "DSA"], ["C", "Operating Systems"], ["SQL", "MongoDB"], ["Computer Networks", "Operating Systems"],
    ["Git", "Python"], ["Git", "C++"], ["LaTeX", "IndicTalk"], ["OpenCV", "Computer Vision"], ["LLMs", "Deep Learning"], ["RL", "Machine Learning"]
  ]
};

/* Text the AI model receives as grounding. */
window.buildKnowledge = function () {
  const P = window.PROFILE;
  let s = `Name: ${P.name}. ${P.role}. Email: ${P.email}. LinkedIn: ${P.links.linkedin}. GitHub: ${P.links.githubProfile}.\n`;
  s += "Education: " + P.education.map(e => `${e.title} at ${e.place} (${e.years}, ${e.score})`).join("; ") + ".\n";
  s += "Achievements: " + P.achievements.join(" ") + "\n";
  s += "Roles: " + P.roles.map(r => `${r.title}, ${r.org} (${r.when}): ${r.text}`).join(" ") + "\n";
  s += "Skills: Python (Flask, Pandas, PyTorch), C, C++ (STL, data structures, algorithms), SQL/MySQL, Git, LaTeX, Microsoft Power Apps. Areas: machine learning, deep learning, NLP, operating systems, computer networks, DSA.\n";
  window.PROJECTS.forEach(p => {
    s += `\nProject ${p.name} (${p.kind}, ${p.when}). ${p.tagline} ${p.who} Problem: ${p.problem} Work: ${p.built.join(" ")} Links: ${p.links.map(l => l.url).join(", ") || "none"}.`;
  });
  return s;
};
