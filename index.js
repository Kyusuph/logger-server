const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


async function forwardIndividualRequest(req, res, next) {

  const data = {body: req.body, auth: req.headers.authorization, time: new Date().toISOString()};
  const phone = req.body.phone;

    try {
        // Append data to a file
        // await fs.appendFile(`data.json`, JSON.stringify(data) + '\n');
        await fs.appendFile(`data/${phone}.json`, JSON.stringify(data) + '\n');
        console.log('Data written to file successfully');
        res.status(200).send('Data written to file successfully');
    } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Error writing to file');
    }
    }

// Route to handle incoming requests
app.post('/households', forwardIndividualRequest);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});