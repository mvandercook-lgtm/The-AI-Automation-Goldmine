/* ============================================================
   THE AI AUTOMATION GOLDMINE — Main JavaScript
   ============================================================ */

// --- Navigation scroll effect ---
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.background = "rgba(10,10,15,0.98)";
  } else {
    nav.style.background = "rgba(10,10,15,0.85)";
  }
});

// --- Hamburger menu toggle ---
const hamburger = document.querySelector(".nav__hamburger");
const navLinks  = document.querySelector(".nav__links");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.style.display === "flex";
    navLinks.style.display = isOpen ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "70px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.background = "rgba(10,10,15,0.98)";
    navLinks.style.padding = "16px";
    navLinks.style.gap = "4px";
  });
}

// --- Animated counter ---
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// --- Intersection Observer for counters & fade-ins ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Counters
      if (entry.target.classList.contains("js-counter")) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
      // Fade in
      if (entry.target.classList.contains("js-fade")) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".js-counter, .js-fade").forEach(el => observer.observe(el));

// --- Newsletter form ---
const form = document.querySelector(".newsletter__form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input").value;
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    const btn = form.querySelector("button");
    btn.textContent = "✅ You are in!";
    btn.style.background = "#27C93F";
    btn.disabled = true;
    form.querySelector("input").disabled = true;
  });
}

// --- Terminal typing animation ---
const terminalLines = [
  { type: "cmd",    text: "$ ai-goldmine deploy --site production" },
  { type: "output", text: "▶  Optimizing SEO metadata..." },
  { type: "output", text: "▶  Syncing content calendar..." },
  { type: "output", text: "▶  Scheduling 24 social posts..." },
  { type: "success",text: "✓  Deployment complete in 3.2s" },
  { type: "cmd",    text: "$ revenue --month June --forecast" },
  { type: "success",text: "✓  Projected: $42,000 ARR | +18% MoM" },
];

const terminalBody = document.querySelector(".terminal__body");
if (terminalBody) {
  terminalBody.innerHTML = "";
  let lineIndex = 0;

  const addLine = () => {
    if (lineIndex >= terminalLines.length) { lineIndex = 0; terminalBody.innerHTML = ""; }
    const line = terminalLines[lineIndex++];
    const div = document.createElement("div");
    div.className = "terminal__line";
    if (line.type === "cmd") {
      div.innerHTML = `<span class="terminal__prompt">❯</span><span class="terminal__cmd">${line.text}</span>`;
    } else if (line.type === "success") {
      div.innerHTML = `<span class="terminal__success">${line.text}</span>`;
    } else {
      div.innerHTML = `<span class="terminal__output">${line.text}</span>`;
    }
    div.style.opacity = "0";
    div.style.transform = "translateX(-10px)";
    div.style.transition = "all 0.3s ease";
    terminalBody.appendChild(div);
    requestAnimationFrame(() => {
      div.style.opacity = "1";
      div.style.transform = "translateX(0)";
    });
    // Add cursor blink on last line
    const cursor = document.createElement("span");
    cursor.className = "terminal__cursor";
    div.appendChild(cursor);
    setTimeout(() => { cursor.remove(); addLine(); }, 900);
  };

  setTimeout(addLine, 800);
}

// --- Active nav link highlight ---
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav__links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
});
