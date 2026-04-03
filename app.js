/* ==========================================
   THE SANCTUARY – Main App Controller v2
   ========================================== */
window.App = (function() {
  let currentPage = 'home';
  let toastTimer = null;

  // ── Init ──────────────────────────────────────────────
  function init() {
    // Apply saved dark mode
    const savedDark = localStorage.getItem('sanctuary_dark');
    if (savedDark === 'true') {
      document.documentElement.classList.add('dark');
      updateDarkIcon(true);
    }

    // Apply saved language
    I18n.applyToPage();

    // Bottom nav
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.page));
    });

    // Dark mode toggle (header)
    document.getElementById('dark-toggle').addEventListener('click', toggleDark);

    // Language toggle (header)
    document.getElementById('lang-toggle').addEventListener('click', () => {
      I18n.toggle();
      navigate(currentPage);  // re-render current page
    });

    // FAB → new plant
    document.getElementById('fab').addEventListener('click', () => {
      cameraMode = 'new';
      logTargetPlantId = null;
      navigate('camera');
    });

    // AI Modal close
    document.getElementById('ai-modal-close').addEventListener('click', closeAIModal);
    document.getElementById('ai-modal').addEventListener('click', e => {
      if (e.target === e.currentTarget) closeAIModal();
    });

    // Camera modal close
    document.getElementById('camera-modal').addEventListener('click', e => {
      if (e.target === e.currentTarget) closeAllModals();
    });

    // Hash routing
    const hash = location.hash.replace('#', '');
    const validPages = ['home', 'plants', 'tasks', 'camera', 'profile'];
    navigate(validPages.includes(hash) ? hash : 'home');

    window.addEventListener('hashchange', () => {
      const p = location.hash.replace('#', '');
      if (validPages.includes(p) && p !== currentPage) navigate(p, true);
    });
  }

  // ── Navigate ──────────────────────────────────────────
  function navigate(page, fromHistory = false) {
    // Cleanup camera when leaving
    if (currentPage === 'camera' && page !== 'camera') {
      if (typeof cameraCleanup === 'function') cameraCleanup();
    }

    currentPage = page;
    if (!fromHistory) history.pushState(null, '', '#' + page);

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });

    // FAB visibility
    const fab = document.getElementById('fab');
    fab.classList.toggle('hidden', page === 'camera');

    // Close modals
    closeAllModals();

    // Render
    switch (page) {
      case 'home':    renderHome();    break;
      case 'plants':  renderPlants();  break;
      case 'tasks':   renderTasks();   break;
      case 'camera':  renderCamera();  break;
      case 'profile': renderProfile(); break;
      default:        renderHome();
    }

    I18n.applyToPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ── Dark Mode ─────────────────────────────────────────
  function toggleDark() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('sanctuary_dark', isDark);
    updateDarkIcon(isDark);
    showToast(isDark
      ? (I18n.currentLang === 'th' ? '🌙 โหมดกลางคืน' : '🌙 Dark mode on')
      : (I18n.currentLang === 'th' ? '☀️ โหมดกลางวัน' : '☀️ Light mode on')
    );
  }

  function updateDarkIcon(isDark) {
    const icon = document.getElementById('dark-icon');
    if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
  }

  // ── AI Modal ──────────────────────────────────────────
  function openAIModal() {
    const modal = document.getElementById('ai-modal');
    const body = document.getElementById('ai-modal-body');
    const t = I18n.t.bind(I18n);
    const tObj = I18n.tObj.bind(I18n);
    document.querySelector('#ai-modal .modal-title').textContent = t('aiAnalysis');
    body.innerHTML = `<div class="ai-loading"><div class="ai-spinner"></div><p>${t('aiAnalyzing')}</p></div>`;
    modal.classList.remove('hidden');

    setTimeout(() => {
      const ai = AppData.aiResponses.default;
      body.innerHTML = `
        <div class="ai-result-full">
          <div class="ai-plant-id">
            <img src="${AppData.plants[0].image}" alt="plant" loading="lazy" />
            <div class="ai-plant-id-info">
              <h3>${tObj(ai.name)}</h3>
              <p style="font-style:italic;">Monstera Deliciosa</p>
              <span class="ai-confidence">
                <span class="material-symbols-outlined" style="font-size:0.75rem;">verified</span>
                ${I18n.currentLang==='th'?'ความมั่นใจ ':'Confidence '}${ai.confidence}
              </span>
            </div>
          </div>
          <div class="ai-sections">
            <div class="ai-section">
              <div class="ai-section-title"><span class="material-symbols-outlined">favorite</span> ${t('aiHealth')}</div>
              <p>${tObj(ai.health)}</p>
            </div>
            <div class="ai-section">
              <div class="ai-section-title"><span class="material-symbols-outlined">water_drop</span> ${t('aiCare')}</div>
              <p>${tObj(ai.care)}</p>
            </div>
            <div class="ai-section">
              <div class="ai-section-title"><span class="material-symbols-outlined">trending_up</span> ${t('aiGrowth')}</div>
              <p>${tObj(ai.growth)}</p>
            </div>
            <div class="ai-section">
              <div class="ai-section-title"><span class="material-symbols-outlined">lightbulb</span> ${t('aiTips')}</div>
              <p>${tObj(ai.tips)}</p>
            </div>
          </div>
        </div>
      `;
    }, 2000);
  }

  function closeAIModal() {
    document.getElementById('ai-modal').classList.add('hidden');
  }

  function closeAllModals() {
    document.getElementById('ai-modal').classList.add('hidden');
    document.getElementById('camera-modal').classList.add('hidden');
  }

  // ── Toast ─────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    if (toastTimer) { clearTimeout(toastTimer); toast.classList.add('hidden'); }
    setTimeout(() => {
      toast.textContent = msg;
      toast.classList.remove('hidden');
      toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
    }, 50);
  }

  return { init, navigate, toggleDark, openAIModal, showToast };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
