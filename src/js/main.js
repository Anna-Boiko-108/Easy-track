import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import "./add-task.js";
import renderTasksList from "./tasks-list-view.js";
import "./show-task.js";
import renderShowTask from "./show-task-view.js";
import "./router.js";

// Load data from DB (localstorage)
const db = new DB();
const tasksList = new TasksList(db);

// Main save task logic
export function saveTask(data) {
  const task = new Task(data);

  tasksList.add(task);
  db.update(tasksList);
  // TODO: redirectToTaskList();
  // TODO: Make new task shine green for a few seconds
}

export function renderTemplate(route) {
  if (route.name == "tasks-list-view") {
    renderTasksList(tasksList.tasksList);
  }

  if (route.name == "show-task-view") {
    // URL: #task/:id
    if (route.args.length == 1) {
      showTask(route.args[0]);
    }
  }
}

export function showTask(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    window.location.hash = "tasks-active";
    return;
  }

  renderShowTask(task);
  initModal();
}
