import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import "./add-task.js";
import renderTasksList from "./show-tasks-list-view.js";
import "./show-task.js";
import renderShowTask from "./show-task-view.js";
import "./router.js";
import { initTaskModal } from "./show-task.js";
import renderShowTaskModify from "./show-task-modify-view.js";
import { initTaskModifyModal } from "./show-task-modify.js";
import { initTaskList } from "./show-tasks-list.js";
import renderSortTaskListSelect from "./sort-tasks-list-view";
import initSortTaskListSelect from "./sort-tasks-list";

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
  if (route.name == "show-tasks-list-view") {
    renderSortTaskListSelect();
    initSortTaskListSelect();
    showTasksList(route.args);
  }

  if (route.name == "show-task-view") {
    const taskId = route.args[0];

    // URL: #task/:id
    if (route.args.length == 1) {
      showTask(taskId);
    } // URL: #task/:id/modify||archive
    else {
      const method = route.args[1];

      switch (method) {
        case "modify": {
          showTaskModify(taskId);
          break;
        }
        case "archive": {
          showTaskArchive(taskId);
          break;
        }
      }
    }
  }
}

function showTasksList(args) {
  let methods = {};
  if (args.includes("sort")) {
    methods.sort = args[args.indexOf("sort") + 1];
  }
  renderTasksList(new TasksList(db), methods);
  initTaskList();
}

function showTask(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    window.location.hash = "tasks-active";
    return;
  }

  renderShowTask(task);
  initTaskModal();
}

function showTaskModify(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    window.location.hash = "tasks-active";
    return;
  }

  renderShowTaskModify(task);
  initTaskModifyModal();
}

function showTaskArchive(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    window.location.hash = "tasks-active";
    return;
  }
  archiveTask(taskId);
}

export function modifyTask(task) {
  tasksList.modify(task);
  db.update(tasksList);
}

function archiveTask(taskId) {
  tasksList.archive(taskId);
  db.update(tasksList);
}
