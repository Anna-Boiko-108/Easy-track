import { setNewPath } from "./../app.js";

export default function renderContent(data, methods, pagesQuantity) {
  prepareSection();
  render(data, methods, pagesQuantity);
  init();
}

function prepareSection() {
  const content = document.querySelector(".content");
  if (content) {
    content.parentNode.removeChild(content);
  }
}

function render(data, methods, pagesQuantity) {
  const content = document.createElement("section");
  content.classList.add("content");

  // Select panel section
  const selectPanelHTML = `
    <label for="taskListSortSelect">
      <i class="fas fa-sort-amount-up-alt"></i>
      <select name="ortSelect" id="taskListSortSelect">
        <option value="byCreateDate" selected>По дате создания (новые)</option>
        <option value="byCreateDateDesc">По дате создания (старые)</option>
        <option value="byPriorityDesc">По приоритетности (выше)</option>
        <option value="byPriority">По приоритетности (ниже)</option>
      </select>
    </label>
    <label for="filterAssigneeSelect">
      <i class="fas fa-user-check"></i>
      <select name="filterAssigneeSelect" id="filterAssigneeSelect">
        <option value="0" selected>Все исполнители</option>
        <option value="1">ФИО 1</option>
        <option value="2">ФИО 2</option>
        <option value="3">ФИО 3</option>
        <option value="4">ФИО 4</option>
      </select>
    </label>
    <label for="filterPrioritySelect">
      <i class="fas fa-exclamation-triangle"></i>
      <select name="filterPrioritySelect" id="filterPrioritySelect">
        <option value="0" selected>Приоритет</option>
        <option value="5">Высший</option>
        <option value="4">Высокий</option>
        <option value="3">Средний</option>
        <option value="2">Низкий</option>
        <option value="1">Очень низкий</option>
      </select>
    </label>
    <label for="taskSearchInput">
      <i class="fas fa-search"></i>
      <input type="search" id="taskSearchInput" name="taskSearch" placeholder="Название задания">
    </label>`;

  const selectPanel = document.createElement("section");
  selectPanel.classList.add("select-panel");
  selectPanel.innerHTML = selectPanelHTML;

  content.appendChild(selectPanel);

  //   Tasks list section
  const tasksListHTML = data.reduce((acc, task) => {
    return (
      acc +
      `<article class="task">
          <p class="task-id">${task.id}</p>
          <h3 class="task-name">${task.name}</h3>
          <p class="task-description">${task.description}</p>
          <p class="task-comment">${task.comment}</p>
          <p class="task-assignee">${task.assignee}</p>
          <p class="task-priority">${task.priority}</p>
          <p class="task-due-date">
            ${new Date(task.dueDate).toLocaleDateString("uk")}</p>
          <p class="task-due-date">
            ${new Date(task.createDate).toLocaleDateString("uk")}</p>
      </article>`
    );
  }, "");

  const tasksList = document.createElement("section");
  tasksList.classList.add("tasks-list");
  tasksList.innerHTML = tasksListHTML;

  content.appendChild(tasksList);

  // Pagination section
  let pages = "";
  for (let i = 1; i <= pagesQuantity; i++) {
    pages += `<div class="page page-${i}">${i}</div>`;
  }

  const tasksListPagination = document.createElement("section");
  tasksListPagination.classList.add("tasks-list-pagination");
  tasksListPagination.innerHTML = pages;

  if (pagesQuantity > 1) {
    content.appendChild(tasksListPagination);
  }

  const main = document.querySelector(".main");
  main.appendChild(content);

  // Give values to select fields if preselected in url
  const taskListSortSelect = document.getElementById("taskListSortSelect");
  taskListSortSelect.value = methods.sort || "byCreateDate";

  const filterAssigneeSelect = document.getElementById("filterAssigneeSelect");
  filterAssigneeSelect.value = methods.filterAssignees || 0;

  const filterPrioritySelect = document.getElementById("filterPrioritySelect");
  filterPrioritySelect.value = methods.filterPriority || 0;

  const taskSearchInput = document.getElementById("taskSearchInput");
  taskSearchInput.value = methods.search ? decodeURI(methods.search) : "";

  // Activate current page
  if (pagesQuantity > 1) {
    const currentPage = methods.page;
    const currentPageDiv = document.querySelector(`.page-${currentPage}`);
    currentPageDiv.classList.add("page-active");
  }
}

// Add event listeners
function init() {
  // Init sort select
  const sortSelect = document.getElementById("taskListSortSelect");
  sortSelect.addEventListener("change", sortChangeHandler);

  // Init filter assignee select
  const filterAssigneeSelect = document.getElementById("filterAssigneeSelect");
  filterAssigneeSelect.addEventListener("change", filterAssigneeChangeHandler);

  // Init filter priority select
  const filterPrioritySelect = document.getElementById("filterPrioritySelect");
  filterPrioritySelect.addEventListener("change", filterPriorityChangeHandler);

  // Init search
  const searchField = document.getElementById("taskSearchInput");
  searchField.addEventListener("change", searchClickHandler);

  // Init tasks click
  const tasksListSection = document.querySelector(".tasks-list");
  tasksListSection.addEventListener("click", taskClickHandler);

  //   Init pagination
  const sectionPagination = document.querySelector(".tasks-list-pagination");
  if (sectionPagination) {
    sectionPagination.addEventListener("click", paginationClickHandler);
  }
}

// Handlers
function sortChangeHandler(event) {
  const select = event.target;
  const sortCriteria = select.options[select.selectedIndex].value;

  setNewPath("sort", { sortCriteria, pageNumber: 1 });
}

function filterAssigneeChangeHandler(event) {
  const select = event.target;
  const filterCriteria = select.options[select.selectedIndex].value;

  setNewPath("filterAssignees", { filterCriteria, pageNumber: 1 });
}
function filterPriorityChangeHandler(event) {
  const select = event.target;
  const filterCriteria = select.options[select.selectedIndex].value;

  setNewPath("filterPriority", { filterCriteria, pageNumber: 1 });
}
function searchClickHandler() {
  const taskSearchInput = document.getElementById("taskSearchInput");

  const searchText = encodeURI(taskSearchInput.value);

  setNewPath("search", { searchText, pageNumber: 1 });
}

function taskClickHandler(event) {
  // Check if the task was clicked not smth else
  let target = event.target;
  let fired = false;

  while (target.className != "tasks-list") {
    if (target.className == "task") {
      fired = true;
      break;
    }
    target = target.parentNode;
  }
  if (!fired) return;

  const taskId = getTaskId(target);
  // Find task's id value
  function getTaskId(target) {
    const listOfTaskNodes = Array.from(target.children);
    const taskId = listOfTaskNodes.find(node => {
      return node.classList.contains("task-id");
    }).innerText;
    return taskId;
  }

  setNewPath("openTask", { taskId });
}

function paginationClickHandler(event) {
  if (event.target.classList.contains("page")) {
    const pageNumber = event.target.innerText;
    setNewPath("page", { pageNumber });
  }
}
