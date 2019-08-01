export default function init() {
  const sortSelect = document.getElementById("taskListSortSelect");
  sortSelect.addEventListener("change", selectChangeHandler);
}

function selectChangeHandler(event) {
  const select = event.target;
  const sortCriteria = select.options[select.selectedIndex].value;

  const path = window.location.hash.slice(1);
  const pathArray = path.split("/");

  const pathIncludesSort = pathArray.includes("sort");

  if (pathIncludesSort) {
    const indexOfSort = pathArray.indexOf("sort");
    pathArray[indexOfSort + 1] = sortCriteria;
  } else {
    pathArray.push("sort");
    pathArray.push(sortCriteria);
  }

  const newPath = pathArray.join("/");
  window.location.hash = newPath;
}
