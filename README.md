# Tannaim – Mishnah Argument Explorer

A web application for discovering, recording and analysing the arguments between Tannaim throughout the Mishnah.

## Features

- **📖 Explorer View** – Choose any of the 63 masekhtot across all 6 sedarim. The full Hebrew and English text is loaded via the [Sefaria API](https://www.sefaria.org/developers). Tanna names are automatically highlighted in both languages with per-tanna colour coding.
- **⚡ Auto-detection** – The app scans each mishna for known tanna names (22 built-in tannaim + schools). When two or more are found in the same mishna a "tannaim detected" badge appears with their names, so you can quickly spot arguments.
- **＋ Record Argument** – Click the button on any mishna to open a modal. The detected tannaim are pre-checked. Adjust the selection, add a free-text description, and optionally assign a label/category, then save.
- **✎ Edit / Delete** – Every recorded argument can be opened in an edit modal to correct the tannaim list, update the description, or remove the entry.
- **⚖️ Arguments View** – Browse all recorded arguments either **By Pairs** (pairs/groups of tannaim with expandable argument lists) or as a flat **All Arguments** list. Filter by tanna or by masechet.
- **⬇ Export JSON** – Download the entire database as a JSON file for offline analysis.

## Screenshots

| Explorer | Record Argument | Arguments Browser |
|----------|----------------|-------------------|
| ![Explorer](https://github.com/user-attachments/assets/817617c0-0284-4577-af3b-30657b01f0c4) | ![Modal](https://github.com/user-attachments/assets/83451cc7-572b-49c8-9282-bfb5a29f94f9) | ![Arguments](https://github.com/user-attachments/assets/6d92771c-32f9-4f4e-b8b7-26c59804567f) |

## Quick Start

```bash
npm install
npm start
# Open http://localhost:3000
```

The app runs entirely on `localhost:3000`. Internet access is required to fetch masechet text from Sefaria. If Sefaria is unreachable, the app falls back to built-in sample data for Mishnah Berakhot.

## Architecture

| File | Purpose |
|------|---------|
| `server.js` | Express server, JSON database, REST API, Sefaria proxy |
| `public/index.html` | Single-page HTML structure |
| `public/style.css` | CSS (custom properties, RTL Hebrew, responsive) |
| `public/app.js` | All frontend logic: state, views, Sefaria fetch, tanna detection, modals |
| `data/db.json` | JSON database – 22 built-in tannaim, arguments you record |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tannaim` | List all tannaim |
| POST | `/api/tannaim` | Add a new tanna |
| PUT | `/api/tannaim/:id` | Update a tanna |
| GET | `/api/arguments` | List arguments (filter: `?masechet=`, `?tanna=`, `?tanna_pair=`) |
| POST | `/api/arguments` | Record a new argument |
| PUT | `/api/arguments/:id` | Edit an argument |
| DELETE | `/api/arguments/:id` | Delete an argument |
| GET | `/api/pairs` | All tanna pairs with argument counts |
| GET | `/api/stats` | Summary statistics |
| GET | `/api/sefaria/:ref` | Proxy to Sefaria text API |

## Built-in Tannaim

Beit Hillel, Beit Shammai, Hillel, Shammai, Chachamim (Sages), Rabban Gamliel, Rabban Yochanan ben Zakkai, Rabbi Eliezer, Rabbi Yehoshua, Rabbi Akiva, Rabbi Tarfon, Rabbi Yishmael, Rabbi Elazar ben Azaryah, Rabbi Meir, Rabbi Yehuda, Rabbi Yose, Rabbi Shimon, Rabbi Natan, Rabbi Elazar, Rabbi Yehuda HaNasi, Rabban Shimon ben Gamliel, Rabbi Chiya.

Additional tannaim can be added via the REST API or directly in `data/db.json`.
