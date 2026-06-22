/* =========================================================
   suresh@sec — interactive terminal portfolio
   All content lives in DATA + the COMMANDS below. Edit freely.
   ========================================================= */

const BANNER = String.raw`
███████╗██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
██╔════╝██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║
███████╗██║   ██║██████╔╝█████╗  ███████╗███████║
╚════██║██║   ██║██╔══██╗██╔══╝  ╚════██║██╔══██║
███████║╚██████╔╝██║  ██║███████╗███████║██║  ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`;

/* ---------- DATA (edit me) ---------- */
const DATA = {
  name: "Suresh Deora",
  role: "Cybersecurity Professional · Linux Security & Automation Engineer",
  location: "Jaipur, Rajasthan, India 🇮🇳",
  email: "sdesureshdeora@gmail.com",
  phone: "+91-8955248104",
  social: {
    github: "https://github.com/SureshDeora",
    linkedin: "https://linkedin.com/in/suresh-deora",
    tryhackme: "https://tryhackme.com/p/Alpha.Sec",
  },
  resume: "Suresh_Deora_Resume.pdf",
  openTo: "SOC Analyst · Security Engineer · DevSecOps · Linux Security · Pentesting",
  stats: { thm: "Top 4%", rooms: "104", certs: "RHCE · RHCSA" },
};

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bar = (pct) => {
  const total = 18, fill = Math.round(pct/100*total);
  return `<span class="bar">${"█".repeat(fill)}<span class="empty">${"░".repeat(total-fill)}</span></span> <span class="m">${pct}%</span>`;
};
const promptHTML = `<span class="prompt"><span class="u">visitor</span><span class="at">@</span><span class="h">suresh-sec</span><span class="c">:</span><span class="p">~</span><span class="d">$</span></span>`;

/* ---------- THEME SYSTEM ---------- */
const THEMES = ["matrix","amber","ice","light"];
const THEME_LABEL = { matrix:"Matrix green", amber:"Amber CRT", ice:"Ice blue", light:"Light mode" };
const THEME_ACCENT = { matrix:"#34d399", amber:"#fbbf24", ice:"#38bdf8", light:"#0f9d6b" };
let accentColor = "#34d399";
let currentTheme = "matrix";
function applyTheme(name){
  if(!THEMES.includes(name)) name = "matrix";
  currentTheme = name;
  document.documentElement.setAttribute("data-theme", name);
  accentColor = THEME_ACCENT[name];
  try{ localStorage.setItem("term-theme", name); }catch(e){}
  const mx = document.getElementById("matrix");
  if(mx) mx.style.display = (name === "light") ? "none" : "";
  const btn = document.getElementById("themeBtn");
  if(btn) btn.title = "Theme: " + THEME_LABEL[name] + " (click to switch)";
  return name;
}
// apply saved theme immediately (before boot) to avoid a flash
applyTheme((()=>{ try{ return localStorage.getItem("term-theme"); }catch(e){ return null; } })() || "matrix");
// title-bar button cycles through the themes
(function(){
  const btn = document.getElementById("themeBtn");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    const i = THEMES.indexOf(currentTheme);
    applyTheme(THEMES[(i + 1) % THEMES.length]);
  });
})();

