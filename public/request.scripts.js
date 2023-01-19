const requestForm = document.getElementById("requestForm");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const typeInput = document.getElementById("requestType");
const descInput = document.getElementById("requestTextarea");


requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const requestDetails = {
        address: requestForm.address.value,
        request_type: requestForm.requestType.value,
        description: requestForm.requestTextarea.value,
    };

    try {
        const data = await request(requestDetails);
        console.log(data);
        if(data) {
            alert('successfully added!');
        }
        else {
            console.log('here');
        }
    } catch (error) {
        console.log(error);
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

