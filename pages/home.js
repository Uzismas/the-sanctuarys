/* ==========================================
   HOME PAGE – with Weekly Dashboard
   ========================================== */
window.renderHome = function() {
  const t = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const lang = I18n.currentLang;

  const plants = AppData.plants.slice(0, 2);
  const weekActivity = AppDataHelpers.getWeekActivity();

  // Count activity types this week
  const watered  = weekActivity.filter(a => a.type === 'water').length;
  const fertilized = weekActivity.filter(a => a.type === 'fertilize').length;
  const photos   = weekActivity.filter(a => a.type === 'photo').length;
  const tasksDone = weekActivity.filter(a => a.type === 'task').length;

  // Bar chart data (last 7 days)
  const barData = buildBarData();

  const html = `
    <div class="home-page page-enter">

      <!-- Welcome + Weather -->
      <section class="welcome-section">
        <div class="welcome-text">
          <h1>${t('greeting')}, ${AppData.user.name}!</h1>
          <p>${t('greetingSub')}</p>
        </div>
        <div class="weather-card">
          <div class="weather-info">
            <p class="weather-label">☁️ Cloudy</p>
            <p class="weather-temp">24°C</p>
            <p class="weather-hint">${lang === 'th' ? 'เหมาะสำหรับปลูกในร่ม' : 'Ideal for indoor growth'}</p>
          </div>
          <div class="weather-icon">
            <span class="material-symbols-outlined">cloud</span>
          </div>
        </div>
      </section>

      <!-- Weekly Dashboard -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">${t('weekSummary')}</h2>
          <button class="section-link" onclick="App.navigate('tasks')">${t('viewAll')}</button>
        </div>
        <div class="dashboard-grid">
          <div class="dash-stat" style="border-bottom-color:#00aeec;">
            <div class="dash-stat-icon">💧</div>
            <div class="dash-stat-value">${watered}</div>
            <div class="dash-stat-label">${t('watered')}</div>
          </div>
          <div class="dash-stat" style="border-bottom-color:#2e7d32;">
            <div class="dash-stat-icon">🌿</div>
            <div class="dash-stat-value">${fertilized}</div>
            <div class="dash-stat-label">${t('fertilized')}</div>
          </div>
          <div class="dash-stat" style="border-bottom-color:#ff7e20;">
            <div class="dash-stat-icon">✅</div>
            <div class="dash-stat-value">${tasksDone}</div>
            <div class="dash-stat-label">${t('tasksCompleted')}</div>
          </div>
          <div class="dash-stat" style="border-bottom-color:#9b4600;">
            <div class="dash-stat-icon">📷</div>
            <div class="dash-stat-value">${photos}</div>
            <div class="dash-stat-label">${t('photosLogged')}</div>
          </div>
        </div>

        <!-- Activity Bar Chart -->
        <div class="card" style="padding:1.25rem; margin-bottom: 0.5rem;">
          <p style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--on-surface-variant); margin-bottom:0.75rem;">
            ${lang === 'th' ? 'กิจกรรม 7 วันล่าสุด' : 'Last 7 days activity'}
          </p>
          <div class="activity-bars" id="activity-bars">
            ${barData.map(d => `
              <div class="activity-bar-col">
                <div class="activity-bar sunset-gradient" style="height:${d.heightPct}%; border-radius:4px 4px 0 0;"></div>
                <span class="activity-bar-day">${d.label}</span>
              </div>
            `).join('')}
          </div>
          ${weekActivity.length === 0 ? `<p class="cal-empty" style="padding:0.5rem 0; font-size:0.8rem;">${t('noActivity')}</p>` : ''}
        </div>

        <!-- Recent Activity Feed -->
        ${weekActivity.length > 0 ? `
        <div class="activity-list">
          ${weekActivity.slice(0, 4).map(a => `
            <div class="activity-item">
              <div class="activity-dot" style="background:${activityColor(a.type)};"></div>
              <span>${a.desc}</span>
              <span class="activity-time">${relativeTime(a.date)}</span>
            </div>
          `).join('')}
        </div>` : ''}
      </section>

      <!-- AI Insight Card -->
      <section style="margin-top:1.5rem;">
        <div class="ai-insight-card sunset-gradient">
          <div class="ai-insight-blob ai-insight-blob-1"></div>
          <div class="ai-insight-blob ai-insight-blob-2"></div>
          <div class="ai-insight-text" style="position:relative;z-index:1;">
            <div class="ai-insight-badge">
              <span class="material-symbols-outlined">auto_awesome</span>
              AI INSIGHT
            </div>
            <h2>${t('aiInsightTitle')}</h2>
            <p>${t('aiInsightText')}</p>
          </div>
          <div class="ai-insight-img" style="position:relative;z-index:1;">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbiF84afr17r8Zks6_CmUOYkHyUqvRsbLBKU2s7OeXtl8ni_J-5cZoZuS29Ar5WyOaZEcHJfhMU5IQCWWCOVPBUjn7ZzZDd6cTCM63IrmlYZAblSmH6FSdh7BQez1znFocskLvugIp2oNusMaricbC_Lh7LBfGnv3QFp-A8qHGoF3lRAo7AddglhKs01nP_BMX1cdEx4zLLjHL4W2sgB4ZQBDelwICo5oTp_jiUMJ609iFlD8VzLdQhZlS3FqMVGi0fp8pdMcR-oc" alt="Lush foliage" />
          </div>
        </div>
      </section>

      <!-- Active Plants -->
      <section style="margin-top:1.75rem;">
        <div class="section-header">
          <h2 class="section-title">${t('activePlants')}</h2>
          <button class="section-link" onclick="App.navigate('plants')">${t('viewAll')}</button>
        </div>
        <div class="plants-grid">
          ${plants.map(p => renderPlantCard(p)).join('')}
        </div>
      </section>

    </div>
  `;

  document.getElementById('page-container').innerHTML = html;

  requestAnimationFrame(() => {
    // Animate progress bars
    document.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    // Animate activity bars
    document.querySelectorAll('.activity-bar').forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0';
      setTimeout(() => { bar.style.height = h; }, 100);
    });
    // Tap plant card → open plant profile sheet
    document.querySelectorAll('.plant-profile-open[data-id]').forEach(card => {
      card.addEventListener('click', () => openPlantProfile(card.dataset.id));
    });
    // Log Today button → log mode camera
    document.querySelectorAll('.log-today-btn[data-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        App.navigate('camera');
        setTimeout(() => openLogMode(btn.dataset.id), 100);
      });
    });
  });
};

