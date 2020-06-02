const body = document.body;
const clock = document.querySelector("header h1");
const greeting = document.querySelector("header h2");
console.log("holi");
// Formatea un número añadiendo un cero antes si es menor que 10
function formatNumber(number) {
  if (number >= 10) return number;
  return `0${number}`;
}

// Actualiza el reloj
function updateClock() {
  // Miramos a ver si hay alarma
  const header = clock.parentElement;
  const alarm = header.dataset.alarm;

  // Creamos tres variables para guardar la hora, minuto y segundo de la alarma
  let alarmHour;
  let alarmMinute;
  let alarmSecond;

  // Si efectivamente hay una alarma en el atributo data-alarm del header
  // desestructuramos su valor dividido por ":"
  if (alarm) {
    [alarmHour, alarmMinute, alarmSecond] = alarm.split(":");
  }

  // Sacamos la fecha actual
  const now = new Date();

  // Sacamos la hora, minuto y segundo de la fecha actual
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Si los segundos son impares establecemos ":" como separador entre números
  const separator = second % 2 > 0 ? ":" : " ";

  // Escribimos el reloj
  clock.textContent = `
  ${formatNumber(hour)}${separator}${formatNumber(
    minute
  )}${separator}${formatNumber(second)}
`;

  // Comprobamos si la hora actual es la hora de la alarma y paramos el intervalo de actualización si es así
  if (
    hour === Number(alarmHour) &&
    minute === Number(alarmMinute) &&
    second === Number(alarmSecond)
  ) {
    clearInterval(interval);
    greeting.textContent = "Alarm!!!";
    return;
  }

  // Calculamos en que parte del día estamos
  let segment;

  if (hour <= 6 || hour >= 22) segment = "night";
  else if (hour <= 12) segment = "morning";
  else segment = "afternoon";

  // Escribimos el saludo correspondiente a la parte del día
  const greetingText = getGreeting(segment);

  // Escribimos el saludo en el h2
  greeting.textContent = greetingText;

  // Cambiamos el fondo del body
  body.setAttribute("class", segment);
}

// Esta función devuelve un saludo para cada parte del día
function getGreeting(segment) {
  switch (segment) {
    case "morning":
      return "Buenos dias";
    case "afternoon":
      return "Buenas tardes";
    case "night":
      return "Buenas noches";
  }
}

// Ejecutamos la función de actualización del reloj inicialmente para
// no tener que esperar a la primera vez que se ejecute el interval
updateClock();

// Creamos el intervalo
const interval = setInterval(updateClock, 1000);
