const p1 = document.querySelector("p.important");
const p2 = document.querySelector("p.secondary");

console.log(p1.classList);

p1.classList.add("highlight");
p2.classList.remove("secondary");
p2.classList.add("important");

p1.classList.toggle("highlight");
p1.classList.toggle("highlight");
p1.classList.toggle("highlight");
p1.classList.toggle("highlight");

if (p2.classList.contains("important")) {
  console.log("el párrafo 2 tiene la class important");
}

p1.classList.replace("highlight", "otraclase");
