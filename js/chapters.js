// ============================================================
//  chapters.js — logic for pages/chapters.html
// ============================================================

const POV_COLORS = { rumi:'#c084fc', mira:'#f472b6', zoey:'#60a5fa', celine:'#34d399' };
const POV_NAMES  = { rumi:'Rumi', mira:'Mira', zoey:'Zoey', celine:'Celine' };

fetch('../data/chapters.json')
  .then(r => r.json())
  .then(chapters => buildTimeline(chapters));

function buildTimeline(chapters) {
  const container = document.getElementById('ch-timeline');
  container.innerHTML = chapters.map(ch => {
    // dominant POV colour
    const firstPov = ch.pov?.[0] || 'rumi';
    const col = POV_COLORS[firstPov] || '#b89d87';

    const povTags = (ch.pov || []).map(p =>
      `<span style="display:inline-block;padding:0.1rem 0.45rem;border-radius:4px;font-size:0.75rem;font-weight:700;background:${POV_COLORS[p] || '#eee'}22;color:${POV_COLORS[p] || '#888'};margin-right:0.25rem">${POV_NAMES[p]}</span>`
    ).join('');

    const beats = (ch.key_beats || []).map(b =>
      `<div class="ch-beat">${b}</div>`
    ).join('');

    const objects = (ch.objects || []).map(o =>
      `<span class="ch-object">${o}</span>`
    ).join('');

    return `
      <div class="ch-item" style="--ch-color:${col}">
        <div class="ch-num">Ch&nbsp;${ch.number}</div>
        <div class="ch-body">
          <div class="ch-title">${ch.title}</div>
          <div class="ch-pov">${povTags}</div>
          <div class="ch-summary">${ch.summary}</div>
          ${beats ? `<div class="ch-beats" style="margin-top:0.5rem">${beats}</div>` : ''}
          ${objects ? `<div class="ch-objects">${objects}</div>` : ''}
          <div style="font-family:'Caveat',cursive;font-size:0.82rem;color:var(--ink-faint);margin-top:0.5rem;font-style:italic">${ch.tone}</div>
        </div>
      </div>`;
  }).join('');
}
