import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen(props) {
  const proccedToCheckout = () => {
    props.history.push('/signin?redirect=/shipping');
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.match.params.id) {
      const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
      dispatch(addToCart(props.match.params.id, qty));
    }
    return () => {
      //
    };
  }, []);
  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, Number(qty)));
  };
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  return<section className="ftco-section">
  <div className="container">
    <div className="row">
      <div className="table-wrap" />
         <table className="table" >
          <thead className="thead-primary">
            <tr>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>total</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            

          {cartItems.map((item) => (
            <tr className="alert" role="alert" key={item.product}>
              <td>
                <label className="checkbox-wrap checkbox-primary">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td>
                <div className="img" style={{ backgroundImage: `url(${item.image}`}}></div>
              </td>
              <td>
                <div className="email">
                  <span>{item.name}</span>
                  <span>{item.description}</span>
                </div>
              </td>
          <td>KSH {item.price}</td>
              <td className="quantity">
                <div className="input-group">
                   <input type="text" name="quantity" className="quantity form-control input-number" value={item.qty} onChange={(e) => addToCartHandler(item.product, e.target.value)} min="1" max="100" />
                </div>
              </td>
          <td>{item.price * item.qty}</td>
              <td>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => removeFromCartHandler(item.product)}>
                  <span aria-hidden="true"><i className="fa fa-close"></i></span>
                </button>
              </td>
            </tr>))}

           

            
          </tbody>
        </table>
      </div>
    </div>
    <div className="row justify-content-end">
      <div className="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate-visible">
        <div className="cart-total mb-3">
          <h3>Cart Totals</h3>
          <p className="d-flex">
            <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
            <span>KSH {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>
          </p>
          <p className="d-flex">
            <span>Delivery</span>
            <span>KSH 0.00</span>
          </p>
          <p className="d-flex">
            <span>Discount</span>
            <span>KSH 0</span>
          </p>
         
          <p className="d-flex total-price">
            <span>Total</span>
            <span>KSH {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>
          </p>

         <p> <a href='/'><button type="submit" className="btn btn-primary py-3 px-4">Continue Shopping</button></a></p>
        
      <p ><button type="submit" className="btn btn-primary py-3 px-4" 
      type="button"
      disabled={cartItems.length === 0}
      onClick={proccedToCheckout}
      >Checkout</button></p>
      </div>
     </div>
  </div>
</section>
}
export default CartScreen;