import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  if (typeof value === 'undefined') {
    return null;
  }

  const roundedValue = Math.round(value * 2) / 2; // Round the value to the nearest half

  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            roundedValue >= 1
              ? 'fas fa-star star-filled'
              : roundedValue >= 0.5
              ? 'fas fa-star-half-alt star-half'
              : 'far fa-star star-empty'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            roundedValue >= 2
              ? 'fas fa-star star-filled'
              : roundedValue >= 1.5
              ? 'fas fa-star-half-alt star-half'
              : 'far fa-star star-empty'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            roundedValue >= 3
              ? 'fas fa-star star-filled'
              : roundedValue >= 2.5
              ? 'fas fa-star-half-alt star-half'
              : 'far fa-star star-empty'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            roundedValue >= 4
              ? 'fas fa-star star-filled'
              : roundedValue >= 3.5
              ? 'fas fa-star-half-alt star-half'
              : 'far fa-star star-empty'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            roundedValue >= 5
              ? 'fas fa-star star-filled'
              : roundedValue >= 4.5
              ? 'fas fa-star-half-alt star-half'
              : 'far fa-star star-empty'
          }
        ></i>
      </span>
      {text && <span>{text}</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: 'dark',
};

Rating.propTypes = {
  value: PropTypes.number,
  // text: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;


