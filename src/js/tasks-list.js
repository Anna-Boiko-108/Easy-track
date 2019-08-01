export default class TasksList {
  constructor(db) {
    this.tasksList = db.get();
  }

  get isEmpty() {
    return this.tasksList.length === 0;
  }

  add(task) {
    task.id = this.tasksList.length + 1;
    this.tasksList.unshift(task);
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

  sortBy(sortCriteria) {
    const compareFunction = TasksList.getSortCompareFunction(sortCriteria);
    this.tasksList.sort(compareFunction);
  }

  static getSortCompareFunction(sortCriteria) {
    const sortCompareFunctions = {
      byCreateDate: (a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      },
      byCreateDateDesc: (a, b) => {
        return new Date(a.createDate) - new Date(b.createDate);
      },
      byPriorityDesc: (a, b) => {
        return b.priority - a.priority;
      },
      byPriority: (a, b) => {
        return a.priority - b.priority;
      }
    };
    return sortCompareFunctions[sortCriteria];
  }
}
