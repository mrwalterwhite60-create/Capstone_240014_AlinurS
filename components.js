/**
 * ImmoVision VR — Core WebXR Components & Systems
 * Course: AR/VR/XR Applications (AIB), 6B04103 AI Business, 3rd year
 * Student: Alinur S. (Student ID: 240014, Group: AIB-2401)
 * Prefix: x0014-
 */

/* =========================================================================
   1. SYSTEM: x0014-immovision-system
   ========================================================================= */
AFRAME.registerSystem('x0014-immovision-system', {
  init: function () {
    this.studentInfo = {
      name: 'Alinur S.',
      id: '240014',
      group: 'AIB-2401',
      project: 'ImmoVision VR: Interactive Off-Plan Apartment Tour',
      client: 'BI Group Development (Astana Central Sales)'
    };

    this.apartment = {
      modelName: 'Grand Opera Luxury 2-Bedroom',
      unitNumber: 'Unit #414 (Floor 14, Tower B)',
      totalAreaM2: 85.7,
      basePriceKZT: 48500000,
      exchangeRateUSD: 495.0
    };

    this.state = {
      currentRoom: 'living',
      tourState: 'STATE_LIVING',
      floor: 'oak',
      wall: 'beige',
      lighting: 'day',
      doorOpen: false,
      fanSpeed: 1.0,
      seatedMode: false,
      voiceActive: false,
      fallbackUsed: false
    };

    this.finishCatalog = {
      floor: {
        oak: { name: 'Scandinavian Natural Oak Parquet', price: 0, tag: 'Standard Included', src: '#tex-floor-oak', repeat: '6 6', rough: 0.5, metal: 0.05 },
        walnut: { name: 'American Smoked Walnut Hardwood', price: 650000, tag: 'Premium Wood Upgrade', src: '#tex-floor-walnut', repeat: '6 6', rough: 0.4, metal: 0.05 },
        marble: { name: 'Calacatta Gold Polished Italian Marble', price: 1450000, tag: 'Luxury Stone Upgrade', src: '#tex-floor-marble', repeat: '3 3', rough: 0.12, metal: 0.15 },
        slate: { name: 'Matte Charcoal Slate Architectural Tile', price: 800000, tag: 'Contemporary Stone', src: '#tex-floor-slate', repeat: '6 6', rough: 0.85, metal: 0.02 }
      },
      wall: {
        beige: { name: 'Warm Alabaster Venetian Plaster', price: 0, tag: 'Builder Spec', color: '#e8e4dc', rough: 0.88 },
        pearl: { name: 'Scandinavian Cool Pearl Matte', price: 150000, tag: 'Modern Tint', color: '#dedfe2', rough: 0.88 },
        sage: { name: 'Contemporary Sage Velvet Matte', price: 280000, tag: 'Designer Tint', color: '#b2c2b5', rough: 0.88 },
        navy: { name: 'Midnight Architectural Feature Accent', price: 350000, tag: 'Feature Wall Tint', color: '#223246', rough: 0.70 }
      },
      lighting: {
        day: { name: 'Natural Daylight Illumination (5500K)', price: 0, tag: 'Standard Sun' },
        evening: { name: 'Golden Hour Sunset Ambience (3000K)', price: 420000, tag: 'Smart Dimmer Package' },
        night: { name: 'Astana Skyline Luxury Architectural Night', price: 780000, tag: 'Recessed LED & Strip Package' }
      }
    };

    console.log(`[x0014-immovision-system] Initialized for ${this.studentInfo.name} (${this.studentInfo.id})`);
  },

  calculateTotalPrice: function () {
    const fPrice = this.finishCatalog.floor[this.state.floor].price;
    const wPrice = this.finishCatalog.wall[this.state.wall].price;
    const lPrice = this.finishCatalog.lighting[this.state.lighting].price;
    const totalKZT = this.apartment.basePriceKZT + fPrice + wPrice + lPrice;
    const totalUSD = Math.round(totalKZT / this.apartment.exchangeRateUSD);
    return {
      baseKZT: this.apartment.basePriceKZT,
      surchargesKZT: fPrice + wPrice + lPrice,
      totalKZT: totalKZT,
      totalUSD: totalUSD,
      breakdown: {
        floor: { ...this.finishCatalog.floor[this.state.floor] },
        wall: { ...this.finishCatalog.wall[this.state.wall] },
        lighting: { ...this.finishCatalog.lighting[this.state.lighting] }
      }
    };
  },

  setFloor: function (floorKey, source = 'ui') {
    if (!this.finishCatalog.floor[floorKey]) return;
    this.state.floor = floorKey;
    const cfg = this.finishCatalog.floor[floorKey];
    
    // Direct A-Frame material attribute update (instant, 100% reliable)
    const floorEl = document.querySelector('#main-floor');
    if (floorEl) {
      floorEl.setAttribute('material', {
        src: cfg.src,
        repeat: cfg.repeat,
        roughness: cfg.rough,
        metalness: cfg.metal
      });
      // Emissive pulse confirmation
      floorEl.setAttribute('animation__flash', 'property: material.emissive; from: #38bdf8; to: #000000; dur: 350; startEvents: flash');
      floorEl.emit('flash');
    }

    if (source === 'fallback') this.state.fallbackUsed = true;
    this.el.emit('x0014-finish-changed', { type: 'floor', value: floorKey, source: source });
    this.updateHUD();
  },

  setWall: function (wallKey, source = 'ui') {
    if (!this.finishCatalog.wall[wallKey]) return;
    this.state.wall = wallKey;
    const cfg = this.finishCatalog.wall[wallKey];

    const walls = document.querySelectorAll('.room-wall');
    walls.forEach(w => {
      w.setAttribute('material', {
        src: '#tex-wall-plaster',
        repeat: '4 2',
        color: cfg.color,
        roughness: cfg.rough
      });
    });

    if (source === 'fallback') this.state.fallbackUsed = true;
    this.el.emit('x0014-finish-changed', { type: 'wall', value: wallKey, source: source });
    this.updateHUD();
  },

  setLighting: function (lightKey, source = 'ui') {
    if (!this.finishCatalog.lighting[lightKey]) return;
    this.state.lighting = lightKey;
    
    // Direct trigger on lighting controller component
    const lightCtrl = document.querySelector('[x0014-lighting-controller]');
    if (lightCtrl && lightCtrl.components['x0014-lighting-controller']) {
      lightCtrl.components['x0014-lighting-controller'].applyLighting(lightKey);
    }
    window.dispatchEvent(new CustomEvent('immovision-lighting-changed', { detail: { value: lightKey, source: source } }));
    this.el.emit('x0014-lighting-changed', { value: lightKey, source: source });
    this.updateHUD();
  },

  setRoom: function (roomName) {
    this.state.currentRoom = roomName;
    if (roomName === 'foyer') this.state.tourState = 'STATE_FOYER';
    else if (roomName === 'balcony') this.state.tourState = 'STATE_RESOLUTION';
    else this.state.tourState = 'STATE_LIVING';
    window.dispatchEvent(new CustomEvent('immovision-room-changed', { detail: { room: roomName } }));
    this.el.emit('x0014-state-changed', { room: roomName, tourState: this.state.tourState });
    this.updateHUD();
  },

  navigateRoom: function (roomKey) {
    const teleportComp = document.querySelector('[x0014-teleport-controls]');
    if (teleportComp && teleportComp.components['x0014-teleport-controls']) {
      teleportComp.components['x0014-teleport-controls'].teleportToZone(roomKey);
    } else {
      this.setRoom(roomKey);
    }
  },

  toggleDoor: function () {
    this.state.doorOpen = !this.state.doorOpen;
    this.el.emit('x0014-door-toggled', { open: this.state.doorOpen });
    this.updateHUD();
  },

  toggleSeatedMode: function () {
    this.state.seatedMode = !this.state.seatedMode;
    const head = document.querySelector('#head');
    if (head) {
      const targetY = this.state.seatedMode ? 1.15 : 1.65;
      head.setAttribute('position', { x: 0, y: targetY, z: 0 });
    }
    this.updateHUD();
  },

  updateHUD: function () {
    const summaryBoard = document.querySelector('[x0014-summary-board]');
    if (summaryBoard && summaryBoard.components['x0014-summary-board']) {
      summaryBoard.components['x0014-summary-board'].renderSummary();
    }
    const pricing = this.calculateTotalPrice();
    const overlay = document.getElementById('hud-status');
    if (overlay) {
      overlay.innerHTML = `
        <div><strong>ImmoVision VR</strong> | Alinur S. (240014) | BI Group Astana</div>
        <div>Room: <strong>${(this.state.currentRoom || 'LIVING').toUpperCase()}</strong> | Floor: <strong>${this.finishCatalog.floor[this.state.floor].name}</strong></div>
        <div>Walls: <strong>${this.finishCatalog.wall[this.state.wall].name}</strong> | Light: <strong>${this.state.lighting.toUpperCase()}</strong></div>
        <div>Total: <strong>${(pricing.totalKZT / 1000000).toFixed(2)}M KZT</strong> (~$${pricing.totalUSD.toLocaleString()}) | Mode: <strong>${this.state.seatedMode ? 'Seated (1.15m)' : 'Standing (1.65m)'}</strong></div>
      `;
    }

    // Global Event Dispatch to Enterprise Platform Tabs
    window.dispatchEvent(new CustomEvent('immovision-pricing-updated', {
      detail: {
        floor: this.state.floor,
        floorName: this.finishCatalog.floor[this.state.floor].name,
        floorExtra: this.finishCatalog.floor[this.state.floor].price,
        wall: this.state.wall,
        wallName: this.finishCatalog.wall[this.state.wall].name,
        wallExtra: this.finishCatalog.wall[this.state.wall].price,
        lighting: this.state.lighting,
        lightingName: this.finishCatalog.lighting[this.state.lighting].name,
        lightExtra: this.finishCatalog.lighting[this.state.lighting].price,
        total: pricing.totalKZT,
        totalUSD: pricing.totalUSD
      }
    }));
  }
});


