import React, { useEffect, useState } from 'react';

function TrustpilotReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('https://api.trustpilot.com/v1/business-units/YOUR_BUSINESS_UNIT_ID/reviews', {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`
        }
      });
      const data = await response.json();
      setReviews(data.reviews);
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h4>{review.title}</h4>
          <p>{review.text}</p>
          <p>Rating: {review.stars}</p>
        </div>
      ))}
    </div>
  );
}

export default TrustpilotReviews;
