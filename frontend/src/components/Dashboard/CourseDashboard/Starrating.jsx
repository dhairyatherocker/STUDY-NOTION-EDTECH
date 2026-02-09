import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  maxStars = 5,
  editable = true,
  starSize = '30px',
  activeColor = '#ffcc00',
  inactiveColor = '#ccc'
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating) => {
    if (editable && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleMouseEnter = (hoveredRating) => {
    if (editable) {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="star-rating" style={{ display: 'inline-block' }}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <span
            key={starValue}
            style={{
              cursor: editable ? 'pointer' : 'default',
              fontSize: starSize,
              color: isActive ? activeColor : inactiveColor,
              padding: '0 5px',
            }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            role="button"
            aria-label={`Rate ${starValue} out of ${maxStars}`}
            tabIndex={editable ? 0 : -1}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onRatingChange: PropTypes.func,
  maxStars: PropTypes.number,
  editable: PropTypes.bool,
  starSize: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

export default StarRating;