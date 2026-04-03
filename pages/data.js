/* ==========================================
   DATA STORE – Plants, Tasks, User, Logs
   ========================================== */
window.AppData = {
  user: {
    name: 'Plant Lover',
    level: 12,
    title: 'Master Gardener',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASi9reGX85ibuC3uwkJsuWW_iUkO_8OSehqBCE6vLcvp--7nsMZStvZ_CM71IpqscUYVToFkZIJuAr8zJMat4pkTBz3vPZAX0FZCM1LLOwQoEzHHDyiDufpsmJwmszvU3sNJBGAzMHOSmYJlQGbNWlZAUZ_io9Ik0uYH2SeYMOLbssXYi60fJLcyVX9zSXnTLMtQC9Na4hA2CqU8iz7BxqHu9qWWMi_acZSG20Vf0SM1VNPqblPPYzHicZi1QyCJ3vXP5eysPx61g',
    plantsSaved: 48,
    daysTracking: 156,
    photosTaken: 312,
  },

  plants: [
    {
      id: 'monstera',
      name: 'Monstera',
      latin: 'Monstera Deliciosa',
      category: 'indoor',
      stage: 'mature',
      stageEN: 'Mature Stage',
      stageTH: 'โตเต็มที่',
      status: 'healthy',
      progress: 82,
      nextTask: { en: 'Watering in 2 days', th: 'รดน้ำอีก 2 วัน' },
      nextTaskIcon: 'water_drop',
      difficulty: 'inter',
      difficultyLabel: { en: 'Intermediate', th: 'ปานกลาง' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU0oajr50AP77K9shat54-zzmqv6MFprwXSjTLS1obTw1aBxx_SNnkCLCzOBwVR3FvLfhSunF3rEuk7Qt7sOjpW5oBaPEqUSmgMgw9PPGkRVgPMnOvLMQQ9fdGTHGfkbUG9Modr_Yna8xkIYNWroLwQ0_S-QN77beptY3C8IVd6C1P4XNsIVZPgi3_oPq1XZ3yI6LU-BfNryBf5Eqk5mYR3MznuuGp8oXjcSECYOR7f_z39vxWFUT1Vyjaq698MrF6d81MiD0yBXI',
      icons: ['wb_sunny', 'water_drop', 'thermostat'],
      care: {
        light: { en: 'Bright indirect light', th: 'แสงสว่างทางอ้อม' },
        water: { en: 'Weekly', th: 'รดน้ำทุกสัปดาห์' },
        temp: '18–29°C',
        humidity: '60–80%',
      },
      description: {
        en: 'The "Swiss Cheese Plant" is a stunning tropical climber that brings bold, architectural character to any bright room. Known for its iconic split leaves.',
        th: 'มอนสเตอร่าหรือ "Swiss Cheese Plant" เป็นไม้เถาเขตร้อนที่โดดเด่น ให้ชีวิตชีวาแก่ทุกห้องที่มีแสงสว่าง โด่งดังจากใบที่มีรอยฉีก',
      },
      logs: [],
    },
    {
      id: 'tomato',
      name: 'Tomato',
      latin: 'Solanum lycopersicum',
      category: 'edibles',
      stage: 'fruiting',
      stageEN: 'Fruiting',
      stageTH: 'กำลังออกผล',
      status: 'thirsty',
      progress: 45,
      nextTask: { en: 'Apply fertilizer today', th: 'ใส่ปุ๋ยวันนี้' },
      nextTaskIcon: 'agriculture',
      difficulty: 'easy',
      difficultyLabel: { en: 'Easy', th: 'ง่าย' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9qNPNrwPKf4nd7HHk-UC5SLfen5H5IyFeO1Dlq8wxVhcSaSiD3G74BjUq2Co7ru2w_igvKbMR0EwUtMXyi2kXMlIcjEahKSviVVnbJ3ICDFs1FSElesybxqoeF0enzkMfPkbkZZyfMmo8PDun1tnnzMu6DwxC2vZC6LpQGHtnRK5DC7-eM2daJ2vFXXIfmuVDIoWD8bJHkp0CCopfH7TErV1rAxX0XQuuiTOcfkvA8SqMltmCBsfipJcKeZ-cmo98ZnhdLigpEM',
      icons: ['wb_sunny', 'water_drop', 'thermostat'],
      care: {
        light: { en: 'Full sun (6–8h)', th: 'แสงแดดเต็มๆ 6–8 ชั่วโมง' },
        water: { en: 'Every 2 days', th: 'รดน้ำทุก 2 วัน' },
        temp: '20–30°C',
        humidity: '40–70%',
      },
      description: {
        en: 'Cherry tomatoes are easy to grow, prolific fruiting plants. Perfect for beginners who want to grow their own food in containers or garden beds.',
        th: 'มะเขือเทศเชอร์รี่ปลูกง่าย ออกผลเยอะ เหมาะสำหรับมือใหม่ที่ต้องการปลูกผักกินเอง ทั้งในกระถางและแปลงดิน',
      },
      logs: [],
    },
    {
      id: 'snake',
      name: 'Snake Plant',
      latin: 'Sansevieria trifasciata',
      category: 'indoor',
      stage: 'established',
      stageEN: 'Established',
      stageTH: 'ตั้งตัวแล้ว',
      status: 'healthy',
      progress: 90,
      nextTask: { en: 'Check soil moisture', th: 'ตรวจความชื้นดิน' },
      nextTaskIcon: 'humidity_mid',
      difficulty: 'easy',
      difficultyLabel: { en: 'Easy', th: 'ง่าย' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx6ISZ9-fYTSh1bFH0ktc2JHuVzA0bPCe15huCpTvDuZ9_UZY1iwOWi77cwDmBLOqqiMLeGK9YJ8Lkhr2aiQC0dd9CyCcjU0gXFWij4DsfZfU21TCnaeSjf8Lip4lym7k7kSmWgaSPs9i2kc7XIq3U6CnL8FSAkDtSEXzjNiC5_MOOTV619DSTL6K1AAaOJmgSIuF-4sfXHOXtOrahfBUCSQFoAk4ovSRGqGHDEBTz8cg5tdtR28Pocro6iP2UY9vGtwq0X-bH844',
      icons: ['light_mode', 'water_drop', 'device_thermostat'],
      care: {
        light: { en: 'Low to bright indirect', th: 'แสงน้อยถึงแสงทางอ้อม' },
        water: { en: 'Every 2–6 weeks', th: 'รดน้ำทุก 2–6 สัปดาห์' },
        temp: '15–30°C',
        humidity: '30–50%',
      },
      description: {
        en: 'Nearly indestructible, the Snake Plant thrives on neglect. Perfect air purifier for bedrooms and offices with minimal care requirements.',
        th: 'ต้นสาวน้อยประแป้งแทบจะตายไม่เป็น ทนทานมาก ฟอกอากาศในห้องนอนและสำนักงานได้ดี ต้องการการดูแลน้อยมาก',
      },
      logs: [],
    },
    {
      id: 'jade',
      name: 'Jade Plant',
      latin: 'Crassula ovata',
      category: 'succulents',
      stage: 'growing',
      stageEN: 'Growing',
      stageTH: 'กำลังเติบโต',
      status: 'healthy',
      progress: 60,
      nextTask: { en: 'Water next week', th: 'รดน้ำสัปดาห์หน้า' },
      nextTaskIcon: 'water_drop',
      difficulty: 'easy',
      difficultyLabel: { en: 'Easy', th: 'ง่าย' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQNfoZ5i9Edvcx1pV7450rzYgDLJikx_wKwAUKqu1Y5hI-v5lIUkbYBC9_0WAIWImr5d6ZWKduZAu5yHE5KdZTeMD1-Rto46R78pxmtOjHrqPR1DPC4Bg4MI2qKDThIP8WDHhqyUoa-yFZzuWf7xsYnw16Uwbl_svE7jZ1m9IRHq2df95zFvmeG-c35Jd_jvRkXcJHdDGj4QgjKgJUmQRxfNVqUbsSPyXMUsyjM1jNNfoKHtSmDgCtM3GEufdiVQYX9yxWGX2qEk',
      icons: ['sunny', 'dry', 'thermostat'],
      care: {
        light: { en: 'Bright direct', th: 'แสงแดดจ้า' },
        water: { en: 'Every 2–3 weeks', th: 'รดน้ำทุก 2–3 สัปดาห์' },
        temp: '15–25°C',
        humidity: '30–50%',
      },
      description: {
        en: 'The Jade Plant is a classic succulent bonsai-like tree. Its tree-like structure and glossy green leaves make it a timeless houseplant.',
        th: 'ไม้อวบน้ำรูปทรงบอนไซ ลำต้นแข็งแรงคล้ายต้นไม้ ใบสีเขียวมันวาว เป็นไม้ประดับในร่มที่นิยมตลอดกาล',
      },
      logs: [],
    },
    {
      id: 'calathea',
      name: 'Calathea',
      latin: 'Calathea ornata',
      category: 'indoor',
      stage: 'active',
      stageEN: 'Active',
      stageTH: 'ออกใบใหม่',
      status: 'warning',
      progress: 55,
      nextTask: { en: 'Mist leaves today', th: 'ฉีดพ่นน้ำวันนี้' },
      nextTaskIcon: 'humidity_high',
      difficulty: 'hard',
      difficultyLabel: { en: 'Advanced', th: 'ยาก' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtwME0SAHNKMg_Q7bHKSX3mzjNrvZpIoKQcwHSB5cY5gEV3X5fYIsN75m0nq1fxpKm6vzhWCwsLEwNYosA9ZyGpew25EwNrUUK85GnZ3IJ3xUK2S-LK69zD2JEk8NeCHY3F6qS4uWmdqKBd4FT7mzh7StuLdnw6qzsnYCtuQXoU8YSAPdoAU2WI8luJTjtUzW2YvphIuS4tHz-zG8xwCOHyBwyYn_Jmgae8os9lGdRVsHYSQlzRsE-4p7Fl9LWM6FENThmREpSpkc',
      icons: ['filter_drama', 'humidity_high', 'thermostat'],
      care: {
        light: { en: 'Low to medium indirect', th: 'แสงน้อยถึงปานกลาง' },
        water: { en: 'Every 1–2 weeks', th: 'รดน้ำทุก 1–2 สัปดาห์' },
        temp: '18–24°C',
        humidity: '60–80%',
      },
      description: {
        en: 'Calathea is prized for its stunning, ornate leaf patterns. Known as the "prayer plant" – it folds its leaves at night.',
        th: 'คาลาเธียมีลายใบที่สวยงามมาก เรียกว่า "ต้นไม้สวดมนต์" เพราะพับใบตอนกลางคืน ต้องการความชื้นสูง',
      },
      logs: [],
    },
  ],

  // Weekly calendar tasks: keyed by ISO date string "YYYY-MM-DD"
  calendarTasks: {},

  // Activity log for dashboard
  activityLog: [],

  // AI demo responses
  aiResponses: {
    default: {
      name: { en: 'Monstera Deliciosa', th: 'มอนสเตอร่า' },
      confidence: '94%',
      health: {
        en: 'Your plant looks healthy with vibrant green foliage. Minor yellowing on lower leaf edges suggests humidity could be slightly higher. Consider misting every 2–3 days.',
        th: 'ต้นไม้ของคุณดูสุขภาพดี ใบเขียวสดใส ขอบใบส่วนล่างเหลืองเล็กน้อยแสดงว่าความชื้นอาจต่ำเกินไป ลองฉีดพ่นน้ำทุก 2–3 วัน',
      },
      care: {
        en: 'Provide bright indirect light. Water when top 2–3cm of soil is dry. Wipe leaves monthly to improve photosynthesis.',
        th: 'วางในที่แสงสว่างทางอ้อม รดน้ำเมื่อดินแห้ง 2–3 ซม. เช็ดใบทุกเดือนเพื่อช่วยการสังเคราะห์แสง',
      },
      growth: {
        en: 'At this stage your plant is actively producing new leaves. The unfurling leaf on the right will fully open in ~7–10 days.',
        th: 'ระยะนี้ต้นไม้กำลังออกใบใหม่ ใบที่กำลังคลี่ทางขวาจะเปิดเต็มที่ใน 7–10 วัน',
      },
      tips: {
        en: 'Support with a moss pole to encourage larger, more fenestrated leaves. Repot every 1–2 years into a pot 2–3cm larger.',
        th: 'ใช้ไม้มอสค้ำยันเพื่อให้ใบใหม่ใหญ่และมีรูมากขึ้น เปลี่ยนกระถางทุก 1–2 ปี',
      },
    },
  },
};

// ── Load saved data from localStorage ──────────────────────
(function loadSavedData() {
  try {
    const savedTasks = localStorage.getItem('sanctuary_cal_tasks');
    if (savedTasks) AppData.calendarTasks = JSON.parse(savedTasks);

    const savedActivity = localStorage.getItem('sanctuary_activity');
    if (savedActivity) AppData.activityLog = JSON.parse(savedActivity);

    const savedPlantLogs = localStorage.getItem('sanctuary_plant_logs');
    if (savedPlantLogs) {
      const logs = JSON.parse(savedPlantLogs);
      // Merge logs back into plants
      AppData.plants.forEach(p => {
        if (logs[p.id]) p.logs = logs[p.id];
      });
    }

    const savedUserPlants = localStorage.getItem('sanctuary_user_plants');
    if (savedUserPlants) {
      const extra = JSON.parse(savedUserPlants);
      // Merge with existing, avoid duplicates
      extra.forEach(ep => {
        if (!AppData.plants.find(p => p.id === ep.id)) {
          AppData.plants.push(ep);
        }
      });
    }
  } catch(e) { console.warn('Data load error:', e); }
})();

// ── Helpers ────────────────────────────────────────────────
window.AppDataHelpers = {
  savePlantLogs() {
    try {
      const logs = {};
      AppData.plants.forEach(p => { logs[p.id] = p.logs || []; });
      localStorage.setItem('sanctuary_plant_logs', JSON.stringify(logs));
    } catch(e) {}
  },
  saveCalendarTasks() {
    try { localStorage.setItem('sanctuary_cal_tasks', JSON.stringify(AppData.calendarTasks)); } catch(e) {}
  },
  saveActivity() {
    try { localStorage.setItem('sanctuary_activity', JSON.stringify(AppData.activityLog)); } catch(e) {}
  },
  saveUserPlants() {
    try {
      const userPlants = AppData.plants.filter(p => p.userAdded);
      localStorage.setItem('sanctuary_user_plants', JSON.stringify(userPlants));
    } catch(e) {}
  },
  logActivity(type, desc) {
    const entry = { type, desc, date: new Date().toISOString() };
    AppData.activityLog.unshift(entry);
    if (AppData.activityLog.length > 200) AppData.activityLog.pop();
    this.saveActivity();
  },
  getWeekActivity(weekOffset = 0) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + weekOffset * 7);
    startOfWeek.setHours(0,0,0,0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    return AppData.activityLog.filter(a => {
      const d = new Date(a.date);
      return d >= startOfWeek && d < endOfWeek;
    });
  },
  todayKey() {
    return new Date().toISOString().split('T')[0];
  },
  getTasksForDate(dateKey) {
    if (!AppData.calendarTasks[dateKey]) AppData.calendarTasks[dateKey] = [];
    return AppData.calendarTasks[dateKey];
  },
};
