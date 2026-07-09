// ============================================
// CONFIG — paste your TMDB API key below
// ============================================
const TMDB_API_KEY = "44bcd0f55b115104d880966cb4de1d8c";
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const IMG_BASE_SM = "https://image.tmdb.org/t/p/w185";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";
const LOGO_BASE = "https://image.tmdb.org/t/p/w92";

// ============================================
// STATE
// ============================================
let currentType = "movie";
let currentGenres = null;
let currentRegion = localStorage.getItem("jps_region") || "US";
let rejectCount = parseInt(sessionStorage.getItem("jps_rejects") || "0", 10);
let watchlist = JSON.parse(localStorage.getItem("jps_watchlist") || "[]");

// ============================================
// MOODS
// ============================================
const MOODS = [
  { label: "Brain Off", sub: "no thinking required", movieGenres: [28, 12], tvGenres: [10759] },
  { label: "Need To Cry", sub: "full emotional damage", movieGenres: [18], tvGenres: [18] },
  { label: "Feel Good", sub: "low stakes, high comfort", movieGenres: [35, 10751], tvGenres: [35, 10751] },
  { label: "Scared Tonight", sub: "sleep with the lights on", movieGenres: [27], tvGenres: [9648] },
  { label: "Date Night", sub: "something to hold hands to", movieGenres: [10749], tvGenres: [10766] },
  { label: "Mind Bender", sub: "twists, loops, questions after", movieGenres: [878, 9648], tvGenres: [9648, 10765] },
  { label: "Just Surprise Me", sub: "fully random, no filter", movieGenres: null, tvGenres: null }
];

// ============================================
// CURATED COLLECTIONS — hand-picked TMDB IDs
// ============================================
const COLLECTIONS = [
  {
    id: "ruined-me",
    label: "Ruined me for a week",
    intro: "Don't say I didn't warn you. Have tissues, ice cream, and a hug on standby.",
    ids: [12477, 334533, 641, 497, 39451, 395992]
    // Grave of the Fireflies, Manchester by the Sea, Requiem for a Dream,
    // The Green Mile, Blue Valentine, A Ghost Story
  },
  {
    id: "hangover",
    label: "Sunday hangover watches",
    intro: "Low effort, high comfort. Nothing here will make you think hard.",
    ids: [1584, 346648, 120467, 11259, 207932, 9377]
    // School of Rock, Paddington 2, Grand Budapest Hotel,
    // Napoleon Dynamite, Chef, Ferris Bueller's Day Off
  },
  {
    id: "foreign",
    label: "Worth the subtitles",
    intro: "Read a little, get a lot. Non-English films that hit different.",
    ids: [496243, 194, 670, 129, 598, 1417]
    // Parasite, Amélie, Oldboy, Spirited Away, City of God, Pan's Labyrinth
  },
  {
    id: "rewatch",
    label: "Hits harder the second time",
    intro: "You watched it once. Watch it again. Different movie now, trust me.",
    ids: [550, 329865, 1124, 77, 157336, 244786]
    // Fight Club, Arrival, The Prestige, Memento, Interstellar, Whiplash
  },
  {
    id: "short-sharp",
    label: "Short and sharp",
    intro: "Under two hours, still wrecks you. For when you've got a bedtime.",
    ids: [862, 10386, 137, 4147, 9603, 76]
    // Toy Story, The Iron Giant, Groundhog Day, In Bruges, Zoolander, Before Sunrise
  }
];

// ============================================
// HERO — headline flip + eyebrow rotate
// ============================================
const flipPhrases = ["TONIGHT?", "IDK.", "MAYBE THIS?", "JUST PICK."];
const eyebrowPhrases = [
  "FOR PEOPLE WHO CAN'T DECIDE —",
  "FOR THE FAMILY GROUP CHAT —",
  "FOR COUPLES WHO CAN'T AGREE —",
  "FOR FRIDAY NIGHTS AT 9PM —"
];
let flipIndex = 0;
let eyeIndex = 0;
const headlineEl = document.getElementById("flip-headline");
const eyebrowEl = document.getElementById("hero-eyebrow");

