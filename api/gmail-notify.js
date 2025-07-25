export default async function handler(req, res) {
  try {
    const body = req.body;

    if (!body || !body.message || !body.message.data) {
      return res.status(400).json({ error: 'Missing message data' });
    }

    const decoded = JSON.parse(
      Buffer.from(body.message.data, 'base64').toString('utf-8')
    );

    const { emailAddress, historyId } = decoded;

    console.log('📩 Gmail notification received:', { emailAddress, historyId });

    // TODO: Fetch token by email from Supabase
    // TODO: Fetch new messages from Gmail using historyId
    // TODO: Save them to messages table in Supabase

    return res.status(200).send('OK');
  } catch (err) {
    console.error('❌ gmail-notify error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
