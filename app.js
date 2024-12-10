document.addEventListener("DOMContentLoaded", function () {
    let votesForMow = 0;
    let votesForJane = 0;
    let hasVoted = false;
    let full_name = '';
    let ID = '';

    // Always show the exit button initially
    document.getElementById('back').classList.remove('hidden'); // Ensure exit button is visible

    // Registration Section
    document.getElementById('registerButton').addEventListener('click', function () {
        // Redirect to table.html
        window.location.href = 'table.html';
        document.getElementById('container').classList.add('hidden');

    });

    // Voting Section
    document.getElementById('voteButton').addEventListener('click', function () {
        handleVote('Mow');
    });

    document.getElementById('voteButton2').addEventListener('click', function () {
        handleVote('Jane');
    });

    // Handle the voting logic
    function handleVote(candidate) {
        if (hasVoted) {
            swal("Oops!", "You've already voted!", "warning");
        } else {
            if (candidate === 'Mow') {
                votesForMow++;
            } else if (candidate === 'Jane') {
                votesForJane++;
            }
            hasVoted = true;
            showThankYouModal(); // Show Thank You Modal
        }
    }

    // Thank You Modal
    function showThankYouModal() {
        swal({
            title: `Thank you, ${full_name}!`,
            text: "Your vote has been recorded.",
            icon: "success",
            button: "Close",
        });
    }

    // Show Vote Results
    function showResults() {
        document.getElementById('votingSection').classList.add('hidden'); // Hide voting section
        const resultSection = document.getElementById('resultSection');
        resultSection.classList.remove('hidden'); // Show result section

        const resultMessage = document.getElementById('resultMessage');
        resultMessage.textContent = `Results: Mow (${votesForMow}) vs Jane (${votesForJane})`;
    }

    // Exit Section - This is where the exit functionality works
    document.getElementById('exit').addEventListener('click', function () {
        // Hide voting section, result section, and back section, show registration section
        document.getElementById('votingSection').classList.add('hidden');
        document.getElementById('resultSection').classList.add('hidden');
        document.getElementById('registrationSection').classList.remove('hidden');
    });

    function goBack() {
        window.history.back();
    }
});