setInterval(() => {
  headlineEl.classList.add("swap");
  setTimeout(() => {
    flipIndex = (flipIndex + 1) % flipPhrases.length;
    headlineEl.textContent = flipPhrases[flipIndex];
    headlineEl.classList.remove("swap");
  }, 150);
}, 2200);

setInterval(() => {
  eyebrowEl.classList.add("swap");
  setTimeout(() => {
    eyeIndex = (eyeIndex + 1) % eyebrowPhrases.length;
    eyebrowEl.textContent = eyebrowPhrases[eyeIndex];
    eyebrowEl.classList.remove("swap");
  }, 300);
}, 4800);

// ============================================
// POSTER WALL
// ============================================
async function loadPosterWall() {
  const wall = document.getElementById("poster-wall");
  try {
    const res = await fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=1`);
    if (!res.ok) return;
    const data = await res.json();
    wall.innerHTML = "";
    const posters = [...data.results, ...data.results]
      .filter((m) => m.poster_path)
      .slice(0, 28);
    posters.forEach((m) => {
      const img = document.createElement("img");
      img.src = `${IMG_BASE}${m.poster_path}`;
      img.alt = "";
      img.loading = "lazy";
      wall.appendChild(img);
    });
  } catch (_) {}
}
loadPosterWall();

// ============================================
// TRENDING STRIP
// ============================================
async function loadTrending() {
  const strip = document.getElementById("trending-strip");
  strip.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim);">loading...</p>`;
  try {
    const res = await fetch(`${TMDB_BASE}/trending/${currentType}/week?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error("trending fetch failed");
    const data = await res.json();
    strip.innerHTML = "";
    data.results.slice(0, 12).forEach((item) => {
      const title = item.title || item.name || "Untitled";
      const poster = item.poster_path
        ? `${IMG_BASE}${item.poster_path}`
        : "https://via.placeholder.com/140x210/382C21/E8B64C?text=No+Poster";
      const card = document.createElement("button");
      card.className = "trending-card";
      card.innerHTML = `
        <img src="${poster}" alt="${title} poster" loading="lazy">
        <div class="t-title">${title}</div>
      `;
      card.addEventListener("click", () => openDetails(item.id, item.media_type || currentType));
      strip.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    strip.innerHTML = `<p style="font-family: var(--mono); color: var(--coral);">Couldn't load trending — check your API key.</p>`;
  }
}

// ============================================
// CURATED COLLECTIONS
// ============================================
const collectionTabsEl = document.getElementById("collection-tabs");
const collectionGridEl = document.getElementById("collection-grid");
const collectionIntroEl = document.getElementById("collection-intro");
let activeCollectionId = COLLECTIONS[0].id;

function renderCollectionTabs() {
  collectionTabsEl.innerHTML = "";
  COLLECTIONS.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "collection-tab" + (c.id === activeCollectionId ? " active" : "");
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      activeCollectionId = c.id;
      renderCollectionTabs();
      loadCollection(c);
    });
    collectionTabsEl.appendChild(btn);
  });
}

async function loadCollection(collection) {
  collectionIntroEl.textContent = collection.intro;
  collectionGridEl.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim);">loading...</p>`;
  try {
    const results = await Promise.all(
      collection.ids.map((id) =>
        fetch(`${TMDB_BASE}/movie/${id}?api_key=${TMDB_API_KEY}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );
    collectionGridEl.innerHTML = "";
    results.filter(Boolean).forEach((item) => {
      const title = item.title || "Untitled";
      const poster = item.poster_path
        ? `${IMG_BASE}${item.poster_path}`
        : "https://via.placeholder.com/300x450/382C21/E8B64C?text=No+Poster";
      const card = document.createElement("button");
      card.className = "collection-card";
      card.innerHTML = `
        <img src="${poster}" alt="${title} poster" loading="lazy">
        <div class="c-title">${title}</div>
      `;
      card.addEventListener("click", () => openDetails(item.id, "movie"));
      collectionGridEl.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    collectionGridEl.innerHTML = `<p style="font-family: var(--mono); color: var(--coral);">Couldn't load this list.</p>`;
  }
}

renderCollectionTabs();
loadCollection(COLLECTIONS[0]);

// ============================================
// PICKER TABS
// ============================================
const pickerTabs = document.querySelectorAll(".picker-tab");
const panes = {
  wheel: document.getElementById("pane-wheel"),
  mood: document.getElementById("pane-mood"),
  feeling: document.getElementById("pane-feeling")
};

pickerTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    pickerTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    Object.values(panes).forEach((p) => (p.hidden = true));
    panes[tab.dataset.pane].hidden = false;
  });
});

