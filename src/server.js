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
  origin: 'https://kulit.us',
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

// Define a schema and model for storing support form submissions
const supportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
});

const Support = mongoose.model('Support', supportSchema);

// Utility function to generate a random 6-digit number
const generateOrderNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Payment route
app.post('/payment', async (req, res) => {
  const { token, amount, cartItems } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart items are required' });
  }

  console.log('Received payment request:', { token, amount, cartItems });

  const orderNumber = generateOrderNumber();
  const productDescriptions = `Order Number: ${orderNumber} | ${cartItems.map(item => `Description: ${item.description} | Size: ${item.size} | Quantity: ${item.quantity} | Price: $${item.price}`).join(', ')}`;

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
      description: productDescriptions,
      confirm: true,
      return_url: 'http://kulit.us/confirmation',
    });

    console.log('Payment successful:', paymentIntent);
    res.json({
      success: true,
      orderNumber, // Ensure orderNumber is sent in the response
    });
  } catch (error) {
    console.error('Error processing payment:', error);
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
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const newEmail = new Email({ email });
    await newEmail.save();
    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Error saving email' });
  }
});

// Support form submission route
app.post('/support', async (req, res) => {
  const { name, email, phone, comment } = req.body;

  if (!name || !email || !phone || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newSupport = new Support({ name, email, phone, comment });
    await newSupport.save();
    return res.status(200).json({ success: true, message: 'Support request submitted successfully' });
  } catch (error) {
    console.error('Error saving support request:', error);
    res.status(500).json({ error: 'Error saving support request' });
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
