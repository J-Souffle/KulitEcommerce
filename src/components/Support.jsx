import React, { useState } from 'react';
import './Support.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kulit-backend.vercel.app/support', formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting support request:', error);
      setMessage("Failed to submit support request. Please try again later.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="support-container">
      <h1>Contact</h1>
      <p>
        Have Questions? <a href="mailto:kulitapparel@gmail.com">kulitapparel@gmail.com</a> or 240.601.5564 | Contact Hours 12pm - 9pm ET
      </p>
      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div class="message">
      {message && <p>{message}</p>}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Support;
