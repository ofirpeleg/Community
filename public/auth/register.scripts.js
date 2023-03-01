
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInfo = {
        full_name: registerForm.full_name.value,
        email: registerForm.email.value,
        password: registerForm.password.value,
        phone_number: registerForm.phone.value,
        address: registerForm.address.value,
        skills: registerForm.skills.value,
    };

    try {
            const data = await register(userInfo);
            if(data.message === 'success') {
                await swal("Success",`${data.user.addedUser.full_name}, welcome to our community!` , 'success');
            }
            else {
                await swal("Oops!", `${data.message} , Please try again!` , "error");
            }
    } catch (error) {
        await swal("Oops!", 'Something went wrong.. Please try again!' , "error");
    }
});


const register = async (userInfo) => {
    const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
        //redirect: "follow",
    })
    return response.json();
};
