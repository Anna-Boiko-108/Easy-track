export default class TasksList {
  constructor(db) {
    this.tasksList = db.get();
  }

  get isEmpty() {
    return this.tasksList.length === 0;
  }

  add(task) {
    task.id = this.tasksList.length + 1;
    this.tasksList.push(task);
  }

  // Actually do not removes contact from db but archives it
  remove(taskId) {
    const index = this.tasksList.findIndex(task => {
      return task.id == taskId;
    });

    this.tasksList[index].archived = true;
  }

  // TODO: add find method
}
