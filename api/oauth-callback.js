export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.redirect("https://www.cresnd.com/chat/oauth-error?reason=missing_code");
  }

  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.redirect(`https://www.cresnd.com/chat/oauth-error?reason=${tokenData.error}`);
    }

    // ✅ Optional: Store tokenData.access_token and refresh_token in DB here

    // ✅ Redirect back to your frontend success screen
    return res.redirect("https://www.cresnd.com/chat/");
  } catch (err) {
    console.error("OAuth exchange failed:", err);
    return res.redirect("https://www.cresnd.com/chat/oauth-error?reason=exception");
  }