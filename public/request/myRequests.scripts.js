let editBtn;
let deleteBtn;
const logoutBtn = document.getElementById('logout');

const handleEdit = async (e) => {
    const button = e.target;
    const requestId = button.value;
    window.location.replace(`edit-request/${requestId}`);
};

const handleDelete = async (e) => {
    const button = e.target;
    const requestId = button.value;
    const deleteDetails = {
        status: 'closed'
    };
    try {
        const data = await deleteRequest(deleteDetails, requestId);
        if (data) {
            await swal("Success", "The request has been deleted" , 'success');
            window.location.reload();
        } else {
            await swal("Oops!", "Something went wrong, you should try again!", "error");
        }
    } catch (error) {
        await swal("Oops!", "Something went wrong, you should try again!", "error");
    }
};


const deleteRequest = async (deleteDetails , requestId) => {
    const response = await fetch(`http://localhost:4000/request/${requestId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteDetails),
    })
    return response.json();
};


editBtn = document.getElementsByName('editBtn');
for(const element of editBtn) {
    element.addEventListener('click', handleEdit);
}


deleteBtn = document.getElementsByName('deleteBtn');
for(const element of deleteBtn) {
    element.addEventListener('click', handleDelete);
}

logoutBtn.addEventListener("click",async (e) => {
    try {
        console.log('logging out');
        await fetch('http://localhost:4000/auth/logout');
        window.location.replace("/");
    } catch (error) {
        console.log(error);
    }
});

