// ============================================
// LANGUAGE
// ============================================
const SUPPORTED_LANGS = ["en", "sq", "de"];
function detectLang() {
  const saved = localStorage.getItem("jps_lang");
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : "en";
}
const LANG = detectLang();
document.documentElement.lang = LANG;

const STATIC_I18N = {
  hero_eyebrow: { en: "FOR PEOPLE WHO CAN'T DECIDE —", sq: "PËR ATA QË S'VENDOSIN DOT —", de: "FÜR LEUTE, DIE SICH NICHT ENTSCHEIDEN KÖNNEN —" },
  hero_sub: { en: "Stop scrolling. Tell us the mood, we'll hand you the pick.", sq: "Mos rrëshqit më. Na thuaj gjendjen, ne të japim zgjedhjen.", de: "Hör auf zu scrollen. Sag uns die Stimmung, wir liefern die Wahl." },
  cta_search: { en: "SEARCH ANYTHING", sq: "KËRKO ÇDO GJË", de: "ALLES DURCHSUCHEN" },
  cta_wheel: { en: "SPIN THE WHEEL →", sq: "RROTULLO ROTËN →", de: "RAD DREHEN →" },
  cta_swipe: { en: "SWIPE", sq: "FËRKO", de: "SWIPEN" },
  trending_title: { en: "HOT RIGHT NOW", sq: "TRENDI I TANI", de: "GERADE ANGESAGT" },
  trending_sub: { en: "trending this week — tap any poster for details", sq: "trendi këtë javë — prek çdo poster për detaje", de: "diese Woche im Trend — für Details antippen" },
  search_title: { en: "FIND ANYTHING", sq: "GJEJ ÇDO GJË", de: "ALLES FINDEN" },
  search_sub: {
    en: "Search for a movie, an actor, a director, or just a vibe. Can't remember the name? Describe what you remember — \"kid alone at christmas,\" \"ww2 pianist,\" \"car chase in France.\" We'll try.",
    sq: "Kërko një film, aktor, regjisor, ose thjesht një ndjesi. S'e mban mend emrin? Përshkruaj çfarë mban mend — \"fëmijë vetëm në krishtlindje,\" \"pianist i luftës II botërore,\" \"ndjekje me makina në Francë.\" Do provojmë.",
    de: "Suche nach einem Film, Schauspieler, Regisseur oder einfach einem Gefühl. Erinnerst du dich nicht an den Namen? Beschreib, was du weißt — \"Kind allein an Weihnachten,\" \"Pianist im 2. Weltkrieg,\" \"Verfolgungsjagd in Frankreich.\" Wir versuchen es."
  },
  search_placeholder: { en: "Search titles, people, themes...", sq: "Kërko tituj, njerëz, tema...", de: "Titel, Personen, Themen suchen..." },
  btn_search: { en: "SEARCH", sq: "KËRKO", de: "SUCHEN" },
  tab_titles: { en: "TITLES", sq: "TITUJT", de: "TITEL" },
  tab_people: { en: "PEOPLE", sq: "NJERËZIT", de: "PERSONEN" },
  tab_themes: { en: "THEMES", sq: "TEMAT", de: "THEMEN" },
  genres_title: { en: "BROWSE BY GENRE", sq: "SHFLETO SIPAS ZHANRIT", de: "NACH GENRE STÖBERN" },
  genres_sub: { en: "Straight to the point. Pick a lane.", sq: "Drejt e në pikë. Zgjidh një drejtim.", de: "Direkt auf den Punkt. Wähl eine Richtung." },
  curated_title: { en: "HAND-PICKED, NO ALGORITHM", sq: "ZGJEDHUR ME DORË, PA ALGORITËM", de: "HANDVERLESEN, KEIN ALGORITHMUS" },
  curated_sub: { en: "Lists I actually made. Opinions may bite.", sq: "Lista që i bëra vetë. Mendimet mund të djegin.", de: "Listen, die ich selbst erstellt habe. Meinungen können beißen." },
  battles_title: { en: "MOVIE BATTLES", sq: "BETEJA FILMASH", de: "FILM-DUELLE" },
  battles_sub: { en: "Two movies enter, one movie leaves. Tap the one you'd actually watch tonight — the winner faces the next challenger until one movie takes the crown.", sq: "Dy filma hyjnë, një film del. Prek atë që do shikoje sonte — fituesi përballet me sfiduesin tjetër derisa një film merr kurorën.", de: "Zwei Filme treten an, einer geht. Tippe den, den du heute wirklich schauen würdest — der Sieger trifft den nächsten Herausforderer, bis einer die Krone holt." },
  battle_random: { en: "RANDOM BRACKET", sq: "BLLOK I RASTËSISHËM", de: "ZUFÄLLIGES BRACKET" },
  battle_custom: { en: "DECIDE FOR ME", sq: "VENDOS PËR MUA", de: "ENTSCHEIDE FÜR MICH" },
  battle_bracket_label: { en: "How many movies in the bracket?", sq: "Sa filma në bllok?", de: "Wie viele Filme im Bracket?" },
  battle_size8: { en: "8 MOVIES · 3 ROUNDS", sq: "8 FILMA · 3 RAUNDE", de: "8 FILME · 3 RUNDEN" },
  battle_size16: { en: "16 MOVIES · 4 ROUNDS", sq: "16 FILMA · 4 RAUNDE", de: "16 FILME · 4 RUNDEN" },
  battle_help: { en: "Add the movies you're stuck between — as few as 2, as many as 6. Optionally jot down why you'd watch each (or why not). We'll score them on TMDB rating, review count, runtime fit, and your notes, then hand you a verdict.", sq: "Shto filmat mes të cilëve je i pavendosur — nga 2 deri në 6. Opsionalisht shkruaj pse do e shikoje secilin (ose jo). Do i vlerësojmë sipas vlerësimit TMDB, numrit të recensioneve, kohëzgjatjes dhe shënimeve tua, pastaj japim vendimin.", de: "Füge die Filme hinzu, zwischen denen du dich nicht entscheiden kannst — 2 bis 6. Optional kannst du notieren, warum (nicht). Wir bewerten sie nach TMDB-Rating, Anzahl Reviews, Laufzeit und deinen Notizen und liefern dann ein Urteil." },
  battle_time_label: { en: "Time available tonight (optional)", sq: "Koha e disponueshme sonte (opsionale)", de: "Verfügbare Zeit heute Abend (optional)" },
  time_nolimit: { en: "NO LIMIT", sq: "PA LIMIT", de: "OHNE LIMIT" },
  time_1hr: { en: "1 HR", sq: "1 ORË", de: "1 STD" },
  time_90: { en: "90 MIN", sq: "90 MIN", de: "90 MIN" },
  time_2hr: { en: "2 HR", sq: "2 ORË", de: "2 STD" },
  time_3hr: { en: "3 HR", sq: "3 ORË", de: "3 STD" },
  battle_search_label: { en: "Search and add contenders", sq: "Kërko dhe shto konkurrentë", de: "Kandidaten suchen und hinzufügen" },
  battle_search_placeholder: { en: "Search a movie to add...", sq: "Kërko një film për të shtuar...", de: "Film suchen zum Hinzufügen..." },
  battle_start: { en: "START BATTLE ▶", sq: "FILLO BETEJËN ▶", de: "DUELL STARTEN ▶" },
  battle_hint: { en: "Swipe a poster outward to pick it · or tap · or use ← → arrow keys", sq: "Fërko posterin jashtë për ta zgjedhur · ose prek · ose përdor tastet ← →", de: "Poster nach außen wischen zum Wählen · oder tippen · oder ← → Pfeiltasten" },
  battle_cancel: { en: "END BATTLE ✕", sq: "MBYLL BETEJËN ✕", de: "DUELL BEENDEN ✕" },
  champion_eyebrow: { en: "🏆 TONIGHT'S CHAMPION —", sq: "🏆 KAMPIONI I SONTE —", de: "🏆 DER HEUTIGE SIEGER —" },
  see_details: { en: "SEE FULL DETAILS →", sq: "SHIKO DETAJET →", de: "ALLE DETAILS ANSEHEN →" },
  save: { en: "☆ SAVE", sq: "☆ RUAJ", de: "☆ SPEICHERN" },
  rematch: { en: "RUN IT BACK ↻", sq: "PËRSËRIT ↻", de: "NOCHMAL ↻" },
  verdict_eyebrow: { en: "⚖ THE VERDICT —", sq: "⚖ VENDIMI —", de: "⚖ DAS URTEIL —" },
  save_winner: { en: "☆ SAVE WINNER", sq: "☆ RUAJ FITUESIN", de: "☆ SIEGER SPEICHERN" },
  redo: { en: "TWEAK & RE-DECIDE ↺", sq: "NDRYSHO & RIVENDOS ↺", de: "ANPASSEN & NEU ENTSCHEIDEN ↺" },
  mood_title: { en: "HOW DO WE PICK?", sq: "SI ZGJEDHIM?", de: "WIE WÄHLEN WIR?" },
  type_movies: { en: "MOVIES", sq: "FILMA", de: "FILME" },
  type_tv: { en: "TV SHOWS", sq: "SERIALE", de: "SERIEN" },
  tab_wheel: { en: "SPIN THE WHEEL", sq: "RROTULLO ROTËN", de: "RAD DREHEN" },
  tab_mood: { en: "PICK A MOOD", sq: "ZGJIDH GJENDJEN", de: "STIMMUNG WÄHLEN" },
  tab_feeling: { en: "TELL ME HOW YOU FEEL", sq: "MË THUAJ SI NDIHESH", de: "SAG MIR, WIE DU DICH FÜHLST" },
  spin_btn: { en: "SPIN THE REEL", sq: "RROTULLO", de: "ROLLE DREHEN" },
  feeling_prompt: { en: "Type how you're feeling, or what kind of thing you're in the mood for:", sq: "Shkruaj si ndihesh, ose çfarë lloj gjëje ke qejf:", de: "Schreib, wie du dich fühlst oder worauf du Lust hast:" },
  feeling_placeholder: { en: "e.g. stressed, bored, want to laugh, need romance...", sq: "p.sh. i stresuar, i mërzitur, dua të qesh, dua romancë...", de: "z.B. gestresst, gelangweilt, will lachen, brauche Romantik..." },
  feeling_submit: { en: "FIND IT", sq: "GJEJE", de: "FINDEN" },
  results_title: { en: "HERE'S THE PICK", sq: "JA ZGJEDHJA", de: "HIER IST DIE WAHL" },
  spin_again: { en: "NO, NEXT ↻", sq: "JO, TJETRI ↻", de: "NEIN, NÄCHSTER ↻" },
  results_tip: { en: "Tap any ticket for the full breakdown — trailer, cast, where to stream.", sq: "Prek çdo biletë për detaje të plota — trailer, aktorë, ku të shikosh.", de: "Tippe auf ein Ticket für alle Details — Trailer, Besetzung, Streaming." },
  watchlist_title: { en: "YOUR WATCHLIST", sq: "LISTA JOTE", de: "DEINE WATCHLIST" },
  clear_watchlist: { en: "CLEAR ALL", sq: "PASTRO GJITHÇKA", de: "ALLES LÖSCHEN" },
  watchlist_sub: { en: "Saved on this device. No account, no cloud, nobody watching.", sq: "Ruajtur në këtë pajisje. Pa llogari, pa cloud, askush s'shikon.", de: "Auf diesem Gerät gespeichert. Kein Konto, keine Cloud, niemand schaut zu." },
  whopicks_title: { en: "WHO PICKS TONIGHT?", sq: "KUSH ZGJEDH SONTE?", de: "WER ENTSCHEIDET HEUTE?" },
  whopicks_sub: { en: "Watching with family, friends, or your other half? Add everyone's name and let fate settle the argument. Winner picks. No appeals. Flying solo tonight? Skip the names and just hit swipe.", sq: "Po shikon me familjen, miqtë, ose partnerin? Shto emrat e të gjithëve dhe lëre fatin të vendosë. Fituesi zgjedh. Pa apel. Je vetëm sonte? Kalo emrat dhe thjesht fërko.", de: "Schaust du mit Familie, Freunden oder deinem Partner? Namen hinzufügen und das Schicksal entscheiden lassen. Der Gewinner wählt. Kein Einspruch. Allein unterwegs? Namen überspringen und einfach swipen." },
  player_placeholder: { en: "Add a name...", sq: "Shto një emër...", de: "Namen hinzufügen..." },
  player_add: { en: "ADD", sq: "SHTO", de: "HINZUFÜGEN" },
  decide_btn: { en: "DECIDE ▶", sq: "VENDOS ▶", de: "ENTSCHEIDEN ▶" },
  group_vibe_eyebrow: { en: "WHAT'S THE VIBE?", sq: "ÇFARË GJENDJE?", de: "WELCHE STIMMUNG?" },
  group_pick_category: { en: "PICK A CATEGORY", sq: "ZGJIDH NJË KATEGORI", de: "KATEGORIE WÄHLEN" },
  group_genre_sub: { en: "Everyone swipes on the same category — pick whatever the group's actually in the mood for.", sq: "Të gjithë fërkojnë të njëjtën kategori — zgjidh çfarë ka qejf grupi.", de: "Alle swipen dieselbe Kategorie — wähl, worauf die Gruppe wirklich Lust hat." },
  cancel_session: { en: "CANCEL SESSION ✕", sq: "ANULO SESIONIN ✕", de: "SITZUNG ABBRECHEN ✕" },
  pass_phone_to: { en: "PASS THE PHONE TO", sq: "JEP TELEFONIN TE", de: "TELEFON WEITERGEBEN AN" },
  im_ready: { en: "I'M READY", sq: "JAM GATI", de: "ICH BIN BEREIT" },
  swipe_again: { en: "SWIPE AGAIN", sq: "FËRKO PËRSËRI", de: "NOCHMAL SWIPEN" },
  footer_brand: { en: "JUST PICK SOMETHING", sq: "THJESHT ZGJIDH DIÇKA", de: "WÄHL EINFACH ETWAS" },
  footer_brand_desc: { en: "A tiny tool for the eternal question: \"what should we watch?\" Built for the indecisive, by one of them.", sq: "Një mjet i vogël për pyetjen e përjetshme: \"çfarë të shikojmë?\" Ndërtuar për të pavendosurit, nga një prej tyre.", de: "Ein kleines Tool für die ewige Frage: \"Was schauen wir?\" Gebaut für Unentschlossene, von einem von ihnen." },
  footer_how_title: { en: "HOW IT WORKS", sq: "SI FUNKSIONON", de: "SO FUNKTIONIERT'S" },
  footer_how_desc: { en: "Search anything, spin the wheel, pick a mood, or type how you feel. We match it against thousands of movies and shows and hand you a shortlist. Tap anything for trailers, cast, and where to stream.", sq: "Kërko çdo gjë, rrotullo rotën, zgjidh një gjendje, ose shkruaj si ndihesh. E krahasojmë me mijëra filma dhe seriale dhe të japim një listë. Prek çdo gjë për trailer, aktorë, dhe ku të shikosh.", de: "Suche alles, dreh das Rad, wähl eine Stimmung oder schreib, wie du dich fühlst. Wir gleichen es mit tausenden Filmen und Serien ab und geben dir eine Auswahl. Tippe für Trailer, Besetzung und Streaming." },
  footer_region_title: { en: "REGION", sq: "RAJONI", de: "REGION" },
  footer_region_desc: { en: "Streaming availability changes by country. Set yours here:", sq: "Disponueshmëria e streaming ndryshon sipas vendit. Cakto tëndin këtu:", de: "Die Streaming-Verfügbarkeit variiert je nach Land. Stell deins hier ein:" },
  footer_lang_title: { en: "LANGUAGE", sq: "GJUHA", de: "SPRACHE" },
  footer_credits_title: { en: "CREDITS", sq: "FALËNDERIME", de: "CREDITS" },
  where_to_stream: { en: "WHERE TO STREAM", sq: "KU TË SHIKOSH", de: "WO STREAMEN" },
  cast: { en: "CAST", sq: "AKTORËT", de: "BESETZUNG" },
  watch_trailer: { en: "▶ WATCH TRAILER", sq: "▶ SHIKO TRAILERIN", de: "▶ TRAILER ANSEHEN" },
  cookie_text: { en: "This site uses <strong>localStorage</strong> to save your watchlist, region, and preferences on your device. Nothing is sent to a server. No tracking, no ads.", sq: "Ky sajt përdor <strong>localStorage</strong> për të ruajtur listën tënde, rajonin, dhe preferencat në pajisjen tënde. Asgjë s'dërgohet në server. Pa gjurmim, pa reklama.", de: "Diese Seite nutzt <strong>localStorage</strong>, um deine Watchlist, Region und Einstellungen auf deinem Gerät zu speichern. Nichts wird an einen Server gesendet. Kein Tracking, keine Werbung." },
  cookie_accept: { en: "GOT IT", sq: "E KUPTOVA", de: "VERSTANDEN" },
  cookie_decline: { en: "DECLINE", sq: "REFUZO", de: "ABLEHNEN" },
  tour_skip: { en: "SKIP TOUR", sq: "KALO TURIN", de: "TOUR ÜBERSPRINGEN" },
  tour_back: { en: "← BACK", sq: "← MBRAPA", de: "← ZURÜCK" },
  tour_next: { en: "NEXT →", sq: "TJETËR →", de: "WEITER →" },
  install_app: { en: "⬇ DOWNLOAD APP", sq: "⬇ SHKARKO APP", de: "⬇ APP HERUNTERLADEN" },
  ios_install_text: { en: "Safari doesn't allow one-tap installs. Tap the <strong>Share</strong> button below, then <strong>\"Add to Home Screen.\"</strong>", sq: "Safari s'lejon instalim me një prekje. Prek butonin <strong>Share</strong> poshtë, pastaj <strong>\"Add to Home Screen.\"</strong>", de: "Safari erlaubt keine Ein-Klick-Installation. Tippe unten auf <strong>Teilen</strong>, dann auf <strong>\"Zum Home-Bildschirm.\"</strong>" },
  imposter_title: { en: "FIND THE IMPOSTER", sq: "GJEJ IMPOSTORIN", de: "FINDE DEN HOCHSTAPLER" },
  imposter_sub: { en: "One of you doesn't know the movie. Everyone else does. Pass the phone, keep a straight face, and figure out who's faking it before the timer runs out.", sq: "Njëri nga ju s'e di filmin. Të tjerët e dinë. Jepni telefonin njëri-tjetrit, mbani fytyrë serioze, dhe gjeni kush po bën sikur para se të mbarojë koha.", de: "Einer von euch kennt den Film nicht. Alle anderen schon. Handy weiterreichen, Pokerface aufsetzen und rausfinden, wer schauspielert, bevor die Zeit abläuft." },
  imposter_play: { en: "PLAY 🕵️", sq: "LUAJ 🕵️", de: "SPIELEN 🕵️" },
  imposter_setup_eyebrow: { en: "GAME SETUP", sq: "PËRGATITJA E LOJËS", de: "SPIEL-EINRICHTUNG" },
  imposter_setup_title: { en: "HOW MANY PLAYERS?", sq: "SA LOJTARË?", de: "WIE VIELE SPIELER?" },
  imposter_timer_label: { en: "Discussion timer", sq: "Koha e diskutimit", de: "Diskussionszeit" },
  imposter_1min: { en: "1 MIN", sq: "1 MIN", de: "1 MIN" },
  imposter_3min: { en: "3 MIN", sq: "3 MIN", de: "3 MIN" },
  imposter_5min: { en: "5 MIN", sq: "5 MIN", de: "5 MIN" },
  imposter_start: { en: "START GAME ▶", sq: "FILLO LOJËN ▶", de: "SPIEL STARTEN ▶" },
  imposter_tap_reveal: { en: "SWIPE UP TO REVEAL", sq: "RRËSHQIT LART PËR TË ZBULUAR", de: "NACH OBEN WISCHEN ZUM AUFDECKEN" },
  imposter_next: { en: "NEXT PLAYER →", sq: "LOJTARI TJETËR →", de: "NÄCHSTER SPIELER →" },
  imposter_discuss_eyebrow: { en: "DISCUSS. WHO'S FAKING IT?", sq: "DISKUTONI. KUSH PO BËN SIKUR?", de: "DISKUTIERT. WER SCHAUSPIELERT?" },
  imposter_pause: { en: "PAUSE", sq: "NDALO", de: "PAUSE" },
  imposter_resume: { en: "RESUME", sq: "VAZHDO", de: "FORTSETZEN" },
  imposter_reveal: { en: "END & REVEAL ▶", sq: "MBYLL & ZBULO ▶", de: "BEENDEN & AUFDECKEN ▶" },
  imposter_play_again: { en: "PLAY AGAIN", sq: "LUAJ PËRSËRI", de: "NOCHMAL SPIELEN" },
  group_game_label: { en: "— or play a game together —", sq: "— ose luani një lojë së bashku —", de: "— oder spielt zusammen ein Spiel —" },
  tile_swipe_title: { en: "SWIPE TOGETHER", sq: "FËRKONI SË BASHKU", de: "GEMEINSAM SWIPEN" },
  tile_swipe_sub: { en: "Find something everyone actually wants to watch", sq: "Gjeni diçka që të gjithëve u pëlqen vërtet", de: "Findet etwas, das alle wirklich schauen wollen" },
  tile_imposter_title: { en: "FIND THE IMPOSTER", sq: "GJEJ IMPOSTORIN", de: "FINDE DEN HOCHSTAPLER" },
  tile_imposter_sub: { en: "One of you doesn't know the movie. Figure out who.", sq: "Njëri nga ju s'e di filmin. Gjeni kush.", de: "Einer von euch kennt den Film nicht. Findet raus, wer." },
  game_corner_title: { en: "GAME CORNER", sq: "KËNDI I LOJËRAVE", de: "SPIELE-ECKE" },
  game_corner_sub: { en: "Killing time before the movie starts? Play something with the group.", sq: "Po prisni të fillojë filmi? Luani diçka me grupin.", de: "Zeit totschlagen, bevor der Film startet? Spielt etwas mit der Gruppe." },
  tile_higherlower_title: { en: "HIGHER OR LOWER", sq: "MË LART APO MË POSHTË", de: "HÖHER ODER NIEDRIGER" },
  tile_higherlower_sub: { en: "Guess if the next movie rates higher or lower", sq: "Gjej nëse filmi tjetër vlerësohet më lart apo më poshtë", de: "Rate, ob der nächste Film höher oder niedriger bewertet ist" },
  hl_setup_eyebrow: { en: "GAME SETUP", sq: "PËRGATITJA E LOJËS", de: "SPIEL-EINRICHTUNG" },
  hl_setup_title: { en: "PICK A CATEGORY", sq: "ZGJIDH NJË KATEGORI", de: "KATEGORIE WÄHLEN" },
  hl_setup_sub: { en: "Guess whether the next movie is higher or lower than the one shown. Keep the streak alive.", sq: "Gjej nëse filmi tjetër është më lart apo më poshtë se ai i treguar. Mbaje serinë gjallë.", de: "Rate, ob der nächste Film höher oder niedriger ist als der gezeigte. Halte die Serie am Leben." },
  hl_cat_rating: { en: "RATING", sq: "VLERËSIMI", de: "BEWERTUNG" },
  hl_cat_popularity: { en: "POPULARITY", sq: "POPULLARITETI", de: "POPULARITÄT" },
  hl_cat_year: { en: "RELEASE YEAR", sq: "VITI I DALJES", de: "ERSCHEINUNGSJAHR" },
  hl_higher: { en: "▲ HIGHER", sq: "▲ MË LART", de: "▲ HÖHER" },
  hl_lower: { en: "▼ LOWER", sq: "▼ MË POSHTË", de: "▼ NIEDRIGER" },
  tile_trivia_title: { en: "TRIVIA SHOWDOWN", sq: "DUEL NJOHURISH", de: "TRIVIA-DUELL" },
  tile_trivia_sub: { en: "5 questions each. Highest score picks the movie.", sq: "5 pyetje secili. Pikët më të larta zgjedhin filmin.", de: "Je 5 Fragen. Höchste Punktzahl wählt den Film." },
  trivia_setup_eyebrow: { en: "GAME SETUP", sq: "PËRGATITJA E LOJËS", de: "SPIELEINRICHTUNG" },
  trivia_setup_title: { en: "TRIVIA SHOWDOWN", sq: "DUEL NJOHURISH", de: "TRIVIA-DUELL" },
  trivia_setup_sub: { en: "Everyone answers the same 5 questions about famous movies and TV shows. Most correct answers wins the remote — ties are broken by fate.", sq: "Të gjithë përgjigjen të njëjtave 5 pyetje rreth filmave dhe serialeve të njohura. Përgjigjet më të sakta fiton telekomandën — barazimet i zgjidh fati.", de: "Alle beantworten dieselben 5 Fragen zu bekannten Filmen und Serien. Die meisten richtigen Antworten gewinnen die Fernbedienung — bei Gleichstand entscheidet das Schicksal." },
  trivia_pass_sub: { en: "Five questions coming up. No googling.", sq: "Pesë pyetje po vijnë. Pa googlim.", de: "Fünf Fragen kommen. Kein Googeln." },
  trivia_who_playing: { en: "Who's playing?", sq: "Kush po luan?", de: "Wer spielt mit?" },
  trivia_solo_hint: { en: "Flying solo? Just hit start — you'll quiz yourself.", sq: "Je vetëm? Thjesht fillo — do testosh veten.", de: "Allein unterwegs? Einfach starten — du testest dich selbst." }
};

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const entry = STATIC_I18N[key];
    if (entry && entry[LANG]) el.innerHTML = entry[LANG];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const entry = STATIC_I18N[key];
    if (entry && entry[LANG]) el.setAttribute("placeholder", entry[LANG]);
  });
}
applyStaticTranslations();

