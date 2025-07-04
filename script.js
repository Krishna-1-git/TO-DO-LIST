const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    if (task.completed) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

renderTasks();
