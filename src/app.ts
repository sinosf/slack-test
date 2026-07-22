interface Dog {
  imageUrl: string;
  name: string;
  description: string;
}

const dog: Dog = {
  imageUrl: "https://placedog.net/500/400",
  name: "Good Boy 🐶",
  description: "Every dog is a good dog. This one just happens to be extra special.",
};

function renderApp(dog: Dog): void {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <h1>${dog.name}</h1>
    <img src="${dog.imageUrl}" alt="A cute dog" />
    <p>${dog.description}</p>
    <button onclick="loadNewDog()">🐾 Show Another Dog</button>
  `;
}

function loadNewDog(): void {
  const randomSeed = Math.floor(Math.random() * 1000);
  const newDog: Dog = {
    imageUrl: `https://placedog.net/500/400?id=${randomSeed}`,
    name: "Good Boy 🐶",
    description: "Every dog is a good dog. This one just happens to be extra special.",
  };
  renderApp(newDog);
}

(window as any).loadNewDog = loadNewDog;

renderApp(dog);