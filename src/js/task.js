export default class Task {
  constructor(task) {
    this.id = null;
    this.name = task.name;
    this.description = task.description;
    this.comment = task.comment;
    this.assignee = task.assignee;
    this.priority = task.priority;
    this.dueDate = new Date(task.dueDate);
    this.createDate = new Date();
    this.archived = false;
  }
}
