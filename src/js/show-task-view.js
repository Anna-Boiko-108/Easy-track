export default function render(task) {
  const taskModalHTML = `<article class="task-modal-card">
<p class="modal-task-id">${task.id}</p>
<h3 class="modal-task-name">${task.name}</h3>
<p class="modal-task-description">${task.description}</p>
<p class="modal-task-comment">${task.comment}</p>
<p class="modal-task-assignee">${task.assignee}</p>
<p class="modal-task-due-date">
${new Date(task.dueDate).toLocaleDateString("uk")}</p>
<p class="modal-task-create-date">
${new Date(task.createDate).toLocaleDateString("uk")}</p>
<span class="close" id="closeTaskModalBtn">&times;</span>
<div><div class="btn">
<a href="#task/${task.id}/modify" id="modifyTaskBtn">Редактировать</a></div>
<div class="btn">
<a href="#task/${task.id}/archive" id="archiveTaskBtn">Архивировать</a>
</div></div>
</article>`;

  const modalSection = document.createElement("section");
  modalSection.classList.add("modal");
  modalSection.classList.add("modal-active");
  modalSection.classList.add("task-modal");
  modalSection.innerHTML = taskModalHTML;

  const main = document.querySelector(".main");
  main.appendChild(modalSection);
  document.body.classList.add("no-scroll");
}
