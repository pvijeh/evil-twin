const products = [
  { name: "Le Terroir", badge: "Best seller in Monaco", body: "wood",
    desc: "Organic farm-to-table heirloom leaf, aged 36 months in French oak to Vivaldi's Four Seasons.",
    notes: ["Wet hay", "Old money", "Vivaldi"] },
  { name: "Crystal Skull Oud", badge: "Limited", body: "crystal",
    desc: "4,069 hand-set crystals on a skull on a pen. Smells like a Dubai hotel lobby at 3 AM.",
    notes: ["Oud", "Valet parking", "Marble"] },
  { name: "Tiger Blood Mango", badge: "New", body: "tiger",
    desc: "Tiger print body, 24k gold mouthpiece. Aged to Wagner, played loudly, in a Lamborghini.",
    notes: ["Mango", "Wagner", "Horsepower"] },
  { name: "The Evil Twin", badge: "Waitlist: 3 years", body: "twin",
    desc: "Two pens welded together. One for you, one for the version of you who replies-all.",
    notes: ["Duality", "Bad decisions", "Mirrors"] },
  { name: "Hamptons Rosé", badge: "Summer only", body: "rose",
    desc: "Provence grapes hand-crushed by an intern in loafers. Aged to Chopin on a sailboat.",
    notes: ["Rosé", "Linen", "Daddy's boat"] },
  { name: "Lambo Glacier Mint", badge: "Matches your Lambo", body: "mint",
    desc: "Mint grown on a glacier we bought. Ships in a box shaped like a Lamborghini.",
    notes: ["Glacier", "Mint", "Carbon fiber"] }
];

const fills = {
  wood: `<linearGradient id="F" x1="0" x2="1"><stop offset="0" stop-color="#3b2210"/><stop offset=".3" stop-color="#7a4a22"/><stop offset=".5" stop-color="#a86a34"/><stop offset=".7" stop-color="#6b3d1a"/><stop offset="1" stop-color="#2b170a"/></linearGradient>`,
  crystal: `<linearGradient id="F"><stop stop-color="#000"/></linearGradient>`,
  tiger: `<pattern id="F" width="40" height="30" patternUnits="userSpaceOnUse"><rect width="40" height="30" fill="#f2a019"/><path d="M0 5 Q20 12 40 4 L40 9 Q20 18 0 10Z" fill="#000"/><path d="M5 20 Q20 24 30 19 L32 23 Q20 29 6 25Z" fill="#000"/></pattern>`,
  twin: `<linearGradient id="F" x1="0" x2="1"><stop offset=".5" stop-color="#0b0b0b"/><stop offset=".5" stop-color="#f4f1ea"/></linearGradient>`,
  rose: `<linearGradient id="F" x1="0" x2="1"><stop offset="0" stop-color="#a8325a"/><stop offset=".5" stop-color="#ffb3c8"/><stop offset="1" stop-color="#8a1f45"/></linearGradient>`,
  mint: `<linearGradient id="F" x1="0" x2="1"><stop offset="0" stop-color="#0f5c4a"/><stop offset=".45" stop-color="#b8ffe6"/><stop offset=".55" stop-color="#e8fff7"/><stop offset="1" stop-color="#0d4a3c"/></linearGradient>`
};

function pen(p, i) {
  const id = "p" + i;
  const fillDef = fills[p.body].replace('id="F"', `id="${id}f"`);
  const bodyFill = p.body === "crystal" ? "url(#rhinestones)" : `url(#${id}f)`;
  return `<svg class="pen" viewBox="0 0 320 260" aria-hidden="true">
    <defs>${fillDef}
      <radialGradient id="${id}g"><stop offset="0" stop-color="#ff2a5f" stop-opacity=".9"/><stop offset="1" stop-color="#ff2a5f" stop-opacity="0"/></radialGradient>
    </defs>
    <g class="pen-svg">
      <ellipse cx="160" cy="240" rx="110" ry="8" fill="rgba(226,179,60,.18)"/>
      <g transform="rotate(-28 160 130)">
        <circle cx="160" cy="232" r="26" fill="url(#${id}g)"><animate attributeName="r" values="18;30;18" dur="2.4s" repeatCount="indefinite"/></circle>
        <rect x="140" y="40" width="40" height="190" rx="18" fill="${bodyFill}" stroke="url(#goldgrad)" stroke-width="4"/>
        <rect x="146" y="6" width="28" height="42" rx="10" fill="url(#goldgrad)"/>
        <rect x="138" y="44" width="44" height="10" rx="3" fill="url(#goldgrad)"/>
        <rect x="138" y="196" width="44" height="10" rx="3" fill="url(#goldgrad)"/>
        ${[0,1,2,3,4,5].map(k => `<circle cx="${146 + k*5.6}" cy="201" r="2.4" fill="url(#gem)"/>`).join("")}
        <use href="#skull" x="146" y="100" width="28" height="34"/>
        <rect x="148" y="48" width="5" height="140" rx="2" fill="#fff" opacity=".25"/>
      </g>
    </g>
  </svg>`;
}

