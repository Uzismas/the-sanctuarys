/* ==========================================
   CHAT PAGE – Sanctuary AI Assistant
   ========================================== */
window.renderChat = function() {
  const t = I18n.t.bind(I18n);
  const lang = I18n.currentLang;

  const html = `
    <div class="chat-page page-enter">
      <header class="chat-header">
        <div class="chat-header-info">
          <div class="ai-avatar-mini sunset-gradient">
            <span class="material-symbols-outlined">psychology</span>
          </div>
          <div>
            <h2 class="chat-title">${t('chatTitle')}</h2>
            <p class="chat-status">
              <span class="status-dot"></span> Online
            </p>
          </div>
        </div>
      </header>

      <div class="message-list no-scrollbar" id="message-list">
        <!-- Messages will be injected here -->
      </div>

      <div class="chat-input-area">
        <div class="chat-input-wrapper">
          <input type="text" id="chat-input" placeholder="${t('chatPlaceholder')}" autocomplete="off" />
          <button id="chat-send-btn" class="chat-send-btn">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('page-container').innerHTML = html;
  updateMessageList();
  
  // Events
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  const handleSend = () => {
    const text = input.value.trim();
    if (text) sendMessage(text);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Hide FAB in chat
  document.getElementById('fab').classList.add('hidden');
};

function updateMessageList() {
  const list = document.getElementById('message-list');
  if (!list) return;

  const t = I18n.t.bind(I18n);
  const history = AppData.chatHistory || [];

  list.innerHTML = history.map(msg => `
    <div class="message-row ${msg.role === 'user' ? 'user' : 'ai'}">
      <div class="message-bubble">
        ${msg.role === 'ai' && msg.text === 'chatWelcome' ? t('chatWelcome') : msg.text}
        <span class="message-time">${formatTime(msg.time)}</span>
      </div>
    </div>
  `).join('');

  list.scrollTop = list.scrollHeight;
}

function sendMessage(text) {
  const input = document.getElementById('chat-input');
  input.value = '';
  input.disabled = true;

  // Add user message
  AppData.chatHistory.push({
    role: 'user',
    text: text,
    time: new Date().toISOString()
  });
  updateMessageList();

  // Show thinking
  const list = document.getElementById('message-list');
  const thinkingRow = document.createElement('div');
  thinkingRow.className = 'message-row ai thinking';
  thinkingRow.innerHTML = `
    <div class="message-bubble">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  list.appendChild(thinkingRow);
  list.scrollTop = list.scrollHeight;

  // Process response
  setTimeout(() => {
    thinkingRow.remove();
    const response = generateAIResponse(text);
    AppData.chatHistory.push({
      role: 'ai',
      text: response,
      time: new Date().toISOString()
    });
    updateMessageList();
    input.disabled = false;
    input.focus();
  }, 1500 + Math.random() * 1000);
}

function generateAIResponse(input) {
  const t = I18n.t.bind(I18n);
  const lang = I18n.currentLang;
  const q = input.toLowerCase();

  // Simple keyword matching for demo
  if (q.includes('hello') || q.includes('hi') || q.includes('สวัสดี')) {
    return lang === 'th' ? 'สวัสดีค่ะ! วันนี้สวนของคุณเป็นอย่างไรบ้างคะ?' : 'Hello! How is your garden doing today?';
  }

  // Check if user mentions one of their plants
  const plant = AppData.plants.find(p => q.includes(p.name.toLowerCase()));
  if (plant) {
    const status = plant.status === 'healthy' 
      ? (lang === 'th' ? 'ดูแข็งแรงดีมากเลยค่ะ' : 'looks very healthy!')
      : (lang === 'th' ? 'กำลังต้องการการดูแลเป็นพิเศษอยู่นะคะ' : 'needs some extra attention right now.');
    
    return lang === 'th' 
      ? `ต้น ${plant.name} ของคุณ${status} ล่าสุดมีระดับความก้าวหน้าอยู่ที่ ${plant.progress}% ค่ะ` 
      : `Your ${plant.name} ${status} It's currently at ${plant.progress}% growth progress.`;
  }

  if (q.includes('water') || q.includes('รดน้ำ')) {
    return lang === 'th' 
      ? 'การรดน้ำควรเช็คหน้าดินก่อนนะคะ ถ้าดินแห้งลึกประมาณ 1-2 นิ้วค่อยรดค่ะ' 
      : 'Always check the top inch of soil before watering. If it feels dry, it\'s time for a drink!';
  }

  if (q.includes('light') || q.includes('แดด') || q.includes('แสง')) {
    return lang === 'th'
      ? 'ต้นไม้ส่วนใหญ่ชอบแสงสว่างแต่ไม่ชอบแดดจัดโดยตรงค่ะ ลองวางใกล้หน้าต่างที่มีม่านกรองแสงนะคะ'
      : 'Most houseplants love bright, indirect light. Placing them near a sheer-curtained window is usually perfect!';
  }

  return lang === 'th'
    ? 'ฉันเข้าใจที่คุณถามนะคะ แต่ข้อมูลเรื่องนี้กำลังเรียนรู้เพิ่มเติมอยู่ค่ะ แต่เบื้องต้นลองตรวจสอบความชื้นของดินดูได้นะคะ 🌱'
    : 'That\'s a great question! I\'m still learning about that specific topic, but remember that consistent care and observation are key to a happy plant! 🌱';
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}
