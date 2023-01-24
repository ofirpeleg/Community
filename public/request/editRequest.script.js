const editForm = document.getElementById("editForm");
const editRequestBtn = document.getElementById('btn');
const cancelBtn = document.getElementById('btnCancel');
const logoutBtn = document.getElementById('logout');

const ifEmptyFields = async () => {

    if (editForm.type.value.length === 0) {
        editForm.type.value = editForm.type.placeholder;
    }

    if (editForm.desc.value.length === 0) {
        editForm.desc.value = editForm.desc.placeholder;
    }

};

editRequestBtn.addEventListener("click", async (e) => {
    e.preventDefault();
        await ifEmptyFields();
        const button = e.target;
        const requestId = button.value;
        const editDetails = {
            request_type: editForm.type.value,
            description: editForm.desc.value,
        };

        try {
            const data = await request(editDetails, requestId);
            if (data) {
                await swal("Success", " Request details have been updated!" , 'success');
            } else {
                await swal("Oops!", "Something went wrong, you should try again!", "error");
            }
        } catch (error) {
            await swal("Oops!", "Something went wrong, you try choose again!", "error");
        }
});

const request = async (requestDetails, requestId) => {
    const response = await fetch(`http://localhost:4000/request/${requestId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestDetails),
    })
    return response.json();
};

cancelBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/list");
});


logoutBtn.addEventListener("click",async (e) => {
    try {
        console.log('logging out');
        await fetch('http://localhost:4000/auth/logout');
        window.location.replace("/");
    } catch (error) {
        console.log(error);
    }
});

