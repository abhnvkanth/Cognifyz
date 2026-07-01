function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let error = document.getElementById("error");

    error.innerHTML = "";

    if (name === "" || email === "" || age === "" || course === "" || phone === "") {
        error.innerHTML = "All fields are required.";
        return false;
    }

    if (age < 18) {
        error.innerHTML = "Age must be at least 18.";
        return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        error.innerHTML = "Enter a valid 10-digit phone number.";
        return false;
    }

    return true;
}