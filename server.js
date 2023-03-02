// Require necessary libraries
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Set up OpenAI API key and engine ID
const apiKey = process.env.API_KEY;
console.log(apiKey);

// Set up Express app
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.json());

// Set up OpenAI API client
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle POST requests to the "/improve" endpoint
app.post('/improve', async (req, res) => {
    // Send input text to OpenAI API for processing
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        //prompt: "Correct this to standard English:\n\n" + req.body.text,
        prompt: "Correct this to standard English:\n\n" + req.body.text,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    // Extract the improved text from the API response
    let improvedText = response.data.choices[0].text.trim();
    // Send the improved text back to the client
    res.json({ improvedText });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});