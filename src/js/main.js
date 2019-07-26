// document.addEventListener("DOMContentLoaded", init);
import DB from "./db.js";
import TasksList from "./tasks-list.js";
import Task from "./task.js";
import "./add-task.js";

const db = new DB();
const tasksList = new TasksList(db);

// Main save task logic
export function saveTask(data) {
  const task = new Task(data);

  tasksList.add(task);
  db.update(tasksList);
  //   PhonebookView.drawTable(phonebook);
}

// if (phonebook.isEmpty) {
//   saveContact("Андрій", "8 099 6667778", "as@example.com");
//   saveContact("Андрій 2", "089 4433444", "as@example.com");
//   saveContact("Олег", "+38 (077) 777-7-777", "abc7@google.com");
// }

// function addEventListeners() {

// Delete contact listener
//   const table = document.getElementById("contacts-table");
//   table.addEventListener("click", handleTableClick);
// }

// Delete contact handler
// function handleTableClick(event) {
//     if (event.target.id !== "trash-btn") {
//       return;
//     }
//     const deleteId = PhonebookView.getDataOnClick(event);
//     PhonebookView.hideContact(event.target.parentNode.parentNode);
//     setTimeout(deleteContact, 300, deleteId);
//   }

//   // Main delete contact logic
// function deleteContact(contactId) {
//     phonebook.remove(contactId);
//     db.update(phonebook);
//     PhonebookView.drawTable(phonebook);
//   }
