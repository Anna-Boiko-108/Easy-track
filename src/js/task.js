export default class Task {
  constructor(task) {
    this.id = null;
    this.name = task.name;
    this.description = task.description;
    this.comment = task.comment;
    this.assignee = task.assignee;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.archived = false;
  }
}
