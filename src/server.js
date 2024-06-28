const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors'); // Add this line

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Use cors middleware

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    // Create a charge using Stripe
    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: 'Payment for products',
      payment_method: token.id,
      confirm: true,
    });

    // Handle successful payment
    console.log('Payment successful:', paymentIntent);
    res.json({ success: true });
  } catch (error) {
    // Handle payment failure
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});
