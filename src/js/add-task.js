import { saveTask } from "./main.js";

const addTaskBtn = document.getElementById("addTask");
const closeModalBtn = document.getElementById("closeAddTaskModalBtn");
const addTaskForm = document.forms.addTaskForm;

addTaskBtn.addEventListener("click", showAddTaskModal);
closeModalBtn.addEventListener("click", hideAddTaskModal);
addTaskForm.addEventListener("submit", saveTaskSubmitHandler);

// Show modal
function showAddTaskModal() {
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
  window.history.back();
}

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
