export default class DB {
  constructor() {
    if (!window.localStorage.getItem("tasksList")) {
      window.localStorage.setItem("tasksList", JSON.stringify([]));
    }
  }

  get() {
    return JSON.parse(window.localStorage.getItem("tasksList"));
  }

  update(tasksList) {
    const tasksListJSON = JSON.stringify(tasksList.tasksList);
    window.localStorage.setItem("tasksList", tasksListJSON);
  }
}
