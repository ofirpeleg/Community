let getOpportunityBtn;
const logoutBtn = document.getElementById('logout');


const assignOpportunity = async (requestId) => {
    const result = await fetch(`http://localhost:4000/request/${requestId}`,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
    })
    return result;
};

const handleSign = async (e) => {
    e.preventDefault();
    const button = e.target;
    const requestId = button.value;
    console.log(requestId);
    const result = await assignOpportunity(requestId);
    if(result.status === 200) {
        await swal("Success", "thanks for Volunteering!" , 'success');
        window.location.reload();
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

