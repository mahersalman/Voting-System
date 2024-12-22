// Handle file upload and extract addresses
const fileUpload = document.getElementById('file-upload');

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                // Extract addresses from the file
                const addresses = e.target.result.split('\n')
                    .map(line => line.trim())
                    .filter(line => line);

                // Check each address for validity
                const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);
                let invalidAddresses = [];
                let validAddressCount = 0;

                addresses.forEach(address => {
                    if (isValidEthereumAddress(address)) {
                        validAddressCount++;
                    } else {
                        invalidAddresses.push(address);
                    }
                });

                // Show alert with results
                if (invalidAddresses.length > 0) {
                    alert(`Invalid Ethereum Addresses Detected\n`);
                } else {
                    alert(`All addresses are valid.\nTotal addresses: ${validAddressCount}`);
                }
            } catch (error) {
                alert('Error parsing file. Please ensure it is a valid text file.');
            }ß
        };
        reader.readAsText(file);
    }
});