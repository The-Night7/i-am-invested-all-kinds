// ============================================================
//  quotes.js — logic for pages/quotes.html
// ============================================================

const SPEAKER_COLORS = {
  rumi:          '#c084fc',
  mira:          '#f472b6',
  zoey:          '#60a5fa',
  celine:        '#34d399',
  mira_internal: '#f472b6',
  zoey_internal: '#60a5fa',
  rumi_internal: '#c084fc',
  zoey_mom:      '#94a3b8',
};
const SPEAKER_LABELS = {
  rumi:          'Rumi',
  mira:          'Mira',
  zoey:          'Zoey',
  celine:        'Celine',
  mira_internal: 'Mira (internal)',
  zoey_internal: 'Zoey (internal)',
  rumi_internal: 'Rumi (internal)',
  zoey_mom:      "Zoey's mum",
};

let ALL_QUOTES = [];

fetch('../data/quotes.json')
  .then(r => r.json())
  .then(data => {
    ALL_QUOTES = data;
    render('all');
    wireFilters();
  });

function render(filter) {
  const list = document.getElementById('quote-list');
  list.innerHTML = '';
  const entries = filter === 'all'
    ? ALL_QUOTES
    : ALL_QUOTES.filter(q => q.speaker === filter || q.speaker === filter + '_internal');

  if (!entries.length) {
    list.innerHTML = '<p style="color:var(--ink-faint);font-size:0.85rem;padding:1rem 0">Nothing here yet.</p>';
    return;
  }

  entries.forEach(q => {
    const col   = SPEAKER_COLORS[q.speaker] || '#b89d87';
    const label = SPEAKER_LABELS[q.speaker] || q.speaker;
    const isInternal = q.speaker.includes('_internal');
    const div = document.createElement('div');
    div.className = 'quote-card';
    div.style.setProperty('--speaker-color', col);
    div.innerHTML = `
      <div class="quote-header">
        <span class="quote-speaker" style="color:${col}">${label}</span>
        <span class="quote-context">${q.context}</span>
      </div>
      <div class="quote-text${isInternal ? ' internal' : ''}">${q.text}</div>`;
    list.appendChild(div);
  });
}

function wireFilters() {
  document.getElementById('quote-filters')?.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#quote-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
}
