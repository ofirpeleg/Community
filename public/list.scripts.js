let getOpportunityBtn;

//need to be changed dynamically
const assignOpportunity = async (requestId) => {
    const details = {
        assignTo: 'a',
        status:'active'
    };
    const result = await fetch(`http://localhost:4000/request/${requestId}`,{
        method:'put',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details)
    })
    return result.json();
}


const handleSign = async (e) => {
    e.preventDefault();
    const button = e.target;
    const requestId = button.value;
    console.log(requestId);
    const result = await assignOpportunity(requestId);
    //alert(requestId.value);
}

getOpportunityBtn = document.getElementsByClassName('btn');
for(const element of getOpportunityBtn) {
    element.addEventListener('click', handleSign);
}
