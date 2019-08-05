export default function renderHeader() {
  const header = document.querySelector(".header");
  if (header) return;

  render();
  init();
}

function render() {
  const headerHTML = `
  <section class="header-wrapper">
    <div class="logo">
      <a href="#" class="logo-anchor">
        <img src="./assets/img/logo.png" alt="logo">
      </a>
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="#" class="menu-btn"><i class="fas fa-home"></i>Главная</a></li>
        <li><a href="#tasks-active/page/1" class="menu-btn"><i class="fas fa-suitcase"></i>Начать работу</a>
          <ul class="sub-menu">
            <li><a href="#add-task" class="menu-btn">
              <i class="fas fa-plus"></i>Новое задание</a>
            </li>
            <li><a href="#tasks-active/page/1" class="menu-btn">
            <i class="fas fa-list-ul"></i>Список заданий</a></li>
          </ul>
        </li>
        <li><a href="#contacts" class="menu-btn">
          <i class="fas fa-map-marked-alt"></i> Контакты</a>
        </li>
      </ul>
    </nav>
    <div class="main-nav-btn">
      <i class="fas fa-bars"></i>Меню
    </div>
  </section>`;

  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = headerHTML;

  const rootSection = document.getElementById("root");
  rootSection.insertAdjacentElement("afterbegin", header);
}

function init() {
  const mainNavBtn = document.querySelector(".main-nav-btn");
  mainNavBtn.addEventListener("click", navBtnClickHandler);

  const mainNav = document.querySelector(".main-nav");
  mainNav.addEventListener("click", mainNavclickHandler);
}

function navBtnClickHandler() {
  const mainNav = document.querySelector(".main-nav");
  mainNav.classList.add("main-nav-active");
}

function mainNavclickHandler() {
  const mainNav = document.querySelector(".main-nav");
  mainNav.classList.remove("main-nav-active");
}
