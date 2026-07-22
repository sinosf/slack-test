# Done by Slackbot 🤖
# Python companion to src/app.ts
#
# This script mirrors the TypeScript dog website logic:
#   - Dog dataclass maps to the Dog interface in app.ts
#   - render_app() mirrors renderApp() in app.ts
#   - load_new_dog() mirrors loadNewDog() in app.ts
#   - The same placedog.net API is used as the image source
#
# Run: python dog_app.py

import random
import webbrowser
import tempfile
import os
from dataclasses import dataclass


@dataclass
class Dog:
    """Mirrors the Dog interface in src/app.ts"""
    image_url: str
    name: str
    description: str


def load_new_dog(seed: int = None) -> Dog:
    """
    Mirrors loadNewDog() in src/app.ts.
    Generates a Dog object with a random placedog.net image.
    """
    if seed is None:
        seed = random.randint(0, 1000)

    return Dog(
        image_url=f"https://placedog.net/500/400?id={seed}",
        name="Good Boy 🐶",
        description="Every dog is a good dog. This one just happens to be extra special."
    )


def render_app(dog: Dog) -> str:
    """
    Mirrors renderApp() in src/app.ts.
    Generates an HTML string for the dog card — same structure as index.html.
    """
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dog App - Python</title>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }}
    .card {{
      text-align: center;
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 500px;
      width: 90%;
    }}
    h1 {{ font-size: 2rem; color: #333; margin-bottom: 20px; }}
    img {{ width: 100%; border-radius: 12px; margin-bottom: 20px; }}
    p {{ color: #666; font-size: 1rem; line-height: 1.6; }}
    .badge {{
      margin-top: 20px;
      display: inline-block;
      background: #4a90e2;
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
    }}
  </style>
</head>
<body>
  <div class="card">
    <h1>{dog.name}</h1>
    <img src="{dog.image_url}" alt="A cute dog" />
    <p>{dog.description}</p>
    <div class="badge">🤖 Rendered by Python companion to app.ts</div>
  </div>
</body>
</html>
"""


def main():
    print("🐶 Dog App — Python companion to src/app.ts")
    print("--------------------------------------------")

    dog = load_new_dog()
    print(f"Name:        {dog.name}")
    print(f"Image URL:   {dog.image_url}")
    print(f"Description: {dog.description}")

    html = render_app(dog)

    # Write to a temp file and open in browser — same as opening index.html locally
    with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as f:
        f.write(html)
        temp_path = f.name

    print(f"\n✅ Opening dog page in your browser: {temp_path}")
    webbrowser.open(f"file://{temp_path}")


if __name__ == "__main__":
    main()
