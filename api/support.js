import mongoose from 'mongoose';
const supportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
});
const Support = mongoose.model('Support', supportSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
