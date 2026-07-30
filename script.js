// ===================== PASSWORD =====================
const CORRECT_PASSWORD = '1805';

function checkPassword() {
  const input = document.getElementById('pwd-input').value.trim();
  const errorMsg = document.getElementById('error-msg');

  if (input === CORRECT_PASSWORD) {
    errorMsg.textContent = '';
    unlockBirthday();
  } else {
    errorMsg.textContent = '❌ Wrong password. Try again!';
    const card = document.querySelector('.lock-card');
    card.style.animation = 'none';
    card.style.transform = 'translateX(10px)';
    setTimeout(() => { card.style.transform = 'translateX(-10px)'; }, 80);
    setTimeout(() => { card.style.transform = 'translateX(6px)'; }, 160);
    setTimeout(() => { card.style.transform = 'translateX(0)'; }, 240);
  }
}

function unlockBirthday() {
  const pwdPage = document.getElementById('password-page');
  pwdPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  pwdPage.style.opacity = '0';
  pwdPage.style.transform = 'scale(1.05)';

  setTimeout(() => {
    pwdPage.classList.remove('active');
    const bdayPage = document.getElementById('birthday-page');
    bdayPage.classList.add('active');
    bdayPage.style.opacity = '0';
    bdayPage.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { bdayPage.style.opacity = '1'; }, 50);
    launchConfetti();
    initSlider();
  }, 800);
}

// Allow Enter key on password input
document.getElementById('pwd-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkPassword();
});

// ===================== CONFETTI =====================
function launchConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#f093fb', '#f5576c', '#ffd700', '#ff6b9d', '#ffd6e7', '#e0aaff'];
  for (let i = 0; i < 35; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (5 + Math.random() * 7) + 'px';
    piece.style.height = (5 + Math.random() * 7) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (5 + Math.random() * 6) + 's';
    piece.style.animationDelay = (Math.random() * 4) + 's';
    container.appendChild(piece);
  }
}

// ===================== WISHES SLIDER =====================
let currentSlide = 0;
const totalSlides = 5;

function initSlider() {
  const dotsContainer = document.getElementById('dots');
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
  // Auto-play slider
  setInterval(() => nextSlide(), 4000);
}

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  const track = document.getElementById('slider-track');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

// ===================== BLOW CANDLES =====================
function blowCandles() {
  const flames = document.querySelectorAll('.flame');
  const btn = document.querySelector('.btn-blow');
  const msg = document.getElementById('wish-message');

  flames.forEach(flame => {
    flame.style.transition = 'opacity 0.5s ease';
    flame.style.opacity = '0';
    setTimeout(() => flame.classList.add('out'), 500);
  });

  btn.textContent = '🕯️ Candles Out!';
  btn.disabled = true;
  btn.style.opacity = '0.6';

  const wishes = [
    '🌟 Your wish is on its way to the universe!',
    '✨ May all your dreams come true this year!',
    '💫 The stars heard you — magic is coming!',
    '🎉 Your wish has been granted! Happy Birthday!',
    '🌙 Sweet dreams and sweeter days ahead!'
  ];

  setTimeout(() => {
    msg.textContent = wishes[Math.floor(Math.random() * wishes.length)];
  }, 800);
}

// ===================== SCROLL ANIMATIONS =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.wish-card, .letter-para, .letter-bday-wish').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
