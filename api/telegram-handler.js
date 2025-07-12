const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN_CAP_MED;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID_CAP_MED;

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing TOKEN or ID in environment variables');
    return res.status(500).json({ error: 'Server configuration error: missing environment variables' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const text = `
📬 New Contact Message:
👤 Name: ${escapeHtml(name)}
📧 Email: ${escapeHtml(email)}
📞 Phone: ${escapeHtml(phone || "N/A")}
💬 Message:
${escapeHtml(message)}
`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramRes.ok) {
      const err = await telegramRes.json();
      console.error('Telegram API error:', err);
      return res.status(500).json({ error: 'Telegram failed to receive message' });
    }

    return res.status(200).json({ message: 'Message sent successfully to Telegram' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
