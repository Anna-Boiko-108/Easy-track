export function initTaskList() {
  const tasksListSection = document.querySelector(".tasks-list");
  tasksListSection.addEventListener("click", taskClickHandler);
}

function taskClickHandler(event) {
  // Find task's id node
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

  // Find task's id value
  const listOfTaskNodes = Array.from(target.children);
  const taskId = listOfTaskNodes.find(node => {
    return node.classList.contains("task-id");
  }).innerText;

  //   Change hash
  window.location.hash = "task/" + taskId;
}
