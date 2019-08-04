import { saveTask } from "./../app.js";

export default function renderAddTaskModal() {
  const addTask = document.querySelector(".add-task");
  if (addTask) return;

  render();
  init();
}

function render() {
  const addTaskHTML = `
    <section id="addTaskModal" class="modal">
    <form method="post" class="add-task-modal" id="addTaskForm">
      <h2>Новое задание</h2>
      <label for="taskName">Задание<br>
        <input type="text" name="taskName" id="taskName" required>
      </label>
      <label for="taskDescription">Описание<br>
        <textarea name="taskDescription" id="taskDescription" rows="10" required></textarea>
      </label>
      <label for="taskComment">Коментарий<br>
        <textarea name="taskComment" id="taskComment" rows="5"></textarea>
      </label>
      <div class="modal-subsection-wrapper">
        <label for="taskAssignee">Исполнитель<br>
          <select name="taskAssignee" required>
            <option></option>
            <option value="1">ФИО 1</option>
            <option value="2">ФИО 2</option>
            <option value="3">ФИО 3</option>
            <option value="4">ФИО 4</option>
          </select>
        </label>
        <label for="taskDueDate">Дата окончания<br>
          <input type="date" name="taskDueDate" id="taskDueDate" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="ГГГГ-ММ-ДД"
            required>
        </label>
      </div>
      <label for="taskPriority">Приоритет<br>
        <input type="range" id="taskPriority" name="taskPriority" min="1" max="5" value="3" step="1"
          class="task-label-range">
      </label>
      <input type="submit" value="Добавить задание" class="submit-btn">
      <span class="close" id="closeAddTaskModalBtn">&times;</span>
    </form>
  </section>`;

  const addTask = document.createElement("section");
  addTask.classList.add("add-task");
  addTask.innerHTML = addTaskHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("beforeend", addTask);
}

// Add event listeners
function init() {
  // Init showing add task modal
  const addTaskBtn = document.getElementById("addTask");
  addTaskBtn.addEventListener("click", showAddTaskModal);

  // Init closing add task modal
  const closeModalBtn = document.getElementById("closeAddTaskModalBtn");
  closeModalBtn.addEventListener("click", hideAddTaskModal);

  // Init saving task
  const addTaskForm = document.forms.addTaskForm;
  addTaskForm.addEventListener("submit", saveTaskSubmitHandler);
}

// Handlers
// Show modal
export function showAddTaskModal() {
  document.body.classList.add("no-scroll");
  const addTaskModal = document.getElementById("addTaskModal");
  addTaskModal.classList.add("modal-active");

  // Hide modal on click outside the modal
  window.addEventListener("click", outOfModalClickHandler);
  function outOfModalClickHandler(event) {
    if (event.target == addTaskModal) {
      hideAddTaskModal();
    }
  }
}

// Hide modal
function hideAddTaskModal() {
  document.body.classList.remove("no-scroll");
  const addTaskModal = document.getElementById("addTaskModal");
  addTaskModal.classList.remove("modal-active");

  setTimeout(() => {
    window.location.hash = "tasks-active/page/1";
  }, 0);
}

// Get task's data and initiate saving task
function saveTaskSubmitHandler(event) {
  event.preventDefault();
  const form = event.target;
  const task = {
    name: form.taskName.value,
    description: form.taskDescription.value,
    comment: form.taskComment.value,
    assignee: form.taskAssignee.value,
    dueDate: form.taskDueDate.value,
    priority: form.taskPriority.value
  };

  saveTask(task);
  clearForm(form);
  hideAddTaskModal();
}

function clearForm(form) {
  form.taskName.value = "";
  form.taskDescription.value = "";
  form.taskComment.value = "";
  form.taskAssignee.value = "";
  form.taskDueDate.value = "";
  form.taskPriority.value = "";
}
