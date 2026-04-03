/* ==========================================
   PLANTS PAGE – full plant profile sheet
   ========================================== */
window.renderPlants = function() {
  const t = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const featured = AppData.plants[0];

  const html = `
    <div class="plants-page page-enter">

      <header style="margin-bottom:1.25rem;">
        <h1 class="section-title" style="font-size:1.75rem; margin-bottom:1rem;">${t('plantGuide')}</h1>
        <div class="search-wrap">
          <span class="material-symbols-outlined search-icon">search</span>
          <input type="text" id="plant-search" class="search-input"
            placeholder="${t('searchPlant')}" aria-label="${t('searchPlant')}" />
        </div>
      </header>

      <!-- Featured -->
      <section style="margin-bottom:1.25rem;">
        <div class="section-header" style="margin-bottom:0.75rem;">
          <h2 style="font-weight:700; font-size:1rem;">${t('featuredPlant')}</h2>
          <span style="font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.15em; color:var(--primary-container);">${t('editorsPickLabel')}</span>
        </div>
        <div class="featured-card" style="cursor:pointer;" id="featured-plant-btn" data-id="${featured.id}">
          <img src="${featured.image}" alt="${featured.name}" loading="lazy" />
          <div class="featured-overlay"></div>
          <div class="featured-content">
            <span class="featured-pill">${tObj(featured.difficultyLabel)}</span>
            <h3 class="featured-title">${featured.name}</h3>
            <p class="featured-desc">${tObj(featured.description)}</p>
            <div class="featured-meta">
              <span><span class="material-symbols-outlined">wb_sunny</span> ${tObj(featured.care.light)}</span>
              <span><span class="material-symbols-outlined">opacity</span> ${tObj(featured.care.water)}</span>
              <span><span class="material-symbols-outlined">thermostat</span> ${featured.care.temp}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Filters -->
      <div class="filter-scroll no-scrollbar" id="filter-row">
        <button class="filter-btn active" data-filter="all">${t('allFilter')}</button>
        <button class="filter-btn" data-filter="indoor">${t('indoorFilter')}</button>
        <button class="filter-btn" data-filter="succulents">${t('succulentFilter')}</button>
        <button class="filter-btn" data-filter="edibles">${t('ediblesFilter')}</button>
      </div>

      <!-- Plant List -->
      <div class="plant-list" id="plant-list">
        ${AppData.plants.map(p => renderPlantListCard(p)).join('')}
      </div>
    </div>

    <!-- Ask AI floating btn -->
    <button class="ask-ai-btn sunset-gradient" id="ask-ai-btn">
      <span class="material-symbols-outlined">psychology</span>
      <span>${t('askAI')}</span>
    </button>
  `;

  document.getElementById('page-container').innerHTML = html;
  document.getElementById('fab').classList.add('hidden');

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPlants(btn.dataset.filter);
    });
  });

  // Search
  document.getElementById('plant-search').addEventListener('input', e => {
    searchPlants(e.target.value.trim().toLowerCase());
  });

  // Ask AI
  document.getElementById('ask-ai-btn').addEventListener('click', () => App.openAIModal());

  // Featured plant
  document.getElementById('featured-plant-btn').addEventListener('click', () => {
    openPlantProfile(featured.id);
  });

  // Plant list cards
  document.querySelectorAll('.plant-card-open[data-id]').forEach(btn => {
    btn.addEventListener('click', () => openPlantProfile(btn.dataset.id));
  });

  document.querySelectorAll('.plant-log-now-btn[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      App.navigate('camera');
      setTimeout(() => openLogMode(btn.dataset.id), 120);
    });
  });
};

