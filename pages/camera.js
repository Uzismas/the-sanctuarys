/* ==========================================
   CAMERA PAGE – Two Modes:
   Mode 1 (FAB +): Create New Plant Profile
   Mode 2 (Log Today): Daily log for existing plant
   ========================================== */
let cameraStream = null;
let capturedImageData = null;
let cameraMode = 'new';      // 'new' | 'log'
let logTargetPlantId = null; // for mode 'log'
let facingMode = 'environment';

// Called from Plants/Home pages to switch to log mode
window.openLogMode = function (plantId) {
  cameraMode = 'log';
  logTargetPlantId = plantId;
  renderCamera();
};

window.renderCamera = function (mode) {
  if (mode) cameraMode = mode;
  const t = I18n.t.bind(I18n);
  const tObj = I18n.tObj.bind(I18n);
  const lang = I18n.currentLang;
  const isLog = cameraMode === 'log';
  const targetPlant = isLog ? AppData.plants.find(p => p.id === logTargetPlantId) : null;

  const today = new Date().toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const html = `
    <div class="camera-page page-enter">

      <!-- Mode Toggle Tabs -->
      <div style="display:flex;gap:0;background:var(--surface-container-low);border-radius:var(--radius-md);padding:0.25rem;margin-bottom:1.25rem;">
        <button id="tab-new" class="mode-tab ${!isLog ? 'active' : ''}"
          style="flex:1;padding:0.6rem;border-radius:0.75rem;font-weight:700;font-size:0.875rem;transition:all 0.2s;
          background:${!isLog ? 'var(--primary-container)' : 'transparent'};
          color:${!isLog ? 'white' : 'var(--on-surface-variant)'};">
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;">add_circle</span>
          ${t('addNewPlant')}
        </button>
        <button id="tab-log" class="mode-tab ${isLog ? 'active' : ''}"
          style="flex:1;padding:0.6rem;border-radius:0.75rem;font-weight:700;font-size:0.875rem;transition:all 0.2s;
          background:${isLog ? 'var(--primary-container)' : 'transparent'};
          color:${isLog ? 'white' : 'var(--on-surface-variant)'};">
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;">photo_camera</span>
          ${t('logPhotoTitle')}
        </button>
      </div>

      <!-- Header -->
      <div class="camera-header">
        <h2>${isLog ? t('logPhotoTitle') : t('dailyPhoto')}</h2>
        <p>${isLog ? t('logPhotoSub') : t('dailyPhotoSub')}</p>
      </div>

      <!-- Plant Selector (Log mode only) -->
      ${isLog ? `
      <div class="plant-log-selector">
        <p class="plant-log-selector-label">${t('selectPlantToLog')}</p>
        <div class="plant-log-list no-scrollbar">
          ${AppData.plants.map(p => `
            <div class="plant-log-option ${logTargetPlantId === p.id ? 'selected' : ''}" data-plant-id="${p.id}">
              <div class="plant-log-avatar">
                <img src="${p.image}" alt="${p.name}" />
              </div>
              <span class="plant-log-option-name">${p.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Camera Viewport -->
      <div class="camera-viewport">
        <div class="camera-guide" id="camera-guide">
          <span class="material-symbols-outlined">potted_plant</span>
        </div>
        <video id="camera-video" class="camera-video" autoplay playsinline muted></video>
        <img id="camera-preview" class="camera-preview" alt="Captured plant" />
        <div class="camera-controls">
          <button class="camera-ctrl-btn" id="upload-btn" title="${t('uploadPhoto')}">
            <span class="material-symbols-outlined">image</span>
          </button>
          <div class="shutter-outer">
            <button class="shutter-btn sunset-gradient" id="shutter-btn" title="${t('takePhoto')}">
              <span class="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
          <button class="camera-ctrl-btn" id="flip-btn" title="${t('switchCamera')}">
            <span class="material-symbols-outlined">flip_camera_ios</span>
          </button>
        </div>
      </div>

      <!-- Hidden file input -->
      <input type="file" id="file-input" accept="image/*" capture="environment" style="display:none;" />

      <!-- AI Analysis Result (hidden initially) -->
      <div id="ai-analysis-result" style="display:none; margin-bottom:1rem;">
        <div class="ai-result">
          <div class="ai-result-header">
            <span class="material-symbols-outlined">psychology</span>
            <span>AI Analysis</span>
            <div class="ai-spinner" style="width:1rem;height:1rem;border-width:2px;" id="ai-spin"></div>
          </div>
          <p id="ai-result-text" style="margin-top:0.5rem;">${t('aiAnalyzing')}</p>
        </div>
      </div>

      <!-- Form -->
      <div class="camera-form">
        ${!isLog ? `
        <div class="form-field">
          <label class="form-label">${t('plantName')}</label>
          <div class="form-input-wrap">
            <span class="material-symbols-outlined">local_florist</span>
            <input type="text" id="plant-name-input" placeholder="${t('plantNamePlaceholder')}" />
          </div>
        </div>
        ` : ''}
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">${t('dateLabel')}</label>
            <div class="form-input-wrap">
              <span class="material-symbols-outlined">calendar_today</span>
              <input type="text" id="plant-date" value="${today}" readonly />
            </div>
          </div>
          <div class="form-field">
            <label class="form-label">${t('heightLabel')}</label>
            <div class="form-input-wrap">
              <span class="material-symbols-outlined">straighten</span>
              <input type="number" id="plant-height" placeholder="45" min="0" max="500" />
            </div>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">${t('notesLabel')}</label>
          <div class="form-input-wrap">
            <span class="material-symbols-outlined">notes</span>
            <textarea id="plant-notes" placeholder="${t('notesPlaceholder')}" rows="3"></textarea>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <button class="save-btn sunset-gradient" id="save-plant-btn">
        <span class="material-symbols-outlined ms-filled">${isLog ? 'photo_camera' : 'save'}</span>
        ${isLog ? t('saveDailyPhoto') : t('saveNewPlant')}
      </button>

      <!-- Growth log history (log mode only) -->
      ${isLog && targetPlant && (targetPlant.logs || []).length > 0 ? `
      <div style="background:var(--surface-container-lowest);border-radius:var(--radius-md);padding:1.25rem;box-shadow:var(--shadow-card);margin-bottom:1rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
          <p style="font-weight:700;font-size:0.95rem;">${t('logHistory')}</p>
          <span style="font-size:0.72rem;color:var(--outline);">${targetPlant.logs.length} ${t('photoCount')}</span>
        </div>
        <div class="log-timeline">
          ${[...targetPlant.logs].reverse().slice(0, 5).map(l => `
            <div class="log-entry">
              ${l.photo ? `<div class="log-entry-img"><img src="${l.photo}" alt="log" loading="lazy" /></div>` : ''}
              <div class="log-entry-info">
                <div class="log-entry-date">${new Date(l.date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                ${l.height ? `<div class="log-entry-height">📏 ${l.height} cm</div>` : ''}
                ${l.notes ? `<div class="log-entry-note">${l.notes}</div>` : ''}
                ${l.aiAnalysis ? `<div class="log-entry-ai">🤖 ${l.aiAnalysis}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Tips Card -->
      <div class="tips-card">
        <div class="tips-card-bg"><span class="material-symbols-outlined">psychology</span></div>
        <div class="tips-card-inner">
          <div class="tips-icon"><span class="material-symbols-outlined">lightbulb</span></div>
          <div>
            <p class="tips-title">${t('aiGrowthInsight')}</p>
            <p class="tips-text">${t('aiTip')}</p>
          </div>
        </div>
      </div>

    </div>
  `;

  document.getElementById('page-container').innerHTML = html;

  // Start camera
  startCamera('environment');

  // Mode tabs
  document.getElementById('tab-new').addEventListener('click', () => {
    cameraMode = 'new';
    logTargetPlantId = null;
    renderCamera();
  });
  document.getElementById('tab-log').addEventListener('click', () => {
    cameraMode = 'log';
    if (!logTargetPlantId && AppData.plants.length > 0) logTargetPlantId = AppData.plants[0].id;
    renderCamera();
  });

  // Plant selector (log mode)
  document.querySelectorAll('.plant-log-option').forEach(opt => {
    opt.addEventListener('click', () => {
      logTargetPlantId = opt.dataset.plantId;
      document.querySelectorAll('.plant-log-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Controls
  document.getElementById('shutter-btn').addEventListener('click', capturePhoto);
  document.getElementById('upload-btn').addEventListener('click', () => document.getElementById('file-input').click());
  document.getElementById('flip-btn').addEventListener('click', flipCamera);
  document.getElementById('file-input').addEventListener('change', handleFileUpload);
  document.getElementById('save-plant-btn').addEventListener('click', savePlantAction);
};

// ── Camera Core ────────────────────────────────────────────
async function startCamera(facing) {
  stopCamera();
  facingMode = facing;
  const video = document.getElementById('camera-video');
  if (!video) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } },
      audio: false,
    });
    cameraStream = stream;
    video.srcObject = stream;
    video.style.display = 'block';
    const guide = document.getElementById('camera-guide');
    if (guide) guide.style.display = 'none';
    const preview = document.getElementById('camera-preview');
    if (preview) preview.style.display = 'none';
    capturedImageData = null;
    hideAIResult();
  } catch (err) {
    console.warn('Camera not available:', err);
    showCameraFallback();
  }
}

function stopCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
}

function flipCamera() { startCamera(facingMode === 'environment' ? 'user' : 'environment'); }

function capturePhoto() {
  const video = document.getElementById('camera-video');
  if (!video || !cameraStream) return;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  canvas.getContext('2d').drawImage(video, 0, 0);
  capturedImageData = canvas.toDataURL('image/jpeg', 0.82);
  showPreview(capturedImageData);
  stopCamera();
  runAIAnalysis(capturedImageData);
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    capturedImageData = ev.target.result;
    showPreview(capturedImageData);
    stopCamera();
    runAIAnalysis(capturedImageData);
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function showPreview(src) {
  const video = document.getElementById('camera-video');
  const preview = document.getElementById('camera-preview');
  const guide = document.getElementById('camera-guide');
  if (video) video.style.display = 'none';
  if (preview) { preview.src = src; preview.style.display = 'block'; }
  if (guide) guide.style.display = 'none';
}

function showCameraFallback() {
  const guide = document.getElementById('camera-guide');
  const video = document.getElementById('camera-video');
  if (guide) guide.style.display = 'flex';
  if (video) video.style.display = 'none';
}

// ── AI Analysis ────────────────────────────────────────────
let lastAIResult = '';
let lastAIObject = null;

async function runAIAnalysis(imageData) {
  const resultDiv = document.getElementById('ai-analysis-result');
  const resultText = document.getElementById('ai-result-text');
  const aiSpin = document.getElementById('ai-spin');
  if (!resultDiv || !resultText) return;

  resultDiv.style.display = 'block';
  resultText.textContent = I18n.t('aiAnalyzing');
  if (aiSpin) aiSpin.style.display = 'block';

  const lang = I18n.currentLang;
  
  try {
    const aiResult = await AIService.analyzePlantImage(imageData);
    if (aiSpin) aiSpin.style.display = 'none';

    if (aiResult) {
      lastAIObject = aiResult;
      lastAIResult = `${aiResult.health} (${aiResult.confidence} - ${aiResult.latin}). ${aiResult.care}`;
      resultText.textContent = '🤖 ' + lastAIResult;

      // Auto-fill form if in 'new' mode and user hasn't typed anything
      if (cameraMode === 'new') {
        const nameInput = document.getElementById('plant-name-input');
        const notesInput = document.getElementById('plant-notes');
        if (nameInput && !nameInput.value.trim()) {
          nameInput.value = aiResult.name;
        }
        if (notesInput && !notesInput.value.trim()) {
          notesInput.value = aiResult.tips;
        }
      }
    } else {
      resultText.textContent = lang === 'th' ? '❌ ไม่สามารถระบุต้นไม้ได้ ลองถ่ายรูปให้ชัดขึ้นนะคะ' : '❌ Could not identify the plant. Try a clearer photo.';
    }

    // If this is a log, show transition comparison
    const isLog = cameraMode === 'log';
    const targetPlant = isLog ? AppData.plants.find(p => p.id === logTargetPlantId) : null;
    if (targetPlant && targetPlant.logs.length > 0) {
      const lastLog = targetPlant.logs[targetPlant.logs.length - 1];
      const daysSince = Math.round((Date.now() - new Date(lastLog.date).getTime()) / 86400000);
      const comparison = lang === 'th'
        ? `\n📅 บันทึกล่าสุดเมื่อ ${daysSince} วันที่แล้ว`
        : `\n📅 Last logged ${daysSince} day${daysSince !== 1 ? 's' : ''} ago`;
      resultText.innerHTML += `<div style="margin-top:0.4rem; font-size:0.75rem; opacity:0.7;">${comparison}</div>`;
    }
  } catch (err) {
    console.error('Vision logic error:', err);
    if (aiSpin) aiSpin.style.display = 'none';
    resultText.textContent = '❌ Error analysis';
  }
}

function hideAIResult() {
  const d = document.getElementById('ai-analysis-result');
  if (d) d.style.display = 'none';
  lastAIResult = '';
}

// ── Save Logic ─────────────────────────────────────────────
function savePlantAction() {
  if (cameraMode === 'log') {
    saveDailyLog();
  } else {
    saveNewPlant();
  }
}

function saveDailyLog() {
  const lang = I18n.currentLang;
  const plant = AppData.plants.find(p => p.id === logTargetPlantId);
  if (!plant) {
    App.showToast(lang === 'th' ? 'กรุณาเลือกต้นไม้ก่อน' : 'Please select a plant first');
    return;
  }
  const height = document.getElementById('plant-height')?.value;
  const notes = document.getElementById('plant-notes')?.value.trim();

  const logEntry = {
    date: new Date().toISOString(),
    photo: capturedImageData || null,
    height: height ? parseFloat(height) : null,
    notes: notes || '',
    aiAnalysis: lastAIResult || '',
  };

  if (!plant.logs) plant.logs = [];
  plant.logs.push(logEntry);

  // Update plant progress slightly
  plant.progress = Math.min(100, plant.progress + 2);

  AppDataHelpers.savePlantLogs();
  AppDataHelpers.logActivity('photo', (lang === 'th' ? 'บันทึกรูป: ' : 'Logged photo: ') + plant.name);
  AppData.user.photosTaken++;

  App.showToast(lang === 'th' ? `บันทึก ${plant.name} แล้ว! 📷` : `${plant.name} logged! 📷`);
  // Stay on camera page, refresh to show new log
  stopCamera();
  setTimeout(() => renderCamera(), 400);
}

function saveNewPlant() {
  const lang = I18n.currentLang;
  const name = document.getElementById('plant-name-input')?.value.trim();
  if (!name) {
    App.showToast(lang === 'th' ? 'กรุณาใส่ชื่อต้นไม้' : 'Please enter a plant name');
    return;
  }
  const height = document.getElementById('plant-height')?.value;
  const notes = document.getElementById('plant-notes')?.value.trim();

  const newPlant = {
    id: 'user_' + Date.now(),
    name,
    latin: lastAIObject ? lastAIObject.latin : (lang === 'th' ? 'ต้นไม้ของฉัน' : 'My Plant'),
    category: lastAIObject ? 'indoor' : 'indoor', // Simple assumption or derive from AI
    stage: 'growing',
    stageEN: 'Growing',
    stageTH: 'กำลังเติบโต',
    status: lastAIObject ? lastAIObject.status : 'healthy',
    progress: 10,
    nextTask: { en: 'Take next photo in 1 day', th: 'ถ่ายรูปครั้งต่อไปใน 1 วัน' },
    nextTaskIcon: 'photo_camera',
    difficulty: 'easy',
    difficultyLabel: { en: 'Easy', th: 'ง่าย' },
    image: capturedImageData || 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80',
    icons: ['eco', 'water_drop', 'thermostat'],
    care: {
      light: { 
        en: lastAIObject ? lastAIObject.care.split('.')[0] : 'Moderate', 
        th: lastAIObject ? lastAIObject.care.split('.')[0] : 'แสงปานกลาง' 
      },
      water: { en: 'As needed', th: 'ตามต้องการ' },
      temp: '15–30°C',
      humidity: '40–60%',
    },
    description: { 
      en: (lastAIObject ? lastAIObject.care : notes) || 'User-added plant via AI.', 
      th: (lastAIObject ? lastAIObject.care : notes) || 'ต้นไม้ที่เพิ่มโดยผู้ใช้ผ่าน AI' 
    },
    userAdded: true,
    logs: [],
  };

  // Add initial log if photo taken
  if (capturedImageData || notes || height) {
    newPlant.logs.push({
      date: new Date().toISOString(),
      photo: capturedImageData || null,
      height: height ? parseFloat(height) : null,
      notes: notes || '',
      aiAnalysis: lastAIResult || '',
    });
  }

  AppData.plants.push(newPlant);
  AppData.user.plantsSaved++;
  AppDataHelpers.saveUserPlants();
  AppDataHelpers.savePlantLogs();
  AppDataHelpers.logActivity('photo', (lang === 'th' ? 'เพิ่มต้นไม้ใหม่: ' : 'Added new plant: ') + name);

  stopCamera();
  App.showToast(I18n.t('plantSaved'));

  // Switch to log mode for this plant
  cameraMode = 'log';
  logTargetPlantId = newPlant.id;
  setTimeout(() => App.navigate('plants'), 600);
}

// Cleanup on page leave
window.cameraCleanup = function () { stopCamera(); };
