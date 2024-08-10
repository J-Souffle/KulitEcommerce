const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const cors = require('cors');
const mongoose = require('mongoose');

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
app.use(cors(corsOptions));

// Initialize Stripe with your API key
const stripe = Stripe(process.env.SECRET_KEY);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for storing emails
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Email = mongoose.model('Email', emailSchema);

// Payment route
app.post('/payment', async (req, res) => {
  const { token, amount } = req.body;

  console.log('Received payment request:', { token, amount }); // Log the received data

  try {
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
      return_url: 'http://localhost:3000/confirmation',
    });

    console.log('Payment successful:', paymentIntent); // Log payment success
    res.json({ success: true });
  } catch (error) {
    console.error('Error processing payment:', error); // Log payment failure
    res.status(500).json({ error: 'Payment failed', details: error.message });
  }
});

// Newsletter sign-up route
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Check if email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Create a new email document
    const newEmail = new Email({ email });
    await newEmail.save();
    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Error saving email' });
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
