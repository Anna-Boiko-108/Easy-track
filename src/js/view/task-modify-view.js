import { modifyTask } from "./../app.js";
import { setNewPath } from "./../app.js";

export default function renderTaskModify(task) {
  if (!task) {
    setNewPath("closeTaskModifyFail");
    return;
  }

  render(task);
  init();
}

function render(task) {
  const taskModifyHTML = `
    <form method="post" class="add-task-modal" id="ModifyTaskForm" name="task-modify-form">
      <p class="modal-task-id" id="modifyTaskId">${task.id}</p>
      <h2>Редактировать задание</h2>
      <label for="taskName">Задание<br>
        <input type="text" name="taskName" id="taskName" required 
          value="${task.name}">
      </label>
      <label for="taskDescription">Описание<br>
        <textarea name="taskDescription" id="taskDescription" 
        rows="10" required>${task.description}</textarea>
      </label>
      <label for="taskComment">Коментарий<br>
        <textarea name="taskComment" id="taskComment" 
        rows="5">${task.comment}</textarea>
      </label>
      <div class="modal-subsection-wrapper">
        <label for="taskAssignee">Исполнитель<br>
          <select name="taskAssignee" required id="taskAssignee">
            <option></option>
            <option value="1">ФИО 1</option>
            <option value="2">ФИО 2</option>
            <option value="3">ФИО 3</option>
            <option value="4">ФИО 4</option>
          </select>
        </label>
      </div>
      <label for="taskPriority">Приоритет<br>
        <input type="range" id="taskPriority" name="taskPriority" min="1" max="5" 
          value="${task.priority}" step="1" class="task-label-range">
      </label>
      <input type="submit" value="Редактировать задание" class="submit-btn">
      <span class="close" id="closeModifyTaskModalBtn">&times;</span>
    </form>`;

  const taskModify = document.createElement("section");
  taskModify.classList.add("modal");
  taskModify.classList.add("modal-active");
  taskModify.classList.add("task-modify-modal");
  taskModify.innerHTML = taskModifyHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("beforeend", taskModify);

  // Style
  document.body.classList.add("no-scroll");

  // Give values to select fields
  const select = document.getElementById("taskAssignee");
  select.value = task.assignee;
}

function init() {
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
