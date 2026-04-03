/* ==========================================
   PROFILE PAGE
   ========================================== */
window.renderProfile = function() {
  const t = I18n.t.bind(I18n);
  const user = AppData.user;

  const html = `
    <div class="profile-page page-enter">

      <!-- Hero -->
      <section class="profile-hero">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar-ring">
            <div class="profile-avatar-inner">
              <img src="${user.avatar}" alt="Profile" />
            </div>
          </div>
          <div class="profile-badge-icon">
            <span class="material-symbols-outlined ms-filled">stars</span>
          </div>
        </div>
        <h1 class="profile-name">${user.name}</h1>
        <div class="profile-level">
          <span class="material-symbols-outlined ms-filled">military_tech</span>
          <span>Level ${user.level} ${I18n.currentLang === 'th' ? 'ปรมาจารย์' : 'Master Gardener'}</span>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="stats-grid">
        <div class="stat-card">
          <span class="stat-value" id="stat-plants">${AppData.plants.length}</span>
          <span class="stat-label">${t('plantsSaved')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${user.daysTracking}</span>
          <span class="stat-label">${t('daysTracking')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${user.photosTaken}</span>
          <span class="stat-label">${t('photosTaken')}</span>
        </div>
      </section>

      <!-- Settings -->
      <section class="settings-section">
        <p class="settings-section-title">${t('settingsPrivacy')}</p>
        <div class="settings-list">
          <button class="settings-item" id="settings-account">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined">person</span></div>
              <span class="settings-label">${t('account')}</span>
            </div>
            <span class="material-symbols-outlined settings-chevron">chevron_right</span>
          </button>
          <button class="settings-item" id="settings-notif">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined">notifications</span></div>
              <span class="settings-label">${t('notifications')}</span>
            </div>
            <span class="material-symbols-outlined settings-chevron">chevron_right</span>
          </button>
          <button class="settings-item" id="settings-privacy">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined">lock</span></div>
              <span class="settings-label">${t('privacy')}</span>
            </div>
            <span class="material-symbols-outlined settings-chevron">chevron_right</span>
          </button>
          <button class="settings-item" id="settings-lang">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined">translate</span></div>
              <span class="settings-label">${t('language')}</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="font-size:0.875rem; font-weight:700; color:var(--primary);">${I18n.currentLang.toUpperCase()}</span>
              <span class="material-symbols-outlined settings-chevron">chevron_right</span>
            </div>
          </button>
          <button class="settings-item" id="settings-dark">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined" id="settings-dark-icon">dark_mode</span></div>
              <span class="settings-label">${document.documentElement.classList.contains('dark') ? (I18n.currentLang === 'th' ? 'โหมดมืด (เปิด)' : 'Dark Mode (On)') : (I18n.currentLang === 'th' ? 'โหมดมืด (ปิด)' : 'Dark Mode (Off)')}</span>
            </div>
            <span class="material-symbols-outlined settings-chevron">chevron_right</span>
          </button>
          <button class="settings-item" id="settings-help">
            <div class="settings-item-left">
              <div class="settings-icon"><span class="material-symbols-outlined">help_center</span></div>
              <span class="settings-label">${t('helpCenter')}</span>
            </div>
            <span class="material-symbols-outlined settings-chevron">chevron_right</span>
          </button>
        </div>
      </section>

      <!-- Logout -->
      <button class="logout-btn" id="logout-btn">
        <span class="material-symbols-outlined">logout</span>
        ${t('logout')}
      </button>

      <!-- App Version -->
      <p style="text-align:center; font-size:0.75rem; color:var(--outline); margin-bottom:1rem;">
        ทำโดยทีม : DragonlawX
      </p>

    </div>
  `;

  document.getElementById('page-container').innerHTML = html;

  // Settings interactions
  document.getElementById('settings-lang').addEventListener('click', () => {
    I18n.toggle();
    App.showToast(I18n.currentLang === 'th' ? 'เปลี่ยนเป็นภาษาไทย 🇹🇭' : 'Switched to English 🇬🇧');
    I18n.applyToPage();
    renderProfile(); // re-render with new lang
  });

  document.getElementById('settings-dark').addEventListener('click', () => {
    App.toggleDark();
    renderProfile(); // re-render to show updated label
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm(I18n.currentLang === 'th' ? 'ต้องการออกจากระบบ?' : 'Log out of The Sanctuary?')) {
      App.showToast(I18n.currentLang === 'th' ? 'ออกจากระบบแล้ว 👋' : 'Logged out! 👋');
      setTimeout(() => App.navigate('home'), 800);
    }
  });

  document.getElementById('settings-account').addEventListener('click', () => {
    App.showToast(I18n.currentLang === 'th' ? 'ฟีเจอร์นี้กำลังมา!' : 'Account settings coming soon!');
  });

  document.getElementById('settings-notif').addEventListener('click', () => {
    App.showToast(I18n.currentLang === 'th' ? 'ร้องขอการแจ้งเตือน...' : 'Requesting notification permission...');
    if ('Notification' in window) {
      Notification.requestPermission().then(p => {
        App.showToast(p === 'granted'
          ? (I18n.currentLang === 'th' ? 'เปิดการแจ้งเตือนแล้ว ✅' : 'Notifications enabled ✅')
          : (I18n.currentLang === 'th' ? 'ถูกปฏิเสธ' : 'Permission denied'));
      });
    }
  });

  document.getElementById('settings-privacy').addEventListener('click', () => {
    App.showToast(I18n.currentLang === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy policy coming soon!');
  });

  document.getElementById('settings-help').addEventListener('click', () => {
    App.showToast(I18n.currentLang === 'th' ? 'ศูนย์ช่วยเหลือกำลังมา!' : 'Help Center coming soon!');
  });
};
