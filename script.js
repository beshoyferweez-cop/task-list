const taskInput = document.querySelector("#task-input");
const taskSection = document.querySelector(".tasks");
const addButton = document.querySelector("#push");

const STORAGE_KEY = "ibm-task-list-v1";
let tasks = loadTasks();

addButton.addEventListener("click", createTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});

renderTasks();

function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  const values = new Uint32Array(2);
  crypto.getRandomValues(values);
  return `${Date.now()}-${values[0].toString(36)}-${values[1].toString(36)}`;
}

function createTask() {
  const text = taskInput.value.trim();

  if (!text) {
    alert("The task field is blank. Enter a task name and try again.");
    return;
  }

  tasks.push({
    id: createTaskId(),
    text: text,
    completed: false,
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

function renderTasks() {
  taskSection.replaceChildren();

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task";

    const label = document.createElement("label");
    label.classList.toggle("completed", task.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      label.classList.toggle("completed", task.completed);
    });

    const text = document.createElement("p");
    text.textContent = task.text;

    const deleteButton = document.createElement("div");
    deleteButton.className = "delete";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "uil uil-trash";
    deleteButton.append(deleteIcon);

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    label.append(checkbox, text);
    taskItem.append(label, deleteButton);
    taskSection.append(taskItem);
  });

  taskSection.classList.toggle("overflow", taskSection.scrollHeight > 300);
}
