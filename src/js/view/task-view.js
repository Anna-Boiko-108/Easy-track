import { archiveTask } from "./../app.js";
import { setNewPath } from "./../app.js";

export default function renderTask(task) {
  if (!task) {
    setNewPath("closeTask");
    return;
  }

  render(task);
  init();
}

function render(task) {
  const taskHTML = `
    <article class="task-modal-card">
      <p class="modal-task-id">${task.id}</p>
      <h3 class="modal-task-name">${task.name}</h3>
      <p class="modal-task-description">${task.description}</p>
      <p class="modal-task-comment">${task.comment}</p>
      <p class="modal-task-assignee">${task.assignee}</p>
      <div class="task-dates">
<p class="modal-task-create-date">
${new Date(task.createDate).toLocaleDateString("uk")}</p>
<p class="modal-task-due-date">
${new Date(task.dueDate).toLocaleDateString("uk")}</p>
      </div>
      <div class="task-modal-btns">
        <div class="submit-btn submit-btn-modal">
          <a id="modifyTaskBtn">Редактировать</a></div>
        <div class="submit-btn submit-btn-modal">
          <a id="archiveTaskBtn">Архивировать</a>
        </div>
      </div>
      <span class="close" id="closeTaskModalBtn">&times;</span>
    </article>`;

  const taskElem = document.createElement("section");
  taskElem.classList.add("modal");
  taskElem.classList.add("modal-active");
  taskElem.classList.add("task-modal");
  taskElem.innerHTML = taskHTML;

  const main = document.querySelector(".main");
  main.appendChild(taskElem);

  // Style
  document.body.classList.add("no-scroll");
}

function init() {
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
