import { modifyTask } from "./main.js";
import { setNewPath } from "./main.js";

export default function initModal() {
  // Init close task modify modal
  const closeModalBtn = document.getElementById("closeModifyTaskModalBtn");
  closeModalBtn.addEventListener("click", closeModalEventHandler);
  window.addEventListener("click", closeModalEventHandler);

  // Init submit modify task
  const taskModifyForm = document.forms["task-modify-form"];
  taskModifyForm.addEventListener("submit", submitModifyEventHandler);
}

// Close task modify modal
function closeModalEventHandler(event) {
  const modalSection = document.querySelector(".task-modify-modal");
  const closeModalBtn = document.getElementById("closeModifyTaskModalBtn");

  if (event.target == modalSection || event.target == closeModalBtn) {
    removeModal();
    setNewPath("closeTaskModify");
  }
}

// Modify task
function submitModifyEventHandler(event) {
  event.preventDefault();
  const taskId = document.getElementById("modifyTaskId");
  const form = event.target;
  const taskModified = {
    id: Number(taskId.innerText),
    name: form.taskName.value,
    description: form.taskDescription.value,
    comment: form.taskComment.value,
    assignee: form.taskAssignee.value,
    priority: form.taskPriority.value,
    archived: false
  };

  modifyTask(taskModified);
  setNewPath("closeTaskModify");
  removeModal();
}

// Remove task modify modal from DOM
function removeModal() {
  document.body.classList.remove("no-scroll");
  const modalSection = document.querySelector(".task-modify-modal");
  modalSection.parentNode.removeChild(modalSection);
}
