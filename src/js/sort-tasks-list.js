import { setNewPath } from "./main.js";

export default function init() {
  // Init sort select
  const sortSelect = document.getElementById("taskListSortSelect");
  sortSelect.addEventListener("change", sortChangeHandler);

  // Init filter assignee select
  const filterAssigneeSelect = document.getElementById("filterAssigneeSelect");
  filterAssigneeSelect.addEventListener("change", filterAssigneeChangeHandler);

  // Init filter priority select
  const filterPrioritySelect = document.getElementById("filterPrioritySelect");
  filterPrioritySelect.addEventListener("change", filterPriorityChangeHandler);

  // Init search button
  const taskSearchBtn = document.getElementById("taskSearchBtn");
  taskSearchBtn.addEventListener("click", searchClickHandler);
}

function sortChangeHandler(event) {
  const select = event.target;
  const sortCriteria = select.options[select.selectedIndex].value;

  setNewPath("sort", { sortCriteria });
}

function filterAssigneeChangeHandler(event) {
  const select = event.target;
  const filterCriteria = select.options[select.selectedIndex].value;

  setNewPath("filterAssignees", { filterCriteria });
}
function filterPriorityChangeHandler(event) {
  const select = event.target;
  const filterCriteria = select.options[select.selectedIndex].value;

  setNewPath("filterPriority", { filterCriteria });
}
function searchClickHandler() {
  const taskSearchInput = document.getElementById("taskSearchInput");

  const searchText = taskSearchInput.value;

  setNewPath("search", { searchText });
}
