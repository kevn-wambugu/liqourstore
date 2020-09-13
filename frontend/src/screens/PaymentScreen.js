import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  }
  return  <section className="ftco-section">
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-10 ftco-animate-visible">
        <form action="#" className="billing-form" onSubmit={submitHandler}>
          <h3 className="mb-4 billing-heading">Payment Method</h3>
          <div className="row align-items-end">
        
           
              <div className="col-md-6">
	          		<div className="cart-detail p-3 p-md-4">
	          			<h3 className="billing-heading mb-4">Payment Method</h3>
								
									<div className="form-group">
										<div className="col-md-12">
											<div className="radio">
											   <label><input type="radio" name="optradio" className="mr-2"  id="paymentMethod" value="mpesa"
                onChange={(e) => setPaymentMethod(e.target.value)}/> Pay on delivery</label>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div className="col-md-12">
											<div className="radio">
											   <label><input type="radio" name="optradio" className="mr-2" id="paymentMethod" value="mpesa"
                onChange={(e) => setPaymentMethod(e.target.value)} /> Paypal</label>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div className="col-md-12">
											<div className="checkbox">
											   <label><input type="checkbox" value="" className="mr-2" /> I have read and accept the terms and conditions</label>
											</div>
										</div>
									</div>
                  <p><button type="submit" className="btn btn-primary py-3 px-4">Continue</button></p>
								</div>
	          	</div>

               
          
          </div>
         
        </form>



          
        </div>
      </div> 
    </div>
</section>

}
export default PaymentScreen;