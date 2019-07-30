const main = document.getElementsByClassName("main")[0];
main.addEventListener("click", taskClickHandler);

function taskClickHandler(event) {
  // Find task's id node
  let target = event.target;
  let fired = false;

  while (target.className != "main") {
    if (target.className == "task") {
      fired = true;
      break;
    }
    target = target.parentNode;
  }

  if (!fired) return;

  // Find task's id value
  const listOfTaskNodes = Array.from(target.children);
  const taskId = listOfTaskNodes.find(node => {
    return node.classList.contains("task-id");
  }).innerText;

  //   Change hash
  window.location.hash = "task/" + taskId;
}

export function initTaskModal() {
  // Close modal by clicking close button
  const closeModalBtn = document.getElementById("closeTaskModalBtn");
  closeModalBtn.addEventListener("click", hideTaskModal);

  // Close modal by clicking out of modal window
  const modalSection = document.querySelector(".task-modal");
  window.addEventListener("click", outOfModalClickHandler);
  function outOfModalClickHandler(event) {
    if (event.target == modalSection) {
      hideTaskModal();
    }
  }

  // Close modal by clicking modify button
  const modifyTaskBtn = document.getElementById("modifyTaskBtn");
  modifyTaskBtn.addEventListener("click", hideTaskModal);
}

// Close modal
function hideTaskModal() {
  document.body.classList.remove("no-scroll");
  const modalSection = document.querySelector(".task-modal");
  modalSection.parentNode.removeChild(modalSection);
  // window.history.back();
}
