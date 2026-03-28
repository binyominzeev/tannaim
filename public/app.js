/* global fetch */
'use strict';

// ══════════════════════════════════════════════════════════════════
//  Masekhtot catalogue
// ══════════════════════════════════════════════════════════════════
const MASEKHTOT = {
  Zeraim: [
    { en: 'Berakhot',    he: 'ברכות',    sefaria: 'Mishnah_Berakhot' },
    { en: 'Peah',        he: 'פאה',       sefaria: 'Mishnah_Peah' },
    { en: 'Demai',       he: 'דמאי',      sefaria: 'Mishnah_Demai' },
    { en: 'Kilayim',     he: 'כלאים',     sefaria: 'Mishnah_Kilayim' },
    { en: 'Sheviit',     he: 'שביעית',    sefaria: 'Mishnah_Sheviit' },
    { en: 'Terumot',     he: 'תרומות',    sefaria: 'Mishnah_Terumot' },
    { en: 'Maasrot',     he: 'מעשרות',    sefaria: 'Mishnah_Maasrot' },
    { en: 'Maaser Sheni',he: 'מעשר שני',  sefaria: 'Mishnah_Maaser_Sheni' },
    { en: 'Challah',     he: 'חלה',       sefaria: 'Mishnah_Challah' },
    { en: 'Orlah',       he: 'ערלה',      sefaria: 'Mishnah_Orlah' },
    { en: 'Bikkurim',    he: 'ביכורים',   sefaria: 'Mishnah_Bikkurim' }
  ],
  Moed: [
    { en: 'Shabbat',     he: 'שבת',       sefaria: 'Mishnah_Shabbat' },
    { en: 'Eruvin',      he: 'עירובין',   sefaria: 'Mishnah_Eruvin' },
    { en: 'Pesachim',    he: 'פסחים',     sefaria: 'Mishnah_Pesachim' },
    { en: 'Shekalim',    he: 'שקלים',     sefaria: 'Mishnah_Shekalim' },
    { en: 'Yoma',        he: 'יומא',      sefaria: 'Mishnah_Yoma' },
    { en: 'Sukkah',      he: 'סוכה',      sefaria: 'Mishnah_Sukkah' },
    { en: 'Beitzah',     he: 'ביצה',      sefaria: 'Mishnah_Beitzah' },
    { en: 'Rosh Hashanah',he: 'ראש השנה', sefaria: 'Mishnah_Rosh_Hashanah' },
    { en: 'Taanit',      he: 'תענית',     sefaria: 'Mishnah_Taanit' },
    { en: 'Megillah',    he: 'מגילה',     sefaria: 'Mishnah_Megillah' },
    { en: 'Moed Katan',  he: 'מועד קטן',  sefaria: 'Mishnah_Moed_Katan' },
    { en: 'Chagigah',    he: 'חגיגה',     sefaria: 'Mishnah_Chagigah' }
  ],
  Nashim: [
    { en: 'Yevamot',     he: 'יבמות',     sefaria: 'Mishnah_Yevamot' },
    { en: 'Ketubot',     he: 'כתובות',    sefaria: 'Mishnah_Ketubot' },
    { en: 'Nedarim',     he: 'נדרים',     sefaria: 'Mishnah_Nedarim' },
    { en: 'Nazir',       he: 'נזיר',      sefaria: 'Mishnah_Nazir' },
    { en: 'Sotah',       he: 'סוטה',      sefaria: 'Mishnah_Sotah' },
    { en: 'Gittin',      he: 'גיטין',     sefaria: 'Mishnah_Gittin' },
    { en: 'Kiddushin',   he: 'קידושין',   sefaria: 'Mishnah_Kiddushin' }
  ],
  Nezikin: [
    { en: 'Bava Kamma',  he: 'בבא קמא',   sefaria: 'Mishnah_Bava_Kamma' },
    { en: 'Bava Metzia', he: 'בבא מציעא', sefaria: 'Mishnah_Bava_Metzia' },
    { en: 'Bava Batra',  he: 'בבא בתרא',  sefaria: 'Mishnah_Bava_Batra' },
    { en: 'Sanhedrin',   he: 'סנהדרין',   sefaria: 'Mishnah_Sanhedrin' },
    { en: 'Makkot',      he: 'מכות',      sefaria: 'Mishnah_Makkot' },
    { en: 'Shevuot',     he: 'שבועות',    sefaria: 'Mishnah_Shevuot' },
    { en: 'Eduyot',      he: 'עדויות',    sefaria: 'Mishnah_Eduyot' },
    { en: 'Avodah Zarah',he: 'עבודה זרה', sefaria: 'Mishnah_Avodah_Zarah' },
    { en: 'Avot',        he: 'אבות',      sefaria: 'Mishnah_Avot' },
    { en: 'Horayot',     he: 'הוריות',    sefaria: 'Mishnah_Horayot' }
  ],
  Kodashim: [
    { en: 'Zevachim',    he: 'זבחים',     sefaria: 'Mishnah_Zevachim' },
    { en: 'Menachot',    he: 'מנחות',     sefaria: 'Mishnah_Menachot' },
    { en: 'Chullin',     he: 'חולין',     sefaria: 'Mishnah_Chullin' },
    { en: 'Bekhorot',    he: 'בכורות',    sefaria: 'Mishnah_Bekhorot' },
    { en: 'Arakhin',     he: 'ערכין',     sefaria: 'Mishnah_Arakhin' },
    { en: 'Temurah',     he: 'תמורה',     sefaria: 'Mishnah_Temurah' },
    { en: 'Keritot',     he: 'כריתות',    sefaria: 'Mishnah_Keritot' },
    { en: 'Meilah',      he: 'מעילה',     sefaria: 'Mishnah_Meilah' },
    { en: 'Tamid',       he: 'תמיד',      sefaria: 'Mishnah_Tamid' },
    { en: 'Middot',      he: 'מידות',     sefaria: 'Mishnah_Middot' },
    { en: 'Kinnim',      he: 'קינים',     sefaria: 'Mishnah_Kinnim' }
  ],
  Taharot: [
    { en: 'Keilim',      he: 'כלים',      sefaria: 'Mishnah_Keilim' },
    { en: 'Ohalot',      he: 'אהלות',     sefaria: 'Mishnah_Ohalot' },
    { en: 'Negaim',      he: 'נגעים',     sefaria: 'Mishnah_Negaim' },
    { en: 'Parah',       he: 'פרה',       sefaria: 'Mishnah_Parah' },
    { en: 'Taharot',     he: 'טהרות',     sefaria: 'Mishnah_Taharot' },
    { en: 'Mikvaot',     he: 'מקוואות',   sefaria: 'Mishnah_Mikvaot' },
    { en: 'Niddah',      he: 'נידה',      sefaria: 'Mishnah_Niddah' },
    { en: 'Makhshirin',  he: 'מכשירין',   sefaria: 'Mishnah_Makhshirin' },
    { en: 'Zavim',       he: 'זבים',      sefaria: 'Mishnah_Zavim' },
    { en: 'Tevul Yom',   he: 'טבול יום',  sefaria: 'Mishnah_Tevul_Yom' },
    { en: 'Yadayim',     he: 'ידים',      sefaria: 'Mishnah_Yadayim' },
    { en: 'Uktzin',      he: 'עוקצין',    sefaria: 'Mishnah_Uktzin' }
  ]
};