// ============================================
// SPIN WHEEL
// ============================================
const wheelCanvas = document.getElementById("wheel-canvas");
const wheelCtx = wheelCanvas.getContext("2d");
const wheelColors = ["#E8B64C", "#FF5A4E", "#F4EDE0", "#433527"];
let wheelRotation = 0;

function drawWheel() {
  const size = wheelCanvas.width;
  const center = size / 2;
  const radius = center - 4;
  const sliceAngle = (2 * Math.PI) / MOODS.length;

  wheelCtx.clearRect(0, 0, size, size);

  MOODS.forEach((mood, i) => {
    const start = i * sliceAngle;
    const end = start + sliceAngle;
    wheelCtx.beginPath();
    wheelCtx.moveTo(center, center);
    wheelCtx.arc(center, center, radius, start, end);
    wheelCtx.closePath();
    wheelCtx.fillStyle = wheelColors[i % wheelColors.length];
    wheelCtx.fill();
    wheelCtx.strokeStyle = "#2A211A";
    wheelCtx.lineWidth = 2;
    wheelCtx.stroke();

    wheelCtx.save();
    wheelCtx.translate(center, center);
    wheelCtx.rotate(start + sliceAngle / 2);
    wheelCtx.textAlign = "right";
    wheelCtx.fillStyle = wheelColors[i % wheelColors.length] === "#433527" ? "#F4EDE0" : "#2A211A";
    wheelCtx.font = "bold 13px Inter, sans-serif";
    wheelCtx.fillText(mood.label.toUpperCase(), radius - 14, 5);
    wheelCtx.restore();
  });
}
drawWheel();

document.getElementById("spin-wheel-btn").addEventListener("click", () => {
  const btn = document.getElementById("spin-wheel-btn");
  btn.disabled = true;

  const sliceAngleDeg = 360 / MOODS.length;
  const randomIndex = Math.floor(Math.random() * MOODS.length);
  const extraSpins = 5 * 360;
  const targetAngle = extraSpins + (360 - (randomIndex * sliceAngleDeg + sliceAngleDeg / 2));

  wheelRotation += targetAngle;
  wheelCanvas.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    const mood = MOODS[randomIndex];
    const genres = currentType === "movie" ? mood.movieGenres : mood.tvGenres;
    currentGenres = genres;
    fetchAndRender(genres, `LANDED ON: ${mood.label.toUpperCase()}`);
    btn.disabled = false;
  }, 4100);
});

// ============================================
// FEELING INPUT
// ============================================
const FEELING_KEYWORDS = [
  { words: ["sad", "cry", "heartbroken", "emotional", "grief"], movieGenres: [18], tvGenres: [18], label: "something to cry to" },
  { words: ["happy", "laugh", "funny", "lighthearted", "silly"], movieGenres: [35], tvGenres: [35], label: "something to laugh at" },
  { words: ["scared", "spooky", "horror", "creepy", "halloween"], movieGenres: [27], tvGenres: [9648], label: "something scary" },
  { words: ["romance", "romantic", "love", "date"], movieGenres: [10749], tvGenres: [10766], label: "something romantic" },
  { words: ["bored", "action", "hype", "adrenaline", "explosions"], movieGenres: [28, 12], tvGenres: [10759], label: "something high-energy" },
  { words: ["confused", "twist", "mind", "smart", "thinking"], movieGenres: [878, 9648], tvGenres: [9648], label: "something mind-bending" },
  { words: ["tired", "relax", "chill", "cozy", "comfort"], movieGenres: [10751, 35], tvGenres: [10751], label: "something cozy" },
  { words: ["stressed", "anxious", "overwhelmed"], movieGenres: [16, 10751], tvGenres: [16], label: "something gentle" }
];

