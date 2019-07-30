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
      hideModifyTaskModal();
    }
  }

  const modifyTaskBtn = document.getElementById("modifyTaskBtn");
  modifyTaskBtn.addEventListener("click", hideTaskModal);
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
  hideModifyTaskModal();
}

// Hide modal
function hideModifyTaskModal() {
  document.body.classList.remove("no-scroll");
  const modifyTaskModal = document.querySelector(".task-modify-modal");
  modifyTaskModal.parentNode.removeChild(modifyTaskModal);

  window.history.back();
}
