// ============================================================
//  objects.js — logic for pages/objects.html
// ============================================================

fetch('../data/objects.json')
  .then(r => r.json())
  .then(objects => buildGrid(objects));

function buildGrid(objects) {
  const grid = document.getElementById('obj-grid');
  grid.innerHTML = objects.map(obj => {
    const chs = (obj.chapters_appear || []).map(n =>
      `<span class="obj-ch">Ch ${n}</span>`
    ).join('');

    return `
      <div class="obj-card" style="border-top:4px solid ${obj.color}">
        <div class="obj-name">${obj.name}</div>
        <div class="obj-owner" style="color:${obj.color}">${ownerName(obj.owner)}</div>
        <div class="obj-desc">${obj.description}</div>
        ${chs ? `<div class="obj-ch-row">${chs}</div>` : ''}
        <div class="obj-sig">${obj.significance}</div>
      </div>`;
  }).join('');
}

function ownerName(id) {
  const map = { rumi:'Rumi\'s', mira:'Mira\'s', zoey:'Zoey\'s', celine:'Celine\'s' };
  return map[id] || id;
}
