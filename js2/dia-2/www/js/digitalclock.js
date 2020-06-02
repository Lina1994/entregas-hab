const clock = document.querySelector("header h1");
const greeting = document.querySelector("header h2");

// añade un 0 inicial al número si es menor que 10
function format(number) {
  if (number >= 10) return number;
  return "0" + number;
}

function writeClock() {
  const now = new Date();

  const hours = format(now.getHours());
  const minutes = format(now.getMinutes());
  const seconds = format(now.getSeconds());
  // const milliseconds = format(now.getMilliseconds());

  clock.textContent = `
    ${hours}:${minutes}:${seconds}
  `;

  greeting.textContent = getGreeting(now.getHours());
}

function getGreeting(hour) {
  if (hour <= 6 || hour >= 22) return "Buenas noches";
  if (hour <= 12) return "Buenos dias";
  return "Buenas tardes";
}

writeClock();
setInterval(writeClock, 1000);
