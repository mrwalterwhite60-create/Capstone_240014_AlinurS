# IMMOVISION VR — MASTER DEFENSE PREPARATION GUIDE (100% SCORE PLAYBOOK)

**Course:** AR/VR/XR Applications (AIB), 6B04103 AI Business, 3rd year  
**Assessment:** Final Assessment — Capstone Project Defense (Weight: 40% of Final Grade)  
**Student:** Alinur Sabit (Alinur S.) | **Student ID:** `240014` | **Group:** AIB-2401  
**Project:** ImmoVision VR: Interactive Off-Plan Apartment Tour with AI Voice Configurator & Dynamic BIM Pricing  
**Client:** BI Group Development (Astana Central Sales Department) | **Brief:** B6 (Real Estate VR)  
**Prefix:** `x0014-` (derived from Student ID `240014`)

---

## 1. Defense Slot Timing Architecture (Total: 15 Minutes Individual)

| Time Interval | Segment | Goal & Key Actions | Focus Area |
|---|---|---|---|
| **00:00 – 06:00 (6 min)** | **Slide Presentation** | Present slides 1 to 10 with calm confidence, citing numbers, stakeholder quotes, and academic references. | R1–R6 (30 pts) |
| **06:00 – 10:00 (4 min)** | **Live WebXR Demonstration** | Run the live WebXR application on laptop / Meta Quest. Execute the 3-state narrative arc (Beginning -> Task -> Resolution), AI Voice Configurator, and Tactile Fallback. | P1–P5 (60 pts) |
| **10:00 – 13:00 (3 min)** | **Oral Defense Q&A** | Answer instructor technical, design, ethics, and business questions with zero hesitation. | D1, D2 (8 pts) |
| **13:00 – 15:00 (2 min)** | **Live Code Modification** | Execute the instructor's live change request in `< 60 seconds` using the pre-rehearsed modification guide. | D3 (2 pts) |

---

## 2. Six-Minute Presentation Script (Slide-by-Slide Walkthrough)

### Slide 1: Cover Slide (0:00 – 0:30)
> *"Good morning/afternoon, Professor. My name is Alinur Sabit, student ID 240014 from group AIB-2401. Today, I am defending my individual capstone project: **ImmoVision VR**, an interactive off-plan apartment tour with an AI voice configurator and real-time BIM pricing, developed for our client, **BI Group Development** in Astana under Brief B6."*

### Slide 2: The Problem in Astana Off-Plan Real Estate (0:30 – 1:15)
> *"In Astana, residential real estate is sold off-plan 12 to 24 months before building completion. Buyers must commit 40 to 80 million Tenge based only on static 2D floor plans and promotional renders. In our primary discovery interview with Aigerim T., Senior Sales Consultant at BI Group's Astana Central Sales Office, she revealed that **85% of buyer friction stems from uncertainty over interior finishes** and room scale. Buyers cannot visualize how dark walnut looks compared to white marble under dynamic daylight, stretching decision cycles to 3–6 months."*

### Slide 3: The ImmoVision VR Solution & Narrative Story Arc (1:15 – 2:00)
> *"ImmoVision VR solves this with a lightweight WebXR experience covering a 3-part narrative story arc in an 85.7 m² two-bedroom suite at BI Group's Grand Opera residential complex:
> 1. **Beginning:** Spawning in the entrance foyer, the buyer inspects an interactive architectural blueprint kiosk with engineering specs and permission onboarding.
> 2. **Task:** Walking through the living room, open kitchen, and master bedroom, the user customizes flooring, wall colors, and lighting using natural voice commands or a 3D tactile palette.
> 3. **Resolution:** Stepping out through an animated sliding terrace door onto the balcony, the buyer inspects an interactive BIM summary board calculating the live property price in KZT and reserves the unit."*

### Slide 4: AI Voice Configurator & Bilingual NLP Engine (2:00 – 2:50)
> *"Our AI feature is an in-browser Speech Recognition and Intent Understanding pipeline. Spoken audio is captured via the Web Speech API and processed through a client-side bilingual NLP parser. Because Astana is bilingual, the engine recognizes both English and Russian synonyms—such as 'Dark oak floor' or 'Темный дуб', 'Calacatta marble' or 'Мрамор', and 'Night mode'. Furthermore, we implemented fuzzy Levenshtein distance matching with a threshold of edit distance 2, tolerating local accent variations and minor speech recognition errors. Validated commands trigger immediate Three.js PBR shader updates, confirmed by synthesized voice feedback."*

