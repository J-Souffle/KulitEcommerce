import React, { useState } from 'react';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const textResponse = await response.text(); // Get response as text
      console.log('Raw server response:', textResponse); // Log raw response
  
      try {
        const data = JSON.parse(textResponse); // Try parsing the response as JSON
  
        if (response.ok) {
          setMessage('Thank you for subscribing!');
          setMessageType('success');
          setEmail('');
        } else {
          setMessage(data.error || 'There was an issue with your subscription. Please try again.');
          setMessageType('error');
          console.error('Error response:', data);
        }
      } catch (jsonError) {
        console.error('JSON Parsing Error:', jsonError);
        setMessage('There was an error with the server response.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('There was an error. Please try again.');
      setMessageType('error');
    }
  };
  
  return (
    <div className="news">
      <div className="news-text">
        <h2>Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && (
          <p className={`newsletter-message ${messageType}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
