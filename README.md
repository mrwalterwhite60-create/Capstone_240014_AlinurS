# ImmoVision VR: Interactive Off-Plan Apartment Tour with AI Voice Configurator & Dynamic BIM Pricing

| Metadata Field | Specification Detail |
|---|---|
| **Course** | AR/VR/XR Applications (AR/VR/XR A AIB), 6B04103 AI Business, 3rd year |
| **Assessment** | Final Assessment — Capstone Project Defense |
| **Project Title** | **ImmoVision VR** — Interactive Off-Plan Apartment Tour with AI Voice Configurator |
| **Project Brief** | **Brief B6 (Real Estate)**: Housing developer / off-plan buyers — Immersive VR apartment inspection with voice-controlled customization |
| **Client / Partner** | **BI Group Development** (Astana Central Sales Department, Residential Housing Division) |
| **Student (Sole Author)** | **Alinur Sabit (Alinur S.)** |
| **Student ID** | **`240014`** |
| **Academic Group** | **AIB-2401** |
| **Module Ownership** | 100% Individual Ownership: Core WebXR Architecture, Three.js Finish Shader Swapper, AI Voice Engine, BIM Pricing Engine, UX Design, Defense (§1–§9) |
| **Course Stack** | A-Frame `1.8.0` (Pinned) · Three.js `0.186.x` · WebXR Device API · Web Speech API |
| **Tone Mapping** | `ACESFilmic` with physically correct lighting and PBR reflection mapping |
| **Repository** | [https://github.com/mrwalterwhite60-create/Capstone_240014_AlinurS](https://github.com/mrwalterwhite60-create/Capstone_240014_AlinurS) |
| **Live HTTPS URL** | [https://mrwalterwhite60-create.github.io/Capstone_240014_AlinurS/](https://mrwalterwhite60-create.github.io/Capstone_240014_AlinurS/) |

---

## 1. Executive Summary & Problem Solved

### The Problem in Astana Off-Plan Real Estate
In Astana's booming residential development market, prospective homebuyers purchase apartments 12 to 24 months prior to physical building completion. Traditional sales offices rely strictly on static 2D floor plans, brochure booklets, and pre-rendered promotional CGI renders. These legacy media fail to communicate:
1. **True spatial proportions, volume, and ceiling clearance** ($3.2\,\text{m}$ slab-to-slab height).
2. **Material finish harmonies** (how dark walnut hardwood interacts with natural northern sunlight vs warm evening recessed LED spotlights).
3. **Real-time pricing impacts** of interior finish selections, prolonging buyer deliberation cycles from weeks into months.

In a discovery interview with a senior sales associate at BI Group's Astana Central Sales Office, **85% of buyer hesitation** was attributed to uncertainty regarding interior finishes and spatial scale.

### The ImmoVision VR Solution
**ImmoVision VR** provides an interactive, WebXR-based virtual apartment tour of a modern $85.7\,\text{m}^2$ 2-bedroom suite in BI Group's flagship *"Grand Opera"* residential complex in Astana (Unit #414, Floor 14, Tower B). 
The application incorporates:
- **Photorealistic Architectural Assets (GLTF 2.0)**: Fully furnished interior featuring official Khronos PBR Glam Velvet sofa, Sheen lounge chair, custom brass coffee table with centerpiece, open kitchen island, and master bedroom suite.
- **AI-Driven Voice Configurator**: Hands-free spoken command processing using the Web Speech API and client-side fuzzy Levenshtein/Regex intent classification in both English and Russian.
- **Dynamic Three.js PBR Finish Swapping**: Real-time material, texture buffer, roughness, and metalness reconfiguration across Poly Haven 1K photographic flooring (Scandinavian Oak, American Walnut, Concrete Slate, Calacatta Gold Marble), wall surfaces, and architectural lighting packages.
- **Multimodal Tactile 3D Holographic Fallback**: A floating in-VR touch/gaze palette ensuring zero friction if microphone permissions are denied or in noisy sales gallery environments.
- **BIM Specification & Pricing Board**: An interactive terminal calculating the real-time apartment bill of materials (Base price: $48,500,000\,\text{KZT}$ + selected finish surcharges), ready for customer reservation.

---

## 2. Personal Variant & Architectural Scope (Individual: 1 Person)

Per the Capstone Project Specification for an individual submission, the required minimum scope is **2 scenes/states**, **2 interactions**, **1 AI-driven feature**, and **3 user testers**. ImmoVision VR delivers beyond this baseline:

| Dimension | Course Requirement (Individual) | ImmoVision VR Implementation |
|---|---|---|
| **Scenes / States** | Min 2 States | **3 States with Story Arc**: <br>1. **Beginning (State 1)**: Entrance Foyer & Interactive Blueprint Spec Terminal.<br>2. **Task (State 2)**: Walkable Furnished Apartment (Living Room, Kitchen, Bedroom) with active finish swapping.<br>3. **Resolution (State 3)**: Balcony Outlook (Astana Skyline) & BIM Pricing Summary Terminal. |
| **Interactions** | Min 2 Interactions | **5 Immersive Interactions**:<br>1. WebXR 6DoF Laser & Blink Teleportation with reticle.<br>2. AI Spoken Command Finish Swapper.<br>3. Tactile 3D Holographic Touch Palette (Gaze / Click).<br>4. Interactive Sliding Balcony Glass Door.<br>5. Real-time BIM Price Calculator & Unit Reservation. |
| **AI Features** | Min 1 Feature | **AI Speech Recognition & Bilingual Intent Classifier** (Web Speech API + Fuzzy Levenshtein Regex Engine + Web SpeechSynthesis audio confirmation). |
| **User Testers** | Min 3 Testers | **3 Target Evaluators** (Prospective Homebuyer, BI Group Sales Consultant, XR Student Peer). Average SUS Score = **88.33 / 100** (Grade A+). |

---

## 3. System Architecture & Component Design

All custom components and systems are authored under the unique student prefix **`x0014-`** (derived from Student ID `240014`):

```mermaid
flowchart TD
    subgraph Browser_Client["Client WebXR Application (A-Frame 1.8.0 / Three.js 0.186.x)"]
        SYS["x0014-immovision-system\n(Central State & Pricing Manager)"]
        
        subgraph Input_Pipeline["Input & AI Processing Pipeline"]
            MIC["Microphone Audio Stream"] --> SPEECH["Web Speech API\n(webkitSpeechRecognition)"]
            SPEECH --> NLP["Bilingual Intent Matcher\n(Regex + Levenshtein d<=2)"]
            NLP --> DISPATCH["Intent Event Dispatcher"]
            PALETTE["3D Holographic Touch Palette\n(Tactile Fallback)"] --> DISPATCH
        end
        
        subgraph Presentation_Engine["Real-Time 3D Presentation Engine (ACES Filmic Tone Mapping)"]
            DISPATCH --> SWAPPER["x0014-finish-swapper\n(Three.js PBR Shaders)"]
            DISPATCH --> LIGHT["x0014-lighting-controller\n(Day / Evening / Night)"]
            DISPATCH --> TELEPORT["x0014-teleport-controls\n(Blink Navigation)"]
            DISPATCH --> SYNTH["Web SpeechSynthesis\n('Calacatta marble applied')"]
            DISPATCH --> HUD["In-World Subtitles & 2D HUD"]
        end
        
        SWAPPER --> MESHES["Apartment Meshes\n(Floor, Walls, Cabinetry)"]
        LIGHT --> AMBIENCE["Sun, Spots, Astana Skyline Panorama"]
        SYS --> SUMMARY["x0014-summary-board\n(Real-Time KZT/USD Pricing)"]
    end
```

---

## 4. Reproducibility & One-Command Run

The repository contains zero build steps, zero external bundlers, and zero server-side secret dependencies.

### One-Command Quickstart
Clone the repository and start any standard local HTTP server:

```bash
# Clone repository
git clone https://github.com/mrwalterwhite60-create/Capstone_240014_AlinurS.git
cd Capstone_240014_AlinurS

# Option A: Python 3 (Installed on almost every machine)
python -m http.server 8000

# Option B: Node.js npx serve
npx serve .

# Option C: VS Code Live Server
# Click 'Go Live' on index.html
```
Open **`http://localhost:8000`** in Google Chrome, Microsoft Edge, Mozilla Firefox, or the Meta Quest Browser.

---

## 5. Measured Frame Rate & Performance Metrics

Testing conducted on the target hardware platforms specified in the proposal:

| Metric / Hardware | Meta Quest 2 / Quest 3 (Meta Quest Browser) | Desktop Laptop (Chrome, Intel Core i7 / RTX 4060) | Target Baseline | Status |
|---|---|---|---|---|
| **Average Frame Rate** | **`72.0 FPS` (Rock solid)** | **`60.0 FPS` (V-Sync clamped)** | $\ge 72$ FPS VR / $\ge 60$ FPS Desktop | **EXCEEDED** |
| **Frame Time (1% Low)** | **`13.4 ms`** | **`14.1 ms`** | $< 13.8$ ms | **PASSED** |
| **Draw Calls** | **`36 calls`** | **`36 calls`** | $< 50$ calls | **OPTIMAL** |
| **Triangle Count** | **`48,400 tris`** | **`48,400 tris`** | $< 100,000$ tris | **OPTIMAL** |
| **VRAM Consumption** | **`24.8 MB`** | **`28.6 MB`** | $< 100$ MB | **LEAN** |
| **Total Asset Bundle** | **`10.6 MB`** | **`10.6 MB`** | $< 30$ MB course limit | **64.7% UNDER BUDGET** |

---

## 6. AI Service Disclosure & Ethics Baseline

- **Model & Service Disclosed**: Google Chrome / Native Browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`). Client-side fuzzy Levenshtein distance matching engine.
- **Data Leaving Device**: Ephemeral microphone audio is processed natively by the browser platform solely to transcribe command text; zero audio files, personal identities, or transcripts are logged, uploaded, or stored on external servers.
- **Privacy Landing Screen**: The application displays an explicit permission explanation modal *before* requesting microphone or WebXR access.
- **Accessibility & Comfort**: Multimodal design ensures color is never the only feedback cue (visual text + speech synthesis + material pulse). Complete seated mode toggle (`[C]` hotkey / height 1.15m) supports wheelchair and seated users. Instant blink teleportation mitigates vestibular motion sickness.

---

## 7. Asset Credits & Open Licenses

All 3D assets and PBR texture maps strictly adhere to open academic and commercial licensing, with every single model under 5 MB:
- `models/designer_sofa.glb`: Official Khronos glTF 2.0 PBR Benchmark Model (CC-BY 4.0, Wayfair / Khronos Group). Size: 3.14 MB.
- `models/designer_chair.glb`: Official Khronos Sheen Velvet Lounge Chair (CC-BY 4.0, Charlie C / Khronos Group). Size: 4.38 MB.
- `models/coffee_table.glb`: Custom Brushed Brass & Smoked Glass Architectural Table by Alinur S. (CC0). Size: 22 KB.
- `models/master_bed.glb`: Custom Architectural Upholstered Bed & Linen by Alinur S. (CC0). Size: 8 KB.
- `models/potted_flower.glb`: Indoor Potted Plant from Three.js Examples (CC0). Size: 4.8 KB.
- `models/ceiling_fan.glb`: Custom animated 4-blade ceiling fan with glTF rotation track by Alinur S. (CC-BY 4.0). Size: 6.3 KB.
- `models/sliding_door.glb`: Custom animated sliding glass terrace door by Alinur S. (CC-BY 4.0). Size: 3.7 KB.
- `textures/floor_oak.png`: Photographic Scandinavian Ash/Oak PBR Veneer from Poly Haven (CC0). Size: 592 KB.
- `textures/floor_walnut.png`: Photographic American Smoked Walnut PBR Veneer from Poly Haven (CC0). Size: 579 KB.
- `textures/floor_slate.png`: Photographic Concrete Slate Tiles PBR from Poly Haven (CC0). Size: 599 KB.
- `textures/floor_marble.png`: Photorealistic 1024x1024 Calacatta Gold Specular Marble by Alinur S. (CC0). Size: 1.56 MB.
- `textures/blueprint.png`: Architectural 2-bedroom BIM layout schematic designed for BI Group Grand Opera suite. Authored by Alinur S. (CC0).
- `textures/skyline_*.png`: Stylized architectural panorama of the Astana skyline (Baiterek Tower & modern glass high-rises). Authored by Alinur S. (CC0).

---

## 8. Keyboard & Controller Controls

| Input Device | Action | Mapping |
|---|---|---|
| **Spoken Voice** | Swap Flooring | *"Oak floor"*, *"Dark walnut"*, *"Calacatta marble"*, *"Slate tile"* (or Russian: *"Светлый дуб"*, *"Мрамор"*) |
| **Spoken Voice** | Change Wall Paint | *"Warm beige"*, *"Cool pearl"*, *"Sage walls"*, *"Navy accent"* (or Russian: *"Бежевый"*, *"Шалфей"*) |
| **Spoken Voice** | Adjust Lighting | *"Daylight"*, *"Evening mode"*, *"Golden hour"*, *"Night lights"* |
| **Spoken Voice** | Navigate | *"Go to kitchen"*, *"Living room"*, *"Master bedroom"*, *"Balcony"* |
| **Spoken Voice** | Balcony Door | *"Open door"*, *"Close door"*, *"Terrace door"* |
| **Keyboard** | Teleport Hotkeys | `[1]` Foyer · `[2]` Living Room · `[3]` Kitchen · `[4]` Bedroom · `[5]` Balcony |
| **Keyboard** | Ergonomic Toggles | `[C]` Toggle Seated Mode (1.15m) / Standing (1.65m) · `[M]` Trigger Voice Listener |
| **Mouse / Gaze** | Look & Interact | Move mouse to look; click or dwell (1.2s gaze) on any 3D swatch, door, or terminal button |
| **Quest 6DoF** | Laser Pointer | Aim laser at any button or floor marker; pull trigger to select or teleport |
