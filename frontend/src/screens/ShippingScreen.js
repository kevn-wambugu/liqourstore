import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [mobnumber, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ mobnumber, city, postalCode, country })); 
    props.history.push('/payment');
  }
  return  <section class="ftco-section">
  
  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 ftco-animate-visible">
        <form action="#" class="billing-form" onSubmit={submitHandler}>
          <h3 class="mb-4 billing-heading">Shipping</h3>
          <div class="row align-items-end">
          <div class="form-group">
	                	<label for="phone">Phone</label>
                    <input type="tel"  class="form-control" 
                    name="mobnumber" 
                    id="mobnumber"
                    placeholder="0712345678" 
                    required
                    value={mobnumber}
                    onChange={(e) => setAddress(e.target.value)}
                    
                    />
	                </div>
            
           
            
                  <div class="col-md-6">
		            	<div class="form-group">
	                	<label for="towncity">Town / City</label>
	                  <input type="text" class="form-control"  
            name="city" 
            id="city" 
            required
            value={city}
            onChange={(e) => setCity(e.target.value)} />
	                </div>
		            </div>

                <div class="col-md-6">
		            	<div class="form-group">
	                	<label for="streetaddress">Residential Area</label>
                    <input type="text" class="form-control" placeholder="House number and street name"
                    name="postalCode" 
                    id="postalCode" 
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    
                    />
	                </div>
		            </div>

                <div class="col-md-6">
		            	<div class="form-group">
                    <input type="text" class="form-control" placeholder="Appartment, suite, unit etc: (optional)"
                    type="text" 
                    name="country" 
                    id="country" 
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} />
	                </div>
		            </div>
          
          </div>
         
         
        </form>


        <p><button type='submit' class="btn btn-primary py-3 px-4" onClick={submitHandler}>Submit</button></p>
          
        </div>
      </div> 
    </div>
</section>
}
export default ShippingScreen;