import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import "./add-task.js";
import renderTasksList from "./tasks-list-view.js";

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
  if (route == "tasks-list-view") {
    renderTasksList(tasksList.tasksList);
  }
}
