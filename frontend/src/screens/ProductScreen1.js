import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/Productactions';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { products} = productList;


  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }

  return <div>
    <div className="back-to-result">
      <Link to="/">Back to result</Link>
    </div>
    {loading ? <div>Loading...</div> :
      error ? <div>{error} </div> :
        (
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
                  <div id="share-buttons">
                    <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://alchemisliqorstore.co.ke">
                      <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
                    </a>
                    <a href="http://www.facebook.com/sharer.php?u=https://alchemisliqorstore.co.ke" target="_blank">
                      <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com/share?url=https://alchemisliqorstore.co.ke&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">
                     <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
                    </a>
                    <a href="https://plus.google.com/share?url=https://alchemisliqorstore.co.ke" target="_blank">
                      <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
                    </a>
                    <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://alchemisliqorstore.co.ke" target="_blank">
                      <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
                    </a>
                  </div>
                </li>
                <li>
                  <div>{product.review}
                    </div>                  
                </li>
                <li>
                  <p className="comment-form-comment">
                  <label  for="comment"></label>
                  <textarea id="comment" name="comment" cols="45" rows="8" ></textarea>
                  </p>
                </li>
                
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price:KSh {product.price}
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
                  {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        )
    }
   
  </div>
}
export default ProductScreen;