const items = document.querySelectorAll("ul.contador li");

const handleClick = function (event) {
  const li = event.target;

  if (!li.hasAttribute("data-count")) {
    li.setAttribute("data-count", 0);
  }

  const updatedCount = Number(li.getAttribute("data-count")) + 1;

  li.textContent = `${updatedCount} clicks`;

  li.setAttribute("data-count", updatedCount);
};

for (const item of items) {
  item.addEventListener("click", handleClick);
}
