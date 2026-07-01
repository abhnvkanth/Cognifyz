const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const db = require("./database");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "skillhub_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);

// View Engine
app.set("view engine", "ejs");

// Home
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register", { message: "" });
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { message: "" });
});

// Dashboard
app.get("/dashboard", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("dashboard", {
        user: req.session.user
    });

});

// Register User
app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render("register", {
            message: "All fields are required"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hashedPassword],
        function (err) {

            if (err) {
                return res.render("register", {
                    message: "Email already exists"
                });
            }

            res.redirect("/login");

        }
    );

});

// Login User
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, user) => {

            if (!user) {
                return res.render("login", {
                    message: "Invalid credentials"
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.render("login", {
                    message: "Invalid credentials"
                });

            }

            req.session.user = user;

            res.redirect("/dashboard");

        }
    );

});

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});