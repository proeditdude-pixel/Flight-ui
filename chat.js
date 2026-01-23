import OpenAI from 'openai';

// ⚠️ SECURITY WARNING: 
// Ideally, use process.env.DEEPSEEK_API_KEY and set it in your Vercel/Netlify settings.
// For now, to make it work, wrap the key in quotes:

const openai = new OpenAI({
  apiKey: "sk-7bc1f0e60e1d4ff5928844dd2ea5a0f6", // <--- MUST HAVE QUOTES ""
  baseURL: "https://api.deepseek.com",
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { 
          role: "system", 
          content: "You are an airline concierge. Keep answers short (max 2 sentences) and professional." 
        },
        { role: "user", content: message },
      ],
    });

    const aiReply = completion.choices[0].message.content;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error("DeepSeek Error:", error);
    res.status(500).json({ reply: "Service currently unavailable." });
  }
}