/* =========================================================================
   2. COMPONENT: x0014-voice-configurator
   ========================================================================= */
AFRAME.registerComponent('x0014-voice-configurator', {
  schema: {
    enabled: { type: 'boolean', default: true },
    lang: { type: 'string', default: 'ru-RU' },
    synthFeedback: { type: 'boolean', default: true }
  },

  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];
    this.recognition = null;
    this.isListening = false;
    this.micGranted = false;
    this.lastTranscript = '';
    this.speechSynthesis = window.speechSynthesis || null;

    // Detect browser language: default to ru-RU if Russian/Kazakh
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    this.currentLang = (navLang.startsWith('ru') || navLang.startsWith('kk')) ? 'ru-RU' : 'en-US';

    this.inWorldSubtitle = document.querySelector('#in-world-subtitles');
    this.screenSubtitle = document.getElementById('voice-subtitles');

    this.intentCatalog = [
      { type: 'floor', value: 'oak', patterns: [/\b(oak|natural wood|light wood|parquet)\b/i, /\b(дуб|светлый дуб|дерево|паркет|ламинат|светлый пол)\b/i] },
      { type: 'floor', value: 'walnut', patterns: [/\b(walnut|dark wood|dark oak|hardwood)\b/i, /\b(орех|темный дуб|темное дерево|темный пол|шоколадный)\b/i] },
      { type: 'floor', value: 'marble', patterns: [/\b(marble|calacatta|white stone|tile)\b/i, /\b(мрамор|белый мрамор|камень|белый пол)\b/i] },
      { type: 'floor', value: 'slate', patterns: [/\b(slate|charcoal|dark tile|grey tile)\b/i, /\b(плитка|сланец|серая плитка|темная плитка|черная плитка)\b/i] },

      { type: 'wall', value: 'beige', patterns: [/\b(beige|warm wall|alabaster|light wall)\b/i, /\b(бежевый|теплый|песочный|бежевые стены|светлые стены)\b/i] },
      { type: 'wall', value: 'pearl', patterns: [/\b(pearl|white wall|cool wall|grey wall)\b/i, /\b(белый|жемчужный|белые стены|серый|серые стены)\b/i] },
      { type: 'wall', value: 'sage', patterns: [/\b(sage|green wall|olive|mint)\b/i, /\b(шалфей|зеленый|оливковый|зеленые стены|мята)\b/i] },
      { type: 'wall', value: 'navy', patterns: [/\b(navy|blue wall|dark wall|accent wall)\b/i, /\b(синий|темная стена|акцентная стена|синие стены|темный)\b/i] },

      { type: 'lighting', value: 'day', patterns: [/\b(day|daylight|morning|sun|sunlight)\b/i, /\b(день|дневной|солнце|утро|дневной свет|светло)\b/i] },
      { type: 'lighting', value: 'evening', patterns: [/\b(evening|sunset|golden hour|dusk)\b/i, /\b(вечер|закат|золотой|сумерки|вечерний свет)\b/i] },
      { type: 'lighting', value: 'night', patterns: [/\b(night|lights off|dark mode|city lights)\b/i, /\b(ночь|ночной|город|ночной свет|темнота|люстра)\b/i] },

      { type: 'nav', value: 'foyer', patterns: [/\b(foyer|entrance|hall|start)\b/i, /\b(прихожая|вход|начало|коридор)\b/i] },
      { type: 'nav', value: 'living', patterns: [/\b(living room|lounge|salon|sofa)\b/i, /\b(гостиная|зал|диван)\b/i] },
      { type: 'nav', value: 'kitchen', patterns: [/\b(kitchen|dining|cooking)\b/i, /\b(кухня|обеденная|плита)\b/i] },
      { type: 'nav', value: 'bedroom', patterns: [/\b(bedroom|master bedroom|bed)\b/i, /\b(спальня|кровать)\b/i] },
      { type: 'nav', value: 'balcony', patterns: [/\b(balcony|terrace|outside|view)\b/i, /\b(балкон|терраса|вид|панорама)\b/i] },

      { type: 'action', value: 'door', patterns: [/\b(open door|close door|toggle door|terrace door)\b/i, /\b(открой дверь|закрой дверь|дверь|балконная дверь)\b/i] },
      { type: 'action', value: 'summary', patterns: [/\b(summary|price|cost|quote|how much)\b/i, /\b(цена|стоимость|смета|итог|сколько)\b/i] },
      { type: 'action', value: 'reset', patterns: [/\b(reset|default|restore)\b/i, /\b(сброс|стандарт|верни|начальная)\b/i] }
    ];

    this.setupSpeechRecognition();
  },

  setupSpeechRecognition: function () {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      this.displaySubtitle('Speech recognition unsupported in this browser. Touch controls active.', true);
      this.system.state.fallbackUsed = true;
      this.updateMicBadge(false, 'Unsupported');
      return;
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = this.currentLang || 'ru-RU';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.micGranted = true;
        this.system.state.voiceActive = true;
        this.displaySubtitle('Microphone ACTIVE! Speak: "Marble", "Oak floor", "Sunset", "Night", "Terrace"');
        this.updateMicBadge(true);
      };

      this.recognition.onresult = (event) => {
        const lastIdx = event.results.length - 1;
        const transcript = event.results[lastIdx][0].transcript.trim();
        this.processSpokenCommand(transcript);
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err.error);
        if (err.error === 'not-allowed') {
          this.micGranted = false;
          this.isListening = false;
          this.displaySubtitle('Microphone permission denied. Allow mic access in browser address bar!', true);
          this.system.state.fallbackUsed = true;
          this.updateMicBadge(false, 'Denied');
        } else if (err.error === 'no-speech') {
          // Timeout with no speech on mobile, remain ready
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.micGranted && this.userWantsListening) {
          try { this.recognition.start(); } catch (e) {}
        } else {
          this.updateMicBadge(false, 'Ready');
        }
      };
    } catch (e) {
      this.system.state.fallbackUsed = true;
    }
  },

  startListening: function () {
    if (!this.recognition) this.setupSpeechRecognition();
    if (this.recognition) {
      try {
        this.userWantsListening = true;
        this.recognition.lang = this.currentLang || 'en-US';
        this.recognition.start();
        this.isListening = true;
        this.updateMicBadge(true);
      } catch (e) {
        // already started or transitioning
      }
    }
  },

  stopListening: function () {
    this.userWantsListening = false;
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    this.updateMicBadge(false, 'Paused');
  },

  toggleListening: function () {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  },

  toggleLanguage: function () {
    this.currentLang = this.currentLang === 'en-US' ? 'ru-RU' : 'en-US';
    if (this.recognition) {
      this.recognition.lang = this.currentLang;
      if (this.isListening) {
        try {
          this.recognition.stop();
          setTimeout(() => this.startListening(), 150);
        } catch(e) {}
      }
    }
    this.displaySubtitle('Language: ENGLISH. Speak: "Oak", "Marble", "Night", "Sunset", "Terrace"');
    this.updateMicBadge(this.isListening);
    return 'EN';
  },

  processSpokenCommand: function (transcript) {
    this.lastTranscript = transcript;
    const lower = transcript.toLowerCase();

    for (const intent of this.intentCatalog) {
      for (const pattern of intent.patterns) {
        if (pattern.test(lower)) {
          this.executeIntent(intent.type, intent.value, transcript);
          return;
        }
      }
    }

    const fuzzyMatch = this.checkFuzzyIntent(lower);
    if (fuzzyMatch) {
      this.executeIntent(fuzzyMatch.type, fuzzyMatch.value, transcript);
      return;
    }

    this.displaySubtitle(`Unrecognized: "${transcript}". Try saying: "Oak floor", "Marble", "Night mode"`, true);
    this.speakFeedback("Command not recognized. Please try saying oak floor, marble, or night mode.");
  },

  checkFuzzyIntent: function (text) {
    const keywords = [
      { word: 'oak', type: 'floor', value: 'oak' },
      { word: 'дуб', type: 'floor', value: 'oak' },
      { word: 'дерево', type: 'floor', value: 'oak' },
      { word: 'walnut', type: 'floor', value: 'walnut' },
      { word: 'орех', type: 'floor', value: 'walnut' },
      { word: 'marble', type: 'floor', value: 'marble' },
      { word: 'мрамор', type: 'floor', value: 'marble' },
      { word: 'камень', type: 'floor', value: 'marble' },
      { word: 'slate', type: 'floor', value: 'slate' },
      { word: 'сланец', type: 'floor', value: 'slate' },
      { word: 'плитка', type: 'floor', value: 'slate' },
      { word: 'beige', type: 'wall', value: 'beige' },
      { word: 'бежевый', type: 'wall', value: 'beige' },
      { word: 'pearl', type: 'wall', value: 'pearl' },
      { word: 'белый', type: 'wall', value: 'pearl' },
      { word: 'серый', type: 'wall', value: 'pearl' },
      { word: 'sage', type: 'wall', value: 'sage' },
      { word: 'шалфей', type: 'wall', value: 'sage' },
      { word: 'зеленый', type: 'wall', value: 'sage' },
      { word: 'navy', type: 'wall', value: 'navy' },
      { word: 'синий', type: 'wall', value: 'navy' },
      { word: 'day', type: 'lighting', value: 'day' },
      { word: 'день', type: 'lighting', value: 'day' },
      { word: 'утро', type: 'lighting', value: 'day' },
      { word: 'evening', type: 'lighting', value: 'evening' },
      { word: 'закат', type: 'lighting', value: 'evening' },
      { word: 'вечер', type: 'lighting', value: 'evening' },
      { word: 'night', type: 'lighting', value: 'night' },
      { word: 'ночь', type: 'lighting', value: 'night' },
      { word: 'балкон', type: 'nav', value: 'balcony' },
      { word: 'терраса', type: 'nav', value: 'balcony' },
      { word: 'кухня', type: 'nav', value: 'kitchen' },
      { word: 'спальня', type: 'nav', value: 'bedroom' },
      { word: 'гостиная', type: 'nav', value: 'living' }
    ];
    for (const item of keywords) {
      if (this.levenshtein(text, item.word) <= 2) return item;
    }
    return null;
  },

  levenshtein: function (a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[b.length][a.length];
  },

  executeIntent: function (type, value, rawSpeech) {
    if (type === 'floor') {
      this.system.setFloor(value, 'voice');
      const name = this.system.finishCatalog.floor[value].name;
      this.displaySubtitle(`Voice: "${rawSpeech}" -> Applied: ${name}`);
      this.speakFeedback(`${name} flooring applied.`);
    } else if (type === 'wall') {
      this.system.setWall(value, 'voice');
      const name = this.system.finishCatalog.wall[value].name;
      this.displaySubtitle(`Voice: "${rawSpeech}" -> Applied: ${name}`);
      this.speakFeedback(`${name} walls applied.`);
    } else if (type === 'lighting') {
      this.system.setLighting(value, 'voice');
      const name = this.system.finishCatalog.lighting[value].name;
      this.displaySubtitle(`Voice: "${rawSpeech}" -> Lighting: ${name}`);
      this.speakFeedback(`Switching to ${value} lighting mode.`);
    } else if (type === 'nav') {
      const teleportComp = document.querySelector('[x0014-teleport-controls]');
      if (teleportComp && teleportComp.components['x0014-teleport-controls']) {
        teleportComp.components['x0014-teleport-controls'].teleportToZone(value);
      }
      this.displaySubtitle(`Voice: "${rawSpeech}" -> Teleporting to ${value}`);
      this.speakFeedback(`Moving to ${value}.`);
    } else if (type === 'action') {
      if (value === 'door') {
        this.system.toggleDoor();
        const status = this.system.state.doorOpen ? 'opened' : 'closed';
        this.displaySubtitle(`Voice: "${rawSpeech}" -> Terrace door ${status}`);
        this.speakFeedback(`Terrace door ${status}.`);
      } else if (value === 'summary') {
        const pricing = this.system.calculateTotalPrice();
        this.displaySubtitle(`Voice: "${rawSpeech}" -> Total: ${(pricing.totalKZT / 1000000).toFixed(2)}M KZT`);
        this.speakFeedback(`Total estimated apartment price is ${(pricing.totalKZT / 1000000).toFixed(2)} million Tenge.`);
      } else if (value === 'reset') {
        this.system.setFloor('oak', 'voice');
        this.system.setWall('beige', 'voice');
        this.system.setLighting('day', 'voice');
        this.displaySubtitle(`Voice: "${rawSpeech}" -> Reset to default specification.`);
        this.speakFeedback('All finishes reset to default specification.');
      }
    }
  },

  speakFeedback: function (text) {
    if (!this.data.synthFeedback || !this.speechSynthesis) return;
    try {
      this.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      this.speechSynthesis.speak(utterance);
    } catch (e) {}
  },

  displaySubtitle: function (msg, isAlert = false) {
    if (this.screenSubtitle) {
      this.screenSubtitle.textContent = msg;
      this.screenSubtitle.style.borderColor = isAlert ? 'rgba(239, 68, 68, 0.8)' : 'rgba(56, 189, 248, 0.8)';
      this.screenSubtitle.classList.add('visible');
      clearTimeout(this.subTimeout);
      this.subTimeout = setTimeout(() => {
        this.screenSubtitle.classList.remove('visible');
      }, 5000);
    }
    if (this.inWorldSubtitle) {
      this.inWorldSubtitle.setAttribute('text', `value: ${msg}; color: ${isAlert ? '#ef4444' : '#38bdf8'}`);
    }
  },

  updateMicBadge: function (isActive, label = '') {
    const badge = document.getElementById('mic-badge');
    if (badge) {
      if (isActive) {
        badge.innerHTML = `🎙️ <span style="font-weight: 800; color: #fff;">● LISTENING...</span>`;
        badge.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
        badge.style.borderColor = '#ef4444';
        badge.style.color = '#ffffff';
        badge.style.boxShadow = '0 0 14px rgba(239, 68, 68, 0.7)';
      } else {
        const textLabel = label ? label : 'TAP TO SPEAK';
        badge.innerHTML = `🎙️ <span>${textLabel}</span>`;
        badge.style.backgroundColor = 'rgba(15, 23, 42, 0.88)';
        badge.style.borderColor = 'rgba(56, 189, 248, 0.6)';
        badge.style.color = '#38bdf8';
        badge.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.3)';
      }
    }
  }
});


