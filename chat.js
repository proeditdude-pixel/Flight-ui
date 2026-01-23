// api/chat.js
import OpenAI from 'openai';

// Connect to DeepSeek
const openai = new OpenAI({
  apiKey: process.env.sk-7bc1f0e60e1d4ff5928844dd2ea5a0f6, 
  baseURL: "https://api.deepseek.com", // Points to DeepSeek servers
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Send message to DeepSeek V3
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { 
          role: "system", 
          content: "You are the sophisticated cabin concierge of a flight. Keep answers brief (max 3 sentences), polite, and helpful." 
        },
        { role: "user", content: message },
      ],
    });

    // Send answer back to frontend
    const aiReply = completion.choices[0].message.content;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error("DeepSeek Error:", error);
    res.status(500).json({ reply: "I am currently offline (API Error)." });
  }
}
