/* ===========================================================
   game.js — flashcards, quiz, reference table, and mobile nav.
   Reads data from window.ROOTS (see roots.js).
   =========================================================== */

/* ---------- Mobile nav toggle (used on every page) ---------- */
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

/* ---------- Footer copyright year (used on every page) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ---------- Utilities ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* The rest only runs on the flashcards page */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('flash-app')) return;

  const ALL = window.ROOTS || [];
  let filter = 'all';      // all | prefix | suffix | root
  let deck = shuffle(ALL);
  let index = 0;

  /* ===== Filtering ===== */
  function applyFilter(f) {
    filter = f;
    deck = shuffle(f === 'all' ? ALL : ALL.filter(r => r.type === f));
    index = 0;
    document.querySelectorAll('#filter-chips .chip').forEach(c =>
      c.classList.toggle('active', c.dataset.filter === f));
    renderCard();
    buildTable();
  }

  /* ===== Flashcards ===== */
  const cardEl    = document.getElementById('flashcard');
  const rootEl    = document.getElementById('flash-root');
  const originEl  = document.getElementById('flash-origin');
  const meaningEl = document.getElementById('flash-meaning');
  const exampleEl = document.getElementById('flash-example');
  const counterEl = document.getElementById('flash-counter');

  function renderCard() {
    if (!deck.length) return;
    const c = deck[index];
    cardEl.classList.remove('flipped');
    rootEl.textContent = c.root;
    originEl.textContent = c.origin + ' · ' + c.type;
    meaningEl.textContent = c.meaning;
    exampleEl.innerHTML = c.example
      ? 'As in <b>' + c.example + '</b>'
      : '';
    counterEl.textContent = (index + 1) + ' / ' + deck.length;
  }

  cardEl?.addEventListener('click', () => cardEl.classList.toggle('flipped'));

  document.getElementById('flash-next')?.addEventListener('click', e => {
    e.stopPropagation();
    index = (index + 1) % deck.length;
    renderCard();
  });
  document.getElementById('flash-prev')?.addEventListener('click', e => {
    e.stopPropagation();
    index = (index - 1 + deck.length) % deck.length;
    renderCard();
  });
  document.getElementById('flash-shuffle')?.addEventListener('click', e => {
    e.stopPropagation();
    deck = shuffle(deck); index = 0; renderCard();
  });

  /* Keyboard: ← → to move, space/up/down to flip */
  document.addEventListener('keydown', e => {
    if (document.getElementById('quiz-panel') &&
        !document.getElementById('quiz-panel').classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') { index = (index + 1) % deck.length; renderCard(); }
    if (e.key === 'ArrowLeft')  { index = (index - 1 + deck.length) % deck.length; renderCard(); }
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault(); cardEl.classList.toggle('flipped');
    }
  });

  document.querySelectorAll('#filter-chips .chip').forEach(chip =>
    chip.addEventListener('click', () => applyFilter(chip.dataset.filter)));

  /* ===== Mode switch: Flashcards <-> Quiz ===== */
  const flashPanel = document.getElementById('flash-panel');
  const quizPanel  = document.getElementById('quiz-panel');
  document.getElementById('mode-flash')?.addEventListener('click', () => switchMode('flash'));
  document.getElementById('mode-quiz')?.addEventListener('click', () => switchMode('quiz'));

  function switchMode(m) {
    document.getElementById('mode-flash').classList.toggle('active', m === 'flash');
    document.getElementById('mode-quiz').classList.toggle('active', m === 'quiz');
    flashPanel.classList.toggle('hidden', m !== 'flash');
    quizPanel.classList.toggle('hidden', m !== 'quiz');
    if (m === 'quiz') startQuiz();
  }

  /* ===== Quiz game ===== */
  let qDeck = [], qIndex = 0, score = 0, answered = false;

  const quizQEl    = document.getElementById('quiz-q');
  const quizOptsEl = document.getElementById('quiz-options');
  const quizFbEl   = document.getElementById('quiz-feedback');
  const scoreEl    = document.getElementById('quiz-score');
  const bestEl     = document.getElementById('quiz-best');
  const nextBtn    = document.getElementById('quiz-next');
  const resetBtn   = document.getElementById('quiz-reset');

  /* ===== Best score =====
     Saved in the visitor's own browser. localStorage can be unavailable
     (private windows, blocked site data), so every access is guarded and
     falls back to an in-memory value for the session. */
  const BEST_KEY = 'mll-quiz-best';
  let best = 0;
  try {
    best = parseInt(localStorage.getItem(BEST_KEY), 10) || 0;
  } catch (e) { /* storage unavailable — keep the session-only value */ }

  function renderBest() {
    bestEl.textContent = 'Best: ' + best;
  }

  function recordScore(s) {
    if (s <= best) return;
    best = s;
    try { localStorage.setItem(BEST_KEY, String(best)); } catch (e) { /* ignore */ }
    renderBest();
  }

  function quizPool() {
    return filter === 'all' ? ALL : ALL.filter(r => r.type === filter);
  }

  function startQuiz() {
    qDeck = shuffle(quizPool());
    qIndex = 0; score = 0; answered = false;
    renderBest();
    renderQuestion();
  }

  resetBtn?.addEventListener('click', () => {
    startQuiz();
    quizFbEl.textContent = 'Quiz reset — good luck!';
    quizFbEl.style.color = 'var(--accent-2)';
  });

  function renderQuestion() {
    const pool = quizPool();
    if (qDeck.length === 0) { startQuiz(); return; }
    if (qIndex >= qDeck.length) { qIndex = 0; qDeck = shuffle(qDeck); }

    answered = false;
    nextBtn.classList.add('hidden');
    quizFbEl.textContent = '';
    quizFbEl.style.color = '';

    const correct = qDeck[qIndex];
    // Build 4 options: the correct meaning + 3 distractors
    const distractors = shuffle(pool.filter(r => r.meaning !== correct.meaning))
                          .slice(0, 3).map(r => r.meaning);
    const options = shuffle([correct.meaning, ...distractors]);

    quizQEl.innerHTML = 'What does <span class="root">' + correct.root + '</span> mean?';
    scoreEl.textContent = 'Score: ' + score + '  ·  Question ' + (qIndex + 1);
    quizOptsEl.innerHTML = '';

    options.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'quiz-option';
      b.textContent = opt;
      b.addEventListener('click', () => choose(b, opt, correct));
      quizOptsEl.appendChild(b);
    });
  }

  function choose(btn, opt, correct) {
    if (answered) return;
    answered = true;
    const buttons = quizOptsEl.querySelectorAll('.quiz-option');
    buttons.forEach(b => {
      b.disabled = true;
      if (b.textContent === correct.meaning) b.classList.add('correct');
    });
    if (opt === correct.meaning) {
      score++;
      recordScore(score);
      quizFbEl.textContent = '✓ Correct!' + (correct.example ? ' e.g. ' + correct.example : '');
      quizFbEl.style.color = '#2f8f4e';
    } else {
      btn.classList.add('wrong');
      quizFbEl.textContent = '✗ ' + correct.root + ' means “' + correct.meaning + '”.';
      quizFbEl.style.color = '#8c2f39';
    }
    scoreEl.textContent = 'Score: ' + score + '  ·  Question ' + (qIndex + 1);
    nextBtn.classList.remove('hidden');
  }

  nextBtn?.addEventListener('click', () => {
    qIndex++;
    renderQuestion();
  });

  /* ===== Reference table ===== */
  function buildTable() {
    const tbody = document.getElementById('term-tbody');
    if (!tbody) return;
    const rows = (filter === 'all' ? ALL : ALL.filter(r => r.type === filter))
      .slice().sort((a, b) => a.root.localeCompare(b.root));
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td class="root-cell">${r.root}</td>
        <td>${r.meaning}</td>
        <td><span class="tag ${r.origin.toLowerCase()}">${r.origin}</span></td>
        <td>${r.type}</td>
        <td>${r.example ? '<i>' + r.example + '</i>' : ''}</td>
      </tr>`).join('');
  }

  /* ===== Init ===== */
  renderCard();
  buildTable();
});