/* =========================================================================
   3. COMPONENT: x0014-lighting-controller
   ========================================================================= */
AFRAME.registerComponent('x0014-lighting-controller', {
  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];
    this.sunLight = document.querySelector('#sun-light');
    this.ambientLight = document.querySelector('#ambient-light');
    this.lightChandelier = document.querySelector('#light-chandelier');
    this.lightKitchen = document.querySelector('#light-kitchen');
    this.lightBedroom = document.querySelector('#light-bedroom');
    this.skyEl = document.querySelector('#sky-environment') || document.querySelector('a-sky');

    this.onLightingChanged = this.onLightingChanged.bind(this);
    this.el.sceneEl.addEventListener('x0014-lighting-changed', this.onLightingChanged);
    window.addEventListener('immovision-lighting-changed', this.onLightingChanged);

    if (this.system && this.system.state) {
      this.applyLighting(this.system.state.lighting || 'day');
    }
  },

  onLightingChanged: function (evt) {
    const val = (evt && evt.detail) ? (evt.detail.value || evt.detail.lighting) : 'day';
    this.applyLighting(val);
  },

  applyLighting: function (mode) {
    if (!this.sunLight) this.sunLight = document.querySelector('#sun-light');
    if (!this.ambientLight) this.ambientLight = document.querySelector('#ambient-light');
    if (!this.lightChandelier) this.lightChandelier = document.querySelector('#light-chandelier');
    if (!this.lightKitchen) this.lightKitchen = document.querySelector('#light-kitchen');
    if (!this.lightBedroom) this.lightBedroom = document.querySelector('#light-bedroom');
    if (!this.skyEl) this.skyEl = document.querySelector('#sky-environment') || document.querySelector('a-sky');

    if (mode === 'day') {
      if (this.sunLight) {
        this.sunLight.setAttribute('light', {
          type: 'directional',
          color: '#fffaf0',
          intensity: 1.15
        });
        this.sunLight.setAttribute('position', '5 9 3');
      }
      if (this.ambientLight) {
        this.ambientLight.setAttribute('light', {
          type: 'ambient',
          color: '#e2e8f0',
          intensity: 0.55
        });
      }
      if (this.lightChandelier) this.lightChandelier.setAttribute('light', { intensity: 0.5, color: '#ffeedd' });
      if (this.lightKitchen) this.lightKitchen.setAttribute('light', { intensity: 0.5, color: '#ffffff' });
      if (this.lightBedroom) this.lightBedroom.setAttribute('light', { intensity: 0.4, color: '#ffe8cc' });
      if (this.skyEl) {
        this.skyEl.setAttribute('src', '#tex-sky-day');
        this.skyEl.setAttribute('material', { color: '#ffffff', opacity: 1.0 });
      }
    } else if (mode === 'evening') {
      if (this.sunLight) {
        this.sunLight.setAttribute('light', {
          type: 'directional',
          color: '#f97316',
          intensity: 1.05
        });
        this.sunLight.setAttribute('position', '8 3.5 5');
      }
      if (this.ambientLight) {
        this.ambientLight.setAttribute('light', {
          type: 'ambient',
          color: '#fed7aa',
          intensity: 0.45
        });
      }
      if (this.lightChandelier) this.lightChandelier.setAttribute('light', { intensity: 0.95, color: '#fed7aa' });
      if (this.lightKitchen) this.lightKitchen.setAttribute('light', { intensity: 0.8, color: '#fde68a' });
      if (this.lightBedroom) this.lightBedroom.setAttribute('light', { intensity: 0.75, color: '#fed7aa' });
      if (this.skyEl) {
        this.skyEl.setAttribute('src', '#tex-sky-day');
        this.skyEl.setAttribute('material', { color: '#fb923c', opacity: 1.0 });
      }
    } else if (mode === 'night') {
      if (this.sunLight) {
        this.sunLight.setAttribute('light', {
          type: 'directional',
          color: '#1e3a8a',
          intensity: 0.12
        });
        this.sunLight.setAttribute('position', '2 7 2');
      }
      if (this.ambientLight) {
        this.ambientLight.setAttribute('light', {
          type: 'ambient',
          color: '#090d16',
          intensity: 0.25
        });
      }
      if (this.lightChandelier) this.lightChandelier.setAttribute('light', { intensity: 1.4, distance: 9, decay: 1.8, color: '#ffedd5' });
      if (this.lightKitchen) this.lightKitchen.setAttribute('light', { intensity: 1.1, distance: 5, decay: 1.8, color: '#fef08a' });
      if (this.lightBedroom) this.lightBedroom.setAttribute('light', { intensity: 1.0, distance: 6, decay: 1.8, color: '#fed7aa' });
      if (this.skyEl) {
        this.skyEl.setAttribute('src', '#tex-sky-night');
        this.skyEl.setAttribute('material', { color: '#cbd5e1', opacity: 1.0 });
      }
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('x0014-lighting-changed', this.onLightingChanged);
    window.removeEventListener('immovision-lighting-changed', this.onLightingChanged);
  }
});