function buildBarData() {
  const days = [];
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const dayNamesTH = ['อา','จ','อ','พ','พฤ','ศ','ส'];
  const lang = I18n.currentLang;
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = AppData.activityLog.filter(a => a.date.startsWith(key)).length;
    days.push({
      label: (lang === 'th' ? dayNamesTH : dayNames)[d.getDay()],
      count,
      heightPct: 0,
    });
  }
  const max = Math.max(...days.map(d => d.count), 1);
  days.forEach(d => { d.heightPct = Math.max(Math.round((d.count / max) * 85), d.count > 0 ? 8 : 3); });
  return days;
}

function activityColor(type) {
  const map = { water: '#00aeec', fertilize: '#2e7d32', photo: '#9b4600', task: '#ff7e20' };
  return map[type] || '#ff7e20';
}

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const lang = I18n.currentLang;
  if (days > 0)  return lang === 'th' ? `${days} วันที่แล้ว` : `${days}d ago`;
  if (hrs > 0)   return lang === 'th' ? `${hrs} ชม.ที่แล้ว` : `${hrs}h ago`;
  if (mins > 0)  return lang === 'th' ? `${mins} น.ที่แล้ว` : `${mins}m ago`;
  return lang === 'th' ? 'เมื่อกี้' : 'Just now';
}

