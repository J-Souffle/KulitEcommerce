import mongoose from 'mongoose';
const emailSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true } });
const Email = mongoose.model('Email', emailSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
