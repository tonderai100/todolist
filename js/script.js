// Define an array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Filter tasks based on priority selection
    const priorityFilter = document.getElementById("priorityFilter").value;
    const filteredTasks = tasks.filter((task) =>
        priorityFilter === "all" ? true : task.priority === priorityFilter
    );

    filteredTasks.sort((a, b) => {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = `collection-item ${task.priority}-priority`;

        listItem.innerHTML = `
      <span>${task.emoji} ${task.text}</span>
      <div class="actions">
        <button class="waves-effect waves-light btn" onclick="toggleCompletion(${index})">${
            task.completed ? "Undo" : "Complete"
        }</button>
        <button class="waves-effect waves-light btn" onclick="editTask(${index})">Edit</button>
        <button class="waves-effect waves-light btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

        taskList.appendChild(listItem);
    });
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task");
    const prioritySelect = document.getElementById("priority");

    const taskText = taskInput.value;
    const priorityValue = prioritySelect.value;

    if (taskText.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let emoji = "😐";
    if (priorityValue === "medium") {
        emoji = "😃";
    } else if (priorityValue === "high") {
        emoji = "😲";
    }

    // Create a task object
    const newTask = {
        text: taskText,
        priority: priorityValue,
        emoji: emoji,
        completed: false,
    };

    // Add the task to the array
    tasks.push(newTask);

    // Clear input fields
    taskInput.value = "";
    prioritySelect.selectedIndex = 0;

    // Render the updated task list
    renderTasks();

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to edit a task
function editTask(index) {
    const updatedTaskText = prompt("Edit task:", tasks[index].text);

    if (updatedTaskText !== null) {
        tasks[index].text = updatedTaskText;
        renderTasks();

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Initialize Materialize select elements
document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll("select");
    const instances = M.FormSelect.init(elems);
});

// Initial render of tasks and load from local storage
renderTasks();
loadTasks();
