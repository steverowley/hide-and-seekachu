// Hide-and-Seekachu — game logic.
//
// Loads paintings from window.PAINTINGS_DATA (defined in paintings.js),
// picks a random painting + variant per round, and detects clicks against
// the Pikachu hitbox in image-pixel space (independent of how big the
// browser is rendering the image on screen).

const $ = (id) => document.getElementById(id);

const state = {
  paintings: [],
  queue: [],
  score: 0,
  current: null,
  busy: false,
};

const els = {
  splash: $('splash'),
  game: $('game'),
  gameover: $('gameover'),
  startBtn: $('start-btn'),
  playAgainBtn: $('play-again-btn'),
  hintBtn: $('hint-btn'),
  skipBtn: $('skip-btn'),
  img: $('painting-img'),
  stage: $('stage'),
  title: $('painting-title'),
  artist: $('painting-artist'),
  score: $('score'),
  finalScore: $('final-score'),
  hintOverlay: $('hint-overlay'),
  missMarker: $('miss-marker'),
  celebration: $('celebration'),
};

// Optional "Pika!" sound. If sounds/pika.mp3 isn't present, playback
// silently no-ops — we never want a missing file to break the game.
const pikaSound = new Audio('sounds/pika.mp3');
pikaSound.preload = 'auto';
let pikaSoundAvailable = true;
pikaSound.addEventListener('error', () => { pikaSoundAvailable = false; });

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(name) {
  els.splash.classList.toggle('hidden', name !== 'splash');
  els.game.classList.toggle('hidden', name !== 'game');
  els.gameover.classList.toggle('hidden', name !== 'gameover');
}

function startGame() {
  state.score = 0;
  state.queue = shuffle(state.paintings);
  els.score.textContent = '0';
  showScreen('game');
  nextRound();
}

function nextRound() {
  hideOverlays();
  if (state.queue.length === 0) {
    endGame();
    return;
  }
  const painting = state.queue.shift();
  const variant = painting.variants[Math.floor(Math.random() * painting.variants.length)];
  state.current = { painting, variant };
  els.title.textContent = painting.title;
  els.artist.textContent = painting.artist;
  els.img.src = variant.image;
  state.busy = false;
}

function endGame() {
  els.finalScore.textContent = state.score;
  showScreen('gameover');
}

function hideOverlays() {
  els.hintOverlay.classList.add('hidden');
  els.missMarker.classList.add('hidden');
  els.celebration.classList.add('hidden');
}

// Compute the rendered image rectangle within the <img> element.
// Because the image uses object-fit: contain, the actual painted area
// can be smaller than the element on one axis (letterboxed). Returns
// pixel offsets and size of the painted area, in element-local coords.
function getDrawRect() {
  const img = els.img;
  const rect = img.getBoundingClientRect();
  const natW = img.naturalWidth;
  const natH = img.naturalHeight;
  if (!natW || !natH) return null;
  const elementRatio = rect.width / rect.height;
  const imageRatio = natW / natH;
  let drawW, drawH, offsetX, offsetY;
  if (imageRatio > elementRatio) {
    drawW = rect.width;
    drawH = rect.width / imageRatio;
    offsetX = 0;
    offsetY = (rect.height - drawH) / 2;
  } else {
    drawH = rect.height;
    drawW = rect.height * imageRatio;
    offsetX = (rect.width - drawW) / 2;
    offsetY = 0;
  }
  return { rect, natW, natH, drawW, drawH, offsetX, offsetY };
}

function imageCoordsFromEvent(event) {
  const d = getDrawRect();
  if (!d) return null;
  const cx = event.clientX;
  const cy = event.clientY;
  const localX = cx - d.rect.left - d.offsetX;
  const localY = cy - d.rect.top - d.offsetY;
  if (localX < 0 || localY < 0 || localX > d.drawW || localY > d.drawH) {
    return null;
  }
  return {
    x: (localX / d.drawW) * d.natW,
    y: (localY / d.drawH) * d.natH,
  };
}

function inBox(point, box) {
  return (
    point.x >= box.x &&
    point.x <= box.x + box.width &&
    point.y >= box.y &&
    point.y <= box.y + box.height
  );
}

