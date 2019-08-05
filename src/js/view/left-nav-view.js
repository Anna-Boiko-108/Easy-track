export default function renderLeftNav() {
  const leftNav = document.querySelector(".left-nav");
  if (leftNav) return;

  render();
  window.addEventListener("DOMContentLoaded", styleElements);
}

function render() {
  const leftNavHTML = `
    <ul>
      <li id="addTask"><a href="#add-task" class="">
        <i class="fas fa-plus"></i></a>
      </li>
      <li><a href="#tasks-active/page/1" class="">
        <i class="fas fa-list-ul"></i></a>
      </li>
    </ul>`;

  const leftNav = document.createElement("nav");
  leftNav.classList.add("left-nav");
  leftNav.innerHTML = leftNavHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("afterbegin", leftNav);
}

function styleElements() {
  const leftNav = document.querySelector(".left-nav");
  const header = document.querySelector(".header");

  let headerHeight = parseInt(
    window.getComputedStyle(header).getPropertyValue("height"),
    10
  );

  leftNav.style.top = `${headerHeight + 100}px`;
}
