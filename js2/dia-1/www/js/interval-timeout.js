// setTimeout
const delayed = () => console.log("Esto aparece con retardo");

const delay = setTimeout(delayed, 5000);

clearTimeout(delay);

// setInterval

let contador = 10;

const tick = () => {
  if (contador === 0) {
    console.log("BOOOM 💥");
    clearInterval(interval);
  } else {
    console.log(contador);
  }

  contador = contador - 1;
};

const interval = setInterval(tick, 1000);
