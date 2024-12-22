
// Handle file upload and extract addresses
const fileUpload = document.getElementById('file-upload');
let addresses = []; // Store valid addresses

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                // Extract addresses from the file
                const lines = e.target.result.split('\n')
                    .map(line => line.trim())
                    .filter(line => line);

                // Check each address for validity
                const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);
                let invalidAddresses = [];
                addresses = []; // Reset addresses

                lines.forEach(address => {
                    if (isValidEthereumAddress(address)) {
                        addresses.push(address);
                    } else {
                        invalidAddresses.push(address);
                    }
                });

                // Show alert with results
                if (invalidAddresses.length > 0) {
                    alert(`Invalid Ethereum Addresses Detected:\n${invalidAddresses.join('\n')}`);
                } else {
                    alert(`All addresses are valid.\nTotal addresses: ${addresses.length}`);
                }
            } catch (error) {
                alert('Error parsing file. Please ensure it is a valid text file.');
            }
        };
        reader.readAsText(file);
    }
});


document.getElementById('new-vote-form').addEventListener('submit', (event) =>{
    event.preventDefault();

    const title = document.getElementById('title').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;
    const candidates = document.getElementById('candidates').value.split(',')
        .map(candidate => candidate.trim())
        .filter(candidate => candidate);
    
    const voteData = {
        'Title' : title,
        'Status' : 'Upcoming',
        'startDate' : start_date,
        'endDate' : end_date,
        'Description' : description,
        'Candidates' : candidates,
        'Voters' : addresses
    }
    console.log(voteData);
    //send json to server
    fetch('/new-vote',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(voteData),
    })
    .then(response => {
        if (response.ok) {
            alert('Vote created successfully.');
            window.location.href = '/';
        }else{
            alert('Error creating vote.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting vote. Please try again.');
    });
});