function onStageClick(event) {
  if (state.busy || !state.current) return;
  const stageRect = els.stage.getBoundingClientRect();
  const stageX = event.clientX - stageRect.left;
  const stageY = event.clientY - stageRect.top;
  const coords = imageCoordsFromEvent(event);
  if (coords && inBox(coords, state.current.variant.pikachu_box)) {
    win();
  } else {
    showMiss(stageX, stageY);
  }
}

function win() {
  state.busy = true;
  state.score += 1;
  els.score.textContent = state.score;
  els.celebration.classList.remove('hidden');
  spawnConfetti();
  if (pikaSoundAvailable) {
    pikaSound.currentTime = 0;
    pikaSound.play().catch(() => { /* autoplay can be blocked — ignore */ });
  }
  setTimeout(nextRound, 2000);
}

function showMiss(x, y) {
  els.missMarker.style.left = `${x}px`;
  els.missMarker.style.top = `${y}px`;
  els.missMarker.classList.remove('hidden');
  // Restart the shake animation by toggling it off and back on.
  els.missMarker.style.animation = 'none';
  void els.missMarker.offsetHeight; // force reflow
  els.missMarker.style.animation = '';
  clearTimeout(showMiss._t);
  showMiss._t = setTimeout(() => els.missMarker.classList.add('hidden'), 500);
}

function showHint() {
  if (state.busy || !state.current) return;
  const d = getDrawRect();
  if (!d) return;
  const stageRect = els.stage.getBoundingClientRect();
  const { pikachu_box } = state.current.variant;
  const cx = pikachu_box.x + pikachu_box.width / 2;
  const cy = pikachu_box.y + pikachu_box.height / 2;
  const isRight = cx > d.natW / 2;
  const isBottom = cy > d.natH / 2;

  const qW = d.drawW / 2;
  const qH = d.drawH / 2;
  const left = (d.rect.left - stageRect.left) + d.offsetX + (isRight ? qW : 0);
  const top = (d.rect.top - stageRect.top) + d.offsetY + (isBottom ? qH : 0);

  els.hintOverlay.style.left = `${left}px`;
  els.hintOverlay.style.top = `${top}px`;
  els.hintOverlay.style.width = `${qW}px`;
  els.hintOverlay.style.height = `${qH}px`;
  els.hintOverlay.classList.remove('hidden');
  clearTimeout(showHint._t);
  showHint._t = setTimeout(() => els.hintOverlay.classList.add('hidden'), 2000);
}

function skipRound() {
  if (state.busy) return;
  // Push the current painting back onto the queue so it can come up
  // again later in the same game.
  if (state.current) state.queue.push(state.current.painting);
  nextRound();
}

const CONFETTI_COLORS = ['#ffd54a', '#ff5252', '#4dd0e1', '#aed581', '#ba68c8'];
function spawnConfetti() {
  const count = 50;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    els.stage.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
}

function onImageError() {
  // If a painting image fails to load, skip past it gracefully so a single
  // missing file doesn't deadlock the whole game.
  console.warn('Image failed to load, skipping:', els.img.src);
  setTimeout(nextRound, 200);
}

function wireEvents() {
  els.startBtn.addEventListener('click', startGame);
  els.playAgainBtn.addEventListener('click', startGame);
  els.hintBtn.addEventListener('click', showHint);
  els.skipBtn.addEventListener('click', skipRound);
  els.stage.addEventListener('click', onStageClick);
  els.img.addEventListener('error', onImageError);
  els.img.addEventListener('contextmenu', (e) => e.preventDefault());
  els.img.addEventListener('dragstart', (e) => e.preventDefault());
}

function loadData() {
  const data = window.PAINTINGS_DATA;
  if (!data || !Array.isArray(data.paintings) || data.paintings.length === 0) {
    document.body.innerHTML =
      '<p style="padding:24px;font-family:sans-serif">No painting data found. Check that <code>paintings.js</code> defines <code>window.PAINTINGS_DATA</code>.</p>';
    return false;
  }
  state.paintings = data.paintings;
  return true;
}

function main() {
  if (!loadData()) return;
  wireEvents();
  showScreen('splash');
}

main();
