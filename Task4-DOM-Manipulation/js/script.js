const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const bio = document.getElementById("bio");
const registerForm = document.getElementById("registerForm");

const namePreview = document.getElementById("namePreview");
const emailMessage = document.getElementById("emailMessage");
const confirmMessage = document.getElementById("confirmMessage");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const charCount = document.getElementById("charCount");

const homePage = document.getElementById("homePage");
const successPage = document.getElementById("successPage");
const displayName = document.getElementById("displayName");
const backBtn = document.getElementById("backBtn");

const themeToggle = document.getElementById("themeToggle");

const togglePassword = document.getElementById("togglePassword");


// Live Name Preview

nameInput.addEventListener("input", () => {

    namePreview.innerHTML = "Hello, " + nameInput.value;

});


// Email Validation

emailInput.addEventListener("input", () => {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(emailInput.value)) {

        emailMessage.style.color = "green";
        emailMessage.innerHTML = "Valid Email";

    } else {

        emailMessage.style.color = "red";
        emailMessage.innerHTML = "Invalid Email";

    }

});


// Password Strength

passwordInput.addEventListener("input", () => {

    let password = passwordInput.value;

    let strength = 0;

    if (password.length >= 8)
        strength++;

    if (/[A-Z]/.test(password))
        strength++;

    if (/[0-9]/.test(password))
        strength++;

    if (/[^A-Za-z0-9]/.test(password))
        strength++;

    switch (strength) {

        case 1:

            strengthBar.style.width = "25%";
            strengthBar.style.background = "red";
            strengthText.innerHTML = "Weak";
            break;

        case 2:

            strengthBar.style.width = "50%";
            strengthBar.style.background = "orange";
            strengthText.innerHTML = "Medium";
            break;

        case 3:

            strengthBar.style.width = "75%";
            strengthBar.style.background = "#0ea5e9";
            strengthText.innerHTML = "Strong";
            break;

        case 4:

            strengthBar.style.width = "100%";
            strengthBar.style.background = "green";
            strengthText.innerHTML = "Very Strong";
            break;

        default:

            strengthBar.style.width = "0";
            strengthText.innerHTML = "";

    }

});


// Show / Hide Password

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";

    }

});


// Confirm Password

confirmPassword.addEventListener("input", () => {

    if (confirmPassword.value === passwordInput.value) {

        confirmMessage.style.color = "green";
        confirmMessage.innerHTML = "Passwords Match";

    } else {

        confirmMessage.style.color = "red";
        confirmMessage.innerHTML = "Passwords Do Not Match";

    }

});


// Character Counter

bio.addEventListener("input", () => {

    charCount.innerHTML = bio.value.length;

});


// Dark / Light Mode

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

});


// Form Submission

registerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (
        nameInput.value === "" ||
        emailInput.value === "" ||
        passwordInput.value === "" ||
        confirmPassword.value === "" ||
        document.getElementById("country").value === "" ||
        !document.getElementById("terms").checked
    ) {

        alert("Please complete all fields.");

        return;

    }

    if (passwordInput.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        return;

    }

    displayName.innerHTML = nameInput.value;

    homePage.classList.remove("active-page");

    successPage.classList.add("active-page");

});


// Back Button

backBtn.addEventListener("click", () => {

    registerForm.reset();

    charCount.innerHTML = 0;

    strengthBar.style.width = "0";

    strengthText.innerHTML = "";

    namePreview.innerHTML = "";

    emailMessage.innerHTML = "";

    confirmMessage.innerHTML = "";

    successPage.classList.remove("active-page");

    homePage.classList.add("active-page");

});