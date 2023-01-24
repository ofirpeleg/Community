
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
                window.location.replace("/dashboard/list");

            } else if (data.message === 'Must be valid Email') {
                await swal("Oops!", "Invalid Email", "error");
            }
            else if (data.message === 'Wrong password'){
                await swal("Oops!", "Wrong password, try again!", "error");
            }
            else if (data.status !== 200 ){
                await swal("Oops!",  `${data.message}`, "error");
            }
        }
    } catch (error) {
        await swal("Oops!", `${error.message}`, "error");
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