const UI_TXT = {
  loading: { en: "Loading...", sq: "Duke u ngarkuar...", de: "Lädt..." },
  no_streaming: { en: "No streaming info for {region}. Try switching region in the footer.", sq: "Pa info streaming për {region}. Provo të ndryshosh rajonin në footer.", de: "Keine Streaming-Infos für {region}. Region unten im Footer wechseln." },
  load_failed_title: { en: "Couldn't load details", sq: "S'u ngarkuan detajet", de: "Details konnten nicht geladen werden" },
  load_failed_body: { en: "Something went wrong fetching this title. Try again.", sq: "Diçka shkoi keq gjatë marrjes së këtij titulli. Provo përsëri.", de: "Beim Laden dieses Titels ist etwas schiefgelaufen. Versuch es erneut." },
  imposter_player_label: { en: "Player", sq: "Lojtari", de: "Spieler" },
  imposter_you_are: { en: "YOU'RE THE IMPOSTER", sq: "TI JE IMPOSTORI", de: "DU BIST DER HOCHSTAPLER" },
  imposter_hint_label: { en: "Hint", sq: "Ndihmë", de: "Hinweis" },
  imposter_was: { en: "THE IMPOSTER WAS", sq: "IMPOSTORI ISHTE", de: "DER HOCHSTAPLER WAR" },
  tile_swipe_title: { en: "SWIPE TOGETHER", sq: "FËRKONI SË BASHKU", de: "GEMEINSAM SWIPEN" },
  tile_swipe_title_solo: { en: "SWIPE", sq: "FËRKO", de: "SWIPEN" },
  hl_streak: { en: "STREAK", sq: "SERIA", de: "SERIE" },
  hl_gameover: { en: "GAME OVER", sq: "LOJA MBAROI", de: "SPIEL VORBEI" },
  hl_best: { en: "Best", sq: "Rekordi", de: "Bestwert" },
  trivia_player_label: { en: "Player", sq: "Lojtari", de: "Spieler" },
  trivia_winner_eyebrow: { en: "🏆 TRIVIA CHAMPION —", sq: "🏆 KAMPIONI I NJOHURIVE —", de: "🏆 TRIVIA-SIEGER —" },
  trivia_tie_note: { en: "Tied — fate broke it.", sq: "Barazim — fati vendosi.", de: "Unentschieden — das Schicksal entschied." },
  trivia_score_of: { en: "of 5 correct", sq: "nga 5 saktë", de: "von 5 richtig" }
};
function tt(key, vars) {
  const entry = UI_TXT[key] || STATIC_I18N[key];
  let str = (entry && (entry[LANG] || entry.en)) || key;
  if (vars) Object.keys(vars).forEach((k) => { str = str.replace(`{${k}}`, vars[k]); });
  return str;
}

