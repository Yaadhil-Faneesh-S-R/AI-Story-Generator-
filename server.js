const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { moral } = req.body;

  const prompt = `Write a short creative story based on the moral: "${moral}". End the story clearly.`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt,
        stream: false
      })
    });

    const data = await response.json();
    res.json({ story: data.response });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Mistral Story server running at http://localhost:${PORT}`);
});
