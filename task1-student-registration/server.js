const express = require("express");

const app = express();

const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files (CSS)
app.use(express.static("public"));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {

    const { name, email, age, course, phone } = req.body;

    res.render("success", {
        name,
        email,
        age,
        course,
        phone
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});