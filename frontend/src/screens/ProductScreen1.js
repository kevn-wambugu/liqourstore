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
  const { loading, error, product } = productDetails || {};



  return<section className="ftco-section">
    {loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
    :(
  <div className="container"> 

    <div className="row">
      <div className="col-lg-6 mb-5 ftco-animate-visible">
        <a href=" #"className="image-popup prod-img-bg"><img src={product.image}  className="img-fluid" alt="Colorlib Template"/></a>
      </div>
      <div className="col-lg-6 product-details pl-md-5 ftco-animate-visible">
      <h3>{product.name}</h3>
        <div className="rating d-flex">
          <p className="text-left mr-4">
    <a href="#" className="mr-2">{product.review}</a>
            <a href="#"><span className="fa fa-star"></span></a>
            <a href="#"><span className="fa fa-star"></span></a>
            <a href="#"><span className="fa fa-star"></span></a>
            <a href="#"><span className="fa fa-star"></span></a>
            <a href="#"><span className="fa fa-star"></span></a>
          </p>
          <p className="text-left mr-4">
            <a href="#" className="mr-2" style={{color: '#000'}}>100 <span style={{color: '#bbb'}}>Rating</span></a>
          </p>
          <p className="text-left">
            <a href="#" className="mr-2" style={{color: '#000'}}>500 <span style={{color: '#bbb'}}>Sold</span></a>
          </p>
        </div>
    <p className="price"><span>KSH {product.price}</span></p>
        <p>Alchemis Liqours Bring ease and convenience of buying and ordering alcohol delivery Thika. </p>
        <p>We got you covered. Your {product.name} is a dial away, Dial a drink and enjoy.
        </p>
        <div className="row mt-4">
          <div className="input-group col-md-6 d-flex mb-3">
             <span className="input-group-btn mr-2">
                <button type="button" className="quantity-left-minus btn"  data-type="minus" data-field="">
                 <i className="fa fa-minus"></i>
                </button>
              </span>
             <input type="text" id="quantity" name="quantity" className="quantity form-control input-number"  value={qty} onChange={(e) => { setQty(e.target.value) }} min="1" max="100" />
             <span className="input-group-btn ml-2">
                <button type="button" className="quantity-right-plus btn" data-type="plus" data-field="">
                   <i className="fa fa-plus"></i>
               </button>
             </span>
          </div>
          <div className="w-100"></div>
          <div className="col-md-12">
    <p style={{color: '#bbb'}}>{product.countInStock}</p>
          </div>
        </div>
    <p>{product.countInStock > 0 && <button type="submit" className="btn btn-primary py-3 px-5 mr-2" onClick={addToCart} >Add to Cart</button>}</p>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-12 nav-link-wrap">
        <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="nav-link ftco-animate-visible active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>

          <a className="nav-link ftco-animate-visible mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>

          <a className="nav-link ftco-animate-visible" id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>

        </div>
      </div>
      <div className="col-md-12 tab-wrap">
        
        <div className="tab-content bg-light" id="v-pills-tabContent">

          <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
            <div className="p-4">
    <h3 className="mb-4">{product.name}</h3>
    <p>{product.description}</p>
            </div>
          </div>

          <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
            <div className="p-4">
              <h3 className="mb-4">Manufactured By Liquor Store</h3>
              <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
           
          </div>
        </div>
      </div>
    </div>
  </div>)
  
}
</section>
 


  
}
export default ProductScreen;