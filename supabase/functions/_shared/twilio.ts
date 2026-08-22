// Called via raw fetch (Basic Auth) rather than the Twilio Node SDK, to
// avoid Node-only dependency friction in the Deno edge runtime.
export async function sendSms(to: string, body: string): Promise<void> {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error("Twilio secrets not configured (TWILIO_ACCOUNT_SID/AUTH_TOKEN/FROM_NUMBER)");
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = btoa(`${accountSid}:${authToken}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: fromNumber, Body: body }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio send failed (${res.status}): ${text}`);
  }
}
