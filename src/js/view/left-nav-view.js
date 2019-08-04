export default function renderLeftNav() {
  const leftNav = document.querySelector(".left-nav");
  if (leftNav) return;

  render();
}

function render() {
  const leftNavHTML = `
    <ul>
      <li id="addTask"><a href="#add-task" class="menu-btn">
        <i class="fas fa-plus"></i></a>
      </li>
      <li><a href="#tasks-active/page/1" class="menu-btn">
        <i class="fas fa-list-ul"></i></a>
      </li>
    </ul>`;

  const leftNav = document.createElement("nav");
  leftNav.classList.add("left-nav");
  leftNav.innerHTML = leftNavHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("afterbegin", leftNav);
}
