# All Kinds — Fan Reference Site

> *All Kinds* by CynicalRainbows · AO3 #73149806  
> KPop Demon Hunters (2025) · 9/? chapters · 14,224 words  
> Based on a headcanon by polytrixaf

---

## 📁 Structure

```
all-kinds/
│
├── index.html                   ← Homepage / Overview
│
├── pages/
│   ├── characters.html          ← Character profiles with detail panel
│   ├── chapters.html            ← Chapter-by-chapter timeline
│   ├── objects.html             ← The meaningful things (Byeol, Sol, binders, mug...)
│   └── quotes.html              ← Key lines, spoken and internal, filterable
│
├── css/
│   └── style.css                ← All styles
│
├── data/                        ← ✏️  Edit these to update content
│   ├── characters.json          ← 4 character profiles
│   ├── chapters.json            ← 9 chapter entries
│   ├── quotes.json              ← 19 key lines
│   └── objects.json             ← 6 meaningful objects
│
└── js/
    ├── characters.js            ← fetch() → characters.json
    ├── chapters.js              ← fetch() → chapters.json
    ├── objects.js               ← fetch() → objects.json
    └── quotes.js                ← fetch() → quotes.json
```

---

## ✏️ Editing content

### Add a character — `data/characters.json`
```json
{
  "id": "name_lowercase",
  "name": "Display Name",
  "color": "#hexcolor",
  "accent": "#lighthex",
  "role": "The one who...",
  "tags": ["Tag One", "Tag Two"],
  "first_chapter": 1,
  "description": "...",
  "personality": "...",
  "possessions": [
    { "name": "Object name", "desc": "What it is and what it means." }
  ],
  "key_moments": [
    { "ch": 1, "desc": "What happens." }
  ],
  "relationships": ["other_id"]
}
```

### Add a chapter — `data/chapters.json`
```json
{
  "number": 10,
  "title": "Chapter title",
  "pov": ["rumi", "mira"],
  "summary": "...",
  "key_beats": ["Beat 1", "Beat 2"],
  "objects": ["Object name"],
  "tone": "One-line tone description."
}
```

### Add a quote — `data/quotes.json`
```json
{
  "speaker": "rumi",
  "text": "...",
  "context": "Ch N — scene description",
  "mood": "earnest"
}
```
Speaker IDs: `rumi` `mira` `zoey` `celine` `mira_internal` `zoey_internal` `rumi_internal` `zoey_mom`

### Add an object — `data/objects.json`
```json
{
  "id": "object_id",
  "name": "Display Name",
  "owner": "character_id",
  "color": "#hexcolor",
  "description": "...",
  "chapters_appear": [1, 3, 7],
  "significance": "What it means in the story."
}
```

---

## 🖥️ Running locally

`fetch()` requires a local server:
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```
