// Netlify serverless function: create a Stripe Checkout Session.
// Reads the secret key from the STRIPE_SECRET_KEY environment variable
// (set this in Netlify > Site settings > Environment variables).
//
// Stripe Checkout is global-ready: it automatically supports cards and
// many local payment methods, multiple currencies, Apple Pay and Google Pay.

const Stripe = require("stripe");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Netlify." })
    };
  }

  const currency = process.env.STRIPE_CURRENCY || "usd";
  const stripe = Stripe(secret);

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const name = (payload.name || "Wellness Service").toString().slice(0, 120);
  const price = Number(payload.price);
  if (!price || price <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid price" }) };
  }

  const origin =
    (event.headers && (event.headers.origin || "https://" + event.headers.host)) || "";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { name: name },
            unit_amount: Math.round(price * 100)
          },
          quantity: 1
        }
      ],
      // Let Stripe collect the customer's country/billing for global support
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      success_url: origin + "/success/",
      cancel_url: origin + "/cancel/"
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Stripe error" })
    };
  }
};
