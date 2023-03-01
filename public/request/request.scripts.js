const requestForm = document.getElementById("requestForm");
const logoutBtn = document.getElementById('logout');
const cancelBtn = document.getElementById('btnCancel');

const ifEmptyFields = async () => {

    if (requestForm.address.value.length === 0) {
        requestForm.address.value = requestForm.address.placeholder;
    };
}

requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await ifEmptyFields();
    const requestDetails = {
        address: requestForm.address.value,
        request_type: requestForm.type.value,
        description: requestForm.desc.value,
    };

    try {
        const data = await request(requestDetails);
        if (data) {
            await swal("Success", "New request has been listed!" , 'success');
            window.location.replace('/dashboard/my-requests');
        } else {
            await swal("Oops!", "Something went wrong, you should try again!", "error");
        }
    } catch (error) {
        await swal("Oops!", "Something went wrong, you should try again!", "error");
    }
});

const request = async (requestDetails) => {
    const response = await fetch("http://localhost:4000/request", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestDetails),
    })
    return response.json();
};

logoutBtn.addEventListener("click",async (e) => {
    try {
        console.log('logging out');
        await fetch('http://localhost:4000/auth/logout');
        window.location.replace("/");
    } catch (error) {
        console.log(error);
    }
});

cancelBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/");
});
