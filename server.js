const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// ================================================================
// API ENDPOINTS
// ================================================================

app.post('/api/matchmaker', async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
    }

    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;
    if (!apiKey) {
        console.error("GEMINI_API_KEY environment variable is missing.");
        return res.status(500).json({ error: "Server configuration error: Missing API Key" });
    }

    try {
        // We use native fetch (available in Node.js 18+)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error(`Gemini API Error (${response.status}):`, errText);
            throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: error.message });
    }
});

// Fallback to index.html for single page app behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`ConnectGood backend is running on port ${PORT}`);
});