### Slide 5: Multimodal Fallback & Ergonomics (Bucher, 2018) (2:50 – 3:35)
> *"To ensure fail-safe operation in noisy sales galleries or if microphone permissions are denied, we engineered an automatic fallback: a floating 3D Holographic Touch Palette at ergonomic waist height (1.25 m), interactive via VR laser raycast, gaze dwell, or mouse clicks. Following VR ergonomics research by **John Bucher (2018)**, we eliminated vection-induced nausea by using instantaneous blink teleportation with a 120 ms blackout fade. We also provided a universal seated mode toggle via hotkey `[C]`, lowering eye height to 1.15 m for wheelchair accessibility, and ensured redundant multimodal cues so color is never the only feedback."*

### Slide 6: Quantitative AI Evaluation & Performance Benchmarks (3:35 – 4:20)
> *"Our empirical evaluation proved that the AI Voice Configurator reduces finish customization time from **42.1 seconds** using traditional menus to just **18.4 seconds**—a **56.3% faster execution**—with zero gaze distraction while walking. In performance benchmarking on the Meta Quest Browser, ImmoVision VR sustains a **rock-solid 72.0 FPS** with frame times of 13.4 ms, 34 draw calls, and a total application bundle of just **0.41 MB**, which is **98.6% below the course 30 MB ceiling**."*

### Slide 7: User Testing & System Usability Scale (SUS) (4:20 – 5:00)
> *"We conducted formal user testing with 3 representative evaluators: a prospective homebuyer (Nurlan, 34), a BI Group sales consultant (Aigerim, 28), and a peer XR student (Daniyar, 21). Across all 4 tasks, completion rate was 100%. Our mean **System Usability Scale score was 88.33 out of 100**, placing ImmoVision VR in the **Grade A+ top percentile**. Based on tester feedback, we implemented three iterative improvements: a 250 ms cyan emissive flash when materials swap, a 20% enlargement of touch swatches, and expanded Russian voice lemmas."*

### Slide 8: Ethics, Privacy & WebXR vs Native Engines (5:00 – 5:35)
> *"Ethically, zero audio data leaves the client device or is stored in any database; permissions are clearly explained upfront on the landing modal; and 1:1 metric scale prevents deceptive staging. Comparing our stack against native engines using the framework of **Hussain & Hussain (2025)**, WebXR provides decisive commercial advantages: zero installation friction via an instant URL, a 0.41 MB download compared to 1–4 GB native builds, and minimal maintenance costs."*

### Slide 9 & 10: Business Case & Demo Transition (5:35 – 6:00)
> *"Financially, deploying ImmoVision VR across two BI Group sales galleries requires an initial Year-1 investment of **$9,760 USD (~4.83M KZT)**. With a developer margin of 12% on a 48.5M KZT apartment, closing just **one single incremental sale** delivers an immediate **120% return on investment**. I will now launch the live WebXR demonstration. Thank you."*

---

## 3. Four-Minute Live Demo Script (Step-by-Step on Laptop / Quest)

1. **Step 1: Landing Modal & Permission Onboarding (0:00 – 0:30)**
   - Show the browser screen at `http://localhost:8000` (or GitHub Pages).
   - Point out the landing card: *“Notice the explicit privacy notice explaining microphone and WebXR usage before requesting permissions.”*
   - Click **`ENTER VR APARTMENT EXPERIENCE`**.

2. **Step 2: State 1 — Foyer & Blueprint Kiosk (0:30 – 1:00)**
   - Show the entrance foyer. Look at the standing terminal displaying `textures/blueprint.png`.
   - Point out: *“Here is the BIM floorplan for Unit #414 (85.7 m²), showing base price 48.5M KZT.”*
   - Click the blue floor marker or press `[2]` to teleport into the living room.

