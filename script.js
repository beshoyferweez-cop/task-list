// Select DOM elements for task input and display container
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");
const addButton = document.querySelector("#push");

// Listen for "Enter" keypress event inside the input field
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createTask();
  }
});

// Bind click event listener on the "Add" button
addButton.onclick = function () {
  createTask();
};

// Main function to validate input and append new tasks to the list
function createTask() {
  // Input validation: Alert error message if field is blank or whitespace only
  if (taskInput.value.trim().length === 0) {
    alert("The task field is blank. Enter a task name and try again.");
    return;
  }

  // Insert new task markup dynamically into the task container
  taskSection.innerHTML += `
    <div class="task">
        <label>
            <input onclick="updateTask(this)" type="checkbox" id="check-task">
            <p>${taskInput.value.trim()}</p>
        </label>
        <div class="delete" onclick="deleteTask(this)">
            <i class="uil uil-trash"></i>
        </div>
    </div>`;

  // Clear input field automatically after successfully adding task
  taskInput.value = "";

  // Toggle scrollbar class if container height reaches 300px limit
  if (taskSection.offsetHeight >= 300) {
    taskSection.classList.add("overflow");
  } else {
    taskSection.classList.remove("overflow");
  }
}

// Function to handle completion state (adds/removes 'completed' CSS class)
function updateTask(checkbox) {
  const taskLabel = checkbox.parentElement;
  if (checkbox.checked) {
    taskLabel.classList.add("completed");
  } else {
    taskLabel.classList.remove("completed");
  }
}

// Function to handle removal of a task row when trash icon is clicked
function deleteTask(deleteBtn) {
  const taskItem = deleteBtn.parentElement;
  taskItem.remove();

  // Re-check overflow status after removing elements
  if (taskSection.offsetHeight < 300) {
    taskSection.classList.remove("overflow");
  }
}
