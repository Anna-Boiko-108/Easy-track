import { archiveTask } from "./main.js";
import { setNewPath } from "./main.js";

export default function initModal() {
  // Init close task modal
  const closeModalBtn = document.getElementById("closeTaskModalBtn");
  closeModalBtn.addEventListener("click", closeModalEventHandler);
  window.addEventListener("click", closeModalEventHandler);

  // Init modify task button
  const modifyTaskBtn = document.getElementById("modifyTaskBtn");
  modifyTaskBtn.addEventListener("click", modifyBtnClickHandler);

  // Init archive task button
  const archiveTaskBtn = document.getElementById("archiveTaskBtn");
  archiveTaskBtn.addEventListener("click", archiveBtnClickHandler);
}

// Close task modal
function closeModalEventHandler(event) {
  const modalSection = document.querySelector(".task-modal");
  const closeModalBtn = document.getElementById("closeTaskModalBtn");

  if (event.target == modalSection || event.target == closeModalBtn) {
    setNewPath("closeTask");
    removeModal();
  }
}

// Initiate opening modify task modal
function modifyBtnClickHandler() {
  setNewPath("openModifyTask");
  removeModal();
}

// Initiate archive task process
function archiveBtnClickHandler() {
  const taskId = document.querySelector(".modal-task-id").innerText;
  archiveTask(taskId);
  removeModal();
  setNewPath("closeTask");
}

// Remove modal from DOM
function removeModal() {
  document.body.classList.remove("no-scroll");
  const modalSection = document.querySelector(".task-modal");
  modalSection.parentNode.removeChild(modalSection);
}