function renderPlantListCard(p) {
  const t = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const lang = I18n.currentLang;
  const diffClass = { easy:'diff-easy', inter:'diff-inter', hard:'diff-hard' }[p.difficulty] || 'diff-easy';
  const logCount = (p.logs || []).length;
  const statusClass = { healthy: 'status-healthy', thirsty: 'status-thirsty', warning: 'status-warning' }[p.status] || 'status-healthy';
  const statusLabel = { healthy: t('healthy'), thirsty: t('thirsty'), warning: t('warning') }[p.status] || t('healthy');

  return `
    <div class="plant-list-card plant-card-open" data-category="${p.category}"
      data-search="${(p.name + ' ' + p.latin).toLowerCase()}" data-id="${p.id}"
      style="cursor:pointer; position:relative;">
      <div class="plant-list-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="plant-list-info">
        <div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;">
            <h4 class="plant-list-name">${p.name}</h4>
            <span class="plant-status ${statusClass}" style="flex-shrink:0;">${statusLabel}</span>
          </div>
          <p style="font-size:0.75rem;color:var(--on-surface-variant);font-style:italic;margin-top:0.15rem;">${p.latin}</p>
          <div class="plant-list-icons" style="margin-top:0.4rem;">
            ${p.icons.map(ic => `<span class="material-symbols-outlined">${ic}</span>`).join('')}
          </div>
          <!-- Progress bar mini -->
          <div style="margin-top:0.5rem;height:3px;background:var(--surface-container-high);border-radius:9999px;overflow:hidden;">
            <div style="width:${p.progress}%;height:100%;border-radius:9999px;background:linear-gradient(90deg,var(--primary-container),var(--on-primary-fixed-variant));transition:width 1s;"></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.2rem;">
            ${logCount > 0 ? `<span style="font-size:0.68rem;color:var(--primary);font-weight:700;">📷 ${logCount} ${t('photoCount')}</span>` : '<span></span>'}
            <span style="font-size:0.68rem;color:var(--outline);">${p.progress}%</span>
          </div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
          <span style="font-size:0.72rem;font-weight:700;color:var(--primary);display:flex;align-items:center;gap:0.2rem;">
            <span class="material-symbols-outlined" style="font-size:0.85rem;">open_in_full</span>
            ${lang==='th'?'ดูโปรไฟล์':'View Profile'}
          </span>
          <button class="plant-log-now-btn" data-id="${p.id}"
            style="font-size:0.72rem;font-weight:700;color:var(--tertiary-container);display:flex;align-items:center;gap:0.2rem;padding:0;"
            onclick="event.stopPropagation()">
            <span class="material-symbols-outlined" style="font-size:0.85rem;">photo_camera</span>
            ${t('logToday')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function filterPlants(category) {
  document.querySelectorAll('.plant-list-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'flex' : 'none';
  });
}

function searchPlants(query) {
  document.querySelectorAll('.plant-list-card').forEach(card => {
    card.style.display = (!query || card.dataset.search.includes(query)) ? 'flex' : 'none';
  });
}

/* ==========================================
   PLANT PROFILE SHEET
   Full-screen bottom sheet with:
   - Hero image + plant name
   - Per-plant dashboard
   - Tabs: Overview | History | Care
   ========================================== */
window.openPlantProfile = function(id) {
  const plant = AppData.plants.find(p => p.id === id);
  if (!plant) return;

  // Remove old if exists
  const old = document.getElementById('plant-profile-overlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'plant-profile-overlay';
  overlay.className = 'plant-profile-overlay';
  overlay.innerHTML = buildProfileHTML(plant);
  document.body.appendChild(overlay);

  // Bind events
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeProfileSheet();
  });
  overlay.querySelector('.profile-close-btn')?.addEventListener('click', closeProfileSheet);

  // Tabs
  overlay.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
      overlay.querySelectorAll('.profile-tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      overlay.querySelector('#panel-' + tab.dataset.tab)?.classList.add('active');
    });
  });

  // Action buttons
  overlay.querySelector('#profile-log-btn')?.addEventListener('click', () => {
    closeProfileSheet();
    App.navigate('camera');
    setTimeout(() => openLogMode(plant.id), 150);
  });

  overlay.querySelector('#profile-cal-btn')?.addEventListener('click', () => {
    closeProfileSheet();
    App.navigate('tasks');
  });

  // Animate bars after mount
  requestAnimationFrame(() => {
    setTimeout(() => {
      overlay.querySelectorAll('.height-bar[data-h]').forEach(bar => {
        bar.style.height = bar.dataset.h + '%';
      });
    }, 150);
  });
};

function closeProfileSheet() {
  const overlay = document.getElementById('plant-profile-overlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.2s';
  setTimeout(() => overlay.remove(), 200);
}

function buildProfileHTML(plant) {
  const t  = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const lang = I18n.currentLang;

  const logs = plant.logs || [];
  const logCount = logs.length;

  // ── Per-plant dashboard stats ──────────────────────────
  const heightLogs = logs.filter(l => l.height > 0);
  const latestHeight = heightLogs.length > 0 ? heightLogs[heightLogs.length - 1].height : null;
  const firstHeight = heightLogs.length > 0 ? heightLogs[0].height : null;
  const heightGain = (latestHeight && firstHeight) ? (latestHeight - firstHeight).toFixed(1) : null;

  const firstLogDate = logs.length > 0 ? new Date(logs[0].date) : null;
  const daysTracked = firstLogDate ? Math.max(1, Math.round((Date.now() - firstLogDate.getTime()) / 86400000)) : 0;

  const stageName = lang === 'th' ? (plant.stageTH || plant.stageEN) : (plant.stageEN || plant.stage);
  const diffClass = { easy:'diff-easy', inter:'diff-inter', hard:'diff-hard' }[plant.difficulty] || 'diff-easy';
  const diffLabel = tObj(plant.difficultyLabel);

  // ── Height bar chart ───────────────────────────────────
  const showBars = heightLogs.length > 0;
  const maxH = showBars ? Math.max(...heightLogs.map(l => l.height)) : 150;
  const barData = showBars
    ? heightLogs.slice(-8).map(l => ({
        h: Math.max(5, Math.round((l.height / maxH) * 88)),
        label: new Date(l.date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { day:'numeric', month:'numeric' }),
        val: l.height,
      }))
    : [];

  // ── Log timeline HTML ──────────────────────────────────
  const logsHTML = logCount === 0
    ? `<div class="log-empty-state">
        <span class="material-symbols-outlined">photo_camera</span>
        <h4>${lang==='th'?'ยังไม่มีรูปถ่าย':'No photos yet'}</h4>
        <p>${t('noLogs')}</p>
       </div>`
    : [...logs].reverse().map((l, idx) => {
        const dateStr = new Date(l.date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
          weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
        });
        const timeStr = new Date(l.date).toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-US', {
          hour: '2-digit', minute: '2-digit'
        });
        return `
          <div class="log-full-entry">
            ${l.photo
              ? `<div class="log-full-img"><img src="${l.photo}" alt="Plant log ${idx+1}" loading="lazy" /></div>`
              : `<div class="log-full-no-img"><span class="material-symbols-outlined">image_not_supported</span></div>`
            }
            <div class="log-full-body">
              <div class="log-full-header">
                <div class="log-full-date">
                  <span class="material-symbols-outlined">calendar_today</span>
                  ${dateStr} · ${timeStr}
                </div>
                ${l.height ? `<span class="log-full-height">📏 ${l.height} cm</span>` : ''}
              </div>
              ${l.notes ? `<p class="log-full-notes">${l.notes}</p>` : ''}
              ${l.aiAnalysis ? `<div class="log-full-ai">${l.aiAnalysis}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

  // ── Care guide HTML ─────────────────────────────────────
  const careItems = [
    { icon: '☀️', label: t('lightLabel'), val: tObj(plant.care.light) },
    { icon: '💧', label: t('waterLabel'), val: tObj(plant.care.water) },
    { icon: '🌡️', label: t('tempLabel'),  val: plant.care.temp },
    { icon: '💨', label: t('humidityLabel'), val: plant.care.humidity },
  ];

  return `
    <div class="plant-profile-sheet">
      <div class="sheet-handle"></div>

      <!-- Hero Image -->
      <div class="profile-hero-img">
        <img src="${plant.image}" alt="${plant.name}" loading="lazy" />
        <div class="profile-hero-overlay"></div>
        <button class="profile-close-btn">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div class="profile-hero-content">
          <div class="profile-hero-name">${plant.name}</div>
          <div class="profile-hero-latin">${plant.latin}</div>
          <div class="profile-hero-badges">
            <span class="profile-hero-badge orange">${stageName}</span>
            <span class="profile-hero-badge ${plant.difficulty === 'easy' ? '' : plant.difficulty === 'inter' ? 'blue' : ''}">${diffLabel}</span>
            ${logCount > 0 ? `<span class="profile-hero-badge">📷 ${logCount} ${t('photoCount')}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="profile-body">

        <!-- Per-plant Dashboard -->
        <div class="plant-dashboard-grid">
          <div class="plant-dash-stat" style="border-top-color:#ff7e20;">
            <div class="plant-dash-icon">📷</div>
            <div class="plant-dash-value">${logCount}</div>
            <div class="plant-dash-label">${lang==='th'?'รูปที่บันทึก':'Photos'}</div>
          </div>
          <div class="plant-dash-stat" style="border-top-color:#00aeec;">
            <div class="plant-dash-icon">📅</div>
            <div class="plant-dash-value">${daysTracked}</div>
            <div class="plant-dash-label">${lang==='th'?'วันที่ติดตาม':'Days Tracked'}</div>
          </div>
          <div class="plant-dash-stat" style="border-top-color:#2e7d32;">
            <div class="plant-dash-icon">📏</div>
            <div class="plant-dash-value">${latestHeight ? latestHeight + 'cm' : '—'}</div>
            <div class="plant-dash-label">${lang==='th'?'ความสูงล่าสุด':'Height Now'}</div>
          </div>
          <div class="plant-dash-stat" style="border-top-color:#9b4600;">
            <div class="plant-dash-icon">📈</div>
            <div class="plant-dash-value">${heightGain ? '+' + heightGain + 'cm' : '—'}</div>
            <div class="plant-dash-label">${lang==='th'?'สูงขึ้น':'Growth'}</div>
          </div>
        </div>

        <!-- Growth Progress -->
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-md);padding:1rem;box-shadow:var(--shadow-card);margin-bottom:1.25rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.6rem;">
            <span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--on-surface-variant);">${t('growthProgress')}</span>
            <span style="font-family:var(--font-headline);font-weight:800;color:var(--primary);">${plant.progress}%</span>
          </div>
          <div style="height:0.6rem;background:var(--surface-container-high);border-radius:9999px;overflow:hidden;">
            <div style="width:${plant.progress}%;height:100%;border-radius:9999px;background:linear-gradient(90deg,var(--primary-container),var(--on-primary-fixed-variant));transition:width 1s;"></div>
          </div>
        </div>

        <!-- Height Chart (only if logs with height exist) -->
        ${showBars ? `
        <div class="height-chart-wrap">
          <div class="height-chart-title">
            <span>📏 ${lang==='th'?'ประวัติความสูง':'Height History'}</span>
            <span style="color:var(--primary);font-size:0.85rem;font-weight:800;">${latestHeight} cm</span>
          </div>
          <div class="height-chart-bars">
            ${barData.map(bar => `
              <div class="height-bar-col">
                <div class="height-bar" data-h="${bar.h}" style="height:0%;" title="${bar.val} cm"></div>
                <span class="height-bar-label">${bar.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Tabs -->
        <div class="profile-tabs">
          <button class="profile-tab active" data-tab="history">
            <span class="material-symbols-outlined">photo_library</span>
            ${lang==='th'?'ประวัติ':'History'}
          </button>
          <button class="profile-tab" data-tab="care">
            <span class="material-symbols-outlined">spa</span>
            ${lang==='th'?'การดูแล':'Care'}
          </button>
          <button class="profile-tab" data-tab="about">
            <span class="material-symbols-outlined">info</span>
            ${lang==='th'?'เกี่ยวกับ':'About'}
          </button>
        </div>

        <!-- Tab: History -->
        <div class="profile-tab-panel active" id="panel-history">
          <div class="log-full-timeline">
            ${logsHTML}
          </div>
        </div>

        <!-- Tab: Care -->
        <div class="profile-tab-panel" id="panel-care">
          <div class="care-grid">
            ${careItems.map(c => `
              <div class="care-card">
                <div class="care-card-icon">${c.icon}</div>
                <div class="care-card-label">${c.label}</div>
                <div class="care-card-value">${c.val}</div>
              </div>
            `).join('')}
          </div>
          <!-- Next task -->
          <div style="background:var(--surface-container-low);border-radius:var(--radius-md);padding:1rem;display:flex;align-items:center;gap:0.75rem;">
            <span class="material-symbols-outlined" style="color:var(--primary-container);">${plant.nextTaskIcon}</span>
            <div>
              <p style="font-weight:700;font-size:0.875rem;">${t('nextTask')}</p>
              <p style="font-size:0.8rem;color:var(--on-surface-variant);margin-top:0.1rem;">${tObj(plant.nextTask)}</p>
            </div>
          </div>
        </div>

        <!-- Tab: About -->
        <div class="profile-tab-panel" id="panel-about">
          <div style="background:var(--surface-container-lowest);border-radius:var(--radius-md);padding:1.25rem;box-shadow:var(--shadow-card);">
            <p style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--on-surface-variant);margin-bottom:0.75rem;">${t('aboutPlant')}</p>
            <p style="line-height:1.75;color:var(--on-surface-variant);font-size:0.9rem;">${tObj(plant.description)}</p>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="profile-action-row">
          <button class="profile-action-btn primary sunset-gradient" id="profile-log-btn">
            <span class="material-symbols-outlined">photo_camera</span>
            ${t('logToday')}
          </button>
          <button class="profile-action-btn secondary" id="profile-cal-btn">
            <span class="material-symbols-outlined">event</span>
            ${lang==='th'?'เพิ่มงาน':'Add Task'}
          </button>
        </div>

      </div><!-- /.profile-body -->
    </div><!-- /.plant-profile-sheet -->
  `;
}
