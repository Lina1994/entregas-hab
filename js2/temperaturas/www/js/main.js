// Temp. menor que 20: fondo verde
// Temp. entre 20 y 30: fondo naranja
// Temp. mayor de 30: fondo rojo

const temperaturas = [
  {
    city: "A coruña",
    min: 17,
    max: 23,
  },
  {
    city: "Ferrol",
    min: 15,
    max: 32,
  },
  {
    city: "Lugo",
    min: -20,
    max: 31,
  },
  {
    city: "Ourense",
    min: 18,
    max: 35,
  },
  {
    city: "Pontevedra",
    min: 18,
    max: 29,
  },
  {
    city: "Antártida",
    min: -50,
    max: -10,
  },
];

/*
  <table>
    <caption>Temperaturas</caption>
    <thead>
      <th>Ciudad</th>
      <th>Mínima</th>
      <th>Máxima</th>
    </thead>
    <tr>
      <td>A Coruña</td>
      <td>17</td>
      <td>23</td>
    </tr>
    tr....
  </table>

*/

// Seleccionamos el elemento donde vamos insertar la tabla
const section = document.querySelector("section.temp");

// Creamos la tabla
const table = document.createElement("table");

// Creamos el caption
const caption = document.createElement("caption");
caption.textContent = "Temperaturas";

// Metemos el caption en la tabla
table.append(caption);

// Cabecera de la tabla
const thead = document.createElement("thead");
// const head1 = document.createElement("th");
// head1.textContent = "Ciudad";
// const head2 = document.createElement("th");
// head2.textContent = "Mínima";
// const head3 = document.createElement("th");
// head3.textContent = "Máxima";

// thead.append(head1);
// thead.append(head2);
// thead.append(head3);

thead.innerHTML = `
  <th>Ciudad</th>
  <th>Mínima</th>
  <th>Máxima</th>
`;

// Metemos la cabecera en la tabla
table.append(thead);

// Recorremos el array de temperaturas y creamos los tr
for (const temp of temperaturas) {
  // Creamos el tr
  const tr = document.createElement("tr");

  // Creamos las columnas de ciudad, temp. mínima y temp. máxima
  const cityCol = document.createElement("td");
  cityCol.textContent = temp.city;

  const minCol = document.createElement("td");
  minCol.textContent = temp.min;
  minCol.classList.add(getClassName(temp.min));

  const maxCol = document.createElement("td");
  maxCol.textContent = temp.max;
  maxCol.classList.add(getClassName(temp.max));

  // Metemos las columnas en el tr
  tr.append(cityCol);
  tr.append(minCol);
  tr.append(maxCol);

  // Metemos el tr en la tabla
  table.append(tr);
}

// Finalmente metemos la tabla completa en la section
section.append(table);

function getClassName(temp) {
  if (temp < 0) return "lower";
  if (temp < 20) return "low";
  if (temp < 30) return "medium";
  return "high";
}
