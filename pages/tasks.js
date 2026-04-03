/* ==========================================
   TASK CALENDAR PAGE
   ========================================== */
let calWeekOffset = 0;
let calSelectedDate = new Date().toISOString().split('T')[0];

window.renderTasks = function() {
  const t = I18n.t.bind(I18n);
  const lang = I18n.currentLang;

  const weekLabel = getWeekLabel(calWeekOffset);
  const days = getWeekDays(calWeekOffset);
  const todayKey = AppDataHelpers.todayKey();

  const weekActivity = AppDataHelpers.getWeekActivity(calWeekOffset);
  const tasksDone = weekActivity.filter(a => a.type === 'task').length;
  const totalTasksWeek = Object.values(AppData.calendarTasks)
    .flat()
    .filter(task => {
      // Count tasks in this week
      return days.some(d => d.key === task.dateKey);
    }).length;

  const html = `
    <div class="calendar-page page-enter">

      <!-- Hero Banner -->
      <div class="cal-hero">
        <h1>${t('calendarTitle')}</h1>
        <p>${lang === 'th' ? 'เพิ่มงานและติดตามความก้าวหน้าประจำวัน' : 'Add tasks and track your daily garden progress'}</p>
        <div style="display:flex;gap:1.5rem;margin-top:0.75rem;">
          <div>
            <span style="font-family:var(--font-headline);font-size:1.5rem;font-weight:800;display:block;">${tasksDone}</span>
            <span style="font-size:0.7rem;opacity:0.8;text-transform:uppercase;">${lang==='th'?'เสร็จสัปดาห์นี้':'Done this week'}</span>
          </div>
          <div>
            <span style="font-family:var(--font-headline);font-size:1.5rem;font-weight:800;display:block;">${AppData.plants.length}</span>
            <span style="font-size:0.7rem;opacity:0.8;text-transform:uppercase;">${lang==='th'?'ต้นไม้':'Plants'}</span>
          </div>
        </div>
        <!-- Week progress bar -->
        <div style="margin-top:0.75rem;display:flex;align-items:center;gap:0.75rem;">
          <div style="flex:1;height:5px;background:rgba(255,255,255,0.25);border-radius:3px;overflow:hidden;">
            <div style="width:${totalTasksWeek ? Math.round(tasksDone/totalTasksWeek*100) : 0}%;height:100%;background:white;border-radius:3px;transition:width 0.8s;"></div>
          </div>
          <span style="font-size:0.8rem;font-weight:700;opacity:0.9;">${totalTasksWeek ? Math.round(tasksDone/totalTasksWeek*100) : 0}%</span>
        </div>
      </div>

      <!-- Week Navigation -->
      <div class="week-nav">
        <button class="week-nav-btn" id="prev-week">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <span class="week-nav-title">${weekLabel}</span>
        <button class="week-nav-btn" id="next-week">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <!-- Day Selector -->
      <div class="day-selector">
        ${days.map(d => {
          const tasks = AppDataHelpers.getTasksForDate(d.key);
          const isToday = d.key === todayKey;
          const isSelected = d.key === calSelectedDate;
          const hasTasks = tasks.length > 0;
          return `
            <button class="day-btn ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''} ${hasTasks ? 'has-tasks' : ''}"
              data-date="${d.key}">
              <span class="day-name">${d.name}</span>
              <span class="day-num">${d.num}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Tasks Panel for selected day -->
      <div class="cal-tasks-panel" id="cal-tasks-panel">
        ${renderCalTasksPanel(calSelectedDate)}
      </div>

      <!-- Week Summary mini -->
      <div style="background:var(--surface-container-lowest);border-radius:var(--radius-md);padding:1rem;box-shadow:var(--shadow-card);">
        <p style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--on-surface-variant);margin-bottom:0.75rem;">${t('weekSummary')}</p>
        <div class="week-mini-summary">
          <div class="mini-stat">
            <div class="mini-stat-value">${weekActivity.filter(a=>a.type==='water').length}</div>
            <div class="mini-stat-label">💧 ${t('watered')}</div>
          </div>
          <div class="mini-stat">
            <div class="mini-stat-value">${weekActivity.filter(a=>a.type==='photo').length}</div>
            <div class="mini-stat-label">📷 ${t('photosLogged')}</div>
          </div>
          <div class="mini-stat">
            <div class="mini-stat-value">${tasksDone}</div>
            <div class="mini-stat-label">✅ ${t('tasksCompleted')}</div>
          </div>
        </div>
      </div>

    </div>
  `;

  document.getElementById('page-container').innerHTML = html;

  // Day buttons
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      calSelectedDate = btn.dataset.date;
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('cal-tasks-panel').innerHTML = renderCalTasksPanel(calSelectedDate);
      bindCalTaskEvents();
    });
  });

  // Week nav
  document.getElementById('prev-week').addEventListener('click', () => {
    calWeekOffset--;
    renderTasks();
  });
  document.getElementById('next-week').addEventListener('click', () => {
    calWeekOffset++;
    if (calWeekOffset > 0) calWeekOffset = 0; // no future weeks
    renderTasks();
  });

  bindCalTaskEvents();
};

function renderCalTasksPanel(dateKey) {
  const t = I18n.t.bind(I18n);
  const lang = I18n.currentLang;
  const tasks = AppDataHelpers.getTasksForDate(dateKey);
  const dateObj = new Date(dateKey + 'T12:00:00');
  const dateStr = dateObj.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { weekday:'long', day:'numeric', month:'long' });

  const taskHtml = tasks.length === 0
    ? `<div class="cal-empty">
        <span class="material-symbols-outlined">event_available</span>
        ${t('noActivity')} ${lang==='th' ? 'สำหรับวันนี้' : 'for this day'}
       </div>`
    : `<div class="cal-tasks-list">${tasks.map((task, idx) => `
        <div class="cal-task-item ${task.done ? 'done' : ''}" id="cal-task-${dateKey}-${idx}">
          <button class="cal-task-check ${task.done ? 'checked' : ''}" data-date="${dateKey}" data-idx="${idx}">
            <span class="material-symbols-outlined" style="color:${task.done?'white':'transparent'}">check</span>
          </button>
          <span class="cal-task-name">${task.name}</span>
          <button class="cal-task-del" data-date="${dateKey}" data-idx="${idx}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:0.9rem;">close</span>
          </button>
        </div>
      `).join('')}</div>`;

  return `
    <div class="cal-tasks-header">
      <span class="cal-tasks-date">${dateStr}</span>
      <span style="font-size:0.72rem;color:var(--outline);">${tasks.filter(t=>t.done).length}/${tasks.length} ${lang==='th'?'เสร็จ':'done'}</span>
    </div>
    ${taskHtml}
    <div class="cal-add-row">
      <input type="text" class="cal-add-input" id="cal-task-input" placeholder="${t('taskPlaceholder')}" />
      <button class="cal-add-btn sunset-gradient" id="cal-add-btn">${t('addTask')}</button>
    </div>
  `;
}

function bindCalTaskEvents() {
  // Add task
  const addBtn = document.getElementById('cal-add-btn');
  const addInput = document.getElementById('cal-task-input');
  if (addBtn) {
    addBtn.addEventListener('click', () => addCalTask(addInput));
    addInput.addEventListener('keydown', e => { if (e.key === 'Enter') addCalTask(addInput); });
  }

  // Check tasks
  document.querySelectorAll('.cal-task-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const dateKey = btn.dataset.date;
      const idx = parseInt(btn.dataset.idx);
      const tasks = AppDataHelpers.getTasksForDate(dateKey);
      if (!tasks[idx]) return;
      tasks[idx].done = !tasks[idx].done;
      AppDataHelpers.saveCalendarTasks();
      if (tasks[idx].done) {
        AppDataHelpers.logActivity('task', (I18n.currentLang === 'th' ? 'ทำงานเสร็จ: ' : 'Completed: ') + tasks[idx].name);
        App.showToast(I18n.t('taskDone'));
      }
      // Re-render panel
      document.getElementById('cal-tasks-panel').innerHTML = renderCalTasksPanel(dateKey);
      bindCalTaskEvents();
      // Update dot on day button
      refreshDayDots();
    });
  });

  // Delete tasks
  document.querySelectorAll('.cal-task-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const dateKey = btn.dataset.date;
      const idx = parseInt(btn.dataset.idx);
      AppData.calendarTasks[dateKey].splice(idx, 1);
      AppDataHelpers.saveCalendarTasks();
      document.getElementById('cal-tasks-panel').innerHTML = renderCalTasksPanel(dateKey);
      bindCalTaskEvents();
      refreshDayDots();
    });
  });
}

function addCalTask(input) {
  const name = input.value.trim();
  if (!name) return;
  if (!AppData.calendarTasks[calSelectedDate]) AppData.calendarTasks[calSelectedDate] = [];
  AppData.calendarTasks[calSelectedDate].push({ name, done: false, dateKey: calSelectedDate });
  AppDataHelpers.saveCalendarTasks();
  input.value = '';
  document.getElementById('cal-tasks-panel').innerHTML = renderCalTasksPanel(calSelectedDate);
  bindCalTaskEvents();
  refreshDayDots();
  App.showToast(I18n.currentLang === 'th' ? 'เพิ่มงานแล้ว ✅' : 'Task added! ✅');
}

function refreshDayDots() {
  document.querySelectorAll('.day-btn').forEach(btn => {
    const tasks = AppDataHelpers.getTasksForDate(btn.dataset.date);
    btn.classList.toggle('has-tasks', tasks.length > 0);
  });
}

function getWeekDays(weekOffset) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const days = [];
  const dayNamesEN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dayNamesTH = ['อา','จ','อ','พ','พฤ','ศ','ส'];
  const lang = I18n.currentLang;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - dayOfWeek + i + (weekOffset * 7));
    days.push({
      key: d.toISOString().split('T')[0],
      name: (lang === 'th' ? dayNamesTH : dayNamesEN)[d.getDay()],
      num: d.getDate(),
    });
  }
  return days;
}

function getWeekLabel(weekOffset) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (weekOffset * 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const lang = I18n.currentLang;
  const opts = { day: 'numeric', month: 'short' };
  if (weekOffset === 0) return lang === 'th' ? 'สัปดาห์นี้' : 'This Week';
  if (weekOffset === -1) return lang === 'th' ? 'สัปดาห์ที่แล้ว' : 'Last Week';
  return `${startOfWeek.toLocaleDateString(lang==='th'?'th-TH':'en-US', opts)} – ${endOfWeek.toLocaleDateString(lang==='th'?'th-TH':'en-US', opts)}`;
}
