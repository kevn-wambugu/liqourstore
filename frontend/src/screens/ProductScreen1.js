import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview} from '../actions/Productactions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/ProductConstants';
import Rating from '../components/Rating';
import ErrorBox from '../components/ErrorBox';
import LoadingBox from '../components/LoadingBox';


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const addToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };
  const dispatch = useDispatch();


const productReviewSave = useSelector((state) => state.productReviewSave);
  const { loading: loadingSaveReview, error: errorSaveReview, success: successSaveReview } = productReviewSave || {};  

  useEffect(() => {
    if (successSaveReview) {
      
      setRating('');
      alert('Review Submitted');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    } else {
      dispatch(detailsProduct(props.match.params.id));
    }
    return () => {
      //
    };
  }, [successSaveReview]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProductReview(props.match.params.id, {  rating }));
  };
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  return <div>
    <div className="back-to-result">
      <Link to="/">Back to result</Link>
    </div>
    {loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
        :( <div>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" ></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                <Link to={'/Category/' + product.category}>{product.category} </Link>
                </li>
                <li>
                  {product.brand} 
                </li>
                <li>
                   <b>Ksh {product.price}</b>
                </li>
                <li>
                  <div>
                  {product.description}
                  </div>
                </li>
                <li>
                  <div>{product.review}
                    </div>                  
                </li>
              
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price:KSH {product.price}
                </li>
                <li>
                  Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Quantity: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                    {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && <button onClick={addToCart} className="button primary" >Add to Cart</button>
                  }
                </li>
              </ul> 
            </div>
          </div>
          <div className="content-margined" >
          <h1>Review</h1>
          
          <ul className="review">
           
            <li>
              <h2>Rate Our Product</h2>
              {window.isAuth
                ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container" >
                      <li>
                        <label htmlFor="rating" style={{fontSize:'15px'}}> Rating</label>
                        <select required value={rating} name="rating" id="rating" style={{fontSize:'18px'}} onChange={(e) => setRating(e.target.value)}>
                          <option value="">Select</option>
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Excellent</option>
                        </select>
                      </li>
                      <li>
                        <button type="submit" className="button primary">Submit</button>
                      </li>
                    </ul>
                  </form>
                )
                : (
                  <div>
              Please
                    {' '}
                    <Link to="/signin">Signin</Link>
                    {' '}
              to write a review.
                  </div>

                ) }

            </li>
          </ul>
         </div>
         </div>
        )
    }
   
  </div>
}
export default ProductScreen;