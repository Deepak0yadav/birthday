// ---------------- background floating decor ----------------
const decorEmojis = ['💗', '🎈', '✨', '🌸', '💕', '⭐'];
const bgDecor = document.getElementById('bgDecor');
for (let i = 0; i < 18; i++) {
  const span = document.createElement('span');
  span.textContent = decorEmojis[Math.floor(Math.random() * decorEmojis.length)];
  span.style.left = Math.random() * 100 + 'vw';
  span.style.animationDuration = 10 + Math.random() * 12 + 's';
  span.style.animationDelay = Math.random() * 10 + 's';
  span.style.fontSize = 1 + Math.random() * 1.4 + 'rem';
  bgDecor.appendChild(span);
}

// ---------------- screen navigation ----------------
const screens = document.querySelectorAll('.screen');
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('startBtn').addEventListener('click', () => {
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => { });
  bdaySong.pause();
  bdaySong.currentTime = 0;
  showScreen('screen-card');
});

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.next));
});

document.getElementById('restartBtn').addEventListener('click', () => {
  showScreen('screen-welcome');
  document.getElementById('card3d').classList.remove('open');
  document.querySelectorAll('.candle-flame').forEach(f => f.classList.remove('blowing'));
  cakeHint.textContent = 'Click the candles to blow them out';
  blownCount = 0;
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => { });
  bdaySong.pause();
  bdaySong.currentTime = 0;
});

// ---------------- card flip open ----------------
const card3d = document.getElementById('card3d');
card3d.addEventListener('click', () => {
  card3d.classList.toggle('open');
});

// ---------------- flip cards ----------------
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

const bdaySong = document.getElementById('bdaySong');
const bgMusic = document.getElementById('bgMusic');

// ---------------- cake candles ----------------
const flames = document.querySelectorAll('.candle-flame');
const cakeHint = document.getElementById('cakeHint');
let blownCount = 0;

const flamesWrap = document.getElementById('flames');

flames.forEach(flame => {
  flame.addEventListener('click', () => {
    if (flame.classList.contains('blowing')) return;
    flame.classList.add('blowing');

    const smoke = document.createElement('span');
    smoke.className = 'smoke';
    smoke.textContent = '💨';
    smoke.style.left = flame.offsetLeft + 'px';
    smoke.style.top = flame.offsetTop + 'px';
    flamesWrap.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1100);

    blownCount++;
    if (blownCount === 1) {
      bdaySong.currentTime = 0;
      bdaySong.play().catch(() => { });
    }
    if (blownCount === flames.length) {
      cakeHint.textContent = 'Wish made! Happy Birthday Akhansha 🎉';
      burstConfetti();
    }
  });
});

// ---------------- confetti burst ----------------
function burstConfetti() {
  const colors = ['#ff6f91', '#ffd166', '#b085f5', '#ffc2d1', '#ff9ab8'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.style.position = 'fixed';
    piece.style.zIndex = '999';
    piece.style.top = '40%';
    piece.style.left = '50%';
    piece.style.width = '8px';
    piece.style.height = '8px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.pointerEvents = 'none';
    document.body.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 250;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 100;

    piece.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy + 400}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 1800 + Math.random() * 800,
      easing: 'cubic-bezier(.25,.46,.45,.94)'
    });

    setTimeout(() => piece.remove(), 2800);
  }
}
