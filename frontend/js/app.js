const DEMO_USERS = [
    {
        email: "admin@school.com",
        password: "admin123",
        role: "admin",
        name: "School Administrator"
    },

    {
        email: "teacher@school.com",
        password: "teacher123",
        role: "teacher",
        name: "Class Teacher"
    },

    {
        email: "parent@school.com",
        password: "parent123",
        role: "parent",
        name: "Student Parent"
    }
];


document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }

});


function handleLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById("email")
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById("password")
        .value;


    const message =
        document.getElementById("loginMessage");


    const user =
        DEMO_USERS.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        message.textContent =
            "Invalid email or password.";

        return;

    }


    sessionStorage.setItem(
        "schoolUser",
        JSON.stringify({
            email: user.email,
            role: user.role,
            name: user.name
        })
    );


    if (user.role === "admin") {

        window.location.href =
            "admin.html";

    }

    else if (user.role === "teacher") {

        window.location.href =
            "teacher.html";

    }

    else if (user.role === "parent") {

        window.location.href =
            "parent.html";

    }

}


function getCurrentUser() {

    const data =
        sessionStorage.getItem(
            "schoolUser"
        );


    if (!data) {

        return null;

    }


    try {

        return JSON.parse(data);

    }

    catch {

        sessionStorage.removeItem(
            "schoolUser"
        );

        return null;

    }

}


function protectPage(requiredRole) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    if (user.role !== requiredRole) {

        window.location.href =
            "login.html";

    }

}


function logout() {

    sessionStorage.removeItem(
        "schoolUser"
    );

    window.location.href =
        "login.html";

}


function setUserName(elementId) {

    const user =
        getCurrentUser();


    const element =
        document.getElementById(
            elementId
        );


    if (user && element) {

        element.textContent =
            user.name;

    }

}