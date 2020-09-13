import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = (props) => (
  <li>
    <div className="products">
      <div className="product-image">
        <Link to={`/product/${props._id}`}>
          <img src={props.image} alt="images" />
        </Link>
      </div>
      <div className="product-name">
        <Link
          to={`/product/${props._id}`}
        >
          {props.name}
        </Link>
      </div>
      <div className="product-price">
        KSH
        {props.price}
      </div>
      <div className="product-rating">
        <Rating value={product.rating} />
        (
        {product.numReviews}
        {' '}
        Reviews)

      </div>
      <div className="product-buy">
        <Link to={'/product/' + props._id}>BUY NOW <i className="fas fa-cart-arrow-down fa-2x"></i></Link>
      </div>
    </div>
  </li>
);
export default Product;