document.getElementById("grid").innerHTML = products.map((p, i) => `
  <article class="card">
    <span class="badge">${p.badge}</span>
    ${pen(p, i)}
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <div class="notes">${p.notes.map(n => `<span>${n}</span>`).join("")}</div>
    <div class="buy"><span class="price">$420.69</span><button class="btn btn-gold btn-sm" data-wire data-item="${p.name}">Add to cart</button></div>
  </article>`).join("");

// Entry gate
const gate = document.getElementById("gate");
if (sessionStorage.getItem("et-rich")) gate.remove();
else {
  document.body.classList.add("locked");
  gate.querySelectorAll("[data-enter]").forEach(b => b.addEventListener("click", e => {
    sessionStorage.setItem("et-rich", "1");
    gate.classList.add("gone");
    document.body.classList.remove("locked");
    cashBurst(e.clientX, e.clientY);
    setTimeout(() => gate.remove(), 700);
  }));
}

// Wire modal
const modal = document.getElementById("wire");
const item = document.getElementById("modal-item");
document.addEventListener("click", e => {
  const w = e.target.closest("[data-wire]");
  if (w) {
    const name = w.dataset.item;
    item.textContent = name ? `Order: 1 × ${name} — $420.69` : "Order: 1 × Evil Twin — $420.69";
    modal.hidden = false;
    document.body.classList.add("locked");
    cashBurst(e.clientX, e.clientY);
    return;
  }
  if (e.target.closest("[data-close]") || e.target === modal) {
    modal.hidden = true;
    document.body.classList.remove("locked");
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { modal.hidden = true; document.body.classList.remove("locked"); } });

// Copy wire details
const toast = document.getElementById("toast");
document.getElementById("copy-wire").addEventListener("click", e => {
  const text = [...document.querySelectorAll(".wire-big dt")].map(dt => `${dt.textContent}: ${dt.nextElementSibling.textContent}`).join("\n");
  navigator.clipboard?.writeText(text + "\n\n(This is a joke. Do not send money.)").catch(() => {});
  cashBurst(e.clientX, e.clientY);
  toast.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.hidden = true), 2200);
});

// Money burst
function cashBurst(x, y) {
  const glyphs = ["$", "💎", "☠", "$", "✦", "💸"];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.className = "cash";
    s.textContent = glyphs[i % glyphs.length];
    const a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 180;
    s.style.left = x + "px"; s.style.top = y + "px";
    s.style.setProperty("--dx", Math.cos(a) * d + "px");
    s.style.setProperty("--dy", Math.sin(a) * d + "px");
    s.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1400);
  }
}

// Money rain in hero
const rain = document.querySelector(".money-rain");
for (let i = 0; i < 28; i++) {
  const s = document.createElement("span");
  s.textContent = i % 3 ? "$" : "$420.69";
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 14 + Math.random() * 34 + "px";
  s.style.animationDuration = 6 + Math.random() * 10 + "s";
  s.style.animationDelay = -Math.random() * 16 + "s";
  rain.appendChild(s);
}

// Cursor bling
let last = 0;
window.addEventListener("pointermove", e => {
  const now = performance.now();
  if (now - last < 40 || e.pointerType === "touch") return;
  last = now;
  const b = document.createElement("span");
  b.className = "bling";
  b.textContent = "✦";
  b.style.left = e.clientX + "px"; b.style.top = e.clientY + "px";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 800);
});
