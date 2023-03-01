const editForm = document.getElementById("editForm");
const editProfileBtn = document.getElementById('btn');
const cancelBtn = document.getElementById('btnCancel');
const logoutBtn = document.getElementById('logout');

const ifEmptyFields = async () => {

    if (editForm.name.value.length === 0) {
        editForm.name.value = editForm.name.placeholder;
    }
    if (editForm.email.value.length === 0) {
        editForm.email.value = editForm.email.placeholder;
    }
    if (editForm.address.value.length === 0) {
        editForm.address.value = editForm.address.placeholder;
    }

    if (editForm.skills.value.length === 0) {
        editForm.skills.value = editForm.skills.placeholder;
    }
    if (editForm.phone.value.length === 0) {
        editForm.phone.value = editForm.phone.placeholder;
    }
};

editProfileBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await ifEmptyFields();
    const button = e.target;
    const userId = button.value;

        const editDetails = {
            full_name: editForm.name.value,
            skills: editForm.skills.value,
            address: editForm.address.value,
            email: editForm.email.value,
            phone_number: editForm.phone.value,
        };


        try {
            const data = await update(editDetails, userId);
            if (data.user) {
                await swal("Success", "Profile has been updated!", 'success');
            } else {
                await swal("Oops!", `${data.message}`, "error");
            }
        } catch (error) {
            await swal("Oops!", "Something went wrong, you should try again!", "error");
        }
});

const update = async (editDetails, userId) => {
    const response = await fetch(`http://localhost:4000/user/${userId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editDetails),
    })
    return response.json();
};

cancelBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/");
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



