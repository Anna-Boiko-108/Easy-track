export default function render(methods) {
  // const selectNode = document.querySelector("#taskListSortSelect");
  // if (selectNode) {
  //   return;
  // }

  // Remove previous tasks list
  const section = document.querySelector(".sort-select");
  if (section) {
    section.parentNode.removeChild(section);
  }

  const select = `<label for="taskListSortSelect">
<i class="fas fa-sort-amount-up-alt"></i>
<select name="ortSelect" id="taskListSortSelect">
<option value="byCreateDate" selected>По дате создания (новые)</option>
<option value="byCreateDateDesc">По дате создания (старые)</option>
<option value="byPriorityDesc">По приоритетности (выше)</option>
<option value="byPriority">По приоритетности (ниже)</option>
</select></label>
<label for="filterAssigneeSelect">
<i class="fas fa-user-check"></i>
<select name="filterAssigneeSelect" id="filterAssigneeSelect">
<option value="0" selected>Все исполнители</option>
<option value="1">ФИО 1</option>
<option value="2">ФИО 2</option>
<option value="3">ФИО 3</option>
<option value="4">ФИО 4</option>
</select></label>
<label for="filterPrioritySelect">
<i class="fas fa-exclamation-triangle"></i>
<select name="filterPrioritySelect" id="filterPrioritySelect">
<option value="0" selected>Приоритет</option>
<option value="5">Высший</option>
<option value="4">Высокий</option>
<option value="3">Средний</option>
<option value="2">Низкий</option>
<option value="1">Очень низкий</option>
</select></label>
<label for="taskSearch">
<i class="fas fa-search"></i>
<input type="search" id="taskSearchInput" name="taskSearch" placeholder="Название задания">
</label>
<button class="btn" id="taskSearchBtn">Искать задание</button>
`;

  const sortSection = document.createElement("section");
  sortSection.classList.add("sort-select");
  sortSection.innerHTML = select;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("afterbegin", sortSection);

  // Give values to select fields if preselected in url
  const taskListSortSelect = document.getElementById("taskListSortSelect");
  taskListSortSelect.value = methods.sort || "byCreateDate";

  const filterAssigneeSelect = document.getElementById("filterAssigneeSelect");
  filterAssigneeSelect.value = methods.filterAssignees || 0;

  const filterPrioritySelect = document.getElementById("filterPrioritySelect");
  filterPrioritySelect.value = methods.filterPriority || 0;

  const taskSearchInput = document.getElementById("taskSearchInput");
  taskSearchInput.value = methods.search || "";
}
