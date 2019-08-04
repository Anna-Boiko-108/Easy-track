export default class TasksList {
  constructor(db) {
    this.tasksList = db.get();
  }

  get isEmpty() {
    return this.tasksList.length === 0;
  }

  get length() {
    return this.tasksList.length;
  }

  add(task) {
    task.id = this.tasksList.length + 1;
    this.tasksList.unshift(task);
  }

  modify(taskModified) {
    const index = this.tasksList.findIndex(task => task.id == taskModified.id);
    const task = this.tasksList[index];
    this.tasksList[index] = { ...task, ...taskModified };
  }

  archive(taskId) {
    const index = this.tasksList.findIndex(task => task.id == taskId);
    this.tasksList[index].archived = true;
  }

  findById(taskId) {
    return this.tasksList.find(task => task.id == taskId);
  }

  search(criterias) {
    this.tasksList = this.tasksList.filter(task => {
      for (let criteria in criterias) {
        if (
          task[criteria]
            .toUpperCase()
            .includes(criterias[criteria].toUpperCase())
        )
          return true;
      }
    });
  }

  sortBy(criteria) {
    const compareFunction = TasksList.getSortCompareFunction(criteria);
    this.tasksList.sort(compareFunction);
  }

  filter(criterias) {
    for (let criteria in criterias) {
      this.tasksList = this.tasksList.filter(task => {
        return task[criteria] == criterias[criteria];
      });
    }
  }

  static getSortCompareFunction(sortCriteria) {
    const sortCompareFunctions = {
      byCreateDate: (a, b) => {
        return b.id - a.id;
        // return new Date(b.createDate) - new Date(a.createDate);
      },
      byCreateDateDesc: (a, b) => {
        return a.id - b.id;
        // return new Date(a.createDate) - new Date(b.createDate);
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
