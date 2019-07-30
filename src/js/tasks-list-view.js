export default function beforeRender(data) {
  const list = data.filter(task => {
    return !task.archived;
  });
  render(list);
}

function render(data) {
  const list = data.reduce((acc, task) => {
    return (
      acc +
      `<article class="task">
<p class="task-id">${task.id}</p>
<h3 class="task-name">${task.name}</h3>
<p class="task-description">${task.description}</p>
<p class="task-comment">${task.comment}</p>
<p class="task-assignee">${task.assignee}</p>
<p class="task-due-date">${task.dueDate}</p>
</article>`
    );
  }, "");

  const main = document.getElementsByClassName("main")[0];
  main.innerHTML = list;
}
