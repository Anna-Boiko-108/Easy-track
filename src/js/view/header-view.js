export default function renderHeader() {
  const header = document.querySelector(".header");
  if (header) return;

  render();
}

function render() {
  const headerHTML = `
  <section class="menu">
    <div class="logo">
      <img src="./assets/img/logo.png" alt="logo">
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="#" class="menu-btn"><i class="fas fa-home"></i> Главная</a></li>
        <li><a href="#" class="menu-btn"><i class="fas fa-suitcase"></i> Начать работу</a>
          <ul>
            <li><a href="#add-task" class="menu-btn">Добавить задание</a></li>
            <li><a href="#tasks-active/page/1" class="menu-btn">Список заданий</a></li>
          </ul>
        </li>
        <li><a href="#contacts" class="menu-btn">
          <i class="fas fa-map-marked-alt"></i> Контакты</a>
        </li>
      </ul>
    </nav>
  </section>`;

  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = headerHTML;

  const rootSection = document.getElementById("root");
  rootSection.insertAdjacentElement("afterbegin", header);
}
