const objeto = {
  name: "Berto",
  stats: {
    age: 43,
    webdeveloper: true,
    birthplace: "O Vicedo",
  },
  devices: ["PC", "Macbook", "Smartphone"],
};

const jsonVersion = JSON.stringify(objeto);

console.log(typeof jsonVersion);

const backToJSON = JSON.parse(jsonVersion);

console.log(backToJSON.stats);
