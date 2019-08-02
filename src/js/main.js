import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import "./add-task.js";
import renderTasksList from "./show-tasks-list-view.js";
import renderShowTask from "./show-task-view.js";
import "./router.js";
import initTaskModal from "./show-task.js";
import renderShowTaskModify from "./show-task-modify-view.js";
import initTaskModifyModal from "./show-task-modify.js";
import { initTaskList } from "./show-tasks-list.js";
import renderSortTasksListSelect from "./sort-tasks-list-view";
import initSortTasksListSelect from "./sort-tasks-list";

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

export function modifyTask(taskModified) {
  tasksList.modify(taskModified);
  db.update(tasksList);
}

export function archiveTask(taskId) {
  tasksList.archive(taskId);
  db.update(tasksList);
}

export function renderTemplate(route) {
  if (route.name == "show-tasks-list-view") {
    if (route.args.includes("task")) {
      const taskId = route.args[route.args.indexOf("task") + 1];

      const toModify = route.args.includes("modify");
      toModify ? showTaskModify(taskId) : showTask(taskId);
      return;
    }
    const methods = getListMethods(route.args);
    showSortTasksListSelect(methods);
    showTasksList(methods);
  }
}

function getListMethods(args) {
  let methods = {};
  if (args.includes("sort")) {
    methods.sort = args[args.indexOf("sort") + 1];
  }
  if (args.includes("filterAssignees")) {
    methods.filterAssignees = args[args.indexOf("filterAssignees") + 1];
  }
  if (args.includes("filterPriority")) {
    methods.filterPriority = args[args.indexOf("filterPriority") + 1];
  }
  if (args.includes("search")) {
    methods.search = args[args.indexOf("search") + 1];
  }
  return methods;
}

function showSortTasksListSelect(methods) {
  renderSortTasksListSelect(methods);
  initSortTasksListSelect();
}

function showTasksList(methods) {
  renderTasksList(new TasksList(db), methods);
  initTaskList();
}

function showTask(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    setNewPath("closeTask");
    return;
  }

  renderShowTask(task);
  initTaskModal();
}

function showTaskModify(taskId) {
  const task = tasksList.findById(taskId);
  if (!task) {
    setNewPath("closeTaskModifyFail");
    return;
  }

  renderShowTaskModify(task);
  initTaskModifyModal();
}

// New path
export function setNewPath(modifier, args) {
  const path = window.location.hash.slice(1);
  const pathArray = path.split("/");

  const modifyPath = {
    openTask: () => {
      pathArray.push("task");
      pathArray.push(args.taskId);
    },
    closeTask: () => {
      pathArray.splice(pathArray.indexOf("task"), 2);
    },
    closeTaskModifyFail: () => {
      pathArray.splice(pathArray.indexOf("task"), 3);
    },
    closeTaskModify: () => {
      pathArray.splice(pathArray.indexOf("modify"), 1);
    },
    openModifyTask: () => {
      pathArray.push("modify");
    },
    sort: () => {
      const isSorted = pathArray.includes("sort");
      if (isSorted) {
        pathArray.splice(pathArray.indexOf("sort") + 1, 1, args.sortCriteria);
      } else {
        pathArray.push("sort");
        pathArray.push(args.sortCriteria);
      }
    },
    filterAssignees: () => {
      const isFiltered = pathArray.includes("filterAssignees");
      if (isFiltered) {
        pathArray.splice(
          pathArray.indexOf("filterAssignees") + 1,
          1,
          args.filterCriteria
        );
      } else {
        pathArray.push("filterAssignees");
        pathArray.push(args.filterCriteria);
      }
    },
    filterPriority: () => {
      const isFiltered = pathArray.includes("filterPriority");
      if (isFiltered) {
        pathArray.splice(
          pathArray.indexOf("filterPriority") + 1,
          1,
          args.filterCriteria
        );
      } else {
        pathArray.push("filterPriority");
        pathArray.push(args.filterCriteria);
      }
    },
    search: () => {
      const isFiltered = pathArray.includes("search");
      if (isFiltered) {
        pathArray.splice(pathArray.indexOf("search") + 1, 1, args.searchText);
      } else {
        pathArray.push("search");
        pathArray.push(args.searchText);
      }
    }
  };

  modifyPath[modifier]();

  const newPath = pathArray.join("/");
  window.location.hash = newPath;
}
