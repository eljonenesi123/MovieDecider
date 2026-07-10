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
// ============================================
// HERO BACKDROP
// ============================================
async function loadHeroBackdrop() {
  const el = document.getElementById("hero-backdrop");
  try {
    const res = await fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=1`);
    if (!res.ok) return;
    const data = await res.json();
    const shuffled = data.results.sort(() => 0.5 - Math.random()).slice(0, 10);

    const withBackdrop = shuffled.find((m) => m.backdrop_path);
    if (withBackdrop) {
      el.style.backgroundImage = `url(${BACKDROP_BASE}${withBackdrop.backdrop_path})`;
      el.classList.add("loaded");
    }

    for (const movie of shuffled) {
      const vidRes = await fetch(`${TMDB_BASE}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`);
      if (!vidRes.ok) continue;
      const vidData = await vidRes.json();
      const trailer =
        vidData.results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        vidData.results.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
        vidData.results.find((v) => v.site === "YouTube");
      if (trailer) {
        const iframe = document.createElement("iframe");
        iframe.className = "hero-video";
        iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0&disablekb=1&playsinline=1`;
        iframe.allow = "autoplay; encrypted-media; picture-in-picture";
        iframe.setAttribute("frameborder", "0");
        el.appendChild(iframe);
        el.classList.add("loaded");
        break;
      }
    }
  } catch (_) {}
}
loadHeroBackdrop();
// TRENDING
// ============================================
async function loadTrending() {
  const strip = document.getElementById("trending-strip");
  strip.innerHTML = Array(6).fill(`
  <div class="trending-card">
    <div class="skeleton" style="width: 140px; height: 210px;"></div>
    <div class="skeleton skeleton-line" style="width: 80%;"></div>
  </div>
`).join('');
  try {
    const res = await fetch(`${TMDB_BASE}/trending/${currentType}/week?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error("trending fetch failed");
    const data = await res.json();
    strip.innerHTML = "";
// duplicate the results so the marquee loops seamlessly
const doubled = [...data.results.slice(0, 12), ...data.results.slice(0, 12)];
doubled.forEach((item) => {
  const title = item.title || item.name || "Untitled";
  const poster = item.poster_path
    ? `${IMG_BASE}${item.poster_path}`
    : "https://via.placeholder.com/140x210/382C21/E8B64C?text=No+Poster";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const rating = item.vote_average ? `★ ${item.vote_average.toFixed(1)}` : "";
  const overview = item.overview
    ? item.overview.slice(0, 90) + (item.overview.length > 90 ? "..." : "")
    : "No synopsis available.";

  const card = document.createElement("button");
  card.className = "trending-card";
  card.innerHTML = `
    <img src="${poster}" alt="${title} poster" loading="lazy">
    <div class="t-title">${title}</div>
    <div class="t-hover">
      <strong>${title}</strong>
      <span>${year || "—"} · ${rating}</span>
      <p>${overview}</p>
    </div>
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

    // Titles: filter for real content with posters and enough votes, sort by popularity
    const titles = multi.results
      .filter((r) =>
        (r.media_type === "movie" || r.media_type === "tv") &&
        r.poster_path &&
        (r.vote_count || 0) >= 10
      )
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    // People: skip low-relevance folks with no profession
    const people = multi.results
      .filter((r) =>
        r.media_type === "person" &&
        (r.popularity || 0) > 2 &&
        r.known_for_department
      )
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    // Themes: try up to top 3 keywords until one returns real results
    let themes = [];
    let matchedKeyword = null;
    for (let i = 0; i < Math.min(3, kw.results.length); i++) {
      const keyword = kw.results[i];
      const discoverRes = await fetch(
        `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&with_keywords=${keyword.id}&sort_by=popularity.desc&vote_count.gte=50`
      );
      if (discoverRes.ok) {
        const disc = await discoverRes.json();
        if (disc.results.length > 0) {
          matchedKeyword = keyword.name;
          themes = disc.results.slice(0, 12).map((m) => ({ ...m, __theme: keyword.name }));
          break;
        }
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
    // one targeted fetch per genre, in parallel
    const results = await Promise.all(
      GENRES.map((g) =>
        fetch(
          `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${g.id}&sort_by=popularity.desc&vote_count.gte=500&page=1`
        )
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    const backdropMap = {};
    const usedBackdrops = new Set();

    GENRES.forEach((g, i) => {
      const data = results[i];
      if (!data || !data.results) return;
      // pick the first result with a backdrop that hasn't been used yet
      const pick = data.results.find(
        (m) => m.backdrop_path && !usedBackdrops.has(m.backdrop_path)
      );
      if (pick) {
        backdropMap[g.id] = pick.backdrop_path;
        usedBackdrops.add(pick.backdrop_path);
      }
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
  collectionGridEl.innerHTML = Array(6).fill(`
  <div class="collection-card">
    <div class="skeleton skeleton-poster"></div>
    <div class="skeleton skeleton-line" style="width: 70%; margin-top: 0.5rem;"></div>
  </div>
`).join('');
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
  ticketGrid.innerHTML = Array(6).fill(`
  <div class="ticket">
    <div class="skeleton" style="width: 100%; aspect-ratio: 2/3; border-radius: 0;"></div>
    <div class="info">
      <div class="skeleton skeleton-line" style="width: 80%;"></div>
      <div class="skeleton skeleton-line" style="width: 40%; margin-top: 0.6rem;"></div>
      <div class="skeleton skeleton-line" style="margin-top: 0.6rem;"></div>
      <div class="skeleton skeleton-line" style="width: 90%; margin-top: 0.3rem;"></div>
    </div>
  </div>
`).join('');
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
// MOVIE BATTLES — tournament with random + custom modes
// ============================================
let battle = {
  mode: "random",         // "random" or "custom"
  size: 8,                // random mode bracket size
  timeAvailable: 0,       // custom mode: minutes, 0 = no limit
  customPicks: [],        // {id, title, poster_path, vote_average, release_date, whyYes, whyNo, ...}
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
const battleStartBtn = document.getElementById("battle-start");
const setupRandomEl = document.getElementById("setup-random");
const setupCustomEl = document.getElementById("setup-custom");

// mode toggle
document.querySelectorAll(".battle-mode").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".battle-mode").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    battle.mode = btn.dataset.mode;
    setupRandomEl.hidden = battle.mode !== "random";
    setupCustomEl.hidden = battle.mode !== "custom";
    updateStartButton();
  });
});

// random size toggle
document.querySelectorAll(".battle-size").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".battle-size").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    battle.size = parseInt(btn.dataset.size, 10);
  });
});

