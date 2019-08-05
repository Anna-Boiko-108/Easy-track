import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import populate from "./populate.js";
import renderHeader from "./view/header-view.js";
import renderMain from "./view/main-view.js";
import renderSlider from "./view/slider-view.js";
import renderWelcome from "./view/welcome-view.js";
import renderLeftNav from "./view/left-nav-view.js";
import renderContent from "./view/content-view.js";
import renderAddTaskModal from "./view/add-task-view.js";
import renderAddress from "./view/contacts-view.js";
import { showAddTaskModal } from "./view/add-task-view.js";
import renderTask from "./view/task-view.js";
import renderTaskModify from "./view/task-modify-view.js";
import initRouter from "./router.js";
import { redirect } from "./router.js";

// Load data from DB (localstorage)
const db = new DB();
const tasksList = new TasksList(db);

// Populate DB (for testing)
if (tasksList.isEmpty) {
  populate();
}

// Comunicate with router
// ==============================

initRouter();

// New path
export function setNewPath(modifier, args) {
  redirect(modifier, args);
}

// Render pages
// ============================================

// Start rendering appropriate page based on url hash change (see router)
export function renderTemplate(route) {
  if (route.name == "home") {
    renderHome();
  }

  if (route.name == "contacts") {
    renderContacts();
  }

  if (route.name == "tasks-active") {
    renderTasksActive(route.args);
  }

  if (route.name == "add-task") {
    renderAddTask();
  }
}

function renderHome() {
  renderHeader();
  renderMain();
  renderSlider();
  renderWelcome();
}

function renderContacts() {
  renderHeader();
  renderMain();
  renderAddress();
}

function renderTasksActive(args) {
  // Show active task's list filtered (if any filters)
  // and devided into pages (if too many tasks)
  const currentFilters = getFilters(args);
  const { data, pagesQuantity } = prepareData(
    new TasksList(db),
    currentFilters
  );

  renderHeader();
  renderMain();
  renderLeftNav();
  renderContent(data, currentFilters, pagesQuantity);
  renderAddTaskModal();

  // Show task or modify task
  if (args.includes("task")) {
    const taskId = args[args.indexOf("task") + 1];
    const task = tasksList.findById(taskId);

    args.includes("modify") ? renderTaskModify(task) : renderTask(task);
  }
}

function renderAddTask() {
  renderHeader();
  renderMain();
  renderLeftNav();
  renderAddTaskModal();
  showAddTaskModal();
}

// Prepare data for rendering
// =========================================

// Parse args array from url hashchange and get list of filters
function getFilters(args) {
  let filters = {};
  if (args.includes("sort")) {
    filters.sort = args[args.indexOf("sort") + 1];
  }
  if (args.includes("filterAssignees")) {
    filters.filterAssignees = args[args.indexOf("filterAssignees") + 1];
  }
  if (args.includes("filterPriority")) {
    filters.filterPriority = args[args.indexOf("filterPriority") + 1];
  }
  if (args.includes("search")) {
    filters.search = decodeURI(args[args.indexOf("search") + 1]);
  }
  if (args.includes("page")) {
    filters.page = args[args.indexOf("page") + 1];
  }

  return filters;
}

// Prepare task's list data for rendering
function prepareData(tasksListObj, methods) {
  const maxNumPerPage = 8;
  // Data filtered (sort, filter, search)
  const objectFiltered = filterData(tasksListObj, methods);

  const currentPage = methods.page;

  // Final data
  const data = filterPage(objectFiltered, maxNumPerPage, currentPage);

  return data;
}

// Filter task's list based on filters selected
function filterData(tasksList, methods) {
  let criterias = {
    sort: "byCreateDate",
    filter: { archived: false },
    search: {}
  };

  if (methods.sort) {
    criterias.sort = methods.sort;
  }
  if (methods.filterAssignees && methods.filterAssignees != 0) {
    criterias.filter.assignee = methods.filterAssignees;
  }
  if (methods.filterPriority && methods.filterPriority != 0) {
    criterias.filter.priority = methods.filterPriority;
  }
  if (methods.search) {
    criterias.search.name = methods.search;
  }

  if (Object.keys(criterias.search).length !== 0) {
    tasksList.search(criterias.search);
  }
  tasksList.sortBy(criterias.sort);
  tasksList.filter(criterias.filter);

  return tasksList;
}

// Slice task's list to show proper amount of tasks per page
function filterPage(object, maxNumPerPage, page) {
  const tasksQuantity = object.length;
  const pagesQuantity = Math.ceil(tasksQuantity / maxNumPerPage);

  const startIndex = page * maxNumPerPage - maxNumPerPage;
  const lastIndex = page * maxNumPerPage;

  const data = object.tasksList.slice(startIndex, lastIndex);

  return { data, pagesQuantity };
}

// Comunicate with task's list and local storage
// ================================================

export function saveTask(data) {
  const task = new Task(data);

  tasksList.add(task);
  db.update(tasksList);
}

export function modifyTask(taskModified) {
  tasksList.modify(taskModified);
  db.update(tasksList);
}

export function archiveTask(taskId) {
  tasksList.archive(taskId);
  db.update(tasksList);
}