/* =========================================================================
   4. COMPONENT: x0014-teleport-controls
   ========================================================================= */
AFRAME.registerComponent('x0014-teleport-controls', {
  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];
    this.rig = document.querySelector('#rig');
    this.fader = document.querySelector('#teleport-fader');

    this.landmarks = {
      foyer: { x: -4.5, y: 0.0, z: 0.0, label: 'Entrance Foyer & Kiosk' },
      living: { x: 0.0, y: 0.0, z: 1.5, label: 'Living Room' },
      kitchen: { x: 0.0, y: 0.0, z: -3.6, label: 'Open Kitchen' },
      bedroom: { x: 4.8, y: 0.0, z: 0.0, label: 'Master Bedroom' },
      balcony: { x: 0.0, y: 0.0, z: 6.8, label: 'Terrace & Astana Skyline' }
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === '1') this.teleportToZone('foyer');
      else if (e.key === '2') this.teleportToZone('living');
      else if (e.key === '3') this.teleportToZone('kitchen');
      else if (e.key === '4') this.teleportToZone('bedroom');
      else if (e.key === '5') this.teleportToZone('balcony');
      else if (e.key === 'c' || e.key === 'C') this.system.toggleSeatedMode();
      else if (e.key === 'm' || e.key === 'M') {
        const voiceComp = document.querySelector('[x0014-voice-configurator]');
        if (voiceComp && voiceComp.components['x0014-voice-configurator']) {
          voiceComp.components['x0014-voice-configurator'].startListening();
        }
      }
    });
  },

  teleportToZone: function (zoneKey) {
    const target = this.landmarks[zoneKey];
    if (!target || !this.rig) return;

    if (this.fader) {
      this.fader.setAttribute('animation', 'property: material.opacity; from: 0; to: 0.9; dur: 100; dir: alternate; loop: 1');
      setTimeout(() => {
        this.rig.object3D.position.set(target.x, 0, target.z);
        const head = document.querySelector('#head');
        if (head) head.setAttribute('position', { x: 0, y: this.system.state.seatedMode ? 1.15 : 1.65, z: 0 });
        this.system.setRoom(zoneKey);
      }, 100);
    } else {
      this.rig.object3D.position.set(target.x, 0, target.z);
      const head = document.querySelector('#head');
      if (head) head.setAttribute('position', { x: 0, y: this.system.state.seatedMode ? 1.15 : 1.65, z: 0 });
      this.system.setRoom(zoneKey);
    }
  }
});


