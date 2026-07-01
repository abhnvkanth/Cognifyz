const express = require("express");

const app = express();
const PORT = 3000;

// Temporary server-side storage
const students = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {

    const { name, email, age, course, phone } = req.body;

    // Server-side validation
    if (!name || !email || !age || !course || !phone) {
        return res.send("All fields are required!");
    }

    if (age < 18) {
        return res.send("Age must be at least 18.");
    }

    if (phone.length !== 10) {
        return res.send("Phone number must contain exactly 10 digits.");
    }

    // Store data temporarily
    students.push({
        name,
        email,
        age,
        course,
        phone
    });

    res.render("success", {
        student: {
            name,
            email,
            age,
            course,
            phone
        }
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});