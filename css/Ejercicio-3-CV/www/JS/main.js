
const rn = (max) => Math.floor(Math.random() * max +20);
const borderR = document.querySelector("img.second");
console.log(borderR);
function changeradius() {

    borderR.style.borderRadius = `${rn(100)}% ${rn(80)}% ${rn(80)}% ${rn(80)}%`;
    
}
const interval = setInterval(changeradius, 1000); 