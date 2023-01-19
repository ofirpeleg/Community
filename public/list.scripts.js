let getOpportunityBtn;

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
        alert('successful request assigment');
    }
}

getOpportunityBtn = document.getElementsByClassName('btn');
for(const element of getOpportunityBtn) {
    element.addEventListener('click', handleSign);
}
