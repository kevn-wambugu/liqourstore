import React from 'react';

export default function Rating(product) {
  return (
    <div className="rating">
      <span className={product.value >= 1 ? 'active' : ''}>&#9734;</span>
      <span className={product.value >= 2 ? 'active' : ''}>&#9734;</span>
      <span className={product.value >= 3 ? 'active' : ''}>&#9734;</span>
      <span className={product.value >= 4 ? 'active' : ''}>&#9734;</span>
      <span className={product.value >= 5 ? 'active' : ''}>&#9734;</span>
    </div>
  );
}
