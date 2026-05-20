# Werkplaats 2028 — Interactief 3D Prototype

Interactieve 3D-visualisatie van de toekomstige mechanische werkplaats op Campus Geel.
Gemaakt voor de brief of concept van Groep 5 (Bachelor Digital Experience Design).

## ▶ Snel starten

**Optie A — single file (makkelijkste):**
1. Open `werkplaats-2028.html` in een moderne browser.
2. Klaar.

**Optie B — multi-file (voor verdere ontwikkeling):**
```bash
cd werkplaats-2028
python3 -m http.server 8000
# Open http://localhost:8000
```

## Login (admin / leerkracht)

| Gebruikersnaam      | Wachtwoord  |
|---------------------|-------------|
| `Dimitri De Raeve`  | `w8tW00rD`  |
| `Niels Verellen`    | `w8tW00rD`  |

## Functionaliteiten

### Voor alle gebruikers (zonder login)
- 3D Spline-scene in vogelperspectief met admin-plaatsingen
- **Klik op een machine in de 3D-scene** → opent direct het info-paneel van die machine
- Zone-carousel onderaan + klikbare legende met **vloeiende camera-zoom per zone**
- Machinelijst (hamburger rechtsonder)
- Info-modal per machine met 4 tabs: Veiligheid · Handleiding · Controle · Olie & Smering
- Echte Spline 3D-render in info-paneel (klik & sleep om te draaien)

### Voor admins (na login)
- Naam rechtsboven + edit-pencil knop rechtsonder
- **Edit + Wis knoppen altijd zichtbaar** in de machinelijst — geen extra modus nodig
- **Bewerk-modus** (pencil knop) → drawer onderaan met sleepbare 3D machines
- **Sleep naar kaart** → 3D-object verschijnt op die plek (als naam matcht in Spline)
- **Manipulator-paneel** met:
  - 4-richting d-pad om te verplaatsen
  - Rotatie-knoppen (−15° / reset / +15°)
  - Rode delete-knop — verwijdert plaatsing voor iedereen
  - Status-indicator (groen = in Spline gevonden, oranje = alleen marker)
- **Edit-formulier** met 5 tabs: Basisgegevens · Veiligheid · Handleiding · Controle · Olie & Smering
- **Object-koppel modal**: klik op een onbekend 3D-object → kies welke machine het is → permanent gekoppeld voor iedereen
- Sync-indicator rechtsboven flitst groen na elke opslag

## Architectuur

### Click-detectie op 3D objecten (3-laags)
1. **Spline's eigen `mouseDown` event** — werkt voor scenes met events
2. **Three.js raycasting** met brute-force scene+camera detectie — werkt altijd
3. **Admin koppel-modal** voor onbekende objecten — permanent gekoppeld

### Persistente opslag (2 lagen tegelijk)
- **`window.storage`** — werkt in Claude artifact env, gedeeld over alle gebruikers
- **`localStorage`** — werkt bij lokale deployment, permanent per browser

Bewaard wordt:
- `werkplaats-placements-v1` — machine-plaatsingen op de kaart
- `werkplaats-edits-v1` — admin-bewerkingen op machinegegevens + verwijderingen
- `werkplaats-mappings-v1` — object→machine koppelingen

### Spline integratie
Tyron moet in Spline alle machines die ooit geplaatst kunnen worden in de scene zetten.
Object-namen kunnen vrij gekozen worden — admin kan via klik+koppel-modal elk object aan
een machine linken. Voor automatische matching gebruik je deze ids (varianten met
spaties/underscores worden ook geprobeerd):

```
slijp-boren, slijp-frezen, frees-1 t/m frees-4, radiaalboor,
draaibank-1, slijpmachine, montagetafel-1 t/m 4, meetbank,
lasrobot, lastafel, cnc-frees, cnc-draai, rekken-links,
metaalrek, pc-post
```

### Voor productie-deployment

`window.storage` werkt alleen in de Claude prototype-omgeving. `localStorage` werkt
maar is per-browser. Voor échte multi-user sync hebben jullie een backend nodig:

```js
import { getDatabase, ref, set, onValue } from "firebase/database";
const db = getDatabase();

const SharedStore = {
  async load(key) {
    return new Promise(res => {
      onValue(ref(db, key), snap => res(snap.val()), { onlyOnce: true });
    });
  },
  async save(key, data) { await set(ref(db, key), data); },
};

// Bonus: real-time updates over alle gebruikers
onValue(ref(db, 'werkplaats-placements-v1'), snap => {
  state.placements = snap.val() || {};
  applyAllPlacementsToScene();
  renderPlacementMarkers();
});
```

Andere opties: **Supabase** (Postgres + auth) of een eigen **Express/FastAPI** backend.

## Bestandstructuur

```
werkplaats-2028/
├── werkplaats-2028.html    Stand-alone bundle (~134 KB) — open & klaar
├── index.html              Multi-file entry voor development
├── styles.css              Styling
├── data.js                 Zones + machines + users
├── app.js                  Spline + UI + admin + storage + click-detectie
└── README.md               Deze file
```

## Design-keuzes

| Aspect    | Keuze                                                                  |
|-----------|------------------------------------------------------------------------|
| Kleur     | Oranje brand `#F05A28` voor UI; Spline-palet voor SVG iconen           |
| Display   | Bricolage Grotesque                                                    |
| Body      | Plus Jakarta Sans                                                      |
| Iconen    | SVG illustraties in Spline-stijl: navy bodies, crème kappen, gekleurde pentagon-buttons |
| Motion    | Pop-in modals, sync-flash, vloeiende zone-zoom (1s cubic-bezier)       |

## Debug tips

Open de browser console (F12) om te zien wat er gebeurt:
- `Spline-scene heeft N objecten (M met naam)` — lijst van alle objecten + namen
- `━━━ KLIK GEDETECTEERD ━━━` op elke klik in de 3D-scene
- `N object-koppelingen geladen uit storage` — bij elke refresh

Opgeslagen koppelingen inspecteren:
```js
JSON.parse(localStorage.getItem('werkplaats-mappings-v1'))
```

Alles resetten:
```js
localStorage.clear()  // refresh daarna
```

## Credits

Project: Bachelor Digital Experience Design — Thomas More Mechelen
Opdrachtgever: Dimitri De Raeve — Thomas More Campus Geel
Groep 5: Miguel Celen, Sandra Koziol, Tyron Zinga & Dina Zaoujal
Academiejaar 2025-2026
# ThomasMore_EMG1
