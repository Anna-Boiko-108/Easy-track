export default function beforeRender(tasksList, methods) {
  let sortCriteria = "byCreateDate";
  let filters = {
    archived: false
  };
  let searchCriterias = {};

  if (methods.sort) {
    sortCriteria = methods.sort;
  }
  if (methods.filterAssignees && methods.filterAssignees != 0) {
    filters.assignee = methods.filterAssignees;
  }
  if (methods.filterPriority && methods.filterPriority != 0) {
    filters.priority = methods.filterPriority;
  }
  if (methods.search) {
    searchCriterias.name = methods.search;
  }

  if (Object.keys(searchCriterias).length !== 0) {
    tasksList.search(searchCriterias);
  }
  tasksList.sortBy(sortCriteria);
  tasksList.filter(filters);

  render(tasksList.tasksList);
}

function render(data) {
  const list = data.reduce((acc, task) => {
    return (
      acc +
      `<article class="task">
<p class="task-id">${task.id}</p>
<h3 class="task-name">${task.name}</h3>
<p class="task-description">${task.description}</p>
<p class="task-comment">${task.comment}</p>
<p class="task-assignee">${task.assignee}</p>
<p class="task-priority">${task.priority}</p>
<p class="task-due-date">${new Date(task.dueDate).toLocaleDateString("uk")}</p>
<p class="task-due-date">
${new Date(task.createDate).toLocaleDateString("uk")}</p>
</article>`
    );
  }, "");

  // Remove previous tasks list
  const taskListSection = document.querySelector(".tasks-list");
  if (taskListSection) {
    taskListSection.parentNode.removeChild(taskListSection);
  }

  const section = document.createElement("section");
  section.classList.add("tasks-list");
  section.innerHTML = list;

  const main = document.querySelector(".main");
  main.appendChild(section);
}