// time-available toggle (custom mode)
document.querySelectorAll(".time-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".time-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    battle.timeAvailable = parseInt(btn.dataset.time, 10);
  });
});

// custom search — debounced
const customSearchInput = document.getElementById("custom-search-input");
const customSearchResults = document.getElementById("custom-search-results");
let customSearchTimer = null;

customSearchInput.addEventListener("input", () => {
  clearTimeout(customSearchTimer);
  customSearchTimer = setTimeout(runCustomSearch, 400);
});

async function runCustomSearch() {
  const q = customSearchInput.value.trim();
  if (q.length < 2) { customSearchResults.innerHTML = ""; return; }
  try {
    const res = await fetch(
      `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(q)}&include_adult=false`
    );
    if (!res.ok) return;
    const data = await res.json();
    const items = data.results
      .filter((m) => m.poster_path && (m.vote_count || 0) >= 5)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 8);
    customSearchResults.innerHTML = "";
    items.forEach((m) => {
      const card = document.createElement("button");
      card.className = "custom-search-result";
      const year = (m.release_date || "").slice(0, 4);
      card.innerHTML = `
        <img src="${IMG_BASE_SM}${m.poster_path}" alt="">
        <div>
          <div class="csr-title">${m.title}</div>
          <div class="csr-year">${year}</div>
        </div>
      `;
      card.addEventListener("click", () => addCustomPick(m));
      customSearchResults.appendChild(card);
    });
  } catch (err) { console.error(err); }
}

function addCustomPick(movie) {
  if (battle.customPicks.some((p) => p.id === movie.id)) {
    toast("fetch", `${movie.title} is already in the list`);
    return;
  }
  if (battle.customPicks.length >= 6) {
    toast("fetch", `Max 6 contenders — drop one to add another`);
    return;
  }
  battle.customPicks.push({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
    overview: movie.overview,
    whyYes: "",
    whyNo: ""
  });
  customSearchInput.value = "";
  customSearchResults.innerHTML = "";
  renderCustomPicks();
  updateStartButton();
}