document.getElementById("feeling-submit").addEventListener("click", handleFeelingSubmit);
document.getElementById("feeling-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleFeelingSubmit();
});

function handleFeelingSubmit() {
  const input = document.getElementById("feeling-input");
  const hint = document.getElementById("feeling-hint");
  const text = input.value.toLowerCase().trim();

  if (!text) {
    hint.textContent = "Type something first — even one word works.";
    return;
  }

  const match = FEELING_KEYWORDS.find((entry) =>
    entry.words.some((w) => text.includes(w))
  );

  if (match) {
    hint.textContent = `Got it — looking for ${match.label}...`;
    const genres = currentType === "movie" ? match.movieGenres : match.tvGenres;
    currentGenres = genres;
    fetchAndRender(genres, "BASED ON HOW YOU FEEL");
  } else {
    hint.textContent = "Couldn't match that vibe exactly — here's what's popular instead.";
    currentGenres = null;
    fetchAndRender(null, "COULDN'T MATCH — HERE'S WHAT'S POPULAR");
  }
}

// ============================================
// MOOD STUBS
// ============================================
const moodGrid = document.getElementById("mood-grid");
MOODS.forEach((mood) => {
  const btn = document.createElement("button");
  btn.className = "mood-stub";
  btn.innerHTML = `
    <span class="mood-label">${mood.label}</span>
    <span class="mood-sub">${mood.sub}</span>
  `;
  btn.addEventListener("click", () => {
    const genres = currentType === "movie" ? mood.movieGenres : mood.tvGenres;
    currentGenres = genres;
    fetchAndRender(genres, `MOOD: ${mood.label.toUpperCase()}`);
  });
  moodGrid.appendChild(btn);
});

// ============================================
// TYPE TOGGLE
// ============================================
const typeButtons = document.querySelectorAll(".type-btn");
typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    loadTrending();
  });
});
loadTrending();

// ============================================
// SPIN AGAIN — increments the rejection streak
// ============================================
document.getElementById("spin-again").addEventListener("click", () => {
  rejectCount++;
  sessionStorage.setItem("jps_rejects", String(rejectCount));
  fetchAndRender(currentGenres);
});

// ============================================
// STREAK MESSAGES
// ============================================
const STREAK_LINES = [
  null, null, null, // don't show for first 3
  "You've rejected 3 picks. Everything OK?",
  "4 rejections. The perfect movie isn't coming.",
  "5 rejections. Consider therapy or a coin flip.",
  "6+ rejections. Just watch something. Please."
];

function updateStreakDisplay() {
  const el = document.getElementById("streak-line");
  const line = STREAK_LINES[Math.min(rejectCount, STREAK_LINES.length - 1)];
  if (line) {
    el.textContent = line;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
}

// ============================================
// FETCH & RENDER RESULTS
// ============================================
async function fetchAndRender(genreIds, titleText) {
  const resultsSection = document.getElementById("results-section");
  const ticketGrid = document.getElementById("ticket-grid");
  const resultsTitle = document.getElementById("results-title");

  resultsSection.hidden = false;
  ticketGrid.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim);">Shuffling the reel...</p>`;
  resultsSection.scrollIntoView({ behavior: "smooth" });
  updateStreakDisplay();

  const endpoint = `${TMDB_BASE}/discover/${currentType}`;
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    sort_by: "popularity.desc",
    include_adult: "false",
    "vote_count.gte": "100",
    page: String(Math.floor(Math.random() * 5) + 1)
  });
  if (genreIds && genreIds.length) {
    params.append("with_genres", genreIds.join(","));
  }

  try {
    const res = await fetch(`${endpoint}?${params.toString()}`);
    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      ticketGrid.innerHTML = `<p style="font-family: var(--mono); color: var(--coral);">Yeah, that combo is cursed. Try another mood.</p>`;
      return;
    }

    const shuffled = data.results.sort(() => 0.5 - Math.random()).slice(0, 6);
    resultsTitle.textContent = titleText || "HERE'S THE PICK";
    renderTickets(shuffled);
  } catch (err) {
    console.error(err);
    ticketGrid.innerHTML = `<p style="font-family: var(--mono); color: var(--coral);">Couldn't reach TMDB. Check the API key in script.js.</p>`;
  }
}

