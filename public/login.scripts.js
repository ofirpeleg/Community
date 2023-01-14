
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userInfo = {
        email: loginForm.email.value,
        password: loginForm.password.value,
    };

    try {
        if (userInfo.email && userInfo.password) {
            const data = await login(userInfo);
            if(data.message === 'success') {
                console.log(data.jwtToken);
                window.location.replace("/request");
            }
            else {
                alert(data.message)
            }
        } else {
            alert("invalid email or password");
        }
    } catch (error) {

    }
});


const login = async (userInfo) => {
    const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
    return response.json();
};