function renderPlantCard(p) {
  const t = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const lang = I18n.currentLang;
  const statusClass = { healthy: 'status-healthy', thirsty: 'status-thirsty', warning: 'status-warning' }[p.status] || 'status-healthy';
  const statusLabel = { healthy: t('healthy'), thirsty: t('thirsty'), warning: t('warning') }[p.status] || t('healthy');
  const stageName = lang === 'th' ? (p.stageTH || p.stageEN || p.stage) : (p.stageEN || p.stage);
  const nextTaskText = tObj(p.nextTask);
  const logCount = (p.logs || []).length;
  return `
    <div class="card plant-profile-open" data-id="${p.id}" style="cursor:pointer;">
      <div class="plant-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="plant-card-badge">${stageName.toUpperCase()}</div>
      </div>
      <div class="plant-card-body">
        <div class="plant-card-header">
          <div>
            <p class="plant-name">${p.name}</p>
            <p class="plant-latin">${p.latin}</p>
          </div>
          <span class="plant-status ${statusClass}">${statusLabel}</span>
        </div>
        <div class="progress-label">
          <span>${t('growthProgress')}</span>
          <span>${p.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill sunset-gradient" data-width="${p.progress}" style="width:0%"></div>
        </div>
        <div class="plant-next-task">
          <span class="material-symbols-outlined">${p.nextTaskIcon}</span>
          <div class="plant-next-task-text">
            <p>${t('nextTask')}</p>
            <p>${nextTaskText}</p>
          </div>
        </div>
        <button class="log-today-btn" data-id="${p.id}"
          style="marginTop:0.75rem; width:100%; padding:0.6rem; border-radius:var(--radius-full); background:var(--primary-fixed); color:var(--primary); font-weight:700; font-size:0.8rem; display:flex; align-items:center; justify-content:center; gap:0.4rem; margin-top:0.75rem;">
          <span class="material-symbols-outlined" style="font-size:1rem;">photo_camera</span>
          ${t('logToday')} ${logCount > 0 ? `· 📷 ${logCount}` : ''}
        </button>
      </div>
    </div>
  `;
}

function renderTaskCard(task) {
  const t = I18n.t.bind(I18n);
  const color = task.color || '#ff7e20';
  const isDone = task.done;
  return `
    <div class="task-card ${isDone ? 'done' : ''}" style="border-left-color:${color};" id="task-card-${task.id}">
      <div class="task-left">
        <div class="task-icon-wrap" style="background:${color}20;">
          <span class="material-symbols-outlined" style="color:${color};">${task.icon}</span>
        </div>
        <div>
          <p class="task-name">${task.name}</p>
          <p class="task-sub">${task.sub}</p>
        </div>
      </div>
      <button class="task-check-btn ${isDone ? 'checked' : ''}"
        data-id="${task.id}"
        style="border-color:${color}; background:${isDone ? color : 'transparent'};"
        aria-label="Complete task">
        <span class="material-symbols-outlined" style="color:${isDone ? 'white' : 'transparent'};">check</span>
      </button>
    </div>
  `;
}

function toggleTask(id, btn) {
  const task = AppData.tasks ? AppData.tasks.find(t => t.id === id) : null;
  if (!task) return;
  task.done = !task.done;
  try { localStorage.setItem('sanctuary_tasks', JSON.stringify(AppData.tasks)); } catch(e) {}
  if (task.done) {
    AppDataHelpers.logActivity('task', (I18n.currentLang === 'th' ? 'ทำงานเสร็จ: ' : 'Completed: ') + task.name);
    App.showToast(I18n.t('taskDone'));
  }
  const card = document.getElementById('task-card-' + id);
  if (card) {
    card.classList.toggle('done', task.done);
    const check = card.querySelector('.task-check-btn');
    const icon  = card.querySelector('.task-check-btn .material-symbols-outlined');
    if (check) { check.style.background = task.done ? color : 'transparent'; check.classList.toggle('checked', task.done); }
    if (icon)  { icon.style.color = task.done ? 'white' : 'transparent'; }
  }
}

// Expose
window.renderPlantCard = renderPlantCard;
window.renderTaskCard = renderTaskCard;
window.toggleTask = toggleTask;
window.relativeTime = relativeTime;
window.activityColor = activityColor;