const TMDB_LANG_MAP = { en: "en-US", sq: "sq-AL", de: "de-DE" };
const TMDB_LANG = TMDB_LANG_MAP[LANG] || "en-US";

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
const MOODS_BY_LANG = {
  en: [
    { label: "Brain Off", sub: "no thinking required" },
    { label: "Need To Cry", sub: "full emotional damage" },
    { label: "Feel Good", sub: "low stakes, high comfort" },
    { label: "Scared Tonight", sub: "sleep with the lights on" },
    { label: "Date Night", sub: "something to hold hands to" },
    { label: "Mind Bender", sub: "twists, loops, questions after" },
    { label: "Just Surprise Me", sub: "fully random, no filter" }
  ],
  sq: [
    { label: "Truri Fikur", sub: "s'kërkohet mendim" },
    { label: "Dua Të Qaj", sub: "dëm emocional total" },
    { label: "Ndjenja E Mirë", sub: "pa stres, komode" },
    { label: "Trishtë Sonte", sub: "fli me dritat ndezur" },
    { label: "Darkë Romantike", sub: "diçka për t'u mbajtur dorë" },
    { label: "Truri Në Lak", sub: "kthesa, sy hapur pas" },
    { label: "Më Befaso", sub: "krejt rastësisht, pa filtër" }
  ],
  de: [
    { label: "Gehirn Aus", sub: "kein Nachdenken nötig" },
    { label: "Muss Weinen", sub: "volle emotionale Wucht" },
    { label: "Wohlfühlkino", sub: "wenig Risiko, viel Komfort" },
    { label: "Heute Gruseln", sub: "Licht an lassen zum Schlafen" },
    { label: "Date Night", sub: "etwas zum Händchenhalten" },
    { label: "Kopfkino", sub: "Wendungen, Fragen danach" },
    { label: "Überrasch Mich", sub: "komplett zufällig, kein Filter" }
  ]
};
const MOOD_GENRES = [
  { movieGenres: [28, 12], tvGenres: [10759] },
  { movieGenres: [18], tvGenres: [18] },
  { movieGenres: [35, 10751], tvGenres: [35, 10751] },
  { movieGenres: [27], tvGenres: [9648] },
  { movieGenres: [10749], tvGenres: [10766] },
  { movieGenres: [878, 9648], tvGenres: [9648, 10765] },
  { movieGenres: null, tvGenres: null }
];
const MOODS = (MOODS_BY_LANG[LANG] || MOODS_BY_LANG.en).map((m, i) => ({ ...m, ...MOOD_GENRES[i] }));

// ============================================
// GENRES (movie genre IDs from TMDB)
// ============================================
const GENRE_NAMES_BY_LANG = {
  en: ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Sci-Fi","Thriller","War","Western"],
  sq: ["Aksion","Aventurë","Animacion","Komedi","Krim","Dokumentar","Dramë","Familje","Fantazi","Histori","Horror","Muzikë","Mister","Romancë","Sci-Fi","Thriller","Luftë","Western"],
  de: ["Action","Abenteuer","Animation","Komödie","Krimi","Dokumentation","Drama","Familie","Fantasy","Historie","Horror","Musik","Mystery","Liebesfilm","Sci-Fi","Thriller","Krieg","Western"]
};
const GENRE_IDS = [28,12,16,35,80,99,18,10751,14,36,27,10402,9648,10749,878,53,10752,37];
const GENRES = GENRE_IDS.map((id, i) => ({ id, name: (GENRE_NAMES_BY_LANG[LANG] || GENRE_NAMES_BY_LANG.en)[i] }));

// ============================================
// COLLECTIONS
// ============================================
const COLLECTIONS_META = [
  { id: "ruined-me", ids: [12477, 334533, 641, 497, 39451, 395992],
    en: { label: "Ruined me for a week", intro: "Don't say I didn't warn you. Have tissues, ice cream, and a hug on standby." },
    sq: { label: "Më prishi javën", intro: "Mos thuaj s'të paralajmërova. Ki shami, akullore, dhe një përqafim gati." },
    de: { label: "Hat mich eine Woche fertiggemacht", intro: "Sag nicht, ich hätte dich nicht gewarnt. Taschentücher, Eis und eine Umarmung bereithalten." } },
  { id: "hangover", ids: [1584, 346648, 120467, 11259, 207932, 9377],
    en: { label: "Sunday hangover watches", intro: "Low effort, high comfort. Nothing here will make you think hard." },
    sq: { label: "Për mëngjes të diel", intro: "Pak mund, shumë komoditet. Këtu s'ka gjë që të bën të mendosh shumë." },
    de: { label: "Sonntags-Kater-Filme", intro: "Wenig Aufwand, viel Komfort. Hier musst du nicht viel nachdenken." } },
  { id: "foreign", ids: [496243, 194, 670, 129, 598, 1417],
    en: { label: "Worth the subtitles", intro: "Read a little, get a lot. Non-English films that hit different." },
    sq: { label: "Ia vlen titrat", intro: "Lexo pak, merr shumë. Filma jo-anglisht që të prekin ndryshe." },
    de: { label: "Untertitel lohnen sich", intro: "Ein bisschen lesen, viel bekommen. Nicht-englische Filme, die anders treffen." } },
  { id: "rewatch", ids: [550, 329865, 1124, 77, 157336, 244786],
    en: { label: "Hits harder the second time", intro: "You watched it once. Watch it again. Different movie now, trust me." },
    sq: { label: "Godet më fort herën e dytë", intro: "E ke parë një herë. Shikoje përsëri. Është film tjetër tani, më beso." },
    de: { label: "Trifft beim zweiten Mal härter", intro: "Du hast ihn einmal gesehen. Schau ihn nochmal. Es ist jetzt ein anderer Film, glaub mir." } },
  { id: "short-sharp", ids: [862, 10386, 137, 4147, 9603, 76],
    en: { label: "Short and sharp", intro: "Under two hours, still wrecks you. For when you've got a bedtime." },
    sq: { label: "Shkurtër dhe i mprehtë", intro: "Nën dy orë, prapë të shkatërron. Për kur ke orar gjumi." },
    de: { label: "Kurz und knackig", intro: "Unter zwei Stunden, macht dich trotzdem fertig. Für wenn du eine Schlafenszeit hast." } }
];
const COLLECTIONS = COLLECTIONS_META.map((c) => ({
  id: c.id,
  ids: c.ids,
  label: (c[LANG] || c.en).label,
  intro: (c[LANG] || c.en).intro
}));

