import React from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = ({ imageUrl, title, description }) => {
  return (
    <div className="banner">
      <img src={imageUrl} alt="Banner" className="banner-image" />
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Banner;