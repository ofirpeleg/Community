const checkedBox = document.getElementById('flexCheckChecked');
const requestBtn = document.getElementById('request');
const profileBtn = document.getElementById('profile');
const volunteerBtn = document.getElementById('volunteer');
const logoutBtn = document.getElementById('logout');

window.onload = async () => {
    const toNotify = await notify();
    const requestsLength = toNotify.requests.requests.length;
    if(toNotify.message === 'found' && requestsLength > 0) {
        await swal("It's a match! " ,
            "go check your New active requests!" , 'info');
        await updateMany();
    };
}


const notify = async () => {
    const list = await fetch('http://localhost:4000/request/notify',{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
        },
    })
    return list.json();
};

const updateMany = async () => {
    const updated = await fetch('http://localhost:4000/request/update-many',{
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
    })
    return updated.json();
};


if(checkedBox) {

    checkedBox.addEventListener("click", async (e) => {
        const button = e.target;
        const requestId = button.value;
        console.log(requestId);
        const editDetails = {
            status: 'completed',
        };
        try {
            const data = await complete(editDetails, requestId);
            if (data) {
                await swal("Success", "Thanks!", 'success');
                window.location.reload();
            } else {
                await swal("Oops!", "Something went wrong, you should try again!", "error");
            }
        } catch (error) {
            await swal("Oops!", "Something went wrong, you try choose again!", "error");
        }
    });
};

const complete = async (requestDetails, requestId) => {
    const response = await fetch(`http://localhost:4000/request/${requestId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestDetails),
    })
    return response.json();
};

requestBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/request");
});

volunteerBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/list");
});

profileBtn.addEventListener("click", async (e) => {
    window.location.replace("/dashboard/edit-profile");
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




