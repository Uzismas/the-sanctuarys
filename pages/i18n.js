/* ==========================================
   i18n – Thai / English Translations
   ========================================== */
window.I18n = {
  currentLang: localStorage.getItem('sanctuary_lang') || 'en',

  translations: {
    en: {
      appName: 'The Sanctuary',
      navHome: 'Home', navPlants: 'Plants', navTasks: 'Calendar', navProfile: 'Profile',
      greeting: 'Hello', greetingSub: 'Your greenhouse is thriving today.',
      aiInsightTitle: 'Weekly Growth Summary',
      aiInsightText: 'Your Monstera has shown 15% more foliage density this week. Increased humidity levels are accelerating photosynthesis. Keep up the consistent watering!',
      activePlants: 'Active Plants', viewAll: 'View all',
      todayTasks: "Today's Tasks", nextTask: 'Next Task',
      plantGuide: 'My Garden', searchPlant: 'Search plant species...',
      featuredPlant: 'Featured Plant of the Week', editorsPickLabel: "Editor's Pick",
      allFilter: 'All', indoorFilter: 'Indoor', succulentFilter: 'Succulents', ediblesFilter: 'Edibles',
      learnMore: 'Learn More', askAI: 'Ask AI',
      aiAnalysis: 'AI Plant Analysis', aiAnalyzing: 'Analyzing your plant…',
      dailyPhoto: 'Add New Plant', dailyPhotoSub: 'Create a plant profile and start tracking growth.',
      logPhotoTitle: 'Daily Plant Log', logPhotoSub: 'Upload today\'s photo and let AI track your progress.',
      dateLabel: 'Date', heightLabel: 'Height (cm)', notesLabel: 'Notes',
      notesPlaceholder: 'New leaf starting to unfurl! Healthy green color...',
      saveDailyPhoto: 'Save Daily Log', saveNewPlant: 'Create Plant Profile',
      aiGrowthInsight: 'AI Growth Insight',
      aiTip: 'Tip: Take photos at the same time every day for the best growth tracking! Consistency helps AI detect health changes accurately.',
      profileTitle: 'Plant Lover', levelTitle: 'Level 12 Master Gardener',
      plantsSaved: 'Plants', daysTracking: 'Days', photosTaken: 'Photos',
      settingsPrivacy: 'Settings & Privacy',
      account: 'Account', notifications: 'Notifications', privacy: 'Privacy',
      language: 'Language', helpCenter: 'Help Center', logout: 'Logout',
      taskDone: 'Task completed! 🌱', plantSaved: 'Plant saved! 🌿',
      uploadPhoto: 'Upload Photo', takePhoto: 'Take Photo', switchCamera: 'Switch Camera',
      addTask: 'Add', taskPlaceholder: 'Add a task for this day...',
      growthProgress: 'Growth Progress', healthy: 'Healthy', thirsty: 'Needs Water', warning: 'Needs Attention',
      aiHealth: 'Health Assessment', aiCare: 'Care Recommendations',
      aiGrowth: 'Growth Outlook', aiTips: 'Pro Tips',
      identified: 'Plant Identified', addNewPlant: 'Add New Plant', logToday: 'Log Today',
      plantName: 'Plant Name', plantNamePlaceholder: 'e.g. My Monstera',
      calendarTitle: 'Task Calendar', thisWeek: 'This week',
      logHistory: 'Growth History', noLogs: 'No logs yet. Take a photo to start tracking!',
      weekSummary: 'This Week\'s Activity',
      watered: 'Watered', fertilized: 'Fertilized', rotated: 'Rotated',
      tasksCompleted: 'Tasks Done', photosLogged: 'Photos Logged',
      aboutPlant: 'About this Plant', careInfo: 'Light & Water Guide',
      lightLabel: 'Light', waterLabel: 'Watering',
      tempLabel: 'Temperature', humidityLabel: 'Humidity',
      selectPlantToLog: 'Select plant to log',
      viewGrowthLog: 'View Growth Log',
      photoCount: 'photos',
      noActivity: 'No activity yet this week.',
    },
    th: {
      appName: 'เดอะ แซงคชวรี่',
      navHome: 'หน้าหลัก', navPlants: 'ต้นไม้', navTasks: 'ปฏิทิน', navProfile: 'โปรไฟล์',
      greeting: 'สวัสดี', greetingSub: 'สวนของคุณเขียวขจีวันนี้',
      aiInsightTitle: 'สรุปการเติบโตรายสัปดาห์',
      aiInsightText: 'มอนสเตอร่าของคุณมีใบหนาแน่นขึ้น 15% ในสัปดาห์นี้ ความชื้นที่เพิ่มขึ้นช่วยเร่งการสังเคราะห์แสง รักษาตารางการรดน้ำให้สม่ำเสมอ!',
      activePlants: 'ต้นไม้ที่ดูแลอยู่', viewAll: 'ดูทั้งหมด',
      todayTasks: 'งานวันนี้', nextTask: 'งานถัดไป',
      plantGuide: 'สวนของฉัน', searchPlant: 'ค้นหาพันธุ์พืช...',
      featuredPlant: 'พืชแห่งสัปดาห์', editorsPickLabel: 'บรรณาธิการแนะนำ',
      allFilter: 'ทั้งหมด', indoorFilter: 'ในร่ม', succulentFilter: 'แคคตัส', ediblesFilter: 'พืชผัก',
      learnMore: 'เรียนรู้เพิ่ม', askAI: 'ถาม AI',
      aiAnalysis: 'AI วิเคราะห์ต้นไม้', aiAnalyzing: 'กำลังวิเคราะห์ต้นไม้ของคุณ…',
      dailyPhoto: 'เพิ่มต้นไม้ใหม่', dailyPhotoSub: 'สร้างโปรไฟล์ต้นไม้และเริ่มติดตามการเติบโต',
      logPhotoTitle: 'บันทึกประจำวัน', logPhotoSub: 'อัปโหลดรูปวันนี้ให้ AI ติดตามความก้าวหน้า',
      dateLabel: 'วันที่', heightLabel: 'ความสูง (ซม.)', notesLabel: 'บันทึก',
      notesPlaceholder: 'ใบใหม่กำลังงอก สีเขียวสดใส...',
      saveDailyPhoto: 'บันทึกประจำวัน', saveNewPlant: 'สร้างโปรไฟล์ต้นไม้',
      aiGrowthInsight: 'AI วิเคราะห์การเติบโต',
      aiTip: 'เคล็ดลับ: ถ่ายรูปในเวลาเดิมทุกวัน เพื่อให้ AI ติดตามสุขภาพต้นไม้ได้แม่นยำ',
      profileTitle: 'นักปลูกต้นไม้', levelTitle: 'ระดับ 12 ปรมาจารย์ผู้ปลูก',
      plantsSaved: 'ต้นไม้', daysTracking: 'วัน', photosTaken: 'รูป',
      settingsPrivacy: 'ตั้งค่าและความเป็นส่วนตัว',
      account: 'บัญชีผู้ใช้', notifications: 'การแจ้งเตือน', privacy: 'ความเป็นส่วนตัว',
      language: 'ภาษา', helpCenter: 'ช่วยเหลือ', logout: 'ออกจากระบบ',
      taskDone: 'ทำงานเสร็จแล้ว! 🌱', plantSaved: 'บันทึกต้นไม้แล้ว! 🌿',
      uploadPhoto: 'อัปโหลดรูป', takePhoto: 'ถ่ายรูป', switchCamera: 'สลับกล้อง',
      addTask: 'เพิ่ม', taskPlaceholder: 'เพิ่มงานสำหรับวันนี้...',
      growthProgress: 'ความก้าวหน้า', healthy: 'สุขภาพดี', thirsty: 'ต้องการน้ำ', warning: 'ต้องดูแล',
      aiHealth: 'ประเมินสุขภาพ', aiCare: 'คำแนะนำการดูแล',
      aiGrowth: 'แนวโน้มการเติบโต', aiTips: 'เคล็ดลับผู้เชี่ยวชาญ',
      identified: 'ระบุพืชได้แล้ว', addNewPlant: 'เพิ่มต้นไม้ใหม่', logToday: 'บันทึกวันนี้',
      plantName: 'ชื่อต้นไม้', plantNamePlaceholder: 'เช่น มอนสเตอร่าของฉัน',
      calendarTitle: 'ปฏิทินงาน', thisWeek: 'สัปดาห์นี้',
      logHistory: 'ประวัติการเติบโต', noLogs: 'ยังไม่มีข้อมูล ถ่ายรูปเพื่อเริ่มติดตาม!',
      weekSummary: 'กิจกรรมสัปดาห์นี้',
      watered: 'รดน้ำ', fertilized: 'ใส่ปุ๋ย', rotated: 'หมุนกระถาง',
      tasksCompleted: 'งานที่ทำ', photosLogged: 'รูปที่บันทึก',
      aboutPlant: 'เกี่ยวกับต้นไม้', careInfo: 'คู่มือแสงและน้ำ',
      lightLabel: 'แสง', waterLabel: 'การรดน้ำ',
      tempLabel: 'อุณหภูมิ', humidityLabel: 'ความชื้น',
      selectPlantToLog: 'เลือกต้นไม้ที่ต้องการบันทึก',
      viewGrowthLog: 'ดูประวัติการเติบโต',
      photoCount: 'รูป',
      noActivity: 'ยังไม่มีกิจกรรมสัปดาห์นี้',
    },
  },

  t(key) {
    return this.translations[this.currentLang]?.[key] ?? this.translations.en[key] ?? key;
  },

  // bilingual helper – returns correct language from {en, th} object
  tObj(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[this.currentLang] ?? obj.en ?? '';
  },

  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'th' : 'en';
    localStorage.setItem('sanctuary_lang', this.currentLang);
    this.applyToPage();
  },

  applyToPage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = this.currentLang === 'en' ? 'TH' : 'EN';
  },
};