3. **Step 3: State 2 — Walkable Interior & Spoken AI Customization (1:00 – 2:30)**
   - Look around the living room: point out the animated ceiling fan (`models/ceiling_fan.glb`) rotating continuously.
   - Speak clearly into the microphone:
     - Spoken Command 1: **`"Dark oak floor"`** (or `"Walnut floor"`)
       - *Observe:* Floor switches to rich smoked walnut; cyan flash pulses; synthesized voice speaks: *"Smoked American Walnut Hardwood flooring applied."*; subtitle appears on HUD.
     - Spoken Command 2: **`"Calacatta marble"`** (or `"Marble floor"`)
       - *Observe:* Floor switches to specular polished marble; subtitle displays.
     - Spoken Command 3: **`"Set walls to warm beige"`** (or in Russian: `"Бежевые стены"`)
       - *Observe:* Walls update to alabaster beige.
     - Spoken Command 4: **`"Night mode"`** (or `"Switch to evening"`)
       - *Observe:* Sun dims, warm recessed spotlights illuminate, and the exterior window view displays the glowing Astana night skyline panorama with Baiterek tower.

4. **Step 4: Tactile Fallback Palette & State 3 Resolution (2:30 – 4:00)**
   - Turn to the left to show the floating 3D Holographic Touch Palette (`x0014-holographic-palette`).
   - Click the **`Slate`** swatch and **`Sage`** wall swatch with the mouse / VR controller laser:
     - Point out: *“If microphone access is denied or showroom noise is excessive, this tactile 3D fallback provides 100% operational parity.”*
   - Press hotkey `[C]` to demonstrate **Seated Mode**:
     - Point out: *“Notice the camera smoothly drops from 1.65 m standing height to 1.15 m seated height per Bucher (2018) accessibility guidelines.”* Press `[C]` again to restore standing height.
   - Click the sliding terrace glass door (`models/sliding_door.glb`):
     - *Observe:* Glass door smoothly slides open along its track (`x0014-animated-door`).
   - Step onto the balcony / press `[5]`:
     - Inspect the **Interactive 3D BIM Summary Board** (`x0014-summary-board`):
     - Read the numbers: *“Notice the dynamic calculation: Base price 48,500,000 KZT + Walnut hardwood (+650,000 KZT) + Night lighting (+780,000 KZT) = Total 49,930,000 KZT (~$100,868 USD).”*
     - Click **`LOCK IN & RESERVE SPECIFICATION`** to trigger the reservation dialog.
   - Conclude: *“That concludes the full narrative story arc. I am ready for questions and live code modification.”*

---

## 4. Bulletproof Answers to Ruthless Professor Questions

### Area A: Technical Architecture & Code Questions

**Q1: "Open your code and show me where the AI model runs and what data it receives."**
> **Answer:**  
> *"The AI feature is implemented in `components.js` inside the component `x0014-voice-configurator` (lines 140–350). The speech recognition model is the browser's native implementation of the W3C Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`). It receives a continuous 16 kHz PCM microphone audio stream.  
> The transcribed text string is then passed to our client-side intent classifier in `processSpokenCommand()` (line 235). It evaluates the normalized string against our regex intent catalog, and if an exact match is not found, runs our `levenshtein()` function (line 280) to compute edit distance against our target material dictionary. Once validated, it dispatches an `x0014-finish-changed` event to the `x0014-immovision-system` state machine and calls `window.speechSynthesis.speak()` for audio feedback."*

**Q2: "What happens if the user denies microphone permission or has an unsupported browser?"**
> **Answer:**  
> *"We engineered a zero-failure fallback architecture. In `components.js` line 195, the `onerror` handler captures the `'not-allowed'` event when the user denies permission. It sets `this.micGranted = false`, marks `this.system.state.fallbackUsed = true`, updates the 2D HUD badge to `'MIC: Denied'`, and displays an on-screen subtitle informing the user.  
> Simultaneously, the in-world 3D Holographic Touch Palette (`x0014-holographic-palette`), which is already loaded at waist height in the living room, provides immediate 1-click tactile material, wall, lighting, and door toggling via 6DoF laser raycasting, gaze cursor dwell, or desktop mouse clicks. The application never crashes and the user is never locked out."*

**Q3: "How does your material finish swapper work under the hood in Three.js?"**
> **Answer:**  
> *"In `components.js`, the component `x0014-finish-swapper` (lines 355–445) attaches to the target room meshes. During initialization, it pre-caches high-resolution PBR textures into memory using `THREE.TextureLoader` and sets `wrapS` and `wrapT` to `THREE.RepeatWrapping` with a repeat factor of 4x4 for architectural scaling.  
> When an `x0014-finish-changed` event is received, `applyCurrentFinish()` retrieves the mesh object from `this.el.getObject3D('mesh')` and traverses its children. For flooring, it swaps `material.map` to the selected texture buffer, adjusts `material.roughness` (e.g. 0.15 for polished marble vs 0.85 for slate), sets `material.needsUpdate = true`, and executes `triggerMaterialFlash()`, which pulses `material.emissive` to `#38bdf8` for 250 ms so the user immediately notices the change."*

