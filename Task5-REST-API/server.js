const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Temporary storage
let tasks = [
    {
        id: 1,
        title: "Learn Express",
        completed: false
    },
    {
        id: 2,
        title: "Build REST API",
        completed: true
    }
];

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: Date.now(),
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = !task.completed;

    res.json(task);

});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    tasks = tasks.filter(t => t.id !== id);

    res.json({
        message: "Task deleted"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});