/* ---------- COMMANDS ---------- */
const COMMANDS = {
  help(){
    const items = [
      ["about","who I am"],["skills","the arsenal"],["projects","what I've built"],
      ["experience","where I've worked"],["education","my degree"],["certs","certifications"],
      ["contact","reach me"],["resume","download my CV"],["social","my links"],
      ["github","live GitHub stats"],["theme","switch colors"],["scan","run a port scan"],["clear","wipe the screen"],["sudo","🙃"],
    ];
    return `<div class="line"><span class="g b">Available commands</span> <span class="m">— click a chip below or type one:</span></div>
      <div class="cmd-list">${items.map(([n,d])=>`<div><span class="name">${n}</span> <span class="desc">— ${d}</span></div>`).join("")}</div>`;
  },

  about(){
    return `<pre class="banner">${BANNER}</pre>
    <div class="sub">${DATA.role}</div>
    <div class="kv">
      <div class="k">name</div><div>${DATA.name}</div>
      <div class="k">role</div><div>Cybersecurity Professional · RHCE/RHCSA</div>
      <div class="k">based</div><div>${DATA.location}</div>
      <div class="k">focus</div><div>Linux Security · Pentesting · SIEM/Blue · DevSecOps</div>
      <div class="k">open to</div><div><span class="g">●</span> ${DATA.openTo}</div>
    </div>
    <div class="line" style="margin-top:.7rem">Aspiring cybersecurity professional with a strong foundation in <span class="g b">Linux administration</span> and <span class="g b">ethical hacking</span>. <span class="w">RHCE & RHCSA certified</span> — deep on server hardening and Ansible-driven infrastructure automation. Currently training in penetration testing via <span class="c">TCM Security PEH</span> + the <span class="c">R-CAT Career Assured Program</span>, with hands-on practice on TryHackMe.</div>
    <div class="line" style="margin-top:.5rem">I pair a developer's background (<span class="w">MERN stack</span>) with sysadmin depth — I understand both how applications are <span class="g">built</span> and how infrastructure is <span class="g">secured</span>.</div>
    <div class="line" style="margin-top:.5rem"><span class="c">${DATA.stats.thm}</span> on TryHackMe · <span class="c">${DATA.stats.rooms}</span> rooms cleared · <span class="c">${DATA.stats.certs}</span> certified</div>`;
  },
  whoami(){ return COMMANDS.about(); },

  skills(){
    const groups = {
      "Offensive Security":[["Nmap · recon",85],["Burp Suite · web",75],["Metasploit",70],["Nessus · vuln assessment",72],["OWASP Top 10 · AD attacks",70]],
      "Defensive / Blue Team":[["Wazuh SIEM",80],["Splunk",70],["Log analysis · IR",75],["Security monitoring",76]],
      "Linux & Automation":[["RHEL 9 admin (RHCE)",90],["Ansible · CIS hardening",88],["SELinux · firewalld",82],["Bash scripting",88]],
      "Programming & Dev":[["Python",85],["MERN stack (dev)",75],["Git & GitHub",85],["Docker",75]],
    };
    let out = "";
    for(const [g,rows] of Object.entries(groups)){
      out += `<div class="line" style="margin-top:.55rem"><span class="c b">▸ ${g}</span></div>`;
      out += rows.map(([n,p])=>`<div class="line"><span class="m">${n.padEnd(26," ")}</span> ${bar(p)}</div>`).join("");
    }
    return out;
  },

  certs(){
    const c = [
      ["RHCE","Red Hat Certified Engineer","Red Hat · Apr 2026"],
      ["RHCSA","Red Hat Certified System Administrator","Red Hat · Jul 2025"],
      ["THM","Cyber Security 101","TryHackMe"],
      ["AISF","AI Skills Fest 2026","2026"],
    ];
    return c.map(([k,n,o])=>`<div class="line"><span class="g b">[${k.padEnd(5)}]</span> ${n} <span class="m">· ${o}</span></div>`).join("");
  },

  projects(){
    const gh = DATA.social.github;
    const p = [
      ["AI · OSINT","Web-Check AI Security Assessor",
        "Extended the open-source Web-Check OSINT tool (22k+ ★) with a LangGraph agent that interprets DNS / SSL-TLS / HTTP-header / open-port / tech-stack data, flags misconfigurations, rates security posture & auto-generates remediation — cutting assessments from hours to minutes.",
        "Python · LangGraph · OpenAI · Docker · OSINT","web-check-ai-assessor"],
      ["ML · Detection","Malicious Bash Command Detector",
        "ML classifier that flags malicious bash commands by analyzing syntax patterns with TF-IDF vectorization + Random Forest, trained across 7 categories of shell activity.",
        "Python · scikit-learn · TF-IDF · Random Forest",""],
      ["Linux · Hardening","Linux Security Hardening with Ansible",
        "Ansible playbooks automating CIS-Benchmark hardening on RHEL 9 — SSH, SELinux, firewall rules, auditd logging, service minimization & Fail2Ban. Cut manual hardening from 4 hours to 15 min/server.",
        "RHEL 9 · Ansible · CIS · SELinux · auditd","linux-security-hardening"],
      ["DevSecOps","secure-cicd-pipeline",
        "DevSecOps CI/CD pipeline with 5 automated security gates — Bandit (SAST), Trivy (SCA) & OWASP ZAP (DAST).",
        "Python · SAST · DAST · CI/CD","secure-cicd-pipeline"],
    ];
    return p.map(x=>{
      const href = x[4] ? `${gh}/${x[4]}` : gh;
      return `<div class="card"><div class="t"><a class="link" target="_blank" href="${href}">${x[1]}</a> <span class="meta">[${x[0]}]</span></div><div class="d">${x[2]}</div><div class="tags"># ${x[3]}</div></div>`;
    }).join("");
  },

  experience(){
    const e = [
      ["May 2026 — now","Cyber Security Trainee · Career Assured Program (CAP)","R-CAT · Jaipur",
        "Selected for R-CAT's industry CAP. Hands-on training across Network Security, IAM, Web & Cloud Security, SIEM and Security Operations — with practical work in Nmap, Wireshark, Splunk, Burp Suite & vulnerability assessment, plus industry projects and security labs."],
      ["Feb — Apr 2026","Apprentice · Linux Systems & Automation","R-CAT · Jaipur",
        "Enterprise infrastructure automation — designed & optimized complex Ansible playbooks across multi-node topologies; ran simulated failovers and configured HA services to clear the rigorous RHCE exam."],
      ["Mar — May 2025","Apprentice · Linux Systems Infrastructure","R-CAT · Jodhpur",
        "Managed multi-user RHEL environments, permission schemas, core networking & package management; audited system logs and systemd processes to troubleshoot faults and ensure uptime."],
      ["Jan — Jun 2021","Freelance Developer","Upwork · Remote",
        "Built web applications for clients using the MERN stack — early dev experience that now informs how I approach application security."],
    ];
    return e.map(x=>`<div class="card"><div class="t">${x[1]} <span class="meta">@ ${x[2]}</span></div><div class="m">${x[0]}</div><div class="d">${x[3]}</div></div>`).join("");
  },

  education(){
    return `<div class="card"><div class="t">Bachelor of Computer Applications (BCA) — Computer Science</div><div class="meta">Jai Narain Vyas University · Jodhpur</div><div class="m">Sep 2022 — May 2025</div></div>
    <div class="line m" style="margin-top:.4rem">Also: XII (RBSE, Science) · 2021 &nbsp;|&nbsp; X (RBSE) · 2019</div>`;
  },

  contact(){
    return `<div class="line">Open to <span class="g">${DATA.openTo}</span>. Let's talk:</div>
    <div class="kv" style="margin-top:.5rem">
      <div class="k">email</div><div><a class="link" href="mailto:${DATA.email}">${DATA.email}</a></div>
      <div class="k">phone</div><div>${DATA.phone}</div>
      <div class="k">location</div><div>${DATA.location}</div>
      <div class="k">github</div><div><a class="link" target="_blank" href="${DATA.social.github}">${DATA.social.github}</a></div>
      <div class="k">linkedin</div><div><a class="link" target="_blank" href="${DATA.social.linkedin}">${DATA.social.linkedin}</a></div>
      <div class="k">tryhackme</div><div><a class="link" target="_blank" href="${DATA.social.tryhackme}">${DATA.social.tryhackme}</a> <span class="m">(${DATA.stats.thm})</span></div>
    </div>`;
  },
  social(){ return COMMANDS.contact(); },

  resume(){
    if(DATA.resume && DATA.resume!=="#"){ window.open(DATA.resume,"_blank"); return `<div class="line g">↗ opening résumé (PDF) in a new tab...</div>`; }
    return `<div class="line a">No résumé wired up yet.</div>`;
  },

  sudo(){ return `<div class="line r">[sudo] password for visitor: </div><div class="line">visitor is not in the sudoers file. <span class="a">This incident will be reported.</span> 🙃</div>`; },

  ls(){ return `<div class="line"><span class="c">about.md</span>   <span class="c">skills.txt</span>   <span class="c">projects/</span>   <span class="c">certs.pem</span>   <span class="g">contact.sh</span>   <span class="m">.secrets</span></div>`; },
  pwd(){ return `<div class="line">/home/visitor</div>`; },
  date(){ return `<div class="line">${new Date().toString()}</div>`; },
  echo(args){ return `<div class="line">${esc(args.join(" "))}</div>`; },

  banner(){ return `<pre class="banner">${BANNER}</pre><div class="sub">${DATA.role}</div>`; },

  clear(){ $("#output").innerHTML=""; return ""; },

  theme(args){
    if(!args.length){
      const list = THEMES.map(t => `<span class="${t===currentTheme?'g b':'m'}">${t}${t===currentTheme?' ◄':''}</span>`).join("   ");
      return `<div class="line">available themes: ${list}</div><div class="line m">usage: <span class="g">theme &lt;name&gt;</span> — e.g. <span class="g">theme light</span>. Or click <span class="g">◐</span> in the title bar.</div>`;
    }
    const name = args[0].toLowerCase();
    if(!THEMES.includes(name)) return `<div class="line r">unknown theme: ${esc(name)}</div><div class="line m">try: ${THEMES.join(" · ")}</div>`;
    applyTheme(name);
    return `<div class="line g">theme set → ${THEME_LABEL[name]} ✓</div>`;
  },

  async github(){
    await printLine(`<div class="line m">Fetching live data from github.com/SureshDeora ...</div>`);
    const user = DATA.social.github.split("/").pop();
    try{
      const [u, repos] = await Promise.all([
        fetch(`https://api.github.com/users/${user}`).then(r=>r.json()),
        fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`).then(r=>r.json()),
      ]);
      if(!Array.isArray(repos) || u.message) throw new Error("rate-limited");
      const stars = repos.reduce((s,r)=>s+(r.stargazers_count||0),0);
      const langs = {};
      repos.forEach(r=>{ if(r.language) langs[r.language]=(langs[r.language]||0)+1; });
      const topLangs = Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>x[0]).join(" · ") || "—";
      const recent = repos.filter(r=>!r.fork).slice(0,5).map(r=>
        `<div class="line"><span class="g">◆</span> <a class="link" target="_blank" href="${r.html_url}">${r.name}</a> <span class="m">${r.language||""}${r.stargazers_count?(" · ★"+r.stargazers_count):""}</span></div>`
      ).join("");
      return `<div class="kv">
        <div class="k">user</div><div>${u.name||"Suresh Deora"} <span class="m">(@${u.login})</span></div>
        <div class="k">public repos</div><div><span class="c">${u.public_repos}</span></div>
        <div class="k">followers</div><div><span class="c">${u.followers}</span> · following ${u.following}</div>
        <div class="k">total stars</div><div><span class="c">★ ${stars}</span></div>
        <div class="k">top langs</div><div>${topLangs}</div>
      </div>
      <div class="line" style="margin-top:.5rem"><span class="c b">▸ recently updated</span></div>${recent}
      <div class="line m" style="margin-top:.3rem">↗ <a class="link" target="_blank" href="${u.html_url}">${u.html_url}</a></div>`;
    }catch(e){
      return `<div class="line a">GitHub API unreachable right now (rate limit or offline). Visit <a class="link" target="_blank" href="${DATA.social.github}">${DATA.social.github}</a> directly.</div>`;
    }
  },

  async scan(){
    const ports = [["22","ssh","OpenSSH (RHEL · hardened)"],["80","http","nginx"],["443","https","TLS 1.3"],["1514","wazuh","SIEM — monitored"],["31337","elite","🚩 you found me"]];
    await printLine(`<div class="line m">Starting Nmap 7.95 against suresh-sec (127.0.0.1)...</div>`);
    await sleep(250);
    await printLine(`<div class="line">PORT      STATE  SERVICE     VERSION</div>`);
    for(const [p,s,v] of ports){
      await sleep(180);
      await printLine(`<div class="line"><span class="g">${(p+"/tcp").padEnd(10)}</span><span class="c">${"open".padEnd(7)}</span>${s.padEnd(12)}<span class="m">${v}</span></div>`);
    }
    await sleep(200);
    return `<div class="line g">Scan complete — 1 host up. Try a real command: <span class="b">help</span></div>`;
  },
};

const ALIASES = { "?":"help","man":"help","cat":"ls","info":"about","cv":"resume","email":"contact","work":"experience","exp":"experience","journey":"experience","repos":"projects","edu":"education","themes":"theme","mode":"theme","gh":"github","stats":"github" };
const CHIP_LIST = ["about","skills","projects","experience","certs","education","github","contact","scan"];

/* ---------- ENGINE ---------- */
const output = $("#output");
const term = $("#terminal");
const input = $("#cmd");
let history = [], hi = -1, busy = false;

const sleep = ms => new Promise(r=>setTimeout(r,ms));
function scroll(){ term.scrollTop = term.scrollHeight; }

function printLine(html){
  const div = document.createElement("div");
  div.innerHTML = html;
  output.appendChild(div);
  scroll();
  return Promise.resolve();
}

async function run(raw){
  const cmdline = raw.trim();
  await printLine(`<div class="cmd-echo">${promptHTML} ${esc(cmdline)}</div>`);
  if(!cmdline) return;
  history.unshift(cmdline); hi = -1;

  const [name, ...args] = cmdline.split(/\s+/);
  const key = ALIASES[name.toLowerCase()] || name.toLowerCase();
  const fn = COMMANDS[key];

  if(!fn){
    await printLine(`<div class="line r">command not found: ${esc(name)}</div><div class="line m">type <span class="g">help</span> to see what I can do.</div>`);
    return;
  }
  busy = true;
  try{
    const res = await fn(args);
    if(res) await printLine(res);
  }catch(e){ await printLine(`<div class="line r">error: ${esc(String(e))}</div>`); }
  busy = false;
  scroll();
}

/* input handling */
input.addEventListener("keydown", async (e)=>{
  if(busy && e.key!=="Enter") return;
  if(e.key==="Enter"){
    const v = input.value; input.value="";
    await run(v);
  } else if(e.key==="ArrowUp"){
    e.preventDefault();
    if(hi < history.length-1){ hi++; input.value = history[hi]||""; setTimeout(()=>input.setSelectionRange(999,999),0); }
  } else if(e.key==="ArrowDown"){
    e.preventDefault();
    if(hi>0){ hi--; input.value = history[hi]||""; } else { hi=-1; input.value=""; }
  } else if(e.key==="Tab"){
    e.preventDefault();
    const cur = input.value.toLowerCase();
    if(!cur) return;
    const pool = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
    const match = pool.filter(c=>c.startsWith(cur));
    if(match.length===1) input.value = match[0];
    else if(match.length>1){ printLine(`<div class="line m">${match.join("   ")}</div>`); }
  } else if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="l"){
    e.preventDefault(); COMMANDS.clear();
  }
});

term.addEventListener("click", ()=> input.focus());
document.addEventListener("keydown",(e)=>{ if(!busy && document.activeElement!==input && e.key.length===1) input.focus(); });

/* deep-links: #projects, #contact, #github ... run that command */
function getHashCommand(){
  const h = (location.hash||"").replace(/^#/,"").trim().toLowerCase();
  if(!h) return null;
  const key = ALIASES[h] || h;
  return COMMANDS[key] ? h : null;
}
window.addEventListener("hashchange", ()=>{ const c=getHashCommand(); if(c && !busy) run(c); });

// chips
const chips = $("#chips");
CHIP_LIST.forEach(c=>{
  const b = document.createElement("button");
  b.className="chip"; b.textContent=c;
  b.addEventListener("click", async ()=>{ if(busy) return; try{history.replaceState(null,"","#"+c);}catch(e){} input.value=""; input.focus(); await run(c); });
  chips.appendChild(b);
});

// clock
function tick(){ const d=new Date(); $("#clock").textContent = d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}); }
tick(); setInterval(tick,15000);

/* auto-type a command (for the first-visit demo) */
async function autoType(text){
  input.focus();
  for(let i=0;i<text.length;i++){ input.value += text[i]; await sleep(75); }
  await sleep(280);
  const v = input.value; input.value="";
  await run(v);
}

/* ---------- BOOT SEQUENCE ---------- */
const BOOT = [
  ["[ <span class='ok'>OK</span> ] Mounting /dev/secure ............ done", 90],
  ["[ <span class='ok'>OK</span> ] Loading kernel modules (SELinux). done", 90],
  ["[ <span class='ok'>OK</span> ] Starting Wazuh SIEM agent ........ done", 110],
  ["[ <span class='warn'>!!</span> ] Firewall: 3,412 probes blocked today", 130],
  ["[ <span class='ok'>OK</span> ] Applying CIS hardening (Ansible) . done", 110],
  ["[ <span class='ok'>OK</span> ] Spawning portfolio shell ........ done", 120],
  ["<span class='dim'>Authenticating visitor session...</span>", 220],
  ["<span class='ok'>Access granted.</span> Welcome.", 320],
];
async function boot(){
  const log = $("#bootLog");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Boot + auto-demo are CONTENT, not gratuitous motion — always show them.
  // Reduced-motion users just get a quicker reveal.
  const speed = reduce ? 0.4 : 1;
  log.innerHTML = "<span class='dim'>suresh-sec BIOS v4.0.4 — POST...</span>\n\n";
  for(const [t,ms] of BOOT){
    log.innerHTML += t + "\n";
    await sleep(Math.max(45, ms*speed));
  }
  await sleep(reduce?180:350);
  $("#boot").classList.add("hidden");
  $("#screen").classList.remove("hidden");
  input.focus();
  await printLine(`<pre class="banner">${BANNER}</pre>`);
  await printLine(`<div class="sub">${DATA.role} — <span class="g">${DATA.location}</span></div>`);
  await printLine(`<div class="line">Welcome to my interactive portfolio. Type <span class="g b">help</span> to begin, or tap a command below. <span class="m">Try <span class="g">scan</span> or <span class="g">github</span> if you're feeling curious.</span></div>`);
  // first-visit: honor a deep-link (#projects, #contact...) else auto-demo `about`
  await sleep(reduce?300:650);
  const hashCmd = getHashCommand();
  const startCmd = hashCmd || "about";
  if(reduce) await run(startCmd); else await autoType(startCmd);
}

/* ---------- MATRIX BG ---------- */
(function(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv=$("#matrix"), ctx=cv.getContext("2d");
  const fs=14, chars="アカサタナ01<>{}#$%&*ABCDEF0123456789".split("");
  let cols, drops;
  function resize(){ cv.width=innerWidth; cv.height=innerHeight; cols=Math.floor(cv.width/fs); drops=Array(cols).fill(0).map(()=>Math.random()*cv.height/fs); }
  resize(); addEventListener("resize",resize);
  let last=0;
  (function draw(t){
    if(t-last>58){ last=t;
      ctx.fillStyle="rgba(7,10,13,.09)"; ctx.fillRect(0,0,cv.width,cv.height);
      ctx.fillStyle=accentColor; ctx.font=fs+"px JetBrains Mono, monospace";
      for(let i=0;i<drops.length;i++){
        ctx.fillText(chars[Math.random()*chars.length|0], i*fs, drops[i]*fs);
        if(drops[i]*fs>cv.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
    }
    requestAnimationFrame(draw);
  })(0);
})();

boot();
