const weddingDate = new Date("2026-09-30T17:00:00+09:00");

const translations = {
  ko: {
    openButton: "초대장 열기",
    greetingTitle: "소중한 분들을 초대합니다",
    greetingP1: "더는 서로의 빈칸을 빈칸으로 남겨둘 수 없어, 저희는 한 페이지에 같은 이름을 적어보기로 했습니다.",
    greetingP2: "기쁜 마음으로 첫 가족의 날을 준비하고 있습니다. 오셔서 웃음과 축복으로 이 하루를 환하게 채워주세요.",
    musicNote: "음악이 방해된다면 오른쪽 위 버튼으로 잠시 쉬게 할 수 있어요.",
    parentsGroom: '신랑측 혼주 <b>김민수 · 이정아</b>',
    parentsBride: '신부측 혼주 <b>박영호 · 최수진</b>',
    countdownTitle: "예식까지 남은 시간",
    galleryTitle: "우리의 장면들",
    galleryText: "빛과 바람이 지나간 순간들을 한 장씩 모았습니다.",
    scheduleTitle: "그날의 순서",
    scheduleOneTitle: "게스트 맞이",
    scheduleOneText: "웰컴 드링크와 포토타임",
    scheduleTwoTitle: "예식",
    scheduleTwoText: "두 사람이 전하는 약속",
    scheduleThreeTitle: "축하 만찬",
    scheduleThreeText: "맛있는 음식, 춤, 그리고 긴 이야기",
    placeTitle: "라온 웨딩홀",
    placeAddress: "서울특별시 강남구 테헤란로 123",
    mapButton: "지도 보기",
    dressTitle: "부드러운 색으로 함께해주세요",
    dressText: "아이보리, 세이지, 레몬, 베이지 톤을 환영합니다.",
    footerText: "따뜻한 마음으로 기다리겠습니다.",
    backTop: "맨 위로",
    soundOn: "음악 켜기",
    soundOff: "음악 끄기"
  },
  en: {
    openButton: "Open invitation",
    greetingTitle: "You are warmly invited",
    greetingP1: "We have decided to write our names on the same page and begin a new chapter together.",
    greetingP2: "Please join us and fill this day with your smiles, blessings, and warmth.",
    musicNote: "If the music distracts you, use the button at the top right.",
    parentsGroom: "Groom's family <b>Minsoo Kim · Jeonga Lee</b>",
    parentsBride: "Bride's family <b>Youngho Park · Sujin Choi</b>",
    countdownTitle: "Time left until the ceremony",
    galleryTitle: "Our moments",
    galleryText: "A few scenes gathered from light, wind, and happy movement.",
    scheduleTitle: "The order of the day",
    scheduleOneTitle: "Guest welcome",
    scheduleOneText: "Welcome drink and photo time",
    scheduleTwoTitle: "Ceremony",
    scheduleTwoText: "A promise shared by two people",
    scheduleThreeTitle: "Celebration dinner",
    scheduleThreeText: "Good food, dancing, and long stories",
    placeTitle: "Raon Wedding Hall",
    placeAddress: "123 Teheran-ro, Gangnam-gu, Seoul",
    mapButton: "View map",
    dressTitle: "Please join us in soft colors",
    dressText: "Ivory, sage, lemon, and beige tones are warmly welcomed.",
    footerText: "We will be waiting with warm hearts.",
    backTop: "Back to top",
    soundOn: "Music on",
    soundOff: "Music off"
  },
  ru: {
    openButton: "Открыть приглашение",
    greetingTitle: "Приглашаем вас на нашу свадьбу",
    greetingP1: "Мы решили начать новую главу вместе и написать наши имена на одной странице.",
    greetingP2: "Будем счастливы, если вы разделите с нами этот день, наполните его улыбками, теплом и добрыми пожеланиями.",
    musicNote: "Если музыка отвлекает, ее можно выключить кнопкой справа вверху.",
    parentsGroom: "Семья жениха <b>Минсу Ким · Чона Ли</b>",
    parentsBride: "Семья невесты <b>Ёнхо Пак · Суджин Чхве</b>",
    countdownTitle: "До церемонии осталось",
    galleryTitle: "Наши моменты",
    galleryText: "Несколько кадров, собранных из света, ветра и счастливого движения.",
    scheduleTitle: "Программа дня",
    scheduleOneTitle: "Сбор гостей",
    scheduleOneText: "Welcome drink и фотосессия",
    scheduleTwoTitle: "Церемония",
    scheduleTwoText: "Обещание двух сердец",
    scheduleThreeTitle: "Праздничный ужин",
    scheduleThreeText: "Вкусная еда, танцы и долгие разговоры",
    placeTitle: "Raon Wedding Hall",
    placeAddress: "Сеул, Каннам-гу, Техеран-ро 123",
    mapButton: "На карте",
    dressTitle: "Будем рады мягким оттенкам",
    dressText: "Айвори, шалфейный, лимонный и бежевый тона приветствуются.",
    footerText: "Ждем вас с теплом и радостью.",
    backTop: "Наверх",
    soundOn: "Включить музыку",
    soundOff: "Выключить музыку"
  }
};

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const forced = params.get("lang");
  const browser = (forced || navigator.language || "en").toLowerCase();

  if (browser.startsWith("ko")) return "ko";
  if (browser.startsWith("ru")) return "ru";
  return "en";
}

function applyLanguage() {
  const lang = getLanguage();
  const dictionary = translations[lang];

  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dictionary[node.dataset.i18n];
    if (value) node.innerHTML = value;
  });

  const soundButton = document.querySelector("[data-sound]");
  soundButton?.setAttribute("aria-label", dictionary.soundOn);
}

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

function setupSoundToggle() {
  const button = document.querySelector("[data-sound]");

  button?.addEventListener("click", () => {
    const dictionary = translations[getLanguage()];

    button.classList.toggle("is-muted");
    button.setAttribute(
      "aria-label",
      button.classList.contains("is-muted") ? dictionary.soundOn : dictionary.soundOff
    );
  });
}

function setupContentProtection() {
  document.querySelectorAll("img").forEach((image) => {
    image.setAttribute("draggable", "false");
  });

  ["contextmenu", "dragstart", "selectstart"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      event.preventDefault();
    });
  });
}

applyLanguage();
updateCountdown();
setupReveals();
setupPetals();
setupScrollButtons();
setupCutoutFallback();
setupSoundToggle();
setupContentProtection();

setInterval(updateCountdown, 1000);
