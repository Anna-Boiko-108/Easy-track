export default function render(task) {
  const taskModalHTML = `<article class="task-modal-card">
<p class="modal-task-id">${task.id}</p>
<h3 class="modal-task-name">${task.name}</h3>
<p class="modal-task-description">${task.description}</p>
<p class="modal-task-comment">${task.comment}</p>
<p class="modal-task-assignee">${task.assignee}</p>
<p class="modal-task-due-date">${task.dueDate}</p>
<span class="close" id="closeTaskModalBtn">&times;</span>
<div><div class="btn" id="modifyTaskBtn">
<a href="#task/${task.id}/modify">Редактировать</a></div>
<div class="btn"><a href="#task/${task.id}/archive">Архивировать</a></div></div>
</article>`;

  const modalSection = document.createElement("section");
  modalSection.classList.add("modal", "modal-active", "task-modal");
  modalSection.innerHTML = taskModalHTML;

  const main = document.getElementsByClassName("main")[0];
  main.appendChild(modalSection);
  document.body.classList.add("no-scroll");
}
