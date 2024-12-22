const express = require('express');
const { connectToDatabase, getVoteList, getVoteData } = require('./database/db');
const { ObjectId } = require('mongodb');

const app = express();

// Serve static files
app.use(express.static('client/public'));

// Route to display votes dynamically
app.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const votes = await getVoteList(db);

        const rows = votes.map(vote => `
            <tr>
                <td title="${vote._id}">${vote._id.toString().slice(0, 2)}..${vote._id.toString().slice(-2)}</td>
                <td>${vote.Title}</td>
                <td>${vote.Status}</td>
                <td>${vote.startDate}</td>
                <td>${vote.endDate}</td>
                <td><a href="/vote/${vote._id}">OPEN</a></td>
            </tr>
        `).join('');

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Voting System</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <nav class="navbar">
                    <div class="navbar-title">
                        <h1>Voting System</h1>
                    </div>
                    <div class="navbar-right">
                        <button>Connect</button>
                    </div>
                </nav>
                <div class="container">
                    <h2>Votes List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Voting Subject</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    <button onclick="window.location.href='/new_vote';">Add New Vote</button>
                </div>
            </body>
            </html>`;
        res.send(html);
    } catch (error) {
        console.error("Error fetching votes:", error);
        res.status(500).send("Error generating votes list.");
    }
});

// Route to fetch vote details
app.get('/vote/:id', async (req, res) => {
    const voteId = req.params.id;

    if (!ObjectId.isValid(voteId)) {
        res.status(400).send("Invalid vote ID.");
        return;
    }

    try {
        const db = await connectToDatabase();
        const voteData = await getVoteData(db, voteId);

        if (!voteData) {
            res.status(404).send("Vote not found.");
            return;
        }

        const candidateOptions = voteData.candidates.map(candidate => `<option value="${candidate.name}">${candidate.name}</option>`).join('');
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Vote Details</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <nav class="navbar">
                    <div class="navbar-title">
                        <h1>Voting System</h1>
                    </div>
                    <div class="navbar-right">
                        <button>Connect</button>
                    </div>
                </nav>
                <div class="container">
                    <h2>Vote Details</h2>
                    <p><strong>Voting Subject:</strong> ${voteData.Title}</p>
                    <p><strong>Description:</strong> ${voteData.Description}</p>
                    <p><strong>Status:</strong> ${voteData.Status}</p>
                    <p><strong>Start Date:</strong> ${voteData.startDate}</p>
                    <p><strong>End Date:</strong> ${voteData.endDate}</p>
                    <form>
                        <label for="candidate">Select Candidate:</label>
                        <select id="candidate" name="candidate" required>
                            ${candidateOptions}
                        </select>
                        <button type="submit">Submit Vote</button>
                    </form>
                </div>
            </body>
            </html>`;
        res.send(html);
    } catch (error) {
        console.error("Error fetching vote:", error);
        res.status(500).send("Error generating vote details.");
    }
});

app.get('/new_vote',(req,res) => {
    res.sendFile(__dirname + '/new_vote.html');

})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});