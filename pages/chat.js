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
  (async () => {
    const response = await AIService.getChatResponse(AppData.chatHistory.slice(0, -1), text);
    thinkingRow.remove();
    AppData.chatHistory.push({
      role: 'ai',
      text: response,
      time: new Date().toISOString()
    });
    updateMessageList();
    input.disabled = false;
    input.focus();
  })();
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}
