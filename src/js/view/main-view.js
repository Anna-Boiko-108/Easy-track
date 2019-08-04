export default function renderMain() {
  prepareSection();
  render();
}

function prepareSection() {
  const section = document.querySelector(".main");
  if (section) {
    section.parentNode.removeChild(section);
  }
}

function render() {
  const main = document.createElement("main");
  main.classList.add("main");

  const rootSection = document.getElementById("root");
  rootSection.insertAdjacentElement("beforeend", main);
}
