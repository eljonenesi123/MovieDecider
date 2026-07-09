// ============================================
// CONFIG
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
let lastSearchData = null;
let currentSearchTab = "titles";

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
// GENRES (movie genre IDs from TMDB)
// ============================================
const GENRES = [
  { id: 28,    name: "Action" },
  { id: 12,    name: "Adventure" },
  { id: 16,    name: "Animation" },
  { id: 35,    name: "Comedy" },
  { id: 80,    name: "Crime" },
  { id: 99,    name: "Documentary" },
  { id: 18,    name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14,    name: "Fantasy" },
  { id: 36,    name: "History" },
  { id: 27,    name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648,  name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878,   name: "Sci-Fi" },
  { id: 53,    name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37,    name: "Western" }
];

// ============================================
// COLLECTIONS
// ============================================
const COLLECTIONS = [
  { id: "ruined-me", label: "Ruined me for a week",
    intro: "Don't say I didn't warn you. Have tissues, ice cream, and a hug on standby.",
    ids: [12477, 334533, 641, 497, 39451, 395992] },
  { id: "hangover", label: "Sunday hangover watches",
    intro: "Low effort, high comfort. Nothing here will make you think hard.",
    ids: [1584, 346648, 120467, 11259, 207932, 9377] },
  { id: "foreign", label: "Worth the subtitles",
    intro: "Read a little, get a lot. Non-English films that hit different.",
    ids: [496243, 194, 670, 129, 598, 1417] },
  { id: "rewatch", label: "Hits harder the second time",
    intro: "You watched it once. Watch it again. Different movie now, trust me.",
    ids: [550, 329865, 1124, 77, 157336, 244786] },
  { id: "short-sharp", label: "Short and sharp",
    intro: "Under two hours, still wrecks you. For when you've got a bedtime.",
    ids: [862, 10386, 137, 4147, 9603, 76] }
];

// ============================================
// TOAST POPUP
// ============================================
const TOAST_MESSAGES = {
  search: [
    "Consulting the projection room...",
    "Digging through the vault 🎞",
    "Waking the film critic up...",
    "The intern is on it...",
    "Rewinding VHS tapes...",
    "Asking the ushers..."
  ],
  spin: [
    "The reel is turning...",
    "Fate is loading...",
    "Cosmic movie forces at work..."
  ],
  fetch: [
    "Grabbing the reel...",
    "Rolling the credits back...",
    "Popping fresh popcorn 🍿"
  ]
};

const toastEl = document.getElementById("toast");
let toastTimer = null;

function toast(category = "fetch", customMessage = null) {
  const pool = TOAST_MESSAGES[category] || TOAST_MESSAGES.fetch;
  const msg = customMessage || pool[Math.floor(Math.random() * pool.length)];
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

// ============================================
// HERO — headline + eyebrow rotate
// ============================================
const flipPhrases = ["TONIGHT?", "IDK.", "MAYBE THIS?", "JUST PICK."];
const eyebrowPhrases = [
  "FOR PEOPLE WHO CAN'T DECIDE —",
  "FOR THE FAMILY GROUP CHAT —",
  "FOR COUPLES WHO CAN'T AGREE —",
  "FOR FRIDAY NIGHTS AT 9PM —"
];
let flipIndex = 0, eyeIndex = 0;
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
      .filter((m) => m.poster_path).slice(0, 28);
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
// TRENDING
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
// SEARCH — multi + keyword + people
// ============================================
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchTabs = document.getElementById("search-tabs");
const searchContext = document.getElementById("search-context");
const searchResults = document.getElementById("search-results");

searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch(); });

searchTabs.querySelectorAll(".search-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    searchTabs.querySelectorAll(".search-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentSearchTab = tab.dataset.tab;
    renderSearchResults();
  });
});