**Q4: "How did you maintain a sustained 72 FPS on standalone Meta Quest?"**
> **Answer:**  
> *"Mobile WebXR is heavily bound by draw calls and fill rate. We achieved a solid 72.0 FPS with 13.4 ms frame times by:  
> 1. Restricting total scene draw calls to exactly 34 (well below the mobile WebGL ceiling of 50).  
> 2. Clamping all PBR textures to 512x512 resolution and using procedural canvas synthesis, resulting in an entire application bundle of just 0.41 MB.  
> 3. Merging static wall geometries and setting shadow maps to PCF soft with clamped render distances.  
> 4. Setting A-Frame renderer foveation level to 1, concentrating GPU fragment shading at the center of the lenses."*

---

### Area B: Design, Ergonomics & User Testing Questions

**Q5: "Why did you choose blink teleportation instead of smooth joystick walking?"**
> **Answer:**  
> *"Per the virtual reality ergonomics research of **John Bucher (2018)**, smooth linear joystick movement through enclosed residential corridors produces acute vestibular mismatch: the user's visual field experiences acceleration and optical flow vection, while their inner ear vestibular system detects zero physical acceleration. This sensory conflict causes rapid simulator sickness.  
> ImmoVision VR implements instantaneous discrete blink teleportation with a 120 ms spherical blackout fade (`#teleport-fader`). This allows the brain to update spatial orientation during a momentary blank frame, completely eliminating vection while maintaining 100% spatial awareness."*

**Q6: "What did your user testers struggle with, and what concrete changes did you make?"**
> **Answer:**  
> *"In our testing with 3 evaluators (Nurlan, prospective buyer; Aigerim, sales agent; Daniyar, XR student):  
> 1. **Tester 1** noted that because material swapping was instantaneous (sub-frame), in peripheral vision he wasn't sure if the command had registered. In response, we added the **250 ms cyan emissive highlight pulse** across meshes upon update.  
> 2. **Tester 2** found that pointing the Quest 6DoF laser at small swatches required excessive fine motor control. In response, we **enlarged all 3D touch swatches by 20%** and added a hover scale animation (`1.08x`).  
> 3. **Tester 2** also noted that in Astana sales meetings, clients naturally speak Russian. We immediately updated `x0014-voice-configurator` with **explicit Russian regex lemmas** (`дуб`, `мрамор`, `бежевый`, `вечер`)."*

---

### Area C: Ethics, Privacy & Business Questions

**Q7: "What data leaves the client device, and how do you ensure privacy under Kazakhstani law?"**
> **Answer:**  
> *"Under the Law of the Republic of Kazakhstan 'On Personal Data and Its Protection', biometric and voice data requires rigorous safeguards. In ImmoVision VR, **zero audio recordings, waveforms, or transcripts are stored locally or uploaded to any external server**. Audio is processed in memory by the browser runtime strictly during active speech. Furthermore, we display a mandatory privacy and permission disclosure modal on the landing screen explaining mic and WebXR usage before any browser permission prompt is invoked."*

**Q8: "What would it cost BI Group to operate this system commercially for a year?"**
> **Answer:**  
> *"Our production cost model totals **$9,760 USD (~4.83 million KZT)** for Year 1 across two primary Astana sales galleries:  
> - Software engineering & integration: 160 hours @ $35/hr = $5,600 USD  
> - 3D BIM asset decimation & optimization: $1,800 USD  
> - Hardware: 4 standalone Meta Quest 3 headsets (2 per gallery) @ $500 = $2,000 USD  
> - HTTPS hosting, domain & CDN maintenance: $360/year  
> **Commercial Payoff:** At an average sale price of 48.5M KZT and a developer gross margin of 12% (5.82M KZT margin per apartment), closing just **ONE single incremental apartment sale** attributable to the VR experience pays back 120% of the entire development cost."*

---

## 5. Live Code Modification Playbook (D3: 2 Points)

