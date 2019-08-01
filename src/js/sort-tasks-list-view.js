export default function render() {
  const selectNode = document.querySelector("#taskListSortSelect");
  if (selectNode) {
    return;
  }

  const select = `<label for="taskListSortSelect">&downarrow;&uparrow;
<select name="taskListSortSelect" id="taskListSortSelect">
<option value="byCreateDate" selected>По дате создания (новые)</option>
<option value="byCreateDateDesc">По дате создания (старые)</option>
<option value="byPriorityDesc">По приоритетности (выше)</option>
<option value="byPriority">По приоритетности (ниже)</option>
</select>
</label>`;

  const sortSection = document.createElement("section");
  sortSection.classList.add("sort-select");
  sortSection.innerHTML = select;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("afterbegin", sortSection);
}