async function runSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    searchContext.textContent = "Type something first.";
    return;
  }
  toast("search");
  searchTabs.hidden = false;
  searchContext.textContent = `Searching for "${query}"...`;
  searchResults.innerHTML = "";

  try {
    // parallel: multi-search + keyword search
    const [multiRes, kwRes] = await Promise.all([
      fetch(`${TMDB_BASE}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`),
      fetch(`${TMDB_BASE}/search/keyword?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)
    ]);
    const multi = multiRes.ok ? await multiRes.json() : { results: [] };
    const kw = kwRes.ok ? await kwRes.json() : { results: [] };

    const titles = multi.results.filter((r) => r.media_type === "movie" || r.media_type === "tv");
    const people = multi.results.filter((r) => r.media_type === "person");

    let themes = [];
    if (kw.results.length > 0) {
      // grab the top keyword and pull discover results for it
      const topKeyword = kw.results[0];
      const discoverRes = await fetch(
        `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&with_keywords=${topKeyword.id}&sort_by=popularity.desc&vote_count.gte=50`
      );
      if (discoverRes.ok) {
        const disc = await discoverRes.json();
        themes = disc.results.slice(0, 12).map((m) => ({ ...m, __theme: topKeyword.name }));
      }
    }

    lastSearchData = { query, titles, people, themes };
    currentSearchTab = "titles";
    searchTabs.querySelectorAll(".search-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === "titles");
    });

    if (titles.length === 0 && people.length === 0 && themes.length === 0) {
      searchContext.textContent = `Nothing found for "${query}". Try different words.`;
      return;
    }

    renderSearchResults();
  } catch (err) {
    console.error(err);
    searchContext.textContent = "Search failed. Check your API key or try again.";
  }
}

function renderSearchResults() {
  if (!lastSearchData) return;
  const { query, titles, people, themes } = lastSearchData;
  searchResults.innerHTML = "";

  let items = [];
  let contextLine = "";
  if (currentSearchTab === "titles") {
    items = titles;
    contextLine = `${titles.length} titles matching "${query}"`;
  } else if (currentSearchTab === "people") {
    items = people;
    contextLine = `${people.length} people matching "${query}" — tap to see their movies`;
  } else if (currentSearchTab === "themes") {
    items = themes;
    contextLine = themes.length
      ? `Movies about "${themes[0].__theme}"`
      : `No theme match for "${query}".`;
  }
  searchContext.textContent = contextLine;

  if (items.length === 0) {
    searchResults.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim);">Nothing here — try another tab.</p>`;
    return;
  }

  items.forEach((item) => {
    if (currentSearchTab === "people") {
      renderPersonCard(item);
    } else {
      renderMovieCard(item, currentSearchTab === "themes");
    }
  });
}

function renderMovieCard(item, isTheme) {
  const type = item.media_type === "tv" ? "tv" : "movie";
  const title = item.title || item.name || "Untitled";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const poster = item.poster_path
    ? `${IMG_BASE}${item.poster_path}`
    : "https://via.placeholder.com/300x450/382C21/E8B64C?text=No+Poster";
  const card = document.createElement("button");
  card.className = "search-card";
  card.innerHTML = `
    ${isTheme ? '<span class="result-badge theme">THEME</span>' : ""}
    <img src="${poster}" alt="${title} poster" loading="lazy">
    <div class="s-body">
      <div class="s-title">${title}</div>
      <div class="s-meta">${year || "—"} · ${type.toUpperCase()}</div>
    </div>
  `;
  card.addEventListener("click", () => openDetails(item.id, type));
  searchResults.appendChild(card);
}

function renderPersonCard(person) {
  const img = person.profile_path
    ? `${IMG_BASE}${person.profile_path}`
    : "https://via.placeholder.com/300x300/382C21/E8B64C?text=?";
  const card = document.createElement("button");
  card.className = "search-card person";
  card.innerHTML = `
    <span class="result-badge person">PERSON</span>
    <img src="${img}" alt="${person.name}" loading="lazy">
    <div class="s-body">
      <div class="s-title">${person.name}</div>
      <div class="s-meta">${person.known_for_department || "—"}</div>
    </div>
  `;
  card.addEventListener("click", () => loadPersonFilmography(person.id, person.name));
  searchResults.appendChild(card);
}

async function loadPersonFilmography(personId, personName) {
  toast("fetch", `Pulling up ${personName}'s films...`);
  searchContext.textContent = `Loading ${personName}'s filmography...`;
  searchResults.innerHTML = "";
  try {
    const res = await fetch(`${TMDB_BASE}/person/${personId}/combined_credits?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error("filmography fetch failed");
    const data = await res.json();
    // sort by popularity, dedupe, cap at 24
    const seen = new Set();
    const items = (data.cast || [])
      .filter((c) => (c.media_type === "movie" || c.media_type === "tv") && c.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .filter((c) => {
        const key = `${c.media_type}-${c.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 24);

    searchContext.textContent = `Top titles with ${personName}`;
    items.forEach((item) => renderMovieCard(item, false));
    if (items.length === 0) {
      searchResults.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim);">No filmography found for ${personName}.</p>`;
    }
  } catch (err) {
    console.error(err);
    searchContext.textContent = "Couldn't load that person.";
  }
}

// ============================================
// GENRES — with backdrop images per tile
// ============================================
const genreGrid = document.getElementById("genre-grid");

function renderGenreTiles(backdropMap = {}) {
  genreGrid.innerHTML = "";
  GENRES.forEach((g) => {
    const tile = document.createElement("button");
    tile.className = "genre-tile";
    if (backdropMap[g.id]) {
      tile.style.backgroundImage = `url(${BACKDROP_BASE}${backdropMap[g.id]})`;
    }
    tile.innerHTML = `<span class="label">${g.name}</span>`;
    tile.addEventListener("click", () => {
      currentGenres = [g.id];
      currentType = "movie";
      document.querySelectorAll(".type-btn").forEach((b) =>
        b.classList.toggle("active", b.dataset.type === "movie")
      );
      fetchAndRender([g.id], `GENRE: ${g.name.toUpperCase()}`);
    });
    genreGrid.appendChild(tile);
  });
}

// initial render (no images), then fetch and re-render
renderGenreTiles();

async function loadGenreBackdrops() {
  try {
    // pull popular + top_rated to get wide coverage across genres
    const [popRes, topRes] = await Promise.all([
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=1`),
      fetch(`${TMDB_BASE}/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`)
    ]);
    const pop = popRes.ok ? await popRes.json() : { results: [] };
    const top = topRes.ok ? await topRes.json() : { results: [] };
    const pool = [...pop.results, ...top.results].filter((m) => m.backdrop_path);

    const backdropMap = {};
    // for each genre, find the first movie in the pool that lists that genre
    GENRES.forEach((g) => {
      const match = pool.find((m) => m.genre_ids && m.genre_ids.includes(g.id));
      if (match) backdropMap[g.id] = match.backdrop_path;
    });
    renderGenreTiles(backdropMap);
  } catch (err) {
    console.error("genre backdrops failed:", err);
  }
}
loadGenreBackdrops();

// ============================================
// CURATED
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
          .then((r) => (r.ok ? r.json() : null)).catch(() => null)
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
// WHEEL — REDESIGNED
// ============================================
const wheelCanvas = document.getElementById("wheel-canvas");
const wheelCtx = wheelCanvas.getContext("2d");
// alternating palette for slices — chosen so labels always read
const SLICE_PALETTE = [
  { bg: "#E8B64C", text: "#2A211A" }, // gold
  { bg: "#FF5A4E", text: "#2A211A" }, // coral
  { bg: "#F4EDE0", text: "#2A211A" }, // cream
  { bg: "#433527", text: "#F4EDE0" }, // surface
  { bg: "#E8B64C", text: "#2A211A" },
  { bg: "#FF5A4E", text: "#2A211A" },
  { bg: "#F4EDE0", text: "#2A211A" }
];
let wheelRotation = 0;

function drawWheel() {
  const size = wheelCanvas.width;
  const center = size / 2;
  const radius = center - 6;
  const sliceAngle = (2 * Math.PI) / MOODS.length;

  wheelCtx.clearRect(0, 0, size, size);

  MOODS.forEach((mood, i) => {
    const start = i * sliceAngle - Math.PI / 2; // start from top
    const end = start + sliceAngle;
    const palette = SLICE_PALETTE[i];

    // slice fill
    wheelCtx.beginPath();
    wheelCtx.moveTo(center, center);
    wheelCtx.arc(center, center, radius, start, end);
    wheelCtx.closePath();
    wheelCtx.fillStyle = palette.bg;
    wheelCtx.fill();

    // slice divider
    wheelCtx.strokeStyle = "#2A211A";
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();

    // label — curved along slice center, positioned mid-radius
    wheelCtx.save();
    wheelCtx.translate(center, center);
    wheelCtx.rotate(start + sliceAngle / 2);
    wheelCtx.textAlign = "right";
    wheelCtx.textBaseline = "middle";
    wheelCtx.fillStyle = palette.text;
    wheelCtx.font = "bold 15px Inter, sans-serif";
    // wrap long labels
    const label = mood.label.toUpperCase();
    wheelCtx.fillText(label, radius - 22, 0);
    wheelCtx.restore();
  });

  // small dark ring at outer edge
  wheelCtx.beginPath();
  wheelCtx.arc(center, center, radius, 0, 2 * Math.PI);
  wheelCtx.lineWidth = 6;
  wheelCtx.strokeStyle = "#2A211A";
  wheelCtx.stroke();
}
drawWheel();

document.getElementById("spin-wheel-btn").addEventListener("click", () => {
  const btn = document.getElementById("spin-wheel-btn");
  btn.disabled = true;
  toast("spin");

  const sliceAngleDeg = 360 / MOODS.length;
  const randomIndex = Math.floor(Math.random() * MOODS.length);
  const extraSpins = 5 * 360;
  // land so that randomIndex slice sits under the top pointer
  const targetAngle = extraSpins + (360 - (randomIndex * sliceAngleDeg + sliceAngleDeg / 2));

  wheelRotation += targetAngle;
  wheelCanvas.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    const mood = MOODS[randomIndex];
    const genres = currentType === "movie" ? mood.movieGenres : mood.tvGenres;
    currentGenres = genres;
    fetchAndRender(genres, `LANDED ON: ${mood.label.toUpperCase()}`);
    btn.disabled = false;
  }, 4300);
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
  if (!text) { hint.textContent = "Type something first — even one word works."; return; }

  const match = FEELING_KEYWORDS.find((entry) => entry.words.some((w) => text.includes(w)));
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
// SPIN AGAIN & STREAK
// ============================================
document.getElementById("spin-again").addEventListener("click", () => {
  rejectCount++;
  sessionStorage.setItem("jps_rejects", String(rejectCount));
  fetchAndRender(currentGenres);
});

const STREAK_LINES = [
  null, null, null,
  "You've rejected 3 picks. Everything OK?",
  "4 rejections. The perfect movie isn't coming.",
  "5 rejections. Consider therapy or a coin flip.",
  "6+ rejections. Just watch something. Please."
];

function updateStreakDisplay() {
  const el = document.getElementById("streak-line");
  const line = STREAK_LINES[Math.min(rejectCount, STREAK_LINES.length - 1)];
  if (line) { el.textContent = line; el.hidden = false; }
  else { el.hidden = true; }
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
  toast("fetch");

  const endpoint = `${TMDB_BASE}/discover/${currentType}`;
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    sort_by: "popularity.desc",
    include_adult: "false",
    "vote_count.gte": "100",
    page: String(Math.floor(Math.random() * 5) + 1)
  });
  if (genreIds && genreIds.length) params.append("with_genres", genreIds.join(","));

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
        <div class="meta"><span>${date || "—"}</span><span>★ ${rating}</span></div>
        <p class="overview">${overview}</p>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (e.target.closest(".ticket-save")) return;
      openDetails(item.id, currentType);
    });
    const saveBtn = card.querySelector(".ticket-save");
    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWatchlist({ id: item.id, type: currentType, title, poster: item.poster_path });
      const nowSaved = watchlist.some((w) => w.id === item.id && w.type === currentType);
      saveBtn.classList.toggle("saved", nowSaved);
      saveBtn.textContent = nowSaved ? "★" : "☆";
    });
    ticketGrid.appendChild(card);
  });
}

// ============================================
// MOVIE BATTLES — tournament bracket
// ============================================
let battle = {
  size: 8,
  currentRound: [],
  nextRound: [],
  matchIndex: 0,
  roundNumber: 1,
  totalRounds: 3,
  currentPair: null,
  active: false
};

const battleSetupEl = document.getElementById("battle-setup");
const battleStageEl = document.getElementById("battle-stage");
const battleChampionEl = document.getElementById("battle-champion");
const battleArenaEl = document.getElementById("battle-arena");

// size toggle
document.querySelectorAll(".battle-size").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".battle-size").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    battle.size = parseInt(btn.dataset.size, 10);
  });
});

document.getElementById("battle-start").addEventListener("click", startBattle);
document.getElementById("battle-cancel").addEventListener("click", resetBattle);
document.getElementById("battle-a").addEventListener("click", () => pickWinner("a"));
document.getElementById("battle-b").addEventListener("click", () => pickWinner("b"));

// keyboard: only when battle is active and modal isn't open
document.addEventListener("keydown", (e) => {
  if (!battle.active || !modalBackdrop.hidden) return;
  if (e.key === "ArrowLeft") pickWinner("a");
  if (e.key === "ArrowRight") pickWinner("b");
});

async function startBattle() {
  toast("fetch", "Building the bracket...");
  battleSetupEl.hidden = true;

  try {
    // pull two pages of popular to get a diverse pool
    const [p1, p2] = await Promise.all([
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=1`).then((r) => r.json()),
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=2`).then((r) => r.json())
    ]);
    const pool = [...p1.results, ...p2.results]
      .filter((m) => m.poster_path && m.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, battle.size);

    if (pool.length < battle.size) {
      toast("fetch", "Couldn't build a full bracket. Try again.");
      battleSetupEl.hidden = false;
      return;
    }

    battle.currentRound = pool;
    battle.nextRound = [];
    battle.matchIndex = 0;
    battle.roundNumber = 1;
    battle.totalRounds = Math.log2(battle.size);
    battle.active = true;

    battleStageEl.hidden = false;
    battleChampionEl.hidden = true;
    showNextMatch();
  } catch (err) {
    console.error(err);
    toast("fetch", "Bracket failed. Check your API key.");
    battleSetupEl.hidden = false;
  }
}

function showNextMatch() {
  const a = battle.currentRound[battle.matchIndex * 2];
  const b = battle.currentRound[battle.matchIndex * 2 + 1];
  battle.currentPair = { a, b };

  updateBattleProgress();

  // fill both cards
  setBattleCard("a", a);
  setBattleCard("b", b);

  // reset animation classes
  battleArenaEl.classList.remove("transitioning");
  document.getElementById("battle-a").classList.remove("winning", "losing");
  document.getElementById("battle-b").classList.remove("winning", "losing");

  // trigger enter animation
  battleArenaEl.classList.remove("entering");
  void battleArenaEl.offsetWidth; // reflow to restart animation
  battleArenaEl.classList.add("entering");
}

function setBattleCard(side, movie) {
  const img = document.getElementById(`battle-${side}-img`);
  const title = document.getElementById(`battle-${side}-title`);
  const meta = document.getElementById(`battle-${side}-meta`);
  img.src = `${IMG_BASE}${movie.poster_path}`;
  img.alt = movie.title;
  title.textContent = movie.title;
  const year = (movie.release_date || "").slice(0, 4);
  const rating = movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : "";
  meta.textContent = [year, rating].filter(Boolean).join(" · ");
}

function updateBattleProgress() {
  const totalMatchesInRound = battle.currentRound.length / 2;
  const matchNum = battle.matchIndex + 1;
  document.getElementById("battle-round-label").textContent = `ROUND ${battle.roundNumber} OF ${battle.totalRounds}`;
  document.getElementById("battle-match-label").textContent = `MATCH ${matchNum} OF ${totalMatchesInRound}`;

  // overall progress = matches decided / total matches to reach champion
  const totalMatches = battle.size - 1;
  const decidedMatches = (battle.size - battle.currentRound.length) + battle.matchIndex;
  const pct = (decidedMatches / totalMatches) * 100;
  document.getElementById("battle-progress-fill").style.width = `${pct}%`;
}

function pickWinner(side) {
  if (!battle.active || battleArenaEl.classList.contains("transitioning")) return;
  const winner = battle.currentPair[side];
  const loser = battle.currentPair[side === "a" ? "b" : "a"];

  const winnerEl = document.getElementById(`battle-${side}`);
  const loserEl = document.getElementById(`battle-${side === "a" ? "b" : "a"}`);
  winnerEl.classList.add("winning");
  loserEl.classList.add("losing");
  battleArenaEl.classList.add("transitioning");

  battle.nextRound.push(winner);
  battle.matchIndex++;

  setTimeout(() => {
    // check if round is over
    if (battle.matchIndex * 2 >= battle.currentRound.length) {
      // round complete
      if (battle.nextRound.length === 1) {
        // champion!
        showChampion(battle.nextRound[0]);
        return;
      }
      // advance to next round
      battle.currentRound = battle.nextRound;
      battle.nextRound = [];
      battle.matchIndex = 0;
      battle.roundNumber++;
    }
    showNextMatch();
  }, 700);
}

function showChampion(movie) {
  battle.active = false;
  battleStageEl.hidden = true;
  battleChampionEl.hidden = false;

  const img = document.getElementById("champion-img");
  img.src = `${IMG_BASE}${movie.poster_path}`;
  img.alt = movie.title;
  document.getElementById("champion-title").textContent = movie.title;
  const year = (movie.release_date || "").slice(0, 4);
  const rating = movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : "";
  document.getElementById("champion-meta").textContent = [year, rating].filter(Boolean).join(" · ");
  document.getElementById("champion-overview").textContent = movie.overview
    ? movie.overview.slice(0, 220) + (movie.overview.length > 220 ? "..." : "")
    : "";

  // wire actions
  const detailsBtn = document.getElementById("champion-details");
  const saveBtn = document.getElementById("champion-save");
  const rematchBtn = document.getElementById("champion-rematch");

  detailsBtn.onclick = () => openDetails(movie.id, "movie");

  const updateSaveBtn = () => {
    const isSaved = watchlist.some((w) => w.id === movie.id && w.type === "movie");
    saveBtn.textContent = isSaved ? "★ SAVED" : "☆ SAVE";
    saveBtn.classList.toggle("saved", isSaved);
  };
  updateSaveBtn();
  saveBtn.onclick = () => {
    toggleWatchlist({ id: movie.id, type: "movie", title: movie.title, poster: movie.poster_path });
    updateSaveBtn();
  };

  rematchBtn.onclick = () => resetBattle();

  // confetti
  launchConfetti(document.getElementById("champion-confetti"));
}

function resetBattle() {
  battle.active = false;
  battleSetupEl.hidden = false;
  battleStageEl.hidden = true;
  battleChampionEl.hidden = true;
}

// ============================================
// WATCHLIST
// ============================================
function saveWatchlist() { localStorage.setItem("jps_watchlist", JSON.stringify(watchlist)); }
function toggleWatchlist(entry) {
  const idx = watchlist.findIndex((w) => w.id === entry.id && w.type === entry.type);
  if (idx >= 0) { watchlist.splice(idx, 1); toast("fetch", "Removed from watchlist"); }
  else { watchlist.push(entry); toast("fetch", "★ Saved to watchlist"); }
  saveWatchlist();
  renderWatchlist();
}

function renderWatchlist() {
  const section = document.getElementById("watchlist-section");
  const grid = document.getElementById("watchlist-grid");
  if (watchlist.length === 0) { section.hidden = true; return; }
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
      if (idx >= 0) { watchlist.splice(idx, 1); saveWatchlist(); renderWatchlist(); }
    });
    grid.appendChild(card);
  });
}

document.getElementById("clear-watchlist").addEventListener("click", () => {
  if (watchlist.length === 0) return;
  if (confirm("Clear your entire watchlist? This can't be undone.")) {
    watchlist = []; saveWatchlist(); renderWatchlist();
  }
});
renderWatchlist();

// ============================================
// REGION
// ============================================
const regionSelect = document.getElementById("region-select");
regionSelect.value = currentRegion;
regionSelect.addEventListener("change", (e) => {
  currentRegion = e.target.value;
  localStorage.setItem("jps_region", currentRegion);
  toast("fetch", `Region set to ${currentRegion}`);
});

// ============================================
// MODAL
// ============================================
const modalBackdrop = document.getElementById("modal-backdrop");
document.getElementById("modal-close").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modalBackdrop.hidden) closeModal(); });

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
      : d.episode_run_time && d.episode_run_time.length ? `~${d.episode_run_time[0]} min/ep` : null;
    const seasons = d.number_of_seasons ? `${d.number_of_seasons} season${d.number_of_seasons > 1 ? "s" : ""}` : null;
    const rating = d.vote_average ? `★ ${d.vote_average.toFixed(1)}` : null;

    metaEl.innerHTML = [year, runtime, seasons, rating].filter(Boolean).map((m) => `<span>${m}</span>`).join("");
    genresEl.innerHTML = (d.genres || []).map((g) => `<span>${g.name}</span>`).join("");
    overviewEl.textContent = d.overview || "No synopsis available.";

    if (d.backdrop_path) backdropEl.style.backgroundImage = `url(${BACKDROP_BASE}${d.backdrop_path})`;

    const trailer = (d.videos && d.videos.results || []).find((v) => v.site === "YouTube" && v.type === "Trailer")
      || (d.videos && d.videos.results || []).find((v) => v.site === "YouTube");
    if (trailer) {
      trailerEl.href = `https://www.youtube.com/watch?v=${trailer.key}`;
      trailerEl.hidden = false;
    }

    // providers
    const providersData = d["watch/providers"] && d["watch/providers"].results;
    if (providersData && providersData[currentRegion]) {
      const region = providersData[currentRegion];
      const seen = new Set();
      const combined = [...(region.flatrate || []), ...(region.rent || []), ...(region.buy || [])]
        .filter((p) => { if (seen.has(p.provider_id)) return false; seen.add(p.provider_id); return true; });
      providersBlock.hidden = false;
      providersEl.innerHTML = combined.length
        ? combined.slice(0, 8).map((p) =>
            `<img class="provider-logo" src="${LOGO_BASE}${p.logo_path}" alt="${p.provider_name}" title="${p.provider_name}" loading="lazy">`
          ).join("")
        : `<p class="no-providers">Not available to stream in ${currentRegion} right now.</p>`;
    } else {
      providersBlock.hidden = false;
      providersEl.innerHTML = `<p class="no-providers">No streaming info for ${currentRegion}. Try switching region in the footer.</p>`;
    }

    // cast
    const cast = (d.credits && d.credits.cast || []).slice(0, 5);
    if (cast.length > 0) {
      castBlock.hidden = false;
      castEl.innerHTML = cast.map((c) => {
        const img = c.profile_path ? `${IMG_BASE_SM}${c.profile_path}` : "https://via.placeholder.com/90x90/433527/F4EDE0?text=?";
        return `
          <div class="cast-member">
            <img src="${img}" alt="${c.name}" loading="lazy">
            <div class="c-name">${c.name}</div>
            <div class="c-char">${c.character || ""}</div>
          </div>`;
      }).join("");
    }

    // save
    saveBtn.hidden = false;
    const isSaved = watchlist.some((w) => w.id === d.id && w.type === type);
    saveBtn.textContent = isSaved ? "★ SAVED" : "☆ SAVE";
    saveBtn.classList.toggle("saved", isSaved);
    saveBtn.onclick = () => {
      toggleWatchlist({ id: d.id, type, title, poster: d.poster_path });
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
// WHO PICKS
// ============================================
const players = [];
const playerInput = document.getElementById("player-input");
const playerChips = document.getElementById("player-chips");
const decideBtn = document.getElementById("decide-btn");
const decideStage = document.getElementById("decide-stage");

document.getElementById("player-add").addEventListener("click", addPlayer);
playerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addPlayer(); });

function addPlayer() {
  const name = playerInput.value.trim();
  if (!name) return;
  if (players.includes(name)) { playerInput.value = ""; return; }
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
    chip.addEventListener("click", () => { players.splice(i, 1); renderChips(); });
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

function launchConfetti(targetLayer) {
  const layer = targetLayer || document.getElementById("confetti-layer");
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