function renderTickets(items) {
  const ticketGrid = document.getElementById("ticket-grid");
  ticketGrid.innerHTML = "";

  items.forEach((item) => {
    const title = item.title || item.name || "Untitled";
    const date = (item.release_date || item.first_air_date || "").slice(0, 4);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
    const poster = item.poster_path
      ? `${IMG_BASE}${item.poster_path}`
      : "https://via.placeholder.com/500x750/382C21/E8B64C?text=No+Poster";
    const overview = item.overview
      ? item.overview.slice(0, 120) + (item.overview.length > 120 ? "..." : "")
      : "No synopsis available.";

    const isSaved = watchlist.some((w) => w.id === item.id && w.type === currentType);

    const card = document.createElement("button");
    card.className = "ticket";
    card.innerHTML = `
      <button class="ticket-save ${isSaved ? 'saved' : ''}" aria-label="Save to watchlist">${isSaved ? '★' : '☆'}</button>
      <img class="poster" src="${poster}" alt="${title} poster" loading="lazy">
      <div class="info">
        <div class="title">${title}</div>
        <div class="meta">
          <span>${date || "—"}</span>
          <span>★ ${rating}</span>
        </div>
        <p class="overview">${overview}</p>
      </div>
    `;

    // main click → open details
    card.addEventListener("click", (e) => {
      if (e.target.closest(".ticket-save")) return;
      openDetails(item.id, currentType);
    });

    // save-button click → toggle watchlist, stop propagation
    const saveBtn = card.querySelector(".ticket-save");
    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWatchlist({
        id: item.id,
        type: currentType,
        title,
        poster: item.poster_path
      });
      const nowSaved = watchlist.some((w) => w.id === item.id && w.type === currentType);
      saveBtn.classList.toggle("saved", nowSaved);
      saveBtn.textContent = nowSaved ? "★" : "☆";
    });

    ticketGrid.appendChild(card);
  });
}

// ============================================
// WATCHLIST (localStorage)
// ============================================
function saveWatchlist() {
  localStorage.setItem("jps_watchlist", JSON.stringify(watchlist));
}

function toggleWatchlist(entry) {
  const idx = watchlist.findIndex((w) => w.id === entry.id && w.type === entry.type);
  if (idx >= 0) {
    watchlist.splice(idx, 1);
  } else {
    watchlist.push(entry);
  }
  saveWatchlist();
  renderWatchlist();
}

function renderWatchlist() {
  const section = document.getElementById("watchlist-section");
  const grid = document.getElementById("watchlist-grid");

  if (watchlist.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  grid.innerHTML = "";
  watchlist.forEach((w) => {
    const poster = w.poster
      ? `${IMG_BASE}${w.poster}`
      : "https://via.placeholder.com/300x450/382C21/E8B64C?text=No+Poster";
    const card = document.createElement("button");
    card.className = "watchlist-card";
    card.innerHTML = `
      <button class="w-remove" aria-label="Remove">✕</button>
      <img src="${poster}" alt="${w.title} poster" loading="lazy">
      <div class="w-title">${w.title}</div>
    `;
    card.addEventListener("click", (e) => {
      if (e.target.closest(".w-remove")) return;
      openDetails(w.id, w.type);
    });
    card.querySelector(".w-remove").addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = watchlist.findIndex((x) => x.id === w.id && x.type === w.type);
      if (idx >= 0) {
        watchlist.splice(idx, 1);
        saveWatchlist();
        renderWatchlist();
      }
    });
    grid.appendChild(card);
  });
}

document.getElementById("clear-watchlist").addEventListener("click", () => {
  if (watchlist.length === 0) return;
  if (confirm("Clear your entire watchlist? This can't be undone.")) {
    watchlist = [];
    saveWatchlist();
    renderWatchlist();
  }
});

renderWatchlist();

// ============================================
// REGION SELECTOR
// ============================================
const regionSelect = document.getElementById("region-select");
regionSelect.value = currentRegion;
regionSelect.addEventListener("change", (e) => {
  currentRegion = e.target.value;
  localStorage.setItem("jps_region", currentRegion);
});

