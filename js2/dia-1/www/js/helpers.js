const today = function () {
  return new Date();
};

const add = function (a, b) {
  return a + b;
};

const multiply = function (a, b) {
  return a * b;
};

const substract = (a, b) => a - b;

const PI = 3.14159;

const randomNumber = (max) => Math.floor(Math.random() * max);

// Exports
export default today;
export { add, multiply, substract, PI, randomNumber };