If the professor asks you to make a small live change during the defense, stay completely calm. Here are the 4 most common live change requests and their exact 10-second solutions:

### Scenario 1: "Add a new material or change an existing material's color/texture"
- **Task:** The professor says: *"Change the wall color of the 'sage' option to a warm terracotta or gold, or change the default wall color."*
- **File:** `components.js`
- **Location:** Line 405 (inside `x0014-finish-swapper -> applyCurrentFinish`)
- **Action:** Change the hex code:
  ```javascript
  // Change:
  } else if (wallKey === 'sage') {
    colorHex = 0xb8c5b9;
  // To (e.g. Gold / Terracotta):
  } else if (wallKey === 'sage') {
    colorHex = 0xd97706; // Rich warm terracotta gold!
  ```
- **Time:** 10 seconds. Save file, refresh browser, say *"Sage wall"* or click the swatch, and show the instant gold/terracotta wall!

---

### Scenario 2: "Add a new voice command synonym or keyword"
- **Task:** The professor says: *"Add the Russian word 'золото' or 'плиточный' to trigger slate, or add 'ламинат' to trigger oak."*
- **File:** `components.js`
- **Location:** Lines 150–165 (inside `x0014-voice-configurator -> intentCatalog`)
- **Action:** Add the word to the regex pattern:
  ```javascript
  // Change line 152:
  { type: 'floor', value: 'oak', patterns: [/\b(oak|natural wood|light wood|parquet)\b/i, /\b(дуб|светлый дуб|дерево|паркет)\b/i] },
  // To:
  { type: 'floor', value: 'oak', patterns: [/\b(oak|natural wood|light wood|parquet)\b/i, /\b(дуб|светлый дуб|дерево|паркет|ламинат)\b/i] },
  ```
- **Time:** 15 seconds. Refresh, say *"Ламинат"*, and watch oak flooring apply!

---

### Scenario 3: "Change the teleport fade duration or seated eye height"
- **Task:** The professor says: *"Make the seated height even lower for children (e.g. 0.9m) or change the teleport blackout fade speed."*
- **File:** `components.js`
- **Location:** Line 110 (in `x0014-immovision-system -> toggleSeatedMode`) and line 475 (`x0014-teleport-controls -> teleportToZone`)
- **Action:**
  ```javascript
  // Change line 112:
  const targetY = this.state.seatedMode ? 0.90 : 1.65; // Changed from 1.15 to 0.90!
  ```
- **Time:** 10 seconds. Refresh, press `[C]`, and show the 0.90 m camera height!

---

### Scenario 4: "Change the base apartment price or finish surcharge"
- **Task:** The professor says: *"Update the base price from 48.5M KZT to 52.0M KZT, or increase the marble surcharge."*
- **File:** `components.js`
- **Location:** Line 35 (in `x0014-immovision-system -> init`)
- **Action:**
  ```javascript
  // Change line 35:
  basePriceKZT: 52000000, // 52.0M KZT
  // Or change marble price in line 55:
  marble: { name: 'Calacatta Polished White Marble', price: 2000000, tag: 'Luxury Stone Upgrade' },
  ```
- **Time:** 10 seconds. Refresh, and look at the 3D Summary Board: the total instantly recalculates to 52M+ KZT!

---

## 6. Self-Check Inspection Checklist (Before Entering Defense Room C1.3.365L)

- [x] **Target Device Working:** Laptop running `python -m http.server 8000` (or `npx serve`), Chrome / Meta Quest Browser open and verified.
- [x] **Microphone Allowed:** Tested microphone input in Chrome settings; verified "Dark oak floor" and "Calacatta marble" triggers.
- [x] **Moodle Submission Uploaded:** `CAP_ImmoVisionVR_240014.zip`, `report.pdf`, `slides.pdf`, and live URL submitted on Moodle before 22:00 Astana time.
- [x] **Frozen Git Repository:** All commits pushed to GitHub under username `mrwalterwhite60-create`.
- [x] **Presentation Slides Ready:** `slides.pdf` open in full-screen presentation mode.
- [x] **Backup Demo Video Ready:** Backup walkthrough video accessible locally in case of campus Wi-Fi failure.
- [x] **Full 100% Academic Integrity:** All code prefixed with personal student ID `x0014-`, all assets CC-credited, all nine report sections with empirical evidence.
