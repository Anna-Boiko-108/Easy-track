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

  modify(task) {
    const prevTask = this.tasksList[task.id - 1];
    this.tasksList[task.id - 1] = { ...prevTask, ...task };
  }

  archive(taskId) {
    const index = this.tasksList.findIndex(task => {
      return task.id == taskId;
    });

    this.tasksList[index].archived = true;
  }

  findById(taskId) {
    return this.tasksList[taskId - 1];
  }
}
