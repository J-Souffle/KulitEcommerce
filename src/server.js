const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const cors = require('cors');

dotenv.config();

// Initialize Stripe with your API key
const stripe = Stripe(process.env.SECRET_KEY);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: {
          token: token.id, // Use the token here
        },
      },
      description: 'Payment for products',
      confirm: true,
      return_url: 'http://localhost:3000/confirmation', // Set the return URL for redirection
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
