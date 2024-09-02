import Stripe from 'stripe';
const stripe = Stripe(process.env.SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, amount, cartItems } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_data: {
          type: 'card',
          card: {
            token: token.id,
          },
        },
        confirm: true,
        return_url: 'https://www.kulit.us/confirmation',
      });

      res.status(200).json({ success: true, orderNumber: generateOrderNumber() });
    } catch (error) {
      res.status(500).json({ error: 'Payment failed', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateOrderNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
