export default function render(task) {
  const taskModifyModalHTML = `
<form method="post" class="add-task-modal" id="ModifyTaskForm" name="task-modify-form">
<p class="modal-task-id" id="modifyTaskId">${task.id}</p>
<h2>Редактировать задание</h2>
<label for="taskName">Задание<br>
<input type="text" name="taskName" id="taskName" required value="${task.name}">
</label>
<label for="taskDescription">Описание<br>
<textarea name="taskDescription" id="taskDescription" rows="10" required>
${task.description}</textarea>
</label>
<label for="taskComment">Коментарий<br>
<textarea name="taskComment" id="taskComment" rows="5">
${task.comment}</textarea>
</label>
<div class="modal-subsection-wrapper">
<label for="taskAssignee">Исполнитель<br>
<select name="taskAssignee" required >
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
value="${task.priority}" step="1" class="task-label-range"></label>
<input type="submit" value="Редактировать задание" class="submit-btn">
<span class="close" id="closeModifyTaskModalBtn">&times;</span>
</form>`;

  const modalSection = document.createElement("section");
  modalSection.classList.add("modal");
  modalSection.classList.add("modal-active");
  modalSection.classList.add("task-modify-modal");
  modalSection.innerHTML = taskModifyModalHTML;

  const main = document.getElementsByClassName("main")[0];
  main.appendChild(modalSection);
  document.body.classList.add("no-scroll");
}
