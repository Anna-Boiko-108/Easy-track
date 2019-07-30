import { modifyTask } from "./main.js";

export function initTaskModifyModal() {
  const taskModifyForm = document.forms["task-modify-form"];
  taskModifyForm.addEventListener("submit", modifyTaskSubmitHandler);

  const closeModalBtn = document.getElementById("closeModifyTaskModalBtn");
  closeModalBtn.addEventListener("click", hideModifyTaskModal);

  const modalSection = document.querySelector(".task-modify-modal");
  window.addEventListener("click", outOfModalClickHandler);
  function outOfModalClickHandler(event) {
    if (event.target == modalSection) {
      hideModifyTaskModal(event);
    }
  }

  const modifyTaskBtn = document.getElementById("closeModifyTaskModalBtn");
  modifyTaskBtn.addEventListener("click", hideModifyTaskModal);
}

function modifyTaskSubmitHandler(event) {
  const taskId = document.getElementById("modifyTaskId");
  event.preventDefault();
  const form = event.target;
  const task = {
    id: taskId.innerText,
    name: form.taskName.value,
    description: form.taskDescription.value,
    comment: form.taskComment.value,
    assignee: form.taskAssignee.value,
    dueDate: form.taskDueDate.value,
    priority: form.taskPriority.value,
    archived: false
  };

  modifyTask(task);
  hideModifyTaskModal(event);
}

// Hide modal
function hideModifyTaskModal(event) {
  const closeModalBtn = document.getElementById("closeModifyTaskModalBtn");
  const modifyTaskModal = document.querySelector(".task-modify-modal");
  const taskModifyForm = document.forms["task-modify-form"];

  const target = event.target;
  if (
    target == closeModalBtn ||
    target == modifyTaskModal ||
    target == taskModifyForm
  ) {
    const taskId = document.getElementById("modifyTaskId").innerText;
    window.location.hash = "task/" + taskId;
  }

  document.body.classList.remove("no-scroll");
  modifyTaskModal.parentNode.removeChild(modifyTaskModal);

  // window.location.hash = "task/" + id;
}