/* =========================================================================
   5. COMPONENT: x0014-holographic-palette
   ========================================================================= */
AFRAME.registerComponent('x0014-holographic-palette', {
  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];

    const buttons = this.el.querySelectorAll('.pal-btn');
    buttons.forEach(btn => {
      const execute = () => {
        const actionType = btn.getAttribute('data-type');
        const actionVal = btn.getAttribute('data-value');

        // Tactile button depression animation
        btn.setAttribute('animation__press', 'property: scale; from: 0.90 0.90 0.90; to: 1.0 1.0 1.0; dur: 200; easing: easeOutQuad; startEvents: pal_press');
        btn.emit('pal_press');

        if (actionType === 'floor') {
          this.system.setFloor(actionVal, 'kiosk');
        } else if (actionType === 'wall') {
          this.system.setWall(actionVal, 'kiosk');
        } else if (actionType === 'lighting') {
          this.system.setLighting(actionVal, 'kiosk');
        } else if (actionType === 'door') {
          this.system.toggleDoor();
        }
      };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        execute();
      });
      btn.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        execute();
      });
      btn.addEventListener('mouseenter', () => btn.setAttribute('scale', '1.06 1.06 1.06'));
      btn.addEventListener('mouseleave', () => btn.setAttribute('scale', '1.0 1.0 1.0'));
    });
  }
});


