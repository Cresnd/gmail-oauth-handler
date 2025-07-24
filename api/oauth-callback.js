export default async function handler(req, res) {
  const supabaseCallbackUrl = `https://kowdznksjmbnykrtqbdb.supabase.co/functions/v1/oauth-callback${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;

  const response = await fetch(supabaseCallbackUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method === 'GET' ? undefined : req.body,
  });

  const text = await response.text();

  res.status(response.status).send(text);
}