function renderCustomPicks() {
  const container = document.getElementById("custom-picks");
  const label = document.getElementById("picks-label");
  label.textContent = `CONTENDERS — ${battle.customPicks.length}`;

  container.innerHTML = "";
  battle.customPicks.forEach((pick, idx) => {
    const el = document.createElement("div");
    el.className = "custom-pick";
    const year = (pick.release_date || "").slice(0, 4);
    el.innerHTML = `
      <div class="custom-pick-row">
        <img src="${IMG_BASE_SM}${pick.poster_path}" alt="">
        <div class="custom-pick-body">
          <div class="custom-pick-title">${pick.title}</div>
          <div class="custom-pick-year">${year || "—"}</div>
          <div class="custom-pick-actions">
            <button class="custom-pick-btn notes-toggle">+ NOTES</button>
            <button class="custom-pick-btn remove">✕ REMOVE</button>
          </div>
        </div>
      </div>
      <div class="custom-pick-notes">
        <label>WHY YES</label>
        <textarea class="pick-yes" placeholder="Reasons to pick this one...">${pick.whyYes}</textarea>
        <label>WHY NO</label>
        <textarea class="pick-no" placeholder="Reasons against...">${pick.whyNo}</textarea>
      </div>
    `;
    // wire actions
    el.querySelector(".remove").addEventListener("click", () => {
      battle.customPicks.splice(idx, 1);
      renderCustomPicks();
      updateStartButton();
    });
    const notesToggle = el.querySelector(".notes-toggle");
    const notesEl = el.querySelector(".custom-pick-notes");
    notesToggle.addEventListener("click", () => {
      notesEl.classList.toggle("open");
      notesToggle.textContent = notesEl.classList.contains("open") ? "− NOTES" : "+ NOTES";
    });
    // if user had notes already, keep the pane open
    if (pick.whyYes || pick.whyNo) {
      notesEl.classList.add("open");
      notesToggle.textContent = "− NOTES";
    }
    el.querySelector(".pick-yes").addEventListener("input", (e) => {
      battle.customPicks[idx].whyYes = e.target.value;
    });
    el.querySelector(".pick-no").addEventListener("input", (e) => {
      battle.customPicks[idx].whyNo = e.target.value;
    });
    container.appendChild(el);
  });
}

function updateStartButton() {
  if (battle.mode === "random") {
    battleStartBtn.disabled = false;
    battleStartBtn.textContent = "START BATTLE ▶";
  } else {
    const ready = battle.customPicks.length >= 2;
    battleStartBtn.disabled = !ready;
    battleStartBtn.textContent = ready
      ? "DECIDE FOR ME ⚖"
      : `ADD ${2 - battle.customPicks.length} MORE`;
  }
}
updateStartButton();

battleStartBtn.addEventListener("click", startBattle);
document.getElementById("battle-cancel").addEventListener("click", resetBattle);
// ============================================
// SWIPE-TO-PICK — Tinder-style drag gesture on battle cards
// ============================================
function attachBattleSwipe(side) {
  const card = document.getElementById(`battle-${side}`);
  const stamp = document.getElementById(`battle-${side}-stamp`);
  const outwardSign = side === "a" ? -1 : 1; // card A lives left → swipes left; card B lives right → swipes right
  const threshold = 90;

  let dragging = false;
  let moved = false;
  let startX = 0, startY = 0, dx = 0, dy = 0;

  function pointFromEvent(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function onDown(e) {
    if (!battle.active || battleArenaEl.classList.contains("transitioning")) return;
    dragging = true;
    moved = false;
    dx = 0; dy = 0;
    const p = pointFromEvent(e);
    startX = p.x;
    startY = p.y;
    card.classList.add("dragging");
  }

  function onMove(e) {
    if (!dragging) return;
    const p = pointFromEvent(e);
    dx = p.x - startX;
    dy = p.y - startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true;
    if (!moved) return;

    // Only hijack the gesture once it's clearly horizontal — otherwise let the page scroll
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (e.cancelable) e.preventDefault();

    const rotate = dx / 20;
    card.style.transform = `translate(${dx}px, ${dy * 0.15}px) rotate(${rotate}deg)`;

    const outward = dx * outwardSign;
    if (stamp) stamp.style.opacity = String(Math.max(0, Math.min(outward / threshold, 1)));
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("dragging");

    const outward = dx * outwardSign;
    const wasSwipe = moved && Math.abs(dx) > Math.abs(dy) * 1.2;

    if (wasSwipe && outward > threshold) {
      // committed — fling off screen, then resolve
      card.style.transition = "transform 0.35s ease, opacity 0.35s ease";
      card.style.transform = `translate(${outwardSign * 500}px, ${dy * 0.15}px) rotate(${outwardSign * 22}deg)`;
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.transition = "";
        card.style.transform = "";
        card.style.opacity = "";
        if (stamp) stamp.style.opacity = "0";
        pickWinner(side);
      }, 260);
      return;
    }

    // snap back
    card.style.transition = "transform 0.3s ease";
    card.style.transform = "";
    if (stamp) stamp.style.opacity = "0";
    setTimeout(() => { card.style.transition = ""; }, 300);

    // a tap (no meaningful drag) still counts as picking that side
    if (!wasSwipe) {
      pickWinner(side);
    }
  }

  card.addEventListener("mousedown", onDown);
  card.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);
}

attachBattleSwipe("a");
attachBattleSwipe("b");

document.addEventListener("keydown", (e) => {
  if (!battle.active || !modalBackdrop.hidden) return;
  if (e.key === "ArrowLeft") pickWinner("a");
  if (e.key === "ArrowRight") pickWinner("b");
});

