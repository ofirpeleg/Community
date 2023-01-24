let getOpportunityBtn;
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

const assignOpportunity = async (requestId) => {
    const result = await fetch(`http://localhost:4000/request/${requestId}`,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
    })
    return result;
};

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

const handleSign = async (e) => {
    e.preventDefault();
    const button = e.target;
    const requestId = button.value;
    console.log(requestId);
    const result = await assignOpportunity(requestId);
    if(result.status === 200) {
        await swal("Success", "thanks for Volunteering!" , 'success');
    }
}

getOpportunityBtn = document.getElementsByClassName('btn');
for(const element of getOpportunityBtn) {
    element.addEventListener('click', handleSign);
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

