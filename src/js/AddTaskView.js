const addTaskBtn = document.getElementById("addTask");
const closeModalBtn = document.getElementById("closeModalBtn");

addTaskBtn.addEventListener("click", showAddTaskModal);
closeModalBtn.addEventListener("click", hideAddTaskModal);

// Show modal
function showAddTaskModal() {
  document.body.classList.add("no-scroll");
  const addTaskModal = document.getElementById("addTaskModal");
  addTaskModal.classList.add("modal-active");

  // Hide modal on click outside the modal
  window.addEventListener("click", outOfModalClickHandler);
  function outOfModalClickHandler(event) {
    if (event.target == addTaskModal) {
      hideAddTaskModal();
    }
  }
}

// Hide modal
function hideAddTaskModal() {
  document.body.classList.remove("no-scroll");
  const addTaskModal = document.getElementById("addTaskModal");
  addTaskModal.classList.remove("modal-active");
}