// ============================================
// DETAILS MODAL
// ============================================
const modalBackdrop = document.getElementById("modal-backdrop");
document.getElementById("modal-close").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
});

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.style.overflow = "";
}

async function openDetails(id, type) {
  if (type !== "movie" && type !== "tv") type = currentType;

  modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";

  const titleEl = document.getElementById("modal-title");
  const taglineEl = document.getElementById("modal-tagline");
  const metaEl = document.getElementById("modal-meta");
  const genresEl = document.getElementById("modal-genres");
  const overviewEl = document.getElementById("modal-overview");
  const trailerEl = document.getElementById("modal-trailer");
  const backdropEl = document.getElementById("modal-backdrop-img");
  const saveBtn = document.getElementById("modal-save");
  const providersBlock = document.getElementById("modal-providers-block");
  const providersEl = document.getElementById("modal-providers");
  const castBlock = document.getElementById("modal-cast-block");
  const castEl = document.getElementById("modal-cast");

  titleEl.textContent = "Loading...";
  taglineEl.textContent = "";
  metaEl.innerHTML = "";
  genresEl.innerHTML = "";
  overviewEl.textContent = "";
  trailerEl.hidden = true;
  saveBtn.hidden = true;
  providersBlock.hidden = true;
  castBlock.hidden = true;
  backdropEl.style.backgroundImage = "";

  try {
    const res = await fetch(
      `${TMDB_BASE}/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,watch/providers`
    );
    if (!res.ok) throw new Error("details fetch failed");
    const d = await res.json();

    const title = d.title || d.name || "Untitled";
    titleEl.textContent = title;
    taglineEl.textContent = d.tagline || "";

    const year = (d.release_date || d.first_air_date || "").slice(0, 4);
    const runtime = d.runtime
      ? `${d.runtime} min`
      : d.episode_run_time && d.episode_run_time.length
        ? `~${d.episode_run_time[0]} min/ep`
        : null;
    const seasons = d.number_of_seasons ? `${d.number_of_seasons} season${d.number_of_seasons > 1 ? "s" : ""}` : null;
    const rating = d.vote_average ? `★ ${d.vote_average.toFixed(1)}` : null;

    metaEl.innerHTML = [year, runtime, seasons, rating]
      .filter(Boolean)
      .map((m) => `<span>${m}</span>`)
      .join("");

    genresEl.innerHTML = (d.genres || [])
      .map((g) => `<span>${g.name}</span>`)
      .join("");

    overviewEl.textContent = d.overview || "No synopsis available.";

    if (d.backdrop_path) {
      backdropEl.style.backgroundImage = `url(${BACKDROP_BASE}${d.backdrop_path})`;
    }

    // Trailer
    const trailer = (d.videos && d.videos.results || []).find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    ) || (d.videos && d.videos.results || []).find((v) => v.site === "YouTube");

    if (trailer) {
      trailerEl.href = `https://www.youtube.com/watch?v=${trailer.key}`;
      trailerEl.hidden = false;
    }

    // Providers (watch/providers key comes back as "watch/providers")
    const providersData = d["watch/providers"] && d["watch/providers"].results;
    if (providersData && providersData[currentRegion]) {
      const region = providersData[currentRegion];
      const flatrate = region.flatrate || [];
      const rent = region.rent || [];
      const buy = region.buy || [];
      const seen = new Set();
      const combined = [...flatrate, ...rent, ...buy].filter((p) => {
        if (seen.has(p.provider_id)) return false;
        seen.add(p.provider_id);
        return true;
      });

      providersBlock.hidden = false;
      if (combined.length > 0) {
        providersEl.innerHTML = combined
          .slice(0, 8)
          .map(
            (p) =>
              `<img class="provider-logo" src="${LOGO_BASE}${p.logo_path}" alt="${p.provider_name}" title="${p.provider_name}" loading="lazy">`
          )
          .join("");
      } else {
        providersEl.innerHTML = `<p class="no-providers">Not available to stream in ${currentRegion} right now.</p>`;
      }
    } else {
      providersBlock.hidden = false;
      providersEl.innerHTML = `<p class="no-providers">No streaming info for ${currentRegion}. Try switching region in the footer.</p>`;
    }

    // Cast (top 5)
    const cast = (d.credits && d.credits.cast || []).slice(0, 5);
    if (cast.length > 0) {
      castBlock.hidden = false;
      castEl.innerHTML = cast
        .map((c) => {
          const img = c.profile_path
            ? `${IMG_BASE_SM}${c.profile_path}`
            : "https://via.placeholder.com/90x90/433527/F4EDE0?text=?";
          return `
            <div class="cast-member">
              <img src="${img}" alt="${c.name}" loading="lazy">
              <div class="c-name">${c.name}</div>
              <div class="c-char">${c.character || ""}</div>
            </div>
          `;
        })
        .join("");
    }

    // Save button
    saveBtn.hidden = false;
    const isSaved = watchlist.some((w) => w.id === d.id && w.type === type);
    saveBtn.textContent = isSaved ? "★ SAVED" : "☆ SAVE";
    saveBtn.classList.toggle("saved", isSaved);
    saveBtn.onclick = () => {
      toggleWatchlist({
        id: d.id,
        type,
        title,
        poster: d.poster_path
      });
      const nowSaved = watchlist.some((w) => w.id === d.id && w.type === type);
      saveBtn.textContent = nowSaved ? "★ SAVED" : "☆ SAVE";
      saveBtn.classList.toggle("saved", nowSaved);
    };
  } catch (err) {
    console.error(err);
    titleEl.textContent = "Couldn't load details";
    overviewEl.textContent = "Something went wrong fetching this title. Try again.";
  }
}

