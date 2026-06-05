const weddingDate = new Date("2026-09-30T17:00:00+09:00");

const pad = (value) => String(Math.max(0, value)).padStart(2, "0");

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, weddingDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

function setupReveals() {
  const targets = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22 }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupPetals() {
  const field = document.querySelector(".petal-field");

  if (!field) return;

  for (let i = 0; i < 28; i += 1) {
    const petal = document.createElement("span");
    const size = 7 + Math.random() * 12;
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * -18;
    const drift = (Math.random() * 170 - 85).toFixed(0);

    petal.className = "petal";
    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.55}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--drift", `${drift}px`);
    field.appendChild(petal);
  }
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scroll);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupCutoutFallback() {
  const cutout = document.querySelector("[data-cutout]");

  if (!cutout) return;

  const showCutout = () => {
    cutout.classList.remove("is-missing");
  };

  const hideCutout = () => {
    cutout.classList.add("is-missing");
  };

  cutout.addEventListener("load", showCutout);
  cutout.addEventListener("error", hideCutout);

  if (cutout.complete) {
    if (cutout.naturalWidth > 0) showCutout();
    else hideCutout();
  }
}

function setupRsvp() {
  const form = document.getElementById("rsvpForm");
  const message = document.getElementById("formMessage");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("wedding-rsvp-preview", JSON.stringify(data));
    message.textContent = "고마워요. 답변이 이 브라우저에 임시 저장되었습니다.";
    form.reset();
  });
}

function setupSoundToggle() {
  const button = document.querySelector("[data-sound]");

  button?.addEventListener("click", () => {
    button.classList.toggle("is-muted");
    button.setAttribute(
      "aria-label",
      button.classList.contains("is-muted") ? "음악 켜기" : "음악 끄기"
    );
  });
}

updateCountdown();
setupReveals();
setupPetals();
setupScrollButtons();
setupCutoutFallback();
setupRsvp();
setupSoundToggle();

setInterval(updateCountdown, 1000);
