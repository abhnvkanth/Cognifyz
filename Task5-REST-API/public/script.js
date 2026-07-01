const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load Tasks
async function loadTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.innerHTML = `

            <span class="${task.completed ? "completed" : ""}">
                ${task.title}
            </span>

            <div class="task-buttons">

                <button
                    class="btn btn-success btn-sm"
                    onclick="toggleTask(${task.id})">

                    <i class="bi bi-check-lg"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteTask(${task.id})">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

// Add Task
addBtn.addEventListener("click", async () => {

    const title = taskInput.value.trim();

    if (title === "") {

        alert("Enter a task.");

        return;

    }

    await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title
        })

    });

    taskInput.value = "";

    loadTasks();

});

// Toggle Task
async function toggleTask(id) {

    await fetch(`/api/tasks/${id}`, {

        method: "PUT"

    });

    loadTasks();

}

// Delete Task
async function deleteTask(id) {

    await fetch(`/api/tasks/${id}`, {

        method: "DELETE"

    });

    loadTasks();

}

// Initial Load
loadTasks();