// ============================================
// TOAST POPUP
// ============================================
const TOAST_MESSAGES_BY_LANG = {
  en: {
    search: ["Consulting the projection room...","Digging through the vault 🎞","Waking the film critic up...","The intern is on it...","Rewinding VHS tapes...","Asking the ushers..."],
    spin: ["The reel is turning...","Fate is loading...","Cosmic movie forces at work..."],
    fetch: ["Grabbing the reel...","Rolling the credits back...","Popping fresh popcorn 🍿"]
  },
  sq: {
    search: ["Duke pyetur sallën e projeksionit...","Duke kërkuar në arkiv 🎞","Duke zgjuar kritikun...","Praktikanti po punon...","Duke rikthyer kasetat VHS...","Duke pyetur biletaristët..."],
    spin: ["Rrota po kthehet...","Fati po ngarkohet...","Forcat kozmike të filmit në punë..."],
    fetch: ["Duke marrë filmin...","Duke rikthyer titrat...","Duke bërë kokoshka të freskëta 🍿"]
  },
  de: {
    search: ["Im Vorführraum nachfragen...","Im Archiv wühlen 🎞","Den Filmkritiker wecken...","Der Praktikant kümmert sich...","VHS-Kassetten zurückspulen...","Die Platzanweiser fragen..."],
    spin: ["Die Rolle dreht sich...","Das Schicksal lädt...","Kosmische Filmkräfte am Werk..."],
    fetch: ["Die Filmrolle holen...","Den Abspann zurückspulen...","Frisches Popcorn machen 🍿"]
  }
};
const TOAST_MESSAGES = TOAST_MESSAGES_BY_LANG[LANG] || TOAST_MESSAGES_BY_LANG.en;

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
    const res = await fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&page=1`);
    if (!res.ok) return;
    const data = await res.json();
    const shuffled = data.results.sort(() => 0.5 - Math.random()).slice(0, 10);

    const withBackdrop = shuffled.find((m) => m.backdrop_path);
    if (withBackdrop) {
      el.style.backgroundImage = `url(${BACKDROP_BASE}${withBackdrop.backdrop_path})`;
      el.classList.add("loaded");
    }

    for (const movie of shuffled) {
      const vidRes = await fetch(`${TMDB_BASE}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}`);
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
    const res = await fetch(`${TMDB_BASE}/trending/${currentType}/week?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}`);
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

async function findThemeMatches(query) {
  const words = query.split(/\s+/).map((w) => w.trim()).filter((w) => w.length > 2);
  const searchTerms = Array.from(new Set([query, ...words])).slice(0, 6);

  const kwResults = await Promise.all(
    searchTerms.map((term) =>
      fetch(`${TMDB_BASE}/search/keyword?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(term)}`)
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .catch(() => ({ results: [] }))
    )
  );

  const seen = new Set();
  const keywordIds = [];
  const keywordNames = {};
  kwResults.forEach((res) => {
    (res.results || []).slice(0, 5).forEach((k) => {
      if (!seen.has(k.id)) {
        seen.add(k.id);
        keywordIds.push(k.id);
        keywordNames[k.id] = k.name;
      }
    });
  });

  if (!keywordIds.length) return { themes: [], matchedKeyword: null };

  async function tryDiscover(idsStr) {
    const res = await fetch(
      `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&with_keywords=${idsStr}&sort_by=popularity.desc&vote_count.gte=20`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  }

  // Try the broadest combined match first (OR across the top keyword hits)
  const topIds = keywordIds.slice(0, 8);
  let results = await tryDiscover(topIds.join("|"));
  let matchedKeyword = results.length ? topIds.map((id) => keywordNames[id]).join(", ") : null;

  // Fall back to trying each keyword individually
  if (!results.length) {
    for (const id of keywordIds.slice(0, 6)) {
      const r = await tryDiscover(String(id));
      if (r.length) {
        results = r;
        matchedKeyword = keywordNames[id];
        break;
      }
    }
  }

  return { themes: results.slice(0, 12).map((m) => ({ ...m, __theme: matchedKeyword })), matchedKeyword };
}

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
    const [multiRes, themeMatch] = await Promise.all([
      fetch(`${TMDB_BASE}/search/multi?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&query=${encodeURIComponent(query)}&include_adult=false`),
      findThemeMatches(query)
    ]);
    const multi = multiRes.ok ? await multiRes.json() : { results: [] };
    const { themes } = themeMatch;

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
    const res = await fetch(`${TMDB_BASE}/person/${personId}/combined_credits?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}`);
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
          `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&with_genres=${g.id}&sort_by=popularity.desc&vote_count.gte=500&page=1`
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
        fetch(`${TMDB_BASE}/movie/${id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}`)
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
      language: TMDB_LANG,
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
      `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&query=${encodeURIComponent(q)}&include_adult=false`
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
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&page=1`).then((r) => r.json()),
      fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&page=2`).then((r) => r.json())
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
        fetch(`${TMDB_BASE}/movie/${p.id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}`)
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
// LANGUAGE SWITCHER
// ============================================
const langSelect = document.getElementById("lang-select");
if (langSelect) {
  langSelect.value = LANG;
  langSelect.addEventListener("change", (e) => {
    localStorage.setItem("jps_lang", e.target.value);
    location.reload();
  });
}
document.querySelectorAll(".lang-btn").forEach((btn) => {
  if (btn.dataset.lang === LANG) btn.classList.add("active");
  else btn.classList.remove("active");
  btn.addEventListener("click", () => {
    localStorage.setItem("jps_lang", btn.dataset.lang);
    location.reload();
  });
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

  titleEl.textContent = tt("loading");
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
      `${TMDB_BASE}/${type}/${id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&append_to_response=videos,credits,watch/providers`
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
      providersEl.innerHTML = `<p class="no-providers">${tt("no_streaming", { region: currentRegion })}</p>`;
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
    titleEl.textContent = tt("load_failed_title");
    overviewEl.textContent = tt("load_failed_body");
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
  updateGroupSwipeLabel();
}

function updateGroupSwipeLabel() {
  const titleEl = document.getElementById("group-swipe-title");
  if (!titleEl) return;
  titleEl.textContent = players.length >= 2 ? tt("tile_swipe_title") : tt("tile_swipe_title_solo");
}

const WINNER_LINES_BY_LANG = {
  en: [
    "No take-backs. The remote is yours.",
    "With great power comes great responsibility.",
    "Everyone else: no complaining allowed.",
    "Choose wisely. The group is watching.",
    "Democracy has spoken. Sort of."
  ],
  sq: [
    "Pa u kthyer prapa. Telekomanda është jotja.",
    "Me pushtet të madh vjen përgjegjësi e madhe.",
    "Të tjerët: ndalohet ankimi.",
    "Zgjidh me kujdes. Grupi po shikon.",
    "Demokracia foli. Diçka e tillë."
  ],
  de: [
    "Kein Zurück mehr. Die Fernbedienung gehört dir.",
    "Mit großer Macht kommt große Verantwortung.",
    "Alle anderen: Meckern verboten.",
    "Wähl weise. Die Gruppe schaut zu.",
    "Die Demokratie hat gesprochen. So ungefähr."
  ]
};
const WINNER_LINES = WINNER_LINES_BY_LANG[LANG] || WINNER_LINES_BY_LANG.en;

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
const groupGenrePane = document.getElementById("group-genre-pane");
const groupPassPane = document.getElementById("group-pass-pane");
const groupDeckPane = document.getElementById("group-deck-pane");
const groupRevealPane = document.getElementById("group-reveal-pane");
const groupPassName = document.getElementById("group-pass-name");
const groupDeckStack = document.getElementById("group-deck-stack");
const groupDeckPlayer = document.getElementById("group-deck-player");
const groupDeckProgress = document.getElementById("group-deck-progress");
const groupRevealInner = document.getElementById("group-reveal-inner");
const groupGenreGrid = document.getElementById("group-genre-grid");

const GROUP_GENRES_BY_LANG = {
  en: ["SURPRISE ME","ACTION","COMEDY","HORROR","ROMANCE","SCI-FI","THRILLER","ANIMATION","DRAMA"],
  sq: ["MË BEFASO","AKSION","KOMEDI","HORROR","ROMANCË","SCI-FI","THRILLER","ANIMACION","DRAMË"],
  de: ["ÜBERRASCH MICH","ACTION","KOMÖDIE","HORROR","LIEBESFILM","SCI-FI","THRILLER","ANIMATION","DRAMA"]
};
const GROUP_GENRE_IDS = [null, 28, 35, 27, 10749, 878, 53, 16, 18];
const GROUP_GENRES = GROUP_GENRE_IDS.map((id, i) => ({ id, label: (GROUP_GENRES_BY_LANG[LANG] || GROUP_GENRES_BY_LANG.en)[i] }));

const groupSwipe = {
  deck: [],
  playerIndex: 0,
  cardIndex: 0,
  genreId: null,
  likes: {}, // { playerName: Set of movie ids }
  sessionPlayers: []
};

renderGroupGenreChips();

function renderGroupGenreChips() {
  groupGenreGrid.innerHTML = "";
  GROUP_GENRES.forEach((g) => {
    const chip = document.createElement("button");
    chip.className = "group-genre-chip";
    if (g.id === groupSwipe.genreId) chip.classList.add("active");
    chip.textContent = g.label;
    chip.addEventListener("click", () => {
      groupSwipe.genreId = g.id;
      launchGroupDeckLoad();
    });
    groupGenreGrid.appendChild(chip);
  });
}

groupSwipeBtn.addEventListener("click", () => {
  groupSwipe.sessionPlayers = players.length ? players.slice() : ["You"];
  groupSection.hidden = false;
  groupGenrePane.hidden = false;
  groupPassPane.hidden = true;
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = true;
  renderGroupGenreChips();
  groupSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("group-cancel-btn-genre").addEventListener("click", cancelGroupSwipe);
document.getElementById("group-cancel-btn-pass").addEventListener("click", cancelGroupSwipe);
document.getElementById("group-cancel-btn-deck").addEventListener("click", cancelGroupSwipe);
document.getElementById("group-restart-btn").addEventListener("click", () => {
  groupRevealPane.hidden = true;
  groupSection.hidden = true;
  playerChips.scrollIntoView({ behavior: "smooth" });
});

async function launchGroupDeckLoad() {
  groupSwipe.playerIndex = 0;
  groupSwipe.cardIndex = 0;
  groupSwipe.likes = {};
  groupSwipe.sessionPlayers.forEach((p) => { groupSwipe.likes[p] = new Set(); });

  groupGenreGrid.querySelectorAll(".group-genre-chip").forEach((c) => c.disabled = true);
  toast("fetch", "Building the deck...");

  try {
    const endpoint = groupSwipe.genreId
      ? `${TMDB_BASE}/discover/movie`
      : `${TMDB_BASE}/movie/popular`;
    const paramsA = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: TMDB_LANG,
      page: String(Math.floor(Math.random() * 4) + 1)
    });
    const paramsB = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: TMDB_LANG,
      page: String(Math.floor(Math.random() * 4) + 1)
    });
    if (groupSwipe.genreId) {
      paramsA.append("with_genres", groupSwipe.genreId);
      paramsB.append("with_genres", groupSwipe.genreId);
      paramsA.append("sort_by", "popularity.desc");
      paramsB.append("sort_by", "popularity.desc");
      paramsA.append("vote_count.gte", "50");
      paramsB.append("vote_count.gte", "50");
    }

    const [p1, p2] = await Promise.all([
      fetch(`${endpoint}?${paramsA.toString()}`).then((r) => r.json()),
      fetch(`${endpoint}?${paramsB.toString()}`).then((r) => r.json())
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
    groupGenreGrid.querySelectorAll(".group-genre-chip").forEach((c) => c.disabled = false);
    return;
  }

  groupGenreGrid.querySelectorAll(".group-genre-chip").forEach((c) => c.disabled = false);

  groupGenrePane.hidden = true;
  groupPassPane.hidden = false;
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = true;

  if (groupSwipe.sessionPlayers.length < 2) {
    startDeckForCurrentPlayer();
  } else {
    showPassScreen();
  }
}

function cancelGroupSwipe() {
  groupSection.hidden = true;
}

function showPassScreen() {
  const name = groupSwipe.sessionPlayers[groupSwipe.playerIndex];
  groupPassName.textContent = name;
  document.getElementById("group-pass-sub").textContent =
    groupSwipe.playerIndex === 0
      ? "Swipe right on anything you'd watch. Left on anything you wouldn't."
      : "Your turn. Swipe right on anything you'd watch, left on anything you wouldn't.";
  groupGenrePane.hidden = true;
  groupPassPane.hidden = false;
  groupDeckPane.hidden = true;
  groupRevealPane.hidden = true;
}

function startDeckForCurrentPlayer() {
  groupSwipe.cardIndex = 0;
  groupGenrePane.hidden = true;
  groupPassPane.hidden = true;
  groupDeckPane.hidden = false;
  groupRevealPane.hidden = true;
  groupDeckPlayer.textContent = groupSwipe.sessionPlayers[groupSwipe.playerIndex];
  renderGroupDeck();
}

document.getElementById("group-ready-btn").addEventListener("click", startDeckForCurrentPlayer);

function renderGroupDeck() {
  groupDeckStack.innerHTML = "";
  groupDeckProgress.textContent = `${Math.min(groupSwipe.cardIndex + 1, groupSwipe.deck.length)} / ${groupSwipe.deck.length}`;

  if (groupSwipe.cardIndex >= groupSwipe.deck.length) {
    // this player is done
    if (groupSwipe.playerIndex < groupSwipe.sessionPlayers.length - 1) {
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
    const overview = movie.overview
      ? movie.overview.slice(0, 150) + (movie.overview.length > 150 ? "..." : "")
      : "No synopsis available.";
    card.innerHTML = `
      <span class="group-stamp like" id="group-stamp-like">LIKE</span>
      <span class="group-stamp nope" id="group-stamp-nope">NOPE</span>
      <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}">
      <div class="group-card-info">
        <div class="group-card-title">${movie.title}</div>
        <div class="group-card-meta">${[year, rating].filter(Boolean).join(" · ")}</div>
        <p class="group-card-overview">${overview}</p>
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
  const player = groupSwipe.sessionPlayers[groupSwipe.playerIndex];
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
  groupSwipe.sessionPlayers.forEach((p) => {
    groupSwipe.likes[p].forEach((id) => { tally[id] = (tally[id] || 0) + 1; });
  });

  const idsByVotes = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const totalPlayers = groupSwipe.sessionPlayers.length;
  const unanimous = idsByVotes.filter(([, count]) => count === totalPlayers);
  const best = unanimous.length ? unanimous : idsByVotes.filter(([, count]) => count === idsByVotes[0]?.[1]);

  if (!idsByVotes.length || !best.length) {
    groupRevealInner.innerHTML = `
      <div class="group-no-match">
        ${totalPlayers > 1 ? "Nobody liked anything the same. Truly a house divided. 😅" : "Nothing hit tonight — happens to the best of us. 😅"}<br>
        Try again${totalPlayers > 1 ? `, or let "Who Picks Tonight" decide for you.` : "."}
      </div>
    `;
    return;
  }

  const [winningId, votes] = best[Math.floor(Math.random() * best.length)];
  const movie = groupSwipe.deck.find((m) => String(m.id) === String(winningId));
  const isUnanimous = votes === totalPlayers;

  groupRevealInner.innerHTML = `
    <p class="group-match-eyebrow">${isUnanimous ? (totalPlayers > 1 ? "🎉 UNANIMOUS MATCH" : "🎬 TONIGHT'S PICK") : "🎬 CLOSEST MATCH"}</p>
    <div class="group-match-card">
      <img src="${IMG_BASE}${movie.poster_path}" alt="${movie.title}">
      <div>
        <h3>${movie.title}</h3>
        <div class="group-match-tally">${totalPlayers > 1 ? `${votes} of ${totalPlayers} liked this` : "You liked this"}</div>
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
const TOUR_STEPS_BY_LANG = {
  en: [
    { title: "WELCOME 🎬", body: "Let me show you around. You've got 5 different ways to land on tonight's pick — takes 20 seconds.", target: null },
    { title: "FIND ANYTHING", body: "Movies, actors, or vibes. Try 'ww2' or 'tom hanks' or 'kid alone at christmas' — we'll figure it out.", target: "#search-section" },
    { title: "MOVIE BATTLES", body: "Random bracket for discovery, or DECIDE FOR ME where an algorithm scores movies you're stuck between.", target: "#battles-section" },
    { title: "WHEEL, MOOD, FEELING", body: "Spin for random. Pick a mood. Or just type how you feel. Three ways to land on tonight's pick.", target: "#mood-section" },
    { title: "WHO PICKS TONIGHT?", body: "Group can't agree? Add everyone's name. Let fate settle it, or swipe together and find what you all actually like. Watching solo? Just hit swipe.", target: "#whopicks-section" }
  ],
  sq: [
    { title: "MIRË SE VJEN 🎬", body: "Të tregoj ku çfarë është. Ke 5 mënyra të ndryshme për të zgjedhur pamjen e sonte — zgjat 20 sekonda.", target: null },
    { title: "GJEJ ÇDO GJË", body: "Filma, aktorë, ose vibe. Provo 'lufta e dytë botërore' ose 'tom hanks' — do ta gjejmë.", target: "#search-section" },
    { title: "BETEJAT E FILMAVE", body: "Bllok i rastësishëm për zbulim, ose VENDOS PËR MUA ku një algoritëm vlerëson filmat mes të cilëve je i pavendosur.", target: "#battles-section" },
    { title: "ROTA, GJENDJA, NDJENJA", body: "Rrotullo për rastësi. Zgjidh një gjendje. Ose thjesht shkruaj si ndihesh. Tre mënyra për të gjetur pamjen e sonte.", target: "#mood-section" },
    { title: "KUSH ZGJEDH SONTE?", body: "Grupi s'bie dakord? Shto emrat e të gjithëve. Lëre fatin të vendosë, ose fërkoni së bashku për të gjetur çfarë ju pëlqen të gjithëve. Po shikon vetëm? Thjesht fërko.", target: "#whopicks-section" }
  ],
  de: [
    { title: "WILLKOMMEN 🎬", body: "Lass mich dir alles zeigen. Du hast 5 verschiedene Wege zur heutigen Wahl — dauert 20 Sekunden.", target: null },
    { title: "FINDE ALLES", body: "Filme, Schauspieler oder Stimmungen. Probier 'zweiter weltkrieg' oder 'tom hanks' — wir finden es raus.", target: "#search-section" },
    { title: "FILM-DUELLE", body: "Zufälliges Bracket zum Entdecken, oder ENTSCHEIDE FÜR MICH, wo ein Algorithmus Filme bewertet, zwischen denen du dich nicht entscheiden kannst.", target: "#battles-section" },
    { title: "RAD, STIMMUNG, GEFÜHL", body: "Dreh das Rad für Zufall. Wähl eine Stimmung. Oder schreib einfach, wie du dich fühlst. Drei Wege zur heutigen Wahl.", target: "#mood-section" },
    { title: "WER ENTSCHEIDET HEUTE?", body: "Die Gruppe einigt sich nicht? Namen hinzufügen. Das Schicksal entscheiden lassen, oder gemeinsam swipen und finden, was allen gefällt. Allein unterwegs? Einfach swipen.", target: "#whopicks-section" }
  ]
};
const TOUR_STEPS = TOUR_STEPS_BY_LANG[LANG] || TOUR_STEPS_BY_LANG.en;

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

// ============================================
// IMPOSTER GAME
// ============================================
const imposterSection = document.getElementById("imposter-section");
const imposterPlayBtn = document.getElementById("imposter-play-btn");
const imposterGameSection = document.getElementById("imposter-game-section");

const imposterSetupPane = document.getElementById("imposter-setup-pane");
const imposterPassPane = document.getElementById("imposter-pass-pane");
const imposterTimerPane = document.getElementById("imposter-timer-pane");
const imposterRevealPane = document.getElementById("imposter-reveal-pane");

const imposterCountMinus = document.getElementById("imposter-count-minus");
const imposterCountPlus = document.getElementById("imposter-count-plus");
const imposterCountDisplay = document.getElementById("imposter-count-display");
const imposterTimerToggle = document.getElementById("imposter-timer-toggle");
const imposterStartBtn = document.getElementById("imposter-start-btn");

const imposterPassName = document.getElementById("imposter-pass-name");
const imposterCardBack = document.getElementById("imposter-card-back");
const imposterCardCover = document.getElementById("imposter-card-cover");
const imposterNextBtn = document.getElementById("imposter-next-btn");

const imposterTimerDisplay = document.getElementById("imposter-timer-display");
const imposterPauseBtn = document.getElementById("imposter-pause-btn");
const imposterRevealBtn = document.getElementById("imposter-reveal-btn");
const imposterRevealInner = document.getElementById("imposter-reveal-inner");
const imposterPlayAgainBtn = document.getElementById("imposter-play-again-btn");

const imposterGame = {
  count: 4,
  timerSeconds: 180,
  remaining: 180,
  timerInterval: null,
  paused: false,
  imposterIndex: 0,
  currentIndex: 0,
  movie: null
};

function imposterHideAllPanes() {
  imposterSetupPane.hidden = true;
  imposterPassPane.hidden = true;
  imposterTimerPane.hidden = true;
  imposterRevealPane.hidden = true;
}

function imposterResetToSetup() {
  clearInterval(imposterGame.timerInterval);
  imposterGameSection.hidden = true;
  imposterHideAllPanes();
  imposterSetupPane.hidden = false;
}

imposterPlayBtn.addEventListener("click", () => {
  imposterGameSection.hidden = false;
  imposterHideAllPanes();
  imposterSetupPane.hidden = false;
  imposterGameSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

imposterCountMinus.addEventListener("click", () => {
  if (imposterGame.count > 3) {
    imposterGame.count--;
    imposterCountDisplay.textContent = imposterGame.count;
  }
});
imposterCountPlus.addEventListener("click", () => {
  if (imposterGame.count < 10) {
    imposterGame.count++;
    imposterCountDisplay.textContent = imposterGame.count;
  }
});

imposterTimerToggle.querySelectorAll(".time-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    imposterTimerToggle.querySelectorAll(".time-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    imposterGame.timerSeconds = parseInt(btn.dataset.timer, 10);
  });
});

document.getElementById("imposter-cancel-setup").addEventListener("click", imposterResetToSetup);
document.getElementById("imposter-cancel-pass").addEventListener("click", imposterResetToSetup);
document.getElementById("imposter-cancel-timer").addEventListener("click", imposterResetToSetup);

let imposterMoviePool = [];

async function fetchMostWatchedPool() {
  if (imposterMoviePool.length) return imposterMoviePool;
  const pages = await Promise.all(
    [1, 2].map((page) =>
      fetch(`${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&sort_by=vote_count.desc&page=${page}`)
        .then((r) => r.json())
        .catch(() => ({ results: [] }))
    )
  );
  const combined = pages.flatMap((d) => d.results || []);
  imposterMoviePool = combined.filter((m) => m.poster_path && m.title);
  return imposterMoviePool;
}

async function startImposterGame() {
  imposterStartBtn.disabled = true;
  toast("fetch");
  try {
    const candidates = await fetchMostWatchedPool();
    if (!candidates.length) throw new Error("no candidates");
    imposterGame.movie = candidates[Math.floor(Math.random() * candidates.length)];
  } catch (e) {
    toast("fetch", tt("load_failed_body"));
    imposterStartBtn.disabled = false;
    return;
  }

  imposterGame.imposterIndex = Math.floor(Math.random() * imposterGame.count);
  imposterGame.currentIndex = 0;
  imposterStartBtn.disabled = false;
  showImposterPassScreen();
}
imposterStartBtn.addEventListener("click", startImposterGame);

function showImposterPassScreen() {
  imposterHideAllPanes();
  imposterPassPane.hidden = false;
  imposterCardCover.style.transition = "";
  imposterCardCover.style.transform = "";
  imposterCardCover.style.opacity = "";
  imposterCardCover.hidden = false;
  imposterNextBtn.hidden = true;
  imposterPassName.textContent = `${tt("imposter_player_label")} ${imposterGame.currentIndex + 1}`;

  const m = imposterGame.movie;
  const isImposter = imposterGame.currentIndex === imposterGame.imposterIndex;

  if (isImposter) {
    const genreName = (GENRES.find((g) => g.id === (m.genre_ids || [])[0]) || {}).name || "—";
    const year = (m.release_date || "").slice(0, 4) || "—";
    imposterCardBack.innerHTML = `
      <span class="imposter-card-icon">🕵️</span>
      <strong>${tt("imposter_you_are")}</strong>
      <p class="imposter-hint">${tt("imposter_hint_label")}: ${genreName} · ${year}</p>
    `;
  } else {
    imposterCardBack.innerHTML = `
      <img src="${IMG_BASE_SM}${m.poster_path}" alt="">
      <strong>${m.title}</strong>
    `;
  }
}

// ============================================
// SWIPE-UP TO REVEAL — drag gesture on imposter card
// ============================================
(function attachImposterSwipe() {
  const cover = imposterCardCover;
  const threshold = 90;
  let dragging = false;
  let moved = false;
  let startX = 0, startY = 0, dy = 0;

  function pointFromEvent(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function onDown(e) {
    if (cover.hidden) return;
    dragging = true;
    moved = false;
    dy = 0;
    const p = pointFromEvent(e);
    startX = p.x;
    startY = p.y;
    cover.classList.add("dragging");
  }

  function onMove(e) {
    if (!dragging) return;
    const p = pointFromEvent(e);
    const dx = p.x - startX;
    dy = p.y - startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true;
    if (!moved) return;

    // Only hijack once it's clearly an upward gesture — otherwise let the page scroll
    if (dy > 0 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
    if (e.cancelable) e.preventDefault();

    cover.style.transform = `translateY(${dy}px)`;
    cover.style.opacity = String(Math.max(0, 1 - Math.abs(dy) / (threshold * 2.2)));
  }

  function revealCard() {
    cover.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    cover.style.transform = "translateY(-360px)";
    cover.style.opacity = "0";
    imposterNextBtn.hidden = false;
    setTimeout(() => { cover.hidden = true; }, 300);
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    cover.classList.remove("dragging");

    if (Math.abs(dy) > threshold || !moved) {
      revealCard();
      return;
    }

    cover.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    cover.style.transform = "";
    cover.style.opacity = "";
    setTimeout(() => { cover.style.transition = ""; }, 300);
  }

  cover.addEventListener("mousedown", onDown);
  cover.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);
})();

imposterNextBtn.addEventListener("click", () => {
  imposterGame.currentIndex++;
  if (imposterGame.currentIndex >= imposterGame.count) {
    startImposterDiscussion();
  } else {
    showImposterPassScreen();
  }
});

function imposterUpdateTimerDisplay() {
  const m = Math.floor(imposterGame.remaining / 60);
  const s = imposterGame.remaining % 60;
  imposterTimerDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function imposterTick() {
  imposterGame.remaining--;
  imposterUpdateTimerDisplay();
  if (imposterGame.remaining <= 0) {
    clearInterval(imposterGame.timerInterval);
    revealImposter();
  }
}

function startImposterDiscussion() {
  imposterHideAllPanes();
  imposterTimerPane.hidden = false;
  imposterGame.paused = false;

  if (imposterGame.timerSeconds > 0) {
    imposterGame.remaining = imposterGame.timerSeconds;
    imposterUpdateTimerDisplay();
    imposterPauseBtn.hidden = false;
    imposterPauseBtn.textContent = tt("imposter_pause");
    clearInterval(imposterGame.timerInterval);
    imposterGame.timerInterval = setInterval(imposterTick, 1000);
  } else {
    imposterTimerDisplay.textContent = "∞";
    imposterPauseBtn.hidden = true;
  }
}

imposterPauseBtn.addEventListener("click", () => {
  imposterGame.paused = !imposterGame.paused;
  if (imposterGame.paused) {
    clearInterval(imposterGame.timerInterval);
    imposterPauseBtn.textContent = tt("imposter_resume");
  } else {
    imposterPauseBtn.textContent = tt("imposter_pause");
    imposterGame.timerInterval = setInterval(imposterTick, 1000);
  }
});

imposterRevealBtn.addEventListener("click", revealImposter);

function revealImposter() {
  clearInterval(imposterGame.timerInterval);
  imposterHideAllPanes();
  imposterRevealPane.hidden = false;
  const m = imposterGame.movie;
  imposterRevealInner.innerHTML = `
    <p class="group-match-eyebrow">🕵️ ${tt("imposter_was")}</p>
    <div class="group-match-card">
      <img src="${IMG_BASE}${m.poster_path}" alt="${m.title}">
      <div>
        <h3>${m.title}</h3>
        <div class="group-match-tally">${tt("imposter_player_label")} ${imposterGame.imposterIndex + 1}</div>
      </div>
    </div>
  `;
}

imposterPlayAgainBtn.addEventListener("click", () => {
  imposterHideAllPanes();
  imposterSetupPane.hidden = false;
});

// ============================================
// HIGHER OR LOWER GAME
// ============================================
const higherlowerPlayBtn = document.getElementById("higherlower-play-btn");
const hlGameSection = document.getElementById("higherlower-game-section");
const hlSetupPane = document.getElementById("hl-setup-pane");
const hlPlayPane = document.getElementById("hl-play-pane");
const hlGameoverPane = document.getElementById("hl-gameover-pane");
const hlCategoryToggle = document.getElementById("hl-category-toggle");
const hlStartBtn = document.getElementById("hl-start-btn");
const hlScoreEl = document.getElementById("hl-score");
const hlCurrentCard = document.getElementById("hl-current-card");
const hlNextCard = document.getElementById("hl-next-card");
const hlHigherBtn = document.getElementById("hl-higher-btn");
const hlLowerBtn = document.getElementById("hl-lower-btn");
const hlGameoverInner = document.getElementById("hl-gameover-inner");
const hlPlayAgainBtn = document.getElementById("hl-play-again-btn");

const hlGame = {
  category: "vote_average",
  pool: [],
  poolIndex: 0,
  current: null,
  next: null,
  streak: 0,
  best: parseInt(localStorage.getItem("jps_hl_best") || "0", 10)
};

function hlHideAllPanes() {
  hlSetupPane.hidden = true;
  hlPlayPane.hidden = true;
  hlGameoverPane.hidden = true;
}

function hlResetToSetup() {
  hlGameSection.hidden = true;
  hlHideAllPanes();
  hlSetupPane.hidden = false;
}

higherlowerPlayBtn.addEventListener("click", () => {
  hlGameSection.hidden = false;
  hlHideAllPanes();
  hlSetupPane.hidden = false;
  hlGameSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

hlCategoryToggle.querySelectorAll(".time-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    hlCategoryToggle.querySelectorAll(".time-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    hlGame.category = btn.dataset.category;
  });
});

document.getElementById("hl-cancel-setup").addEventListener("click", hlResetToSetup);
document.getElementById("hl-cancel-play").addEventListener("click", hlResetToSetup);

function hlStatValue(m, category) {
  if (category === "vote_average") return m.vote_average || 0;
  if (category === "popularity") return m.popularity || 0;
  if (category === "year") return parseInt((m.release_date || "0").slice(0, 4), 10) || 0;
  return 0;
}
function hlStatDisplay(m, category) {
  if (category === "vote_average") return (m.vote_average || 0).toFixed(1) + " / 10";
  if (category === "popularity") return Math.round(m.popularity || 0).toLocaleString();
  if (category === "year") return (m.release_date || "").slice(0, 4) || "—";
  return "—";
}
function hlStatLabelKey(category) {
  return { vote_average: "hl_cat_rating", popularity: "hl_cat_popularity", year: "hl_cat_year" }[category];
}

function hlRenderCard(el, movie, category, hideStat) {
  el.innerHTML = `
    <img src="${IMG_BASE_SM}${movie.poster_path}" alt="">
    <h3>${movie.title}</h3>
    <div class="hl-stat-label">${tt(hlStatLabelKey(category))}</div>
    <div class="hl-stat-value ${hideStat ? "mystery" : ""}">${hideStat ? "?" : hlStatDisplay(movie, category)}</div>
  `;
}

async function fetchHLPool() {
  const pages = await Promise.all(
    [1, 2, 3, 4].map((page) =>
      fetch(`${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=${TMDB_LANG}&sort_by=popularity.desc&vote_count.gte=200&page=${page}`)
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .catch(() => ({ results: [] }))
    )
  );
  const combined = pages.flatMap((d) => d.results || []).filter((m) => m.poster_path && m.title && m.vote_average);
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined;
}

function updateHLScore() {
  hlScoreEl.textContent = `${tt("hl_streak")}: ${hlGame.streak}`;
}

function renderHLRound() {
  hlRenderCard(hlCurrentCard, hlGame.current, hlGame.category, false);
  hlRenderCard(hlNextCard, hlGame.next, hlGame.category, true);
  hlNextCard.classList.remove("correct", "wrong");
  hlHigherBtn.disabled = false;
  hlLowerBtn.disabled = false;
}

async function startHLGame() {
  hlStartBtn.disabled = true;
  toast("fetch");
  hlGame.pool = await fetchHLPool();
  hlStartBtn.disabled = false;
  if (hlGame.pool.length < 3) {
    toast("fetch", tt("load_failed_body"));
    return;
  }
  hlGame.poolIndex = 0;
  hlGame.streak = 0;
  hlGame.current = hlGame.pool[hlGame.poolIndex++];
  hlGame.next = hlGame.pool[hlGame.poolIndex++];
  hlHideAllPanes();
  hlPlayPane.hidden = false;
  updateHLScore();
  renderHLRound();
}
hlStartBtn.addEventListener("click", startHLGame);

function handleHLGuess(direction) {
  hlHigherBtn.disabled = true;
  hlLowerBtn.disabled = true;

  const curVal = hlStatValue(hlGame.current, hlGame.category);
  const nextVal = hlStatValue(hlGame.next, hlGame.category);
  const actual = nextVal === curVal ? "tie" : nextVal > curVal ? "higher" : "lower";
  const correct = actual === "tie" || actual === direction;

  hlRenderCard(hlNextCard, hlGame.next, hlGame.category, false);
  hlNextCard.classList.add(correct ? "correct" : "wrong");

  setTimeout(() => {
    if (correct) {
      hlGame.streak++;
      updateHLScore();
      hlGame.current = hlGame.next;
      if (hlGame.poolIndex >= hlGame.pool.length) hlGame.poolIndex = 0;
      hlGame.next = hlGame.pool[hlGame.poolIndex++];
      renderHLRound();
    } else {
      if (hlGame.streak > hlGame.best) {
        hlGame.best = hlGame.streak;
        localStorage.setItem("jps_hl_best", String(hlGame.best));
      }
      showHLGameOver();
    }
  }, 900);
}
hlHigherBtn.addEventListener("click", () => handleHLGuess("higher"));
hlLowerBtn.addEventListener("click", () => handleHLGuess("lower"));

function showHLGameOver() {
  hlHideAllPanes();
  hlGameoverPane.hidden = false;
  hlGameoverInner.innerHTML = `
    <p class="group-match-eyebrow">🎬 ${tt("hl_gameover")}</p>
    <div class="hl-final-score">
      <div class="hl-final-streak">${hlGame.streak}</div>
      <div class="hl-final-label">${tt("hl_streak")}</div>
      <div class="hl-final-best">${tt("hl_best")}: ${hlGame.best}</div>
    </div>
  `;
}

hlPlayAgainBtn.addEventListener("click", () => {
  hlHideAllPanes();
  hlSetupPane.hidden = false;
});

// ============================================
// TRIVIA SHOWDOWN
// ============================================
const TRIVIA_QUESTIONS_BY_LANG = {
  en: [
    { q: "In Friends, what fake name does Joey use with women to sound impressive?", options: ["Ken Adams", "Chandler Muriel Bing", "Bruce Willis", "Ross Geller"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "In Breaking Bad, what is Walter White's cover identity as a meth cook?", options: ["Heisenberg", "Scarface", "The Cook", "El Jefe"], correct: 0, media: { type: "tv", title: "Breaking Bad" } },
    { q: "What is the name of the coffee shop in Friends?", options: ["Central Perk", "The Grind", "Java Joe's", "Perk Ave"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "In The Office, what is the name of Dwight's beet farm?", options: ["Schrute Farms", "Beet Haven", "Dunder Acres", "Mifflin Farms"], correct: 0, media: { type: "tv", title: "The Office" } },
    { q: "Which house does Harry Potter get sorted into?", options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], correct: 0, media: { type: "movie", title: "Harry Potter and the Sorcerer's Stone" } },
    { q: "In Game of Thrones, what is the name of House Stark's home?", options: ["Winterfell", "Casterly Rock", "The Eyrie", "Dragonstone"], correct: 0, media: { type: "tv", title: "Game of Thrones" } },
    { q: "What object does Rose throw into the ocean at the end of Titanic?", options: ["The Heart of the Ocean necklace", "Jack's sketchbook", "Her engagement ring", "A photograph"], correct: 0, media: { type: "movie", title: "Titanic" } },
    { q: "In The Matrix, which pill does Neo take to learn the truth?", options: ["The red pill", "The blue pill", "The green pill", "Neither pill"], correct: 0, media: { type: "movie", title: "The Matrix" } },
    { q: "What is the name of the villain in The Lion King?", options: ["Scar", "Mufasa", "Zira", "Shenzi"], correct: 0, media: { type: "movie", title: "The Lion King" } },
    { q: "In Stranger Things, what is the name of the alternate dimension?", options: ["The Upside Down", "The Void", "The Other Side", "Hawkins Lab"], correct: 0, media: { type: "tv", title: "Stranger Things" } },
    { q: "Who directed Pulp Fiction?", options: ["Quentin Tarantino", "Martin Scorsese", "David Fincher", "Christopher Nolan"], correct: 0, media: { type: "movie", title: "Pulp Fiction" } },
    { q: "In Squid Game, what is the childhood game played first?", options: ["Red Light, Green Light", "Tug of War", "Marbles", "Dalgona Candy"], correct: 0, media: { type: "tv", title: "Squid Game" } },
    { q: "What is Tony Stark's superhero name?", options: ["Iron Man", "War Machine", "Captain America", "Star-Lord"], correct: 0, media: { type: "movie", title: "Iron Man" } },
    { q: "In The Godfather, what does Michael Corleone say is 'an offer he can't refuse'?", options: ["A threat disguised as a deal", "A wedding invitation", "A business proposal", "A peace treaty"], correct: 0, media: { type: "movie", title: "The Godfather" } },
    { q: "Which actor played the Joker in The Dark Knight (2008)?", options: ["Heath Ledger", "Joaquin Phoenix", "Jared Leto", "Jack Nicholson"], correct: 0, media: { type: "movie", title: "The Dark Knight" } },
    { q: "In Friends, who was 'on a break' when Ross slept with someone else?", options: ["Ross and Rachel", "Monica and Chandler", "Joey and Rachel", "Phoebe and Mike"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "What is the name of the ship in Star Wars piloted by Han Solo?", options: ["Millennium Falcon", "Star Destroyer", "X-Wing", "The Executor"], correct: 0, media: { type: "movie", title: "Star Wars" } },
    { q: "In Money Heist (La Casa de Papel), what city does the crew rob a mint in first?", options: ["Madrid", "Barcelona", "Lisbon", "Seville"], correct: 0, media: { type: "tv", title: "Money Heist" } },
    { q: "Who played the lead role of Neo in The Matrix?", options: ["Keanu Reeves", "Brad Pitt", "Tom Cruise", "Will Smith"], correct: 0, media: { type: "movie", title: "The Matrix" } },
    { q: "In Breaking Bad, what is the name of Walter White's brother-in-law, a DEA agent?", options: ["Hank Schrader", "Gus Fring", "Saul Goodman", "Mike Ehrmantraut"], correct: 0, media: { type: "tv", title: "Breaking Bad" } },
    { q: "What does the acronym in the title WALL-E stand for?", options: ["Waste Allocation Load Lifter Earth-class", "World Alliance Land Lifter Explorer", "Weather And Land Locator", "Waste Assistant Lifting Engine"], correct: 0, media: { type: "movie", title: "WALL-E" } },
    { q: "In Parasite (2019), what does the Kim family do to infiltrate the Park household?", options: ["Pose as unrelated skilled workers", "Rob the house", "Work as security guards", "Become tenants"], correct: 0, media: { type: "movie", title: "Parasite" } },
    { q: "Which TV show features the fictional restaurant 'The Bear' in Chicago?", options: ["The Bear", "Chef's Table", "Kitchen Nightmares", "The Menu"], correct: 0, media: { type: "tv", title: "The Bear" } },
    { q: "In Inception, what object does Cobb use to check if he's dreaming?", options: ["A spinning top", "A pocket watch", "A coin", "A photograph"], correct: 0, media: { type: "movie", title: "Inception" } }
  ],
  sq: [
    { q: "Në Friends, çfarë emri të rremë përdor Joey me gratë për të tingëlluar interesant?", options: ["Ken Adams", "Chandler Muriel Bing", "Bruce Willis", "Ross Geller"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "Në Breaking Bad, si quhet identiteti i fshehur i Walter White si prodhues droge?", options: ["Heisenberg", "Scarface", "The Cook", "El Jefe"], correct: 0, media: { type: "tv", title: "Breaking Bad" } },
    { q: "Si quhet kafeneja në Friends?", options: ["Central Perk", "The Grind", "Java Joe's", "Perk Ave"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "Në The Office, si quhet ferma e panxharit të Dwight-it?", options: ["Schrute Farms", "Beet Haven", "Dunder Acres", "Mifflin Farms"], correct: 0, media: { type: "tv", title: "The Office" } },
    { q: "Në cilën shtëpi futet Harry Potter?", options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], correct: 0, media: { type: "movie", title: "Harry Potter and the Sorcerer's Stone" } },
    { q: "Në Game of Thrones, si quhet shtëpia e House Stark?", options: ["Winterfell", "Casterly Rock", "The Eyrie", "Dragonstone"], correct: 0, media: { type: "tv", title: "Game of Thrones" } },
    { q: "Çfarë hedh Rose në oqean në fund të Titanic?", options: ["Gjerdanin 'Heart of the Ocean'", "Fletoren e skicave të Jack-ut", "Unazën e fejesës", "Një fotografi"], correct: 0, media: { type: "movie", title: "Titanic" } },
    { q: "Në The Matrix, cilën pilulë merr Neo për të mësuar të vërtetën?", options: ["Pilulën e kuqe", "Pilulën blu", "Pilulën jeshile", "Asnjërën"], correct: 0, media: { type: "movie", title: "The Matrix" } },
    { q: "Si quhet i keqi në The Lion King?", options: ["Scar", "Mufasa", "Zira", "Shenzi"], correct: 0, media: { type: "movie", title: "The Lion King" } },
    { q: "Në Stranger Things, si quhet dimensioni alternativ?", options: ["The Upside Down", "The Void", "The Other Side", "Hawkins Lab"], correct: 0, media: { type: "tv", title: "Stranger Things" } },
    { q: "Kush e regjisoi Pulp Fiction?", options: ["Quentin Tarantino", "Martin Scorsese", "David Fincher", "Christopher Nolan"], correct: 0, media: { type: "movie", title: "Pulp Fiction" } },
    { q: "Në Squid Game, cili lojë fëmijësh luhet e para?", options: ["Drita e Kuqe, Drita e Gjelbër", "Litar Tërheqës", "Bilardo Fëmijësh", "Ëmbëlsira Dalgona"], correct: 0, media: { type: "tv", title: "Squid Game" } },
    { q: "Si quhet superheroi i Tony Stark-ut?", options: ["Iron Man", "War Machine", "Captain America", "Star-Lord"], correct: 0, media: { type: "movie", title: "Iron Man" } },
    { q: "Në The Godfather, çfarë thotë Michael Corleone se është 'një ofertë që s'mund të refuzohet'?", options: ["Një kërcënim i maskuar si marrëveshje", "Ftesë dasme", "Propozim biznesi", "Marrëveshje paqeje"], correct: 0, media: { type: "movie", title: "The Godfather" } },
    { q: "Cili aktor luajti Joker-in në The Dark Knight (2008)?", options: ["Heath Ledger", "Joaquin Phoenix", "Jared Leto", "Jack Nicholson"], correct: 0, media: { type: "movie", title: "The Dark Knight" } },
    { q: "Në Friends, kush ishte 'në pushim' kur Ross fjeti me dikë tjetër?", options: ["Ross dhe Rachel", "Monica dhe Chandler", "Joey dhe Rachel", "Phoebe dhe Mike"], correct: 0, media: { type: "tv", title: "Friends" } },
    { q: "Si quhet anija në Star Wars që pilotohet nga Han Solo?", options: ["Millennium Falcon", "Star Destroyer", "X-Wing", "The Executor"], correct: 0, media: { type: "movie", title: "Star Wars" } },
    { q: "Në La Casa de Papel, në cilin qytet ekipi grabit monedhat e para?", options: ["Madrid", "Barcelona", "Lisbonë", "Seville"], correct: 0, media: { type: "tv", title: "Money Heist" } },
    { q: "Kush luajti rolin kryesor të Neo-s në The Matrix?", options: ["Keanu Reeves", "Brad Pitt", "Tom Cruise", "Will Smith"], correct: 0, media: { type: "movie", title: "The Matrix" } },
    { q: "Në Breaking Bad, si quhet kunati i Walter White-it, agjent i DEA-s?", options: ["Hank Schrader", "Gus Fring", "Saul Goodman", "Mike Ehrmantraut"], correct: 0, media: { type: "tv", title: "Breaking Bad" } },
    { q: "Çfarë përfaqëson emri WALL-E?", options: ["Waste Allocation Load Lifter Earth-class", "World Alliance Land Lifter Explorer", "Weather And Land Locator", "Waste Assistant Lifting Engine"], correct: 0, media: { type: "movie", title: "WALL-E" } },
    { q: "Në Parasite (2019), çfarë bën familja Kim për të depërtuar te familja Park?", options: ["Shtiret si punonjës të kualifikuar të palidhur mes tyre", "Grabisin shtëpinë", "Punojnë si roje sigurie", "Bëhen qiramarrës"], correct: 0, media: { type: "movie", title: "Parasite" } },
    { q: "Cili serial ka restorantin fiktiv 'The Bear' në Çikago?", options: ["The Bear", "Chef's Table", "Kitchen Nightmares", "The Menu"], correct: 0, media: { type: "tv", title: "The Bear" } },
    { q: "Në Inception, çfarë objekti përdor Cobb për të kontrolluar nëse është duke ëndërruar?", options: ["Një majë rrotulluese", "Një orë xhepi", "Një monedhë", "Një fotografi"], correct: 0, media: { type: "movie", title: "Inception" } }
  ]
};
const TRIVIA_QUESTIONS = TRIVIA_QUESTIONS_BY_LANG[LANG] || TRIVIA_QUESTIONS_BY_LANG.en;
const triviaPosterCache = {};

const triviaPlayBtn = document.getElementById("trivia-play-btn");
const triviaGameSection = document.getElementById("trivia-game-section");
const triviaSetupPane = document.getElementById("trivia-setup-pane");
const triviaPassPane = document.getElementById("trivia-pass-pane");
const triviaQuizPane = document.getElementById("trivia-quiz-pane");
const triviaRevealPane = document.getElementById("trivia-reveal-pane");
const triviaStartBtn = document.getElementById("trivia-start-btn");
const triviaPassName = document.getElementById("trivia-pass-name");
const triviaReadyBtn = document.getElementById("trivia-ready-btn");
const triviaQuizPlayer = document.getElementById("trivia-quiz-player");
const triviaQuizProgress = document.getElementById("trivia-quiz-progress");
const triviaQuestionText = document.getElementById("trivia-question-text");
const triviaOptionsEl = document.getElementById("trivia-options");
const triviaRevealInner = document.getElementById("trivia-reveal-inner");
const triviaPlayAgainBtn = document.getElementById("trivia-play-again-btn");
const triviaPlayerInput = document.getElementById("trivia-player-input");
const triviaPlayerChips = document.getElementById("trivia-player-chips");
const triviaMediaEl = document.getElementById("trivia-question-media");
const triviaMediaSkeleton = document.getElementById("trivia-media-skeleton");
const triviaQuestionImg = document.getElementById("trivia-question-img");

const triviaGame = {
  players: [],
  sessionPlayers: [],
  playerIndex: 0,
  questionIndex: 0,
  questions: [],
  scores: {} // { playerName: correctCount }
};

function triviaHideAllPanes() {
  triviaSetupPane.hidden = true;
  triviaPassPane.hidden = true;
  triviaQuizPane.hidden = true;
  triviaRevealPane.hidden = true;
}

function triviaResetToSetup() {
  triviaGameSection.hidden = true;
  triviaHideAllPanes();
  triviaSetupPane.hidden = false;
}

triviaPlayBtn.addEventListener("click", () => {
  // pre-fill from the "Who Picks Tonight" list if it has names, but keep it independently editable
  triviaGame.players = players.length ? players.slice() : [];
  renderTriviaPlayerChips();
  triviaGameSection.hidden = false;
  triviaHideAllPanes();
  triviaSetupPane.hidden = false;
  triviaGameSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("trivia-cancel-setup").addEventListener("click", triviaResetToSetup);
document.getElementById("trivia-cancel-pass").addEventListener("click", triviaResetToSetup);
document.getElementById("trivia-cancel-quiz").addEventListener("click", triviaResetToSetup);

// ---- own player list for this game ----
function renderTriviaPlayerChips() {
  triviaPlayerChips.innerHTML = "";
  triviaGame.players.forEach((name, i) => {
    const chip = document.createElement("button");
    chip.className = "player-chip";
    chip.innerHTML = `${name} <span>✕</span>`;
    chip.title = "Remove";
    chip.addEventListener("click", () => { triviaGame.players.splice(i, 1); renderTriviaPlayerChips(); });
    triviaPlayerChips.appendChild(chip);
  });
  document.getElementById("trivia-solo-hint").hidden = triviaGame.players.length > 0;
}

function addTriviaPlayer() {
  const name = triviaPlayerInput.value.trim();
  if (!name) return;
  if (triviaGame.players.includes(name)) { triviaPlayerInput.value = ""; return; }
  triviaGame.players.push(name);
  triviaPlayerInput.value = "";
  renderTriviaPlayerChips();
}
document.getElementById("trivia-player-add").addEventListener("click", addTriviaPlayer);
triviaPlayerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTriviaPlayer(); });

function pickRandomQuestions(count) {
  const shuffled = TRIVIA_QUESTIONS.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // shuffle each question's options too, tracking the new correct index
  return shuffled.slice(0, count).map((q) => {
    const optionOrder = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
    for (let i = optionOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionOrder[i], optionOrder[j]] = [optionOrder[j], optionOrder[i]];
    }
    return {
      q: q.q,
      media: q.media,
      options: optionOrder.map((o) => o.opt),
      correct: optionOrder.findIndex((o) => o.isCorrect)
    };
  });
}

triviaStartBtn.addEventListener("click", () => {
  triviaGame.sessionPlayers = triviaGame.players.length ? triviaGame.players.slice() : ["You"];
  triviaGame.playerIndex = 0;
  triviaGame.scores = {};
  triviaGame.sessionPlayers.forEach((p) => { triviaGame.scores[p] = 0; });
  showTriviaPassScreen();
});

function showTriviaPassScreen() {
  triviaHideAllPanes();
  triviaPassPane.hidden = false;
  triviaPassName.textContent = triviaGame.sessionPlayers[triviaGame.playerIndex];
}

triviaReadyBtn.addEventListener("click", () => {
  triviaGame.questionIndex = 0;
  triviaGame.questions = pickRandomQuestions(5);
  triviaHideAllPanes();
  triviaQuizPane.hidden = false;
  triviaQuizPlayer.textContent = triviaGame.sessionPlayers[triviaGame.playerIndex];
  renderTriviaQuestion();
});

// ---- poster lookup for the movie/show a question is about ----
async function fetchTriviaPoster(media) {
  if (!media) return null;
  const cacheKey = `${media.type}:${media.title}`;
  if (triviaPosterCache[cacheKey] !== undefined) return triviaPosterCache[cacheKey];
  try {
    const res = await fetch(
      `${TMDB_BASE}/search/${media.type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(media.title)}`
    );
    const data = await res.json();
    const posterPath = (data.results && data.results[0] && data.results[0].poster_path) || null;
    triviaPosterCache[cacheKey] = posterPath;
    return posterPath;
  } catch (_) {
    triviaPosterCache[cacheKey] = null;
    return null;
  }
}

function renderTriviaQuestion() {
  const q = triviaGame.questions[triviaGame.questionIndex];
  triviaQuizProgress.textContent = `${triviaGame.questionIndex + 1} / ${triviaGame.questions.length}`;
  triviaQuestionText.textContent = q.q;
  triviaOptionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "trivia-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleTriviaAnswer(i));
    triviaOptionsEl.appendChild(btn);
  });

  // poster: show loading skeleton, swap in the image once fetched (guard against stale async response)
  const thisQuestionIndex = triviaGame.questionIndex;
  triviaQuestionImg.hidden = true;
  triviaQuestionImg.src = "";
  triviaMediaSkeleton.hidden = false;
  triviaMediaEl.hidden = !q.media;
  if (q.media) {
    fetchTriviaPoster(q.media).then((posterPath) => {
      if (triviaGame.questionIndex !== thisQuestionIndex) return; // moved on already
      if (posterPath) {
        triviaQuestionImg.src = `${IMG_BASE}${posterPath}`;
        triviaQuestionImg.hidden = false;
        triviaMediaSkeleton.hidden = true;
      } else {
        triviaMediaEl.hidden = true;
      }
    });
  }
}

function handleTriviaAnswer(selectedIndex) {
  const q = triviaGame.questions[triviaGame.questionIndex];
  const buttons = triviaOptionsEl.querySelectorAll(".trivia-option");
  buttons.forEach((b) => { b.disabled = true; });

  const correct = selectedIndex === q.correct;
  buttons[q.correct].classList.add("correct");
  if (!correct) buttons[selectedIndex].classList.add("wrong");

  if (correct) {
    const player = triviaGame.sessionPlayers[triviaGame.playerIndex];
    triviaGame.scores[player]++;
  }
  if (navigator.vibrate) navigator.vibrate(correct ? 30 : [60, 40, 60]);

  setTimeout(() => {
    triviaGame.questionIndex++;
    if (triviaGame.questionIndex >= triviaGame.questions.length) {
      triviaGame.playerIndex++;
      if (triviaGame.playerIndex >= triviaGame.sessionPlayers.length) {
        revealTriviaResults();
      } else {
        showTriviaPassScreen();
      }
    } else {
      renderTriviaQuestion();
    }
  }, 1100);
}

function revealTriviaResults() {
  triviaHideAllPanes();
  triviaRevealPane.hidden = false;

  const ranked = triviaGame.sessionPlayers
    .map((p) => ({ name: p, score: triviaGame.scores[p] }))
    .sort((a, b) => b.score - a.score);

  const topScore = ranked[0].score;
  const tiedWinners = ranked.filter((r) => r.score === topScore);
  const winner = tiedWinners.length > 1
    ? tiedWinners[Math.floor(Math.random() * tiedWinners.length)]
    : tiedWinners[0];
  const wasTie = tiedWinners.length > 1;

  const rows = ranked.map((r, i) => `
    <div class="trivia-leaderboard-row ${r.name === winner.name ? "winner" : ""}">
      <span class="trivia-leaderboard-rank">${i === 0 ? "🏆" : i + 1}</span>
      <span class="trivia-leaderboard-name">${r.name}</span>
      <span class="trivia-leaderboard-score">${r.score} ${tt("trivia_score_of")}</span>
    </div>
  `).join("");

  triviaRevealInner.innerHTML = `
    <p class="group-match-eyebrow">${tt("trivia_winner_eyebrow")}</p>
    <div class="trivia-leaderboard">${rows}</div>
    <p class="group-match-tally">🎬 ${winner.name} ${wasTie ? `— ${tt("trivia_tie_note")}` : ""}</p>
  `;

  if (triviaGame.sessionPlayers.length > 1) {
    launchConfetti(document.getElementById("trivia-confetti"));
  }
}

triviaPlayAgainBtn.addEventListener("click", () => {
  triviaHideAllPanes();
  triviaSetupPane.hidden = false;
});

// ============================================
// PWA: register service worker
// ============================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then((reg) => {
        // check for a new version on open + every 60s while open
        reg.update();
        setInterval(() => reg.update(), 60000);
      })
      .catch(() => {});
  });

  // when a new service worker takes control, reload once to load fresh files
  let swRefreshed = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (swRefreshed) return;
    swRefreshed = true;
    window.location.reload();
  });
}

// ============================================
// PWA: install button
// ============================================
const installBtn = document.getElementById("install-app-btn");
const iosInstallBanner = document.getElementById("ios-install-banner");
const iosInstallClose = document.getElementById("ios-install-close");
let deferredInstallPrompt = null;

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

if (!isStandalone && installBtn) {
  if (isIOS) {
    installBtn.hidden = false;
  } else {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      installBtn.hidden = false;
    });
  }

  installBtn.addEventListener("click", async () => {
    if (isIOS) {
      iosInstallBanner.hidden = false;
      return;
    }
    if (!deferredInstallPrompt) return;
    installBtn.hidden = true;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    installBtn.hidden = true;
  });
}

if (iosInstallClose) {
  iosInstallClose.addEventListener("click", () => { iosInstallBanner.hidden = true; });
}