async function startBattle() {
  battleSetupEl.hidden = true;

  // Custom mode → algorithm ranker, not a bracket
  if (battle.mode === "custom") {
    return runVerdict();
  }

  toast("fetch", "Building the bracket...");
  let pool = [];
  try {
    const [p1, p2] = await Promise.all([
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=1`).then((r) => r.json()),
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=2`).then((r) => r.json())
    ]);
    pool = [...p1.results, ...p2.results]
      .filter((m) => m.poster_path && m.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, battle.size);
  } catch (err) {
    console.error(err);
    toast("fetch", "Bracket failed. Check your API key.");
    battleSetupEl.hidden = false;
    return;
  }

  if (pool.length < battle.size) {
    toast("fetch", "Couldn't build a full bracket.");
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
}

// ============================================
// THE VERDICT — algorithmic ranker
// ============================================
const battleVerdictEl = document.getElementById("battle-verdict");

async function runVerdict() {
  toast("fetch", "Weighing the options...");
  const verdictWinnerEl = document.getElementById("verdict-winner");
  const verdictRunnersEl = document.getElementById("verdict-runners");
  verdictWinnerEl.innerHTML = `<p style="font-family: var(--mono); color: var(--cream-dim); padding: 2rem;">Reading the reviews...</p>`;
  verdictRunnersEl.innerHTML = "";
  battleVerdictEl.hidden = false;
  battleVerdictEl.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    // Fetch full details for each pick to get runtime
    const details = await Promise.all(
      battle.customPicks.map((p) =>
        fetch(`${TMDB_BASE}/movie/${p.id}?api_key=${TMDB_API_KEY}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    // Merge with user's notes
    const merged = details.map((d, i) => {
      const base = d || battle.customPicks[i];
      return {
        ...base,
        whyYes: battle.customPicks[i].whyYes,
        whyNo: battle.customPicks[i].whyNo,
        poster_path: base.poster_path || battle.customPicks[i].poster_path,
        title: base.title || battle.customPicks[i].title
      };
    });

    const scored = merged
      .map((m) => ({ ...m, ...scoreMovie(m, battle.timeAvailable) }))
      .sort((a, b) => b.score - a.score);

    renderVerdict(scored);
  } catch (err) {
    console.error(err);
    verdictWinnerEl.innerHTML = `<p style="font-family: var(--mono); color: var(--coral); padding: 2rem;">Couldn't reach the reviews. Try again.</p>`;
  }
}

function scoreMovie(m, maxTime) {
  let score = 0;
  const reasons = [];
  const rating = m.vote_average || 0;
  const voteCount = m.vote_count || 0;
  const runtime = m.runtime || 0;

  // 1. TMDB rating (0-45)
  score += Math.round(rating * 4.5);
  if (rating >= 8) reasons.push({ type: "pro", text: `Excellent rating (★${rating.toFixed(1)})` });
  else if (rating >= 7) reasons.push({ type: "pro", text: `Solid rating (★${rating.toFixed(1)})` });
  else if (rating > 0 && rating < 5.5) reasons.push({ type: "con", text: `Weak rating (★${rating.toFixed(1)})` });

  // 2. Review reputation (0-15)
  if (voteCount >= 3000) { score += 15; reasons.push({ type: "pro", text: "Well-known — thousands of reviews" }); }
  else if (voteCount >= 500) score += 8;
  else if (voteCount >= 50) score += 3;
  else if (voteCount > 0) reasons.push({ type: "con", text: "Few reviews — a bit of a gamble" });

  // 3. Your pros / cons
  if (m.whyYes && m.whyYes.trim()) {
    score += 15;
    reasons.push({ type: "pro", text: "You wrote real reasons to watch" });
  }
  if (m.whyNo && m.whyNo.trim()) {
    score -= 18;
    reasons.push({ type: "con", text: "You flagged concerns yourself" });
  }

  // 4. Runtime fit
  if (maxTime > 0 && runtime > 0) {
    if (runtime <= maxTime) {
      score += 10;
      reasons.push({ type: "pro", text: `Fits your ${maxTime}-min window (${runtime} min)` });
    } else if (runtime > maxTime + 20) {
      score -= 22;
      reasons.push({ type: "con", text: `Too long — ${runtime} min vs ${maxTime} available` });
    } else {
      reasons.push({ type: "neutral", text: `Slightly over your window (${runtime} min)` });
    }
  } else if (runtime > 0) {
    reasons.push({ type: "neutral", text: `${runtime} min runtime` });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, reasons };
}

function renderVerdict(scored) {
  const winner = scored[0];
  const rest = scored.slice(1);
  const verdictWinnerEl = document.getElementById("verdict-winner");
  const verdictRunnersEl = document.getElementById("verdict-runners");

  const poster = winner.poster_path
    ? `${IMG_BASE}${winner.poster_path}`
    : "https://via.placeholder.com/500x750/382C21/E8B64C?text=No+Poster";

  const reasonsHtml = winner.reasons
    .map((r) => `<li class="${r.type}">${r.text}</li>`)
    .join("");

  verdictWinnerEl.innerHTML = `
    <img src="${poster}" alt="${winner.title}">
    <div class="verdict-winner-info">
      <p class="verdict-rank">WINNER</p>
      <h3>${winner.title}</h3>
      <div class="verdict-score">
        <span class="verdict-score-num">${winner.score}</span>
        <span class="verdict-score-out">/ 100</span>
      </div>
      <ul class="verdict-reasons">${reasonsHtml}</ul>
    </div>
  `;

  verdictRunnersEl.innerHTML = "";
  rest.forEach((movie, i) => {
    const rankLabels = ["RUNNER-UP", "3RD PLACE", "4TH", "5TH", "6TH"];
    const rankLabel = rankLabels[i] || `${i + 2}TH`;
    const rposter = movie.poster_path
      ? `${IMG_BASE_SM}${movie.poster_path}`
      : "https://via.placeholder.com/60x90/382C21/E8B64C?text=?";
    // one-line summary: use the strongest reason
    const topReason = movie.reasons[0] ? movie.reasons[0].text : "";
    const runner = document.createElement("button");
    runner.className = "verdict-runner";
    runner.innerHTML = `
      <img src="${rposter}" alt="${movie.title}">
      <div class="verdict-runner-info">
        <p class="rank-line">${rankLabel}</p>
        <p class="r-title">${movie.title}</p>
        <p class="r-score">${movie.score} / 100</p>
        <p class="r-reason">${topReason}</p>
      </div>
    `;
    runner.addEventListener("click", () => openDetails(movie.id, "movie"));
    verdictRunnersEl.appendChild(runner);
  });

  // Wire up action buttons
  document.getElementById("verdict-details").onclick = () => openDetails(winner.id, "movie");

  const saveBtn = document.getElementById("verdict-save");
  const updateSaveBtn = () => {
    const isSaved = watchlist.some((w) => w.id === winner.id && w.type === "movie");
    saveBtn.textContent = isSaved ? "★ SAVED" : "☆ SAVE WINNER";
    saveBtn.classList.toggle("saved", isSaved);
  };
  updateSaveBtn();
  saveBtn.onclick = () => {
    toggleWatchlist({ id: winner.id, type: "movie", title: winner.title, poster: winner.poster_path });
    updateSaveBtn();
  };

  document.getElementById("verdict-redo").onclick = () => {
    battleVerdictEl.hidden = true;
    battleSetupEl.hidden = false;
    battleSetupEl.scrollIntoView({ behavior: "smooth" });
  };
}

function showNextMatch() {
  const a = battle.currentRound[battle.matchIndex * 2];
  const b = battle.currentRound[battle.matchIndex * 2 + 1];
  battle.currentPair = { a, b };

  updateBattleProgress();
  setBattleCard("a", a);
  setBattleCard("b", b);

  battleArenaEl.classList.remove("transitioning");
  document.getElementById("battle-a").classList.remove("winning", "losing");
  document.getElementById("battle-b").classList.remove("winning", "losing");

  battleArenaEl.classList.remove("entering");
  void battleArenaEl.offsetWidth;
  battleArenaEl.classList.add("entering");
}

function setBattleCard(side, movie) {
  const img = document.getElementById(`battle-${side}-img`);
  const title = document.getElementById(`battle-${side}-title`);
  const meta = document.getElementById(`battle-${side}-meta`);
  const overview = document.getElementById(`battle-${side}-overview`);
  const chip = document.getElementById(`battle-${side}-notes-chip`);
  const notes = document.getElementById(`battle-${side}-notes`);

  img.src = `${IMG_BASE}${movie.poster_path}`;
  img.alt = movie.title;
  title.textContent = movie.title;
  const year = (movie.release_date || "").slice(0, 4);
  const rating = movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : "";
  meta.textContent = [year, rating].filter(Boolean).join(" · ");
  if (overview) overview.textContent = movie.overview || "";

  // show pros/cons notes if this movie has any
  const hasNotes = movie.whyYes || movie.whyNo;
  chip.hidden = !hasNotes;
  notes.hidden = !hasNotes;
  if (hasNotes) {
    let html = "";
    if (movie.whyYes) html += `<p><strong>WHY YES</strong>${escapeHTML(movie.whyYes)}</p>`;
    if (movie.whyNo) html += `<p><strong>WHY NO</strong>${escapeHTML(movie.whyNo)}</p>`;
    notes.innerHTML = html;
  }
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateBattleProgress() {
  const totalMatchesInRound = battle.currentRound.length / 2;
  const matchNum = battle.matchIndex + 1;
  document.getElementById("battle-round-label").textContent = `ROUND ${battle.roundNumber} OF ${battle.totalRounds}`;
  document.getElementById("battle-match-label").textContent = `MATCH ${matchNum} OF ${totalMatchesInRound}`;

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
    if (battle.matchIndex * 2 >= battle.currentRound.length) {
      if (battle.nextRound.length === 1) {
        showChampion(battle.nextRound[0]);
        return;
      }
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

  launchConfetti(document.getElementById("champion-confetti"));
}

function resetBattle() {
  battle.active = false;
  battleSetupEl.hidden = false;
  battleStageEl.hidden = true;
  battleChampionEl.hidden = true;
  battleVerdictEl.hidden = true;
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
  if (groupSwipeBtn) groupSwipeBtn.disabled = players.length < 2;
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
// GROUP SWIPE MODE — pass-the-phone matching
// ============================================
const groupSwipeBtn = document.getElementById("group-swipe-btn");
const groupSection = document.getElementById("group-section");
const groupPassPane = document.getElementById("group-pass-pane");
const groupDeckPane = document.getElementById("group-deck-pane");
const groupRevealPane = document.getElementById("group-reveal-pane");
const groupPassName = document.getElementById("group-pass-name");
const groupDeckStack = document.getElementById("group-deck-stack");
const groupDeckPlayer = document.getElementById("group-deck-player");
const groupDeckProgress = document.getElementById("group-deck-progress");
const groupRevealInner = document.getElementById("group-reveal-inner");

const groupSwipe = {
  deck: [],
  playerIndex: 0,
  cardIndex: 0,
  likes: {} // { playerName: Set of movie ids }
};

groupSwipeBtn.addEventListener("click", startGroupSwipe);
document.getElementById("group-cancel-btn-pass").addEventListener("click", cancelGroupSwipe);
document.getElementById("group-cancel-btn-deck").addEventListener("click", cancelGroupSwipe);
document.getElementById("group-restart-btn").addEventListener("click", () => {
  groupRevealPane.hidden = true;
  groupSection.hidden = true;
  playerChips.scrollIntoView({ behavior: "smooth" });
});

async function startGroupSwipe() {
  if (players.length < 2) return;

  groupSwipe.playerIndex = 0;
  groupSwipe.cardIndex = 0;
  groupSwipe.likes = {};
  players.forEach((p) => { groupSwipe.likes[p] = new Set(); });

  groupSwipeBtn.disabled = true;
  groupSwipeBtn.textContent = "LOADING DECK...";

  try {
    const [p1, p2] = await Promise.all([
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=${Math.floor(Math.random() * 4) + 1}`).then((r) => r.json()),
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=${Math.floor(Math.random() * 4) + 1}`).then((r) => r.json())
    ]);
    const pool = [...(p1.results || []), ...(p2.results || [])]
      .filter((m) => m.poster_path && m.title)
      .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    if (pool.length < 4) throw new Error("not enough movies");
    groupSwipe.deck = pool;
  } catch (err) {
    console.error(err);
    toast("fetch", "Couldn't load the deck. Check the API key.");
    groupSwipeBtn.disabled = false;
    groupSwipeBtn.textContent = "SWIPE TOGETHER 💕";
    return;
  }

  groupSwipeBtn.disabled = false;
  groupSwipeBtn.textContent = "SWIPE TOGETHER 💕";

  groupSection.hidden = false;
  groupPassPane.hidden = false;
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = true;
  showPassScreen();
  groupSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelGroupSwipe() {
  groupSection.hidden = true;
}

function showPassScreen() {
  const name = players[groupSwipe.playerIndex];
  groupPassName.textContent = name;
  document.getElementById("group-pass-sub").textContent =
    groupSwipe.playerIndex === 0
      ? "Swipe right on anything you'd watch. Left on anything you wouldn't."
      : "Your turn. Swipe right on anything you'd watch, left on anything you wouldn't.";
  groupPassPane.hidden = false;
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = true;
}

document.getElementById("group-ready-btn").addEventListener("click", () => {
  groupSwipe.cardIndex = 0;
  groupPassPane.hidden = true;
  groupDeckPane.hidden = false;
  groupDeckPlayer.textContent = players[groupSwipe.playerIndex];
  renderGroupDeck();
});

function renderGroupDeck() {
  groupDeckStack.innerHTML = "";
  groupDeckProgress.textContent = `${Math.min(groupSwipe.cardIndex + 1, groupSwipe.deck.length)} / ${groupSwipe.deck.length}`;

  if (groupSwipe.cardIndex >= groupSwipe.deck.length) {
    // this player is done
    if (groupSwipe.playerIndex < players.length - 1) {
      groupSwipe.playerIndex++;
      showPassScreen();
    } else {
      revealGroupMatch();
    }
    return;
  }

  // render current + next card (next peeks behind for depth)
  const upcoming = groupSwipe.deck.slice(groupSwipe.cardIndex, groupSwipe.cardIndex + 2);
  upcoming.slice().reverse().forEach((movie, revIdx) => {
    const isTop = revIdx === upcoming.length - 1;
    const card = document.createElement("div");
    card.className = "group-card";
    card.style.zIndex = String(isTop ? 2 : 1);
    card.style.transform = isTop ? "none" : "scale(0.96) translateY(10px)";
    card.style.opacity = isTop ? "1" : "0.6";

    const year = (movie.release_date || "").slice(0, 4);
    const rating = movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : "";
    card.innerHTML = `
      <span class="group-stamp like" id="group-stamp-like">LIKE</span>
      <span class="group-stamp nope" id="group-stamp-nope">NOPE</span>
      <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}">
      <div class="group-card-info">
        <div class="group-card-title">${movie.title}</div>
        <div class="group-card-meta">${[year, rating].filter(Boolean).join(" · ")}</div>
      </div>
    `;

    if (isTop) attachGroupSwipe(card, movie.id);
    groupDeckStack.appendChild(card);
  });
}

document.getElementById("group-like-btn").addEventListener("click", () => resolveGroupCard(true));
document.getElementById("group-nope-btn").addEventListener("click", () => resolveGroupCard(false));

function resolveGroupCard(liked) {
  const movie = groupSwipe.deck[groupSwipe.cardIndex];
  if (!movie) return;
  const player = players[groupSwipe.playerIndex];
  if (liked) groupSwipe.likes[player].add(movie.id);
  groupSwipe.cardIndex++;
  renderGroupDeck();
}

function attachGroupSwipe(card, movieId) {
  const threshold = 100;
  let dragging = false, moved = false;
  let startX = 0, startY = 0, dx = 0, dy = 0;

  const likeStamp = card.querySelector("#group-stamp-like");
  const nopeStamp = card.querySelector("#group-stamp-nope");

  function point(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function onDown(e) {
    dragging = true;
    moved = false;
    dx = 0; dy = 0;
    const p = point(e);
    startX = p.x; startY = p.y;
    card.classList.add("dragging");
  }

  function onMove(e) {
    if (!dragging) return;
    const p = point(e);
    dx = p.x - startX;
    dy = p.y - startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true;
    if (!moved) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (e.cancelable) e.preventDefault();

    const rotate = dx / 18;
    card.style.transform = `translate(${dx}px, ${dy * 0.15}px) rotate(${rotate}deg)`;
    if (dx > 0) {
      likeStamp.style.opacity = String(Math.min(dx / threshold, 1));
      nopeStamp.style.opacity = "0";
    } else {
      nopeStamp.style.opacity = String(Math.min(-dx / threshold, 1));
      likeStamp.style.opacity = "0";
    }
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("dragging");
    const wasSwipe = moved && Math.abs(dx) > Math.abs(dy) * 1.2;

    if (wasSwipe && Math.abs(dx) > threshold) {
      const liked = dx > 0;
      card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      card.style.transform = `translate(${liked ? 600 : -600}px, ${dy * 0.15}px) rotate(${liked ? 25 : -25}deg)`;
      card.style.opacity = "0";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      setTimeout(() => resolveGroupCard(liked), 220);
      return;
    }

    card.style.transition = "transform 0.3s ease";
    card.style.transform = "";
    likeStamp.style.opacity = "0";
    nopeStamp.style.opacity = "0";
    setTimeout(() => { card.style.transition = ""; }, 300);
  }

  card.addEventListener("mousedown", onDown);
  card.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);
}

async function revealGroupMatch() {
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = false;

  // count votes per movie id
  const tally = {};
  players.forEach((p) => {
    groupSwipe.likes[p].forEach((id) => { tally[id] = (tally[id] || 0) + 1; });
  });

  const idsByVotes = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const totalPlayers = players.length;
  const unanimous = idsByVotes.filter(([, count]) => count === totalPlayers);
  const best = unanimous.length ? unanimous : idsByVotes.filter(([, count]) => count === idsByVotes[0]?.[1]);

  if (!idsByVotes.length || !best.length) {
    groupRevealInner.innerHTML = `
      <div class="group-no-match">
        Nobody liked anything the same. Truly a house divided. 😅<br>
        Try again, or let "Who Picks Tonight" decide for you.
      </div>
    `;
    return;
  }

  const [winningId, votes] = best[Math.floor(Math.random() * best.length)];
  const movie = groupSwipe.deck.find((m) => String(m.id) === String(winningId));
  const isUnanimous = votes === totalPlayers;

  groupRevealInner.innerHTML = `
    <p class="group-match-eyebrow">${isUnanimous ? "🎉 UNANIMOUS MATCH" : "🎬 CLOSEST MATCH"}</p>
    <div class="group-match-card">
      <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}">
      <div>
        <h3>${movie.title}</h3>
        <div class="group-match-tally">${votes} of ${totalPlayers} liked this</div>
        <p class="group-match-overview">${(movie.overview || "").slice(0, 160)}${(movie.overview || "").length > 160 ? "..." : ""}</p>
      </div>
    </div>
    <div class="champion-actions">
      <button class="champ-primary" id="group-match-details">VIEW DETAILS</button>
      <button class="champ-secondary" id="group-match-save">☆ SAVE</button>
    </div>
  `;

  document.getElementById("group-match-details").onclick = () => openDetails(movie.id, "movie");
  const saveBtn = document.getElementById("group-match-save");
  const updateSave = () => {
    const isSaved = watchlist.some((w) => w.id === movie.id && w.type === "movie");
    saveBtn.textContent = isSaved ? "★ SAVED" : "☆ SAVE";
    saveBtn.classList.toggle("saved", isSaved);
  };
  updateSave();
  saveBtn.onclick = () => {
    toggleWatchlist({ id: movie.id, type: "movie", title: movie.title, poster: movie.poster_path });
    updateSave();
  };

  if (isUnanimous) launchConfetti(document.getElementById("group-confetti-layer"));
}

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
// ============================================
// COOKIE / STORAGE CONSENT
// ============================================
const cookieBanner = document.getElementById("cookie-banner");
const cookieChoice = localStorage.getItem("jps_cookie_choice");

if (!cookieChoice) {
  setTimeout(() => cookieBanner.hidden = false, 1200);
}

document.getElementById("cookie-accept").addEventListener("click", () => {
  localStorage.setItem("jps_cookie_choice", "accepted");
  cookieBanner.hidden = true;
});

document.getElementById("cookie-decline").addEventListener("click", () => {
  localStorage.setItem("jps_cookie_choice", "declined");
  cookieBanner.hidden = true;
  // wipe stored data if user declines
  localStorage.removeItem("jps_watchlist");
  localStorage.removeItem("jps_region");
  watchlist = [];
  renderWatchlist();
});
// ============================================
// ONBOARDING TOUR
// ============================================
const TOUR_STEPS = [
  { title: "WELCOME 🎬", body: "Let me show you around. You've got 5 different ways to land on tonight's pick — takes 20 seconds.", target: null },
  { title: "FIND ANYTHING", body: "Movies, actors, or vibes. Try 'ww2' or 'tom hanks' or 'kid alone at christmas' — we'll figure it out.", target: "#search-section" },
  { title: "MOVIE BATTLES", body: "Random bracket for discovery, or DECIDE FOR ME where an algorithm scores movies you're stuck between.", target: "#battles-section" },
  { title: "WHEEL, MOOD, FEELING", body: "Spin for random. Pick a mood. Or just type how you feel. Three ways to land on tonight's pick.", target: "#mood-section" },
  { title: "WHO PICKS TONIGHT?", body: "Group can't agree? Add everyone's name. Let fate settle it, or swipe together and find what you all actually like.", target: "#whopicks-section" }
];

let tourStep = 0;
const tourBackdrop = document.getElementById("tour-backdrop");

function showTourStep() {
  const step = TOUR_STEPS[tourStep];
  const total = TOUR_STEPS.length;
  document.getElementById("tour-step").textContent = `STEP ${tourStep + 1} OF ${total}`;
  document.getElementById("tour-title").textContent = step.title;
  document.getElementById("tour-body").textContent = step.body;
  document.getElementById("tour-prev").hidden = tourStep === 0;
  document.getElementById("tour-next").textContent = tourStep === total - 1 ? "GOT IT ✓" : "NEXT →";

  const highlight = document.getElementById("tour-highlight");
  const card = document.getElementById("tour-card");

  if (step.target) {
    const el = document.querySelector(step.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        highlight.hidden = false;
        highlight.style.top = rect.top + "px";
        highlight.style.left = rect.left + "px";
        highlight.style.width = rect.width + "px";
        highlight.style.height = rect.height + "px";
        // position card centered horizontally, bottom of screen
        card.style.top = "auto";
        card.style.bottom = "24px";
        card.style.left = "50%";
        card.style.transform = "translateX(-50%)";
      }, 500);
    }
  } else {
    highlight.hidden = true;
    card.style.top = "50%";
    card.style.left = "50%";
    card.style.bottom = "auto";
    card.style.transform = "translate(-50%, -50%)";
  }
}

function endTour() {
  tourBackdrop.hidden = true;
  localStorage.setItem("jps_tour_seen", "true");
}

document.getElementById("tour-skip").addEventListener("click", endTour);
document.getElementById("tour-prev").addEventListener("click", () => {
  if (tourStep > 0) { tourStep--; showTourStep(); }
});
document.getElementById("tour-next").addEventListener("click", () => {
  if (tourStep < TOUR_STEPS.length - 1) { tourStep++; showTourStep(); }
  else endTour();
});

// Show tour on first visit only, after cookie banner
if (!localStorage.getItem("jps_tour_seen")) {
  setTimeout(() => {
    tourBackdrop.hidden = false;
    showTourStep();
  }, 2500);
}