/* =========================================================================
   6. COMPONENT: x0014-summary-board
   ========================================================================= */
AFRAME.registerComponent('x0014-summary-board', {
  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];
    this.boardText = this.el.querySelector('#summary-text');
    this.renderSummary();

    const bookBtn = this.el.querySelector('#book-consultation-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const pricing = this.system.calculateTotalPrice();
        alert(`BI GROUP RESERVATION CONFIRMATION:\n\nUnit: Grand Opera #414 (85.7 m2)\nFlooring: ${pricing.breakdown.floor.name}\nWalls: ${pricing.breakdown.wall.name}\nLighting: ${pricing.breakdown.lighting.name}\nTotal Estimated Cost: ${(pricing.totalKZT).toLocaleString()} KZT (~$${pricing.totalUSD.toLocaleString()} USD)\n\nSales Consultant will contact you within 1 business day.`);
      });
    }
  },

  renderSummary: function () {
    if (!this.boardText) return;
    const pricing = this.system.calculateTotalPrice();
    const content = [
      `BI GROUP RESIDENTIAL SALES — SPECIFICATION SUMMARY`,
      `====================================================`,
      `Project: Grand Opera Luxury 2-Bedroom (Unit #414)`,
      `Total Usable Floor Area: 85.7 m2 | Delivery: Q4 2027`,
      `Base Property Price: ${(pricing.baseKZT / 1000000).toFixed(2)}M KZT (~$${Math.round(pricing.baseKZT / 495).toLocaleString()})`,
      `----------------------------------------------------`,
      `Selected Custom Finishes & Upgrade Breakdown:`,
      `• Flooring: ${pricing.breakdown.floor.name}`,
      `  Surcharge: +${pricing.breakdown.floor.price.toLocaleString()} KZT (${pricing.breakdown.floor.tag})`,
      `• Wall Surface: ${pricing.breakdown.wall.name}`,
      `  Surcharge: +${pricing.breakdown.wall.price.toLocaleString()} KZT (${pricing.breakdown.wall.tag})`,
      `• Architectural Lighting: ${pricing.breakdown.lighting.name}`,
      `  Surcharge: +${pricing.breakdown.lighting.price.toLocaleString()} KZT (${pricing.breakdown.lighting.tag})`,
      `----------------------------------------------------`,
      `TOTAL CUSTOMIZED PRICE: ${(pricing.totalKZT / 1000000).toFixed(2)}M KZT (~$${pricing.totalUSD.toLocaleString()} USD)`,
      `Monthly Mortgage (7-20-25 Program): ~284,000 KZT/mo`,
      `====================================================`,
      `[Click "Book Consultation" below to lock this configuration]`
    ].join('\n');

    this.boardText.setAttribute('text', `value: ${content}; color: #ffffff; width: 3.4; font: monoid; wrapCount: 46; lineHeight: 52`);
  }
});


/* =========================================================================
   7. COMPONENT: x0014-animated-door
   ========================================================================= */