// ══════════════════════════════════════════════════════════════════
//  Application state
// ══════════════════════════════════════════════════════════════════
const state = {
  tannaim: [],          // loaded from backend
  tannaColorMap: {},    // tannaId → color index
  currentMasechet: null,// { en, he, sefaria }
  loadedText: null,     // { he:[[]], en:[[]] }
  recordedArgs: [],     // arguments for current masechet
  allArgs: [],          // all recorded arguments
  showHighlight: true,
  activeFilters: new Set(), // tanna ids to highlight
  pendingMishna: null,  // mishna data for modal
  editingArgId: null,   // argument id being edited
  argsViewMode: 'pairs',// 'pairs' | 'list'
};

// ══════════════════════════════════════════════════════════════════
//  Utility helpers
// ══════════════════════════════════════════════════════════════════
function stripNikud(str) {
  // Remove Hebrew diacritical marks (nikud + cantillation)
  return str.replace(/[\u0591-\u05C7]/g, '');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(msg, isError = false) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast' + (isError ? ' error' : '');
  el.style.display = 'block';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// ══════════════════════════════════════════════════════════════════
//  API helpers
// ══════════════════════════════════════════════════════════════════
async function apiGet(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiPost(path, body) {
  const r = await fetch(path, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiPut(path, body) {
  const r = await fetch(path, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiDelete(path) {
  const r = await fetch(path, { method: 'DELETE' });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

// ══════════════════════════════════════════════════════════════════
//  Tanna name detection
// ══════════════════════════════════════════════════════════════════
function buildTannaPatterns(tannaim) {
  // Sort by longest search term first to avoid partial-match issues
  const entries = [];
  for (const t of tannaim) {
    for (const term of t.search_he) {
      entries.push({ id: t.id, lang: 'he', term: stripNikud(term) });
    }
    for (const term of t.search_en) {
      entries.push({ id: t.id, lang: 'en', term });
    }
  }
  entries.sort((a, b) => b.term.length - a.term.length);
  return entries;
}

function detectTannaim(text, lang) {
  const plain = lang === 'he' ? stripNikud(text) : text;
  const patterns = state._patterns || [];
  // Use same range-overlap logic as highlighting to avoid false submatches
  const ranges = [];
  for (const p of patterns) {
    if (p.lang !== lang) continue;
    let idx = 0;
    while (true) {
      const pos = plain.indexOf(p.term, idx);
      if (pos === -1) break;
      const end = pos + p.term.length;
      if (!ranges.some(r => r.start < end && r.end > pos)) {
        ranges.push({ start: pos, end, id: p.id });
      }
      idx = pos + 1;
    }
  }
  const found = new Set(ranges.map(r => r.id));
  return [...found];
}

/**
 * Highlight tanna names in text, returning HTML string.
 * We replace from longest match to shortest to avoid double-replacing.
 */
function highlightTannaim(text, lang) {
  if (!state.showHighlight) return escapeHtml(text);

  const plain = lang === 'he' ? stripNikud(text) : text;
  const patterns = state._patterns || [];

  // Build non-overlapping replacement ranges
  const ranges = []; // { start, end, id, term }
  for (const p of patterns) {
    if (p.lang !== lang) continue;
    if (state.activeFilters.size > 0 && !state.activeFilters.has(p.id)) continue;
    let idx = 0;
    while (true) {
      const pos = plain.indexOf(p.term, idx);
      if (pos === -1) break;
      const end = pos + p.term.length;
      // Check overlap with existing ranges
      if (!ranges.some(r => r.start < end && r.end > pos)) {
        ranges.push({ start: pos, end, id: p.id, term: p.term });
      }
      idx = pos + 1;
    }
  }
  ranges.sort((a, b) => a.start - b.start);

  // Build output
  let result = '';
  let cursor = 0;
  for (const r of ranges) {
    result += escapeHtml(text.slice(cursor, r.start));
    const colorIdx = state.tannaColorMap[r.id] || 0;
    const tanna = state.tannaim.find(t => t.id === r.id);
    const label = tanna ? (lang === 'he' ? tanna.name_he : tanna.name_en) : r.id;
    result += `<span class="tanna-tag tanna-color-${colorIdx}" title="${escapeHtml(label)}" data-tanna-id="${r.id}">${escapeHtml(text.slice(r.start, r.end))}</span>`;
    cursor = r.end;
  }
  result += escapeHtml(text.slice(cursor));
  return result;
}

// ══════════════════════════════════════════════════════════════════
//  Sefaria API
// ══════════════════════════════════════════════════════════════════
async function fetchMasechet(sefariaRef) {
  // Use our backend proxy so the browser doesn't need direct Sefaria access
  const url = `/api/sefaria/${encodeURIComponent(sefariaRef)}`;
  const r = await fetch(url);
  if (!r.ok) {
    const err = await r.json().catch(() => ({ error: r.statusText }));
    throw new Error(err.error || `Server error: ${r.status}`);
  }
  const data = await r.json();

  // Normalise to nested arrays [chapter][mishna]
  function normalise(arr) {
    if (!Array.isArray(arr)) return [];
    if (arr.length === 0) return [];
    // If first element is a string → single chapter
    if (typeof arr[0] === 'string') return [arr];
    // If first element is an array → already nested
    if (Array.isArray(arr[0])) return arr;
    return [arr];
  }

  return {
    he: normalise(data.he),
    en: normalise(data.text || data.en || []),
    heTitle: data.heTitle || '',
    title: data.title || sefariaRef
  };
}

// ══════════════════════════════════════════════════════════════════
//  Explorer rendering
// ══════════════════════════════════════════════════════════════════
function renderExplorer() {
  const { loadedText, currentMasechet, recordedArgs } = state;
  if (!loadedText || !currentMasechet) return;

  // Update masechet title
  document.getElementById('masechet-title-he').textContent = currentMasechet.he;
  document.getElementById('masechet-title-en').textContent = currentMasechet.en;

  // Build a set of recorded refs for quick lookup
  const recordedRefs = new Set(recordedArgs.map(a => a.ref));

  const container = document.getElementById('chapters-container');
  container.innerHTML = '';

  const { he, en } = loadedText;
  const numChapters = Math.max(he.length, en.length);

  for (let c = 0; c < numChapters; c++) {
    const heChap = he[c] || [];
    const enChap = en[c] || [];
    const numMishnayot = Math.max(heChap.length, enChap.length);

    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'chapter-block';
    chapterDiv.innerHTML = `<div class="chapter-heading">Chapter ${c + 1} — פרק ${toHebrewNumeral(c + 1)}</div>`;

    for (let m = 0; m < numMishnayot; m++) {
      const heText = heChap[m] || '';
      const enText = enChap[m] || '';
      const ref = `${currentMasechet.sefaria}.${c + 1}.${m + 1}`;
      const refLabel = `${currentMasechet.en} ${c + 1}:${m + 1}`;

      const detectedIds = detectMishnaArguments(heText, enText);
      const isRecorded = recordedRefs.has(ref);

      const mishnaDiv = document.createElement('div');
      mishnaDiv.className = 'mishna-block';
      mishnaDiv.dataset.ref = ref;
      mishnaDiv.dataset.chapter = c + 1;
      mishnaDiv.dataset.mishna = m + 1;

      let badgeHtml = '';
      if (isRecorded) {
        badgeHtml = `<span class="mishna-recorded-badge">✓ Recorded</span>`;
      } else if (detectedIds.length >= 2) {
        badgeHtml = `<span class="mishna-detected-badge">⚡ ${detectedIds.length} tannaim detected</span>`;
      }

      const detectedNames = detectedIds.map(id => {
        const t = state.tannaim.find(t => t.id === id);
        return t ? t.name_en : id;
      }).join(', ');

      mishnaDiv.innerHTML = `
        <div class="mishna-meta">
          <span class="mishna-ref-label">${escapeHtml(refLabel)}</span>
          ${badgeHtml}
        </div>
        <div class="mishna-body">
          <div class="mishna-lang he-text">${highlightTannaim(heText, 'he')}</div>
          <div class="mishna-lang">${highlightTannaim(enText, 'en')}</div>
        </div>
        <div class="mishna-actions">
          <button class="btn-record" data-ref="${escapeHtml(ref)}">＋ Record Argument</button>
          ${detectedIds.length >= 2 ? `<span class="detected-tannaim-list">Detected: ${escapeHtml(detectedNames)}</span>` : ''}
        </div>
      `;

      // Store data on the element for the modal
      mishnaDiv.dataset.heText = heText;
      mishnaDiv.dataset.enText = enText;
      mishnaDiv.dataset.detectedIds = JSON.stringify(detectedIds);

      chapterDiv.appendChild(mishnaDiv);
    }

    container.appendChild(chapterDiv);
  }

  // Update explorer stats
  renderExplorerStats();

  // Show filter sidebar
  document.getElementById('filter-section').style.display = '';
  document.getElementById('stats-section').style.display = '';
}

function detectMishnaArguments(heText, enText) {
  const heIds = detectTannaim(heText, 'he');
  const enIds = detectTannaim(enText, 'en');
  // Union of detected ids
  const merged = new Set([...heIds, ...enIds]);
  return [...merged];
}

function renderExplorerStats() {
  const { loadedText, recordedArgs, currentMasechet } = state;
  if (!loadedText) return;

  let total = 0;
  loadedText.he.forEach(ch => { total += ch.length; });

  const statsEl = document.getElementById('explorer-stats');
  const argsHere = recordedArgs.filter(a => a.masechet_en === currentMasechet.en).length;
  statsEl.innerHTML = `
    <div class="stat-row"><span>Mishnayot</span><span class="stat-val">${total}</span></div>
    <div class="stat-row"><span>Chapters</span><span class="stat-val">${loadedText.he.length}</span></div>
    <div class="stat-row"><span>Recorded arguments</span><span class="stat-val">${argsHere}</span></div>
  `;
}

function renderTannaFilterList() {
  const container = document.getElementById('tanna-filter-list');
  container.innerHTML = '';
  for (const t of state.tannaim) {
    const item = document.createElement('label');
    item.className = 'tanna-filter-item';
    const colorIdx = state.tannaColorMap[t.id] || 0;
    item.innerHTML = `
      <input type="checkbox" value="${t.id}" ${state.activeFilters.size === 0 ? 'checked' : (state.activeFilters.has(t.id) ? 'checked' : '')} />
      <span class="tanna-tag tanna-color-${colorIdx}" style="pointer-events:none">${escapeHtml(t.name_en)}</span>
    `;
    item.querySelector('input').addEventListener('change', e => {
      if (e.target.checked) {
        state.activeFilters.add(t.id);
      } else {
        state.activeFilters.delete(t.id);
      }
      // If all checked, use empty set (show all)
      if (state.activeFilters.size === state.tannaim.length) state.activeFilters.clear();
      renderExplorer();
    });
    container.appendChild(item);
  }
}

// ══════════════════════════════════════════════════════════════════
//  Arguments view rendering
// ══════════════════════════════════════════════════════════════════
async function loadAndRenderArguments() {
  try {
    state.allArgs = await apiGet('/api/arguments');
    renderArgumentsView();
  } catch (e) {
    showToast('Failed to load arguments: ' + e.message, true);
  }
}

function renderArgumentsView() {
  const { allArgs, tannaim, argsViewMode } = state;

  // Apply filters
  let filtered = allArgs;
  const tannaFilter = document.getElementById('arg-tanna-filter').value;
  const masechetFilter = document.getElementById('arg-masechet-filter').value;
  if (tannaFilter) filtered = filtered.filter(a => a.tannaim_ids.includes(tannaFilter));
  if (masechetFilter) filtered = filtered.filter(a => a.masechet_en === masechetFilter);

  // Populate masechet filter options
  const masekhtot = [...new Set(allArgs.map(a => a.masechet_en))].sort();
  const mf = document.getElementById('arg-masechet-filter');
  const currentMVal = mf.value;
  mf.innerHTML = '<option value="">All Masekhtot</option>';
  masekhtot.forEach(m => {
    const o = document.createElement('option');
    o.value = m; o.textContent = m;
    if (m === currentMVal) o.selected = true;
    mf.appendChild(o);
  });

  // Populate tanna filter options
  const tf = document.getElementById('arg-tanna-filter');
  const currentTVal = tf.value;
  tf.innerHTML = '<option value="">All Tannaim</option>';
  for (const t of tannaim) {
    const o = document.createElement('option');
    o.value = t.id; o.textContent = t.name_en;
    if (t.id === currentTVal) o.selected = true;
    tf.appendChild(o);
  }

  // Stats
  renderArgsStats(filtered);

  if (filtered.length === 0) {
    document.getElementById('args-placeholder').style.display = '';
    document.getElementById('pairs-container').style.display = 'none';
    document.getElementById('list-container').style.display = 'none';
    return;
  }
  document.getElementById('args-placeholder').style.display = 'none';

  if (argsViewMode === 'pairs') {
    document.getElementById('pairs-container').style.display = '';
    document.getElementById('list-container').style.display = 'none';
    renderPairsView(filtered);
  } else {
    document.getElementById('pairs-container').style.display = 'none';
    document.getElementById('list-container').style.display = '';
    renderListView(filtered);
  }
}

function renderArgsStats(args) {
  const el = document.getElementById('args-stats');
  const tannaSet = new Set();
  args.forEach(a => a.tannaim_ids.forEach(id => tannaSet.add(id)));
  const masechetSet = new Set(args.map(a => a.masechet_en));
  el.innerHTML = `
    <div class="stat-row"><span>Arguments</span><span class="stat-val">${args.length}</span></div>
    <div class="stat-row"><span>Tannaim</span><span class="stat-val">${tannaSet.size}</span></div>
    <div class="stat-row"><span>Masekhtot</span><span class="stat-val">${masechetSet.size}</span></div>
  `;
}

function renderPairsView(args) {
  // Group by unique sorted tanna-pair keys
  const pairMap = new Map();
  for (const arg of args) {
    const sorted = [...arg.tannaim_ids].sort();
    // All 2-combos
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const key = `${sorted[i]}|${sorted[j]}`;
        if (!pairMap.has(key)) pairMap.set(key, { ids: [sorted[i], sorted[j]], args: [] });
        pairMap.get(key).args.push(arg);
      }
    }
  }

  const container = document.getElementById('pairs-container');
  container.innerHTML = '';

  if (pairMap.size === 0) {
    container.innerHTML = '<p class="placeholder" style="padding:2rem">No pairs found with current filters.</p>';
    return;
  }

  // Sort pairs by argument count desc
  const sorted = [...pairMap.entries()].sort((a, b) => b[1].args.length - a[1].args.length);

  for (const [key, { ids, args: pairArgs }] of sorted) {
    const t1 = state.tannaim.find(t => t.id === ids[0]);
    const t2 = state.tannaim.find(t => t.id === ids[1]);
    if (!t1 || !t2) continue;

    const card = document.createElement('div');
    card.className = 'pair-card';
    card.innerHTML = `
      <div class="pair-header">
        <div class="pair-title">
          <span>${escapeHtml(t1.name_en)}</span>
          <span>⟺</span>
          <span>${escapeHtml(t2.name_en)}</span>
          <span class="he-text" style="font-size:.95rem;opacity:.75">${escapeHtml(t1.name_he)} / ${escapeHtml(t2.name_he)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:.5rem">
          <span class="pair-count">${pairArgs.length} argument${pairArgs.length !== 1 ? 's' : ''}</span>
          <span class="pair-chevron">▾</span>
        </div>
      </div>
      <div class="pair-body">
        ${pairArgs.map(arg => renderArgItem(arg)).join('')}
      </div>
    `;

    card.querySelector('.pair-header').addEventListener('click', () => {
      card.classList.toggle('open');
    });

    container.appendChild(card);
  }

  // Attach edit handlers
  attachEditHandlers(container);
}

function renderListView(args) {
  const container = document.getElementById('list-container');
  // Sort by masechet, chapter, mishna
  const sorted = [...args].sort((a, b) => {
    if (a.masechet_en !== b.masechet_en) return a.masechet_en.localeCompare(b.masechet_en);
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.mishna - b.mishna;
  });

  container.innerHTML = sorted.map(arg => {
    const tannaNames = arg.tannaim_ids.map(id => {
      const t = state.tannaim.find(t => t.id === id);
      return t ? `<span class="tanna-chip">${escapeHtml(t.name_en)}</span>` : '';
    }).join('');

    return `
      <div class="list-arg-card">
        <div class="arg-meta">
          <span class="arg-ref">${escapeHtml(arg.ref.replace(/_/g, ' ').replace(/\./g, ' '))}</span>
          ${arg.label ? `<span class="arg-label">${escapeHtml(arg.label)}</span>` : ''}
          <button class="arg-edit-btn" data-arg-id="${arg.id}">✎ Edit</button>
        </div>
        <div class="list-arg-tannaim">${tannaNames}</div>
        ${arg.description ? `<div class="arg-description">${escapeHtml(arg.description)}</div>` : ''}
        <div class="arg-texts">
          <div class="arg-text-he he-text">${escapeHtml(arg.text_he)}</div>
          <div>${escapeHtml(arg.text_en)}</div>
        </div>
      </div>
    `;
  }).join('');

  attachEditHandlers(container);
}

function renderArgItem(arg) {
  const refDisplay = arg.ref.replace(/_/g, ' ').replace(/\./g, ' ');
  return `
    <div class="arg-item">
      <div class="arg-meta">
        <span class="arg-ref">${escapeHtml(refDisplay)}</span>
        ${arg.label ? `<span class="arg-label">${escapeHtml(arg.label)}</span>` : ''}
        <button class="arg-edit-btn" data-arg-id="${arg.id}">✎ Edit</button>
      </div>
      ${arg.description ? `<div class="arg-description">${escapeHtml(arg.description)}</div>` : ''}
      <div class="arg-texts">
        <div class="arg-text-he he-text">${escapeHtml(arg.text_he)}</div>
        <div>${escapeHtml(arg.text_en)}</div>
      </div>
    </div>
  `;
}

function attachEditHandlers(container) {
  container.querySelectorAll('.arg-edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openEditModal(Number(btn.dataset.argId));
    });
  });
}

// ══════════════════════════════════════════════════════════════════
//  Record Argument Modal
// ══════════════════════════════════════════════════════════════════
function openRecordModal(mishnaEl) {
  const ref = mishnaEl.dataset.ref;
  const heText = mishnaEl.dataset.heText;
  const enText = mishnaEl.dataset.enText;
  const detectedIds = JSON.parse(mishnaEl.dataset.detectedIds || '[]');

  state.pendingMishna = { ref, heText, enText, detectedIds };

  document.getElementById('modal-ref').textContent = ref.replace(/_/g, ' ').replace(/\./g, ' ');
  document.getElementById('modal-text-he').textContent = heText;
  document.getElementById('modal-text-en').textContent = enText;
  document.getElementById('modal-description').value = '';
  document.getElementById('modal-label').value = '';

  // Build tanna checkboxes
  const box = document.getElementById('modal-tanna-checkboxes');
  box.innerHTML = state.tannaim.map(t => `
    <label class="tanna-checkbox-item">
      <input type="checkbox" name="tanna" value="${t.id}" ${detectedIds.includes(t.id) ? 'checked' : ''} />
      <span>${escapeHtml(t.name_en)}</span>
      <span class="he" style="opacity:.7">${escapeHtml(t.name_he)}</span>
    </label>
  `).join('');

  document.getElementById('modal-record').style.display = 'flex';
}

function closeRecordModal() {
  document.getElementById('modal-record').style.display = 'none';
  state.pendingMishna = null;
}

async function saveRecordModal() {
  const { pendingMishna, currentMasechet } = state;
  if (!pendingMishna || !currentMasechet) return;

  const checked = [...document.querySelectorAll('#modal-tanna-checkboxes input[name="tanna"]:checked')];
  const tannaim_ids = checked.map(el => el.value);
  if (tannaim_ids.length < 2) {
    showToast('Please select at least 2 tannaim.', true);
    return;
  }

  const description = document.getElementById('modal-description').value.trim();
  const label = document.getElementById('modal-label').value.trim();

  const [, chapter, mishna] = pendingMishna.ref.split('.').map((s, i) => i > 0 ? Number(s) : s);

  try {
    const arg = await apiPost('/api/arguments', {
      masechet_en: currentMasechet.en,
      masechet_he: currentMasechet.he,
      chapter,
      mishna,
      tannaim_ids,
      ref: pendingMishna.ref,
      description,
      label,
      text_he: pendingMishna.heText,
      text_en: pendingMishna.enText
    });
    state.recordedArgs.push(arg);
    state.allArgs.push(arg);
    closeRecordModal();
    showToast('Argument recorded ✓');
    renderExplorer();
  } catch (e) {
    showToast('Error saving: ' + e.message, true);
  }
}

// ══════════════════════════════════════════════════════════════════
//  Edit Argument Modal
// ══════════════════════════════════════════════════════════════════
function openEditModal(argId) {
  const arg = state.allArgs.find(a => a.id === argId);
  if (!arg) return;
  state.editingArgId = argId;

  document.getElementById('edit-modal-ref').textContent = arg.ref.replace(/_/g, ' ').replace(/\./g, ' ');
  document.getElementById('edit-modal-text-he').textContent = arg.text_he;
  document.getElementById('edit-modal-text-en').textContent = arg.text_en;
  document.getElementById('edit-modal-description').value = arg.description || '';
  document.getElementById('edit-modal-label').value = arg.label || '';

  const box = document.getElementById('edit-modal-tanna-checkboxes');
  box.innerHTML = state.tannaim.map(t => `
    <label class="tanna-checkbox-item">
      <input type="checkbox" name="tanna" value="${t.id}" ${arg.tannaim_ids.includes(t.id) ? 'checked' : ''} />
      <span>${escapeHtml(t.name_en)}</span>
      <span class="he" style="opacity:.7">${escapeHtml(t.name_he)}</span>
    </label>
  `).join('');

  document.getElementById('modal-edit').style.display = 'flex';
}

function closeEditModal() {
  document.getElementById('modal-edit').style.display = 'none';
  state.editingArgId = null;
}

async function saveEditModal() {
  const argId = state.editingArgId;
  if (argId == null) return;

  const checked = [...document.querySelectorAll('#edit-modal-tanna-checkboxes input[name="tanna"]:checked')];
  const tannaim_ids = checked.map(el => el.value);
  if (tannaim_ids.length < 2) {
    showToast('Please select at least 2 tannaim.', true);
    return;
  }

  const description = document.getElementById('edit-modal-description').value.trim();
  const label = document.getElementById('edit-modal-label').value.trim();

  try {
    const updated = await apiPut(`/api/arguments/${argId}`, { tannaim_ids, description, label });
    const idx = state.allArgs.findIndex(a => a.id === argId);
    if (idx !== -1) state.allArgs[idx] = updated;
    const ridx = state.recordedArgs.findIndex(a => a.id === argId);
    if (ridx !== -1) state.recordedArgs[ridx] = updated;
    closeEditModal();
    showToast('Argument updated ✓');
    renderArgumentsView();
    renderExplorer();
  } catch (e) {
    showToast('Error updating: ' + e.message, true);
  }
}

async function deleteEditArg() {
  const argId = state.editingArgId;
  if (argId == null) return;
  if (!confirm('Delete this argument? This cannot be undone.')) return;

  try {
    await apiDelete(`/api/arguments/${argId}`);
    state.allArgs = state.allArgs.filter(a => a.id !== argId);
    state.recordedArgs = state.recordedArgs.filter(a => a.id !== argId);
    closeEditModal();
    showToast('Argument deleted.');
    renderArgumentsView();
    renderExplorer();
  } catch (e) {
    showToast('Error deleting: ' + e.message, true);
  }
}

// ══════════════════════════════════════════════════════════════════
//  View switching
// ══════════════════════════════════════════════════════════════════
function switchView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

  if (viewName === 'arguments') {
    loadAndRenderArguments();
  }
}

// ══════════════════════════════════════════════════════════════════
//  Masechet selector logic
// ══════════════════════════════════════════════════════════════════
function onSederChange() {
  const seder = document.getElementById('seder-select').value;
  const masechetSel = document.getElementById('masechet-select');
  const loadBtn = document.getElementById('btn-load');
  masechetSel.innerHTML = '<option value="">— Masechet —</option>';
  masechetSel.disabled = !seder;
  loadBtn.disabled = true;

  if (seder && MASEKHTOT[seder]) {
    MASEKHTOT[seder].forEach(m => {
      const o = document.createElement('option');
      o.value = m.sefaria;
      o.textContent = `${m.en} / ${m.he}`;
      o.dataset.en = m.en;
      o.dataset.he = m.he;
      masechetSel.appendChild(o);
    });
    masechetSel.disabled = false;
  }
}

function onMasechetChange() {
  const val = document.getElementById('masechet-select').value;
  document.getElementById('btn-load').disabled = !val;
}

async function onLoadMasechet() {
  const seder = document.getElementById('seder-select').value;
  const sel = document.getElementById('masechet-select');
  const sefariaRef = sel.value;
  const selectedOpt = sel.options[sel.selectedIndex];
  if (!sefariaRef) return;

  const enName = selectedOpt.dataset.en;
  const heName = selectedOpt.dataset.he;

  // Find masechet entry
  const masechet = MASEKHTOT[seder].find(m => m.sefaria === sefariaRef);
  state.currentMasechet = masechet;
  state.activeFilters.clear();

  // Show spinner
  document.getElementById('explorer-placeholder').style.display = 'none';
  document.getElementById('loading-spinner').style.display = 'flex';
  document.getElementById('masechet-content').style.display = 'none';

  try {
    const data = await fetchMasechet(sefariaRef);
    state.loadedText = { he: data.he, en: data.en };

    // Load recorded args for this masechet
    state.recordedArgs = await apiGet(`/api/arguments?masechet=${encodeURIComponent(enName)}`);

    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('masechet-content').style.display = '';

    renderTannaFilterList();
    renderExplorer();
  } catch (e) {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('explorer-placeholder').style.display = '';
    showToast('Failed to load masechet: ' + e.message, true);
    console.error(e);
  }
}

// ══════════════════════════════════════════════════════════════════
//  Hebrew numeral helper
// ══════════════════════════════════════════════════════════════════
function toHebrewNumeral(n) {
  const nums = [
    [1000,'א׳'],[900,'תתק'],[800,'תת'],[700,'תש'],[600,'תר'],
    [500,'תק'],[400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],
    [90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],
    [40,'מ'],[30,'ל'],[20,'כ'],[19,'יט'],[18,'יח'],
    [17,'יז'],[16,'טז'],[15,'טו'],[10,'י'],[9,'ט'],
    [8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],
    [3,'ג'],[2,'ב'],[1,'א']
  ];
  let result = '';
  for (const [val, glyph] of nums) {
    while (n >= val) { result += glyph; n -= val; }
  }
  return result;
}

// ══════════════════════════════════════════════════════════════════
//  Export
// ══════════════════════════════════════════════════════════════════
function exportJson() {
  const data = {
    exported_at: new Date().toISOString(),
    tannaim: state.tannaim,
    arguments: state.allArgs
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'tannaim-arguments.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════════════════
//  Initialisation
// ══════════════════════════════════════════════════════════════════
async function init() {
  // Load tannaim from backend
  try {
    state.tannaim = await apiGet('/api/tannaim');
  } catch (e) {
    showToast('Could not load tannaim list: ' + e.message, true);
    return;
  }

  // Assign colors
  state.tannaim.forEach((t, i) => {
    state.tannaColorMap[t.id] = i % 11;
  });

  // Build search patterns
  state._patterns = buildTannaPatterns(state.tannaim);

  // Wire up navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Wire up masechet selector
  document.getElementById('seder-select').addEventListener('change', onSederChange);
  document.getElementById('masechet-select').addEventListener('change', onMasechetChange);
  document.getElementById('btn-load').addEventListener('click', onLoadMasechet);

  // Highlight toggle
  document.getElementById('toggle-highlight').addEventListener('change', e => {
    state.showHighlight = e.target.checked;
    renderExplorer();
  });

  // Explorer content click delegation
  document.getElementById('chapters-container').addEventListener('click', e => {
    const btn = e.target.closest('.btn-record');
    if (btn) {
      const mishnaEl = btn.closest('.mishna-block');
      if (mishnaEl) openRecordModal(mishnaEl);
    }
  });

  // Record modal
  document.getElementById('btn-modal-close').addEventListener('click', closeRecordModal);
  document.getElementById('btn-modal-cancel').addEventListener('click', closeRecordModal);
  document.getElementById('btn-modal-save').addEventListener('click', saveRecordModal);
  document.getElementById('modal-record').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeRecordModal();
  });

  // Edit modal
  document.getElementById('btn-edit-close').addEventListener('click', closeEditModal);
  document.getElementById('btn-edit-cancel').addEventListener('click', closeEditModal);
  document.getElementById('btn-edit-save').addEventListener('click', saveEditModal);
  document.getElementById('btn-edit-delete').addEventListener('click', deleteEditArg);
  document.getElementById('modal-edit').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEditModal();
  });

  // Arguments view filters
  document.getElementById('arg-tanna-filter').addEventListener('change', renderArgumentsView);
  document.getElementById('arg-masechet-filter').addEventListener('change', renderArgumentsView);

  // View mode toggle in arguments
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.argsViewMode = btn.dataset.mode;
      renderArgumentsView();
    });
  });

  // Export
  document.getElementById('btn-export').addEventListener('click', exportJson);
}

document.addEventListener('DOMContentLoaded', init);