// ============================================
// WHO PICKS TONIGHT — minigame
// ============================================
const players = [];
const playerInput = document.getElementById("player-input");
const playerChips = document.getElementById("player-chips");
const decideBtn = document.getElementById("decide-btn");
const decideStage = document.getElementById("decide-stage");

document.getElementById("player-add").addEventListener("click", addPlayer);
playerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addPlayer();
});

function addPlayer() {
  const name = playerInput.value.trim();
  if (!name) return;
  if (players.includes(name)) {
    playerInput.value = "";
    return;
  }
  players.push(name);
  playerInput.value = "";
  renderChips();
}

function renderChips() {
  playerChips.innerHTML = "";
  players.forEach((name, i) => {
    const chip = document.createElement("button");
    chip.className = "player-chip";
    chip.innerHTML = `${name} <span>✕</span>`;
    chip.title = "Remove";
    chip.addEventListener("click", () => {
      players.splice(i, 1);
      renderChips();
    });
    playerChips.appendChild(chip);
  });
  decideBtn.disabled = players.length < 2;
}

const WINNER_LINES = [
  "No take-backs. The remote is yours.",
  "With great power comes great responsibility.",
  "Everyone else: no complaining allowed.",
  "Choose wisely. The group is watching.",
  "Democracy has spoken. Sort of."
];

decideBtn.addEventListener("click", () => {
  decideBtn.disabled = true;
  decideStage.innerHTML = "";
  let cycles = 0;
  const totalCycles = 18 + Math.floor(Math.random() * players.length);

  const interval = setInterval(() => {
    decideStage.textContent = players[cycles % players.length];
    cycles++;
    if (cycles > totalCycles) {
      clearInterval(interval);
      const winner = players[(cycles - 1) % players.length];
      const line = WINNER_LINES[Math.floor(Math.random() * WINNER_LINES.length)];
      decideStage.innerHTML = `🎬 ${winner} PICKS!<span class="winner-line">${line}</span>`;
      launchConfetti();
      decideBtn.disabled = false;
    }
  }, 110);
});

// ============================================
// CONFETTI
// ============================================
function launchConfetti() {
  const layer = document.getElementById("confetti-layer");
  const colors = ["#E8B64C", "#FF5A4E", "#F4EDE0", "#C9BCA8"];
  const pieces = 60;

  for (let i = 0; i < pieces; i++) {
    const el = document.createElement("div");
    el.className = "confetto";
    el.style.left = Math.random() * 100 + "%";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = (Math.random() * 0.5) + "s";
    el.style.animationDuration = (1.8 + Math.random() * 1.2) + "s";
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}