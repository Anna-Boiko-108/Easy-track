export function initTaskModal() {
  // Close modal by clicking close button
  const closeModalBtn = document.getElementById("closeTaskModalBtn");
  closeModalBtn.addEventListener("click", hideTaskModal);

  // Close modal by clicking out of modal window
  const modalSection = document.querySelector(".task-modal");
  window.addEventListener("click", outOfModalClickHandler);
  function outOfModalClickHandler(event) {
    if (event.target == modalSection) {
      hideTaskModal(event);
    }
  }

  // Close modal by clicking modify button
  const modifyTaskBtn = document.getElementById("modifyTaskBtn");
  modifyTaskBtn.addEventListener("click", hideTaskModal);

  // Close modal by clicking archive button
  const archiveTaskBtn = document.getElementById("archiveTaskBtn");
  archiveTaskBtn.addEventListener("click", hideTaskModal);
}

// Close modal
function hideTaskModal(event) {
  const closeModalBtn = document.getElementById("closeTaskModalBtn");
  const archiveTaskBtn = document.getElementById("archiveTaskBtn");

  document.body.classList.remove("no-scroll");
  const modalSection = document.querySelector(".task-modal");
  modalSection.parentNode.removeChild(modalSection);

  const target = event.target;

  if (
    target == closeModalBtn ||
    target == modalSection ||
    target == archiveTaskBtn
  ) {
    setTimeout(() => {
      window.location.hash = "tasks-active";
    }, 1000);
  }
}