AFRAME.registerComponent('x0014-animated-door', {
  schema: { maxSlide: { type: 'number', default: 1.35 } },
  init: function () {
    this.system = this.el.sceneEl.systems['x0014-immovision-system'];
    this.isOpen = false;
    this.panel = this.el.querySelector('#sliding-door-panel');

    this.el.addEventListener('click', () => this.system.toggleDoor());
    if (this.panel) {
      this.panel.addEventListener('click', () => this.system.toggleDoor());
    }
    this.onDoorToggled = this.onDoorToggled.bind(this);
    this.el.sceneEl.addEventListener('x0014-door-toggled', this.onDoorToggled);
  },

  onDoorToggled: function (evt) {
    this.isOpen = evt.detail.open;
    const targetX = this.isOpen ? this.data.maxSlide : 0;
    if (this.panel) {
      this.panel.setAttribute('animation', {
        property: 'position',
        to: `${targetX} 1.45 0`,
        dur: 900,
        easing: 'easeInOutQuad'
      });
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('x0014-door-toggled', this.onDoorToggled);
  }
});


/* =========================================================================
   8. COMPONENT: x0014-animated-fan
   ========================================================================= */
AFRAME.registerComponent('x0014-animated-fan', {
  schema: { speed: { type: 'number', default: 360 } },
  tick: function (time, delta) {
    const rotDelta = (this.data.speed * (delta / 1000)) % 360;
    const currentRot = this.el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    this.el.setAttribute('rotation', {
      x: currentRot.x,
      y: (currentRot.y + rotDelta) % 360,
      z: currentRot.z
    });
  }
});


// Procedural Canvas Texture & GLB Fallback Generator for 100% Zero-Fail Resilience
(function () {
  const CanvasTextures = {
    generateOak: function () {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#b7834a';
      ctx.fillRect(0, 0, 512, 512);
      // Planks
      const plankH = 64;
      for (let y = 0; y < 512; y += plankH) {
        ctx.strokeStyle = '#6e471f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(512, y);
        ctx.stroke();
        // Wood grain
        for (let i = 0; i < 18; i++) {
          ctx.strokeStyle = (i % 2 === 0) ? 'rgba(145, 96, 47, 0.45)' : 'rgba(217, 169, 114, 0.35)';
          ctx.lineWidth = 1 + Math.random() * 2;
          ctx.beginPath();
          const startY = y + Math.random() * plankH;
          ctx.moveTo(0, startY);
          ctx.bezierCurveTo(150, startY + (Math.random() - 0.5) * 8, 350, startY + (Math.random() - 0.5) * 8, 512, startY);
          ctx.stroke();
        }
        // Vertical plank joints
        const step = 170;
        const offset = (y / plankH) % 2 === 0 ? 0 : 85;
        for (let x = offset; x < 512; x += step) {
          ctx.strokeStyle = '#4a3016';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(x, y + plankH);
          ctx.stroke();
        }
      }
      return c.toDataURL('image/png');
    },

    generateWalnut: function () {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#422817';
      ctx.fillRect(0, 0, 512, 512);
      const plankH = 64;
      for (let y = 0; y < 512; y += plankH) {
        ctx.strokeStyle = '#231309';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
        for (let i = 0; i < 22; i++) {
          ctx.strokeStyle = 'rgba(102, 63, 38, 0.4)';
          ctx.lineWidth = 1 + Math.random() * 2;
          ctx.beginPath();
          const startY = y + Math.random() * plankH;
          ctx.moveTo(0, startY);
          ctx.bezierCurveTo(150, startY + (Math.random() - 0.5) * 6, 350, startY + (Math.random() - 0.5) * 6, 512, startY);
          ctx.stroke();
        }
      }
      return c.toDataURL('image/png');
    },

    generateMarble: function () {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 512, 512);
      // Subtle grey veins
      for (let i = 0; i < 7; i++) {
        ctx.strokeStyle = (i % 2 === 0) ? 'rgba(203, 213, 225, 0.7)' : 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 2 + Math.random() * 3;
        ctx.beginPath();
        let curX = Math.random() * 512, curY = 0;
        ctx.moveTo(curX, curY);
        while (curY < 512) {
          curX += (Math.random() - 0.5) * 70;
          curY += 40 + Math.random() * 60;
          ctx.lineTo(curX, curY);
        }
        ctx.stroke();
      }
      return c.toDataURL('image/png');
    },

    generateSlate: function () {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#262d38';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#151920';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, 256, 256);
      ctx.strokeRect(256, 0, 256, 256);
      ctx.strokeRect(0, 256, 256, 256);
      ctx.strokeRect(256, 256, 256, 256);
      return c.toDataURL('image/png');
    }
  };

  AFRAME.registerComponent('x0014-asset-resilience', {
    init: function () {
      const isFileProtocol = window.location.protocol === 'file:';
      const self = this;

      // 1. Procedural textures fallback if file protocol or image error
      if (isFileProtocol) {
        console.warn('[x0014-asset-resilience] file:// protocol detected. Activating procedural textures and mesh fallbacks.');
        this.injectProceduralTextures();
      }

      // 2. Setup GLB fallback watchers
      this.setupModelFallbacks();
    },

    injectProceduralTextures: function () {
      const oak = CanvasTextures.generateOak();
      const walnut = CanvasTextures.generateWalnut();
      const marble = CanvasTextures.generateMarble();
      const slate = CanvasTextures.generateSlate();

      const oakImg = document.getElementById('tex-floor-oak');
      if (oakImg) oakImg.src = oak;
      const walImg = document.getElementById('tex-floor-walnut');
      if (walImg) walImg.src = walnut;
      const marImg = document.getElementById('tex-floor-marble');
      if (marImg) marImg.src = marble;
      const slaImg = document.getElementById('tex-floor-slate');
      if (slaImg) slaImg.src = slate;

      const mainFloor = document.getElementById('main-floor');
      if (mainFloor) {
        mainFloor.setAttribute('material', `src: ${oak}; repeat: 6 6; roughness: 0.5`);
      }
    },

    setupModelFallbacks: function () {
      const entities = document.querySelectorAll('[gltf-model]');
      entities.forEach(el => {
        let loaded = false;
        el.addEventListener('model-loaded', () => { loaded = true; });
        el.addEventListener('model-error', () => {
          if (!loaded) this.spawnFallback(el);
        });
        setTimeout(() => {
          if (!loaded && (!el.getObject3D('mesh') || el.getObject3D('mesh').children.length === 0)) {
            this.spawnFallback(el);
          }
        }, 1500);
      });
    },

    spawnFallback: function (el) {
      if (el.dataset.fallbackApplied) return;
      el.dataset.fallbackApplied = 'true';
      const modelAttr = el.getAttribute('gltf-model') || '';

      if (modelAttr.includes('sofa')) {
        // Luxury 3-seater Velvet Sofa
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <!-- Main Seating Base -->
          <a-box position="0 0.35 0" width="2.3" height="0.3" depth="0.95" material="color: #1e3a5f; roughness: 0.85"></a-box>
          <!-- 3 Cushions -->
          <a-box position="-0.72 0.52 0.02" width="0.72" height="0.14" depth="0.88" material="color: #254877; roughness: 0.8"></a-box>
          <a-box position="0 0.52 0.02" width="0.72" height="0.14" depth="0.88" material="color: #254877; roughness: 0.8"></a-box>
          <a-box position="0.72 0.52 0.02" width="0.72" height="0.14" depth="0.88" material="color: #254877; roughness: 0.8"></a-box>
          <!-- Backrest -->
          <a-box position="0 0.78 -0.38" width="2.3" height="0.65" depth="0.22" material="color: #1a3252; roughness: 0.85"></a-box>
          <!-- Left Armrest -->
          <a-box position="-1.2 0.65 0" width="0.22" height="0.5" depth="0.98" material="color: #1a3252; roughness: 0.85"></a-box>
          <!-- Right Armrest -->
          <a-box position="1.2 0.65 0" width="0.22" height="0.5" depth="0.98" material="color: #1a3252; roughness: 0.85"></a-box>
          <!-- 4 Brass Cylinder Legs -->
          <a-cylinder position="-1.05 0.1 -0.38" radius="0.03" height="0.2" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="1.05 0.1 -0.38" radius="0.03" height="0.2" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="-1.05 0.1 0.38" radius="0.03" height="0.2" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="1.05 0.1 0.38" radius="0.03" height="0.2" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
        `;
        el.appendChild(group);
      } else if (modelAttr.includes('chair')) {
        // Designer Lounge Armchair
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <a-box position="0 0.36 0" width="0.85" height="0.22" depth="0.8" material="color: #c97d4a; roughness: 0.8"></a-box>
          <a-box position="0 0.72 -0.32" width="0.85" height="0.55" depth="0.18" material="color: #b86e3d; roughness: 0.8"></a-box>
          <a-box position="-0.46 0.55 0" width="0.12" height="0.38" depth="0.8" material="color: #b86e3d; roughness: 0.8"></a-box>
          <a-box position="0.46 0.55 0" width="0.12" height="0.38" depth="0.8" material="color: #b86e3d; roughness: 0.8"></a-box>
          <a-cylinder position="-0.38 0.12 -0.32" radius="0.02" height="0.24" material="color: #0f172a; metalness: 0.8"></a-cylinder>
          <a-cylinder position="0.38 0.12 -0.32" radius="0.02" height="0.24" material="color: #0f172a; metalness: 0.8"></a-cylinder>
          <a-cylinder position="-0.38 0.12 0.32" radius="0.02" height="0.24" material="color: #0f172a; metalness: 0.8"></a-cylinder>
          <a-cylinder position="0.38 0.12 0.32" radius="0.02" height="0.24" material="color: #0f172a; metalness: 0.8"></a-cylinder>
        `;
        el.appendChild(group);
      } else if (modelAttr.includes('coffee-table')) {
        // Brass & Glass Coffee Table
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <a-cylinder position="0 0.02 0" radius="0.52" height="0.03" material="color: #fbbf24; metalness: 0.9; roughness: 0.2"></a-cylinder>
          <a-cylinder position="0 0.42 0" radius="0.55" height="0.02" material="color: #0f172a; opacity: 0.65; transparent: true; roughness: 0.05"></a-cylinder>
          <a-cylinder position="-0.36 0.22 0" radius="0.015" height="0.4" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="0.36 0.22 0" radius="0.015" height="0.4" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="0 0.22 -0.36" radius="0.015" height="0.4" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-cylinder position="0 0.22 0.36" radius="0.015" height="0.4" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
        `;
        el.appendChild(group);
      } else if (modelAttr.includes('bed')) {
        // Master Platform Bed
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <a-box position="0 0.22 0" width="2.1" height="0.38" depth="2.3" material="color: #334155; roughness: 0.8"></a-box>
          <a-box position="0 0.44 0.1" width="1.95" height="0.22" depth="2.1" material="color: #f1f5f9; roughness: 0.9"></a-box>
          <a-box position="0 0.85 -1.05" width="2.2" height="0.9" depth="0.15" material="color: #1e293b; roughness: 0.7"></a-box>
          <a-box position="-0.5 0.58 -0.75" rotation="15 0 0" width="0.65" height="0.12" depth="0.4" material="color: #cbd5e1"></a-box>
          <a-box position="0.5 0.58 -0.75" rotation="15 0 0" width="0.65" height="0.12" depth="0.4" material="color: #cbd5e1"></a-box>
        `;
        el.appendChild(group);
      } else if (modelAttr.includes('fan')) {
        // Ceiling Fan
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <a-cylinder position="0 0.08 0" radius="0.12" height="0.14" material="color: #fbbf24; metalness: 0.9"></a-cylinder>
          <a-box position="0 0.06 0" width="1.4" height="0.01" depth="0.12" material="color: #2b1d14; roughness: 0.4"></a-box>
          <a-box position="0 0.06 0" rotation="0 90 0" width="1.4" height="0.01" depth="0.12" material="color: #2b1d14; roughness: 0.4"></a-box>
        `;
        group.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; loop: true; easing: linear');
        el.appendChild(group);
      } else if (modelAttr.includes('door')) {
        // Sliding Terrace Door
        const group = document.createElement('a-entity');
        group.innerHTML = `
          <a-box position="0 1.45 0" width="1.95" height="2.68" depth="0.04" material="color: #38bdf8; opacity: 0.25; transparent: true"></a-box>
          <a-box position="0 2.78 0" width="1.95" height="0.06" depth="0.06" material="color: #0f172a; metalness: 0.8"></a-box>
          <a-box position="0 0.12 0" width="1.95" height="0.06" depth="0.06" material="color: #0f172a; metalness: 0.8"></a-box>
          <a-cylinder position="-0.85 1.45 0.04" radius="0.015" height="0.8" material="color: #f8fafc; metalness: 0.9"></a-cylinder>
        `;
        el.appendChild(group);
      }
    }
  });

  /* =========================================================================
     12. COMPONENT: x0014-mobile-walk-controls
     Enables smooth first-person walking on touchscreens via virtual D-Pad
     ========================================================================= */
  AFRAME.registerComponent('x0014-mobile-walk-controls', {
    init: function () {
      this.rig = document.querySelector('#rig');
      this.head = document.querySelector('#head');
      this.moveVector = { forward: 0, right: 0 };
      this.speed = 2.4; // m/s
      this.clock = new THREE.Clock();

      const bindBtn = (id, forwardVal, rightVal) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        
        const startMove = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.moveVector.forward = forwardVal;
          this.moveVector.right = rightVal;
          btn.classList.add('active');
        };
        
        const stopMove = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.moveVector.forward = 0;
          this.moveVector.right = 0;
          btn.classList.remove('active');
        };

        btn.addEventListener('touchstart', startMove, { passive: false });
        btn.addEventListener('touchend', stopMove, { passive: false });
        btn.addEventListener('touchcancel', stopMove, { passive: false });
        btn.addEventListener('mousedown', startMove);
        btn.addEventListener('mouseup', stopMove);
        btn.addEventListener('mouseleave', stopMove);
      };

      bindBtn('m-walk-up', 1, 0);
      bindBtn('m-walk-down', -1, 0);
      bindBtn('m-walk-left', 0, -1);
      bindBtn('m-walk-right', 0, 1);
    },

    tick: function (time, delta) {
      if (!this.rig || !this.head) return;
      if (this.moveVector.forward === 0 && this.moveVector.right === 0) return;

      const dt = Math.min((delta || 16) / 1000, 0.1);
      const cameraObj = this.head.object3D;
      const rigObj = this.rig.object3D;

      // Get camera yaw angle
      const rotation = new THREE.Euler(0, 0, 0, 'YXZ');
      rotation.setFromQuaternion(cameraObj.quaternion);
      const yaw = rotation.y;

      // Forward vector in XZ plane
      const forwardX = -Math.sin(yaw);
      const forwardZ = -Math.cos(yaw);

      // Right vector in XZ plane
      const rightX = Math.cos(yaw);
      const rightZ = -Math.sin(yaw);

      const step = this.speed * dt;
      const dx = (forwardX * this.moveVector.forward + rightX * this.moveVector.right) * step;
      const dz = (forwardZ * this.moveVector.forward + rightZ * this.moveVector.right) * step;

      // Apartment perimeter bounds
      const nextX = Math.max(-6.5, Math.min(6.5, rigObj.position.x + dx));
      const nextZ = Math.max(-5.5, Math.min(7.2, rigObj.position.z + dz));

      rigObj.position.x = nextX;
      rigObj.position.z = nextZ;

      // Notify system of position change for radar and rooms
      const sys = this.el.sceneEl ? this.el.sceneEl.systems['x0014-immovision-system'] : null;
      if (sys && sys.checkRoomTransition) {
        sys.checkRoomTransition(nextX, nextZ);
      }
    }
  });
})();
