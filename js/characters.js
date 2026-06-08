// ============================================================
//  characters.js — logic for pages/characters.html
// ============================================================

const TAG_COLOR = {
  'Autistic':           { bg: 'rgba(192,132,252,0.15)', col: '#9333ea' },
  'ADHD + Autistic':    { bg: 'rgba(96,165,250,0.15)',  col: '#2563eb' },
  'Mira Needs a Hug':   { bg: 'rgba(244,114,182,0.15)', col: '#db2777' },
  'Zoey Needs a Hug':   { bg: 'rgba(96,165,250,0.15)',  col: '#2563eb' },
  'Rumi Needs a Hug':   { bg: 'rgba(192,132,252,0.15)', col: '#9333ea' },
  'Sunlight Sister':    { bg: 'rgba(52,211,153,0.15)',  col: '#059669' },
};

let ALL_CHARS = [];

fetch('../data/characters.json')
  .then(r => r.json())
  .then(data => {
    ALL_CHARS = data;
    buildCards('all');
    wireFilters();
    document.getElementById('detail-close')
      .addEventListener('click', () => document.getElementById('char-detail').classList.remove('open'));
  });

function buildCards(filter) {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  ALL_CHARS.forEach(char => {
    if (filter !== 'all' && char.id !== filter) return;
    const tags = (char.tags || []).map(t => {
      const s = TAG_COLOR[t] || { bg: 'rgba(120,90,60,0.1)', col: '#7a5c46' };
      return `<span class="tag-pill" style="background:${s.bg};color:${s.col}">${t}</span>`;
    }).join('');
    const card = document.createElement('div');
    card.className = 'char-card';
    card.style.setProperty('--char-color', char.color);
    card.innerHTML = `
      <div class="char-name">${char.name}</div>
      <div class="char-role">${char.role}</div>
      <div class="char-desc">${char.description}</div>
      <div class="char-tags">${tags}</div>`;
    card.addEventListener('click', () => openDetail(char));
    grid.appendChild(card);
  });
}

function openDetail(char) {
  const possHTML = (char.possessions || []).map(p => `
    <div class="possession-item">
      <div class="possession-name">${p.name}</div>
      <p style="font-size:0.83rem;margin-top:0.2rem">${p.desc}</p>
    </div>`).join('');

  const momHTML = (char.key_moments || []).map(m =>
    `<li><span class="ch-badge">Ch ${m.ch}</span><span>${m.desc}</span></li>`
  ).join('');

  const relHTML = (char.relationships || []).map(id => {
    const r = ALL_CHARS.find(c => c.id === id);
    return r
      ? `<span class="rel-tag" style="border-left:3px solid ${r.color}">${r.name}</span>`
      : '';
  }).join('');

  document.getElementById('detail-content').innerHTML = `
    <div style="display:inline-block;padding:0.2rem 0.7rem;border-radius:20px;font-size:0.72rem;font-weight:700;background:${char.accent};color:${char.color};margin-bottom:0.5rem;font-family:'Nunito',sans-serif;letter-spacing:0.03em">
      ${char.tags?.join(' · ') || ''}
    </div>
    <h2 style="font-family:'Lora',serif;font-size:1.9rem;color:${char.color};margin-bottom:0.15rem">${char.name}</h2>
    <div style="font-family:'Caveat',cursive;font-size:1rem;color:var(--ink-faint);margin-bottom:1.2rem">${char.role}</div>
    <div class="detail-section"><h4>About</h4><p style="font-size:0.85rem">${char.description}</p></div>
    ${char.personality ? `<div class="detail-section"><h4>Personality</h4><p style="font-size:0.85rem">${char.personality}</p></div>` : ''}
    ${possHTML ? `<div class="detail-section"><h4>Their things</h4>${possHTML}</div>` : ''}
    ${relHTML ? `<div class="detail-section"><h4>Connections</h4><div style="margin-top:0.3rem">${relHTML}</div></div>` : ''}
    ${momHTML ? `<div class="detail-section"><h4>Key moments</h4><ul class="moment-list">${momHTML}</ul></div>` : ''}
  `;
  document.getElementById('char-detail').classList.add('open');
}

function wireFilters() {
  document.getElementById('char-filters')?.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#char-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildCards(btn.dataset.filter);
    });
  });
}
