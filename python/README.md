# 🐍 Python Companion to `src/app.ts`

This script is a Python mirror of the TypeScript dog website.

## How it maps to the TypeScript code

| TypeScript (`src/app.ts`) | Python (`dog_app.py`) |
|---|---|
| `Dog` interface | `Dog` dataclass |
| `renderApp(dog)` | `render_app(dog)` |
| `loadNewDog()` | `load_new_dog()` |
| `placedog.net` API | Same `placedog.net` API |
| Opens in browser via `index.html` | Generates HTML and opens in browser |

## Run it

```bash
cd python
python dog_app.py
```

No dependencies required — uses Python standard library only.
