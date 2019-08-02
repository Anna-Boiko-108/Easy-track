import { setNewPath } from "./main.js";

export function initTaskList() {
  // Init tasks click
  const tasksListSection = document.querySelector(".tasks-list");
  tasksListSection.addEventListener("click", taskClickHandler);
}

// Init task opening process
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
  setNewPath("openTask", { taskId });
}

// Find task's id value
function getTaskId(target) {
  const listOfTaskNodes = Array.from(target.children);
  const taskId = listOfTaskNodes.find(node => {
    return node.classList.contains("task-id");
  }).innerText;
  return taskId;
}
