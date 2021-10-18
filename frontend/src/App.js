import React, { useEffect } from 'react';
import ContactScreen from './screens/contactScreen';
import AboutScreen from './screens/aboutScreen';
import ScriptTag from 'react-script-tag';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen1';
import OrdersScreen from './screens/OrdersScreen';

import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SigninScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { listProductCategories } from './actions/Productactions';

import ProductsScreen from './screens/ProductsScreen';
import OrderScreen from './screens/OrderScreen';

function App() {

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  window.isAuth = !!userInfo;
  const { categories, loading, error } = productCategoryList || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, []);
 

  return (
  <BrowserRouter>
    <div className="wrap">
			<div className="container">
				<div className="row">
					<div className="col-md-6 d-flex align-items-center">
						<p className="mb-0 phone pl-md-2">
							<a href="#" className="mr-2"><span className="fa fa-phone mr-1"></span>+254 725783259</a> 
							<a href="#"><span className="fa fa-paper-plane mr-1"></span> mikethealchemis@yahoo.com</a>
						</p>
					</div>
					<div className="col-md-6 d-flex justify-content-md-end">
						<div className="social-media mr-4">
			    		<p className="mb-0 d-flex">
			    			<a href="https://www.facebook.com/AlchemisliqourDistributors/" className="d-flex align-items-center justify-content-center"><span className="fa fa-facebook"><i className="sr-only">Facebook</i></span></a>
			    			<a href="https://www.twitter.com/" className="d-flex align-items-center justify-content-center"><span className="fa fa-twitter"><i className="sr-only">Twitter</i></span></a>
			    			<a href="https://www.instagram.com/Alchemisliqours/?hl=en" className="d-flex align-items-center justify-content-center"><span className="fa fa-instagram"><i className="sr-only">Instagram</i></span></a>
			    			<a href="https://wa.me/254725783259" className="d-flex align-items-center justify-content-center"><span className="fa fa-whatsapp"><i className="sr-only">Dribbble</i></span></a>
			    		</p>
		        </div>
		        <div className="reg">
              {
            userInfo ? <p><a href="/profile" className="mb-0" className="mr-2">{userInfo.name}</a></p> :
		        	<p className="mb-0"><a href="/signin" className="mr-2">Sign Up</a> </p>
}

		        </div>
					</div>
				</div>
			</div>
		</div>
    
	  <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container">
	      <a className="navbar-brand" href="/">Alchemis <span>Liqours</span></a>
	      <div className="order-lg-last btn-group">
          <a href="/cart/:id?" className="btn-cart dropdown-toggle dropdown-toggle-split" >
          	<span className="flaticon-shopping-bag"></span>
          	{cartItems.length !== 0 &&<div className="d-flex justify-content-center align-items-center"><small>{cartItems.length}</small></div>}
          </a>
          </div>

	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="oi oi-menu"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
	          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
	          {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin</a>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                
                <a className="dropdown-item" href="/orders">Orders</a>
                <a className="dropdown-item" href="/products">Products</a>
                  
                </div>
              </li>
            )}
	          
	          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
   
    
    <div className="hero-wrap" style={{ backgroundImage: `url(${require('./images/bg_4.jpg')}`}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-8 ftco-animate-visible-visible d-flex align-items-end">
          	<div className="text w-100 text-center">
	            <h1 className="mb-4">Good <span>Drink</span> for Good <span>Moments</span>.</h1>
	            <p><a href="#" className="btn btn-primary py-2 px-4">Shop Now</a> <a href="/" className="btn btn-white btn-outline-white py-2 px-4">Read more</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="ftco-section">
        
            <Route path="/about" component={AboutScreen} />
            <Route path="/contact" component={ContactScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} /> 
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
    </section>


    <footer className="ftco-footer">
      <div className="container">
        <div className="row mb-5">
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 logo"><a href="#">Liquor <span>Store</span></a></h2>
              <p>Good Drink for Good Moments</p>
              <ul className="ftco-footer-social list-unstyled mt-2">
                <li className="ftco-animate-visible"><a href="https://www.twitter.com/"><span className="fa fa-twitter"></span></a></li>
                <li className="ftco-animate-visible"><a href="https://www.facebook.com/AlchemisliqourDistributors/"><span className="fa fa-facebook"></span></a></li>
                <li className="ftco-animate-visible"><a href="https://www.instagram.com/Alchemisliqours/?hl=en"><span className="fa fa-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">My Accounts</h2>
              <ul className="list-unstyled">
                <li><a href="/signin"><span className="fa fa-chevron-right mr-2"></span>My Account</a></li>
                <li><a href="/register"><span className="fa fa-chevron-right mr-2"></span>Register</a></li>
                <li><a href="/signin"><span className="fa fa-chevron-right mr-2"></span>Log In</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>My Order</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Information</h2>
              <ul className="list-unstyled">
                <li><a href="/about"><span className="fa fa-chevron-right mr-2"></span>About us</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Catalog</a></li>
                <li><a href="/contact"><span className="fa fa-chevron-right mr-2"></span>Contact us</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Term &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
             <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Quick Link</h2>
              <ul className="list-unstyled">
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>New User</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Help Center</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Report Spam</a></li>
                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span>Faq's</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon fa fa-map marker"></span><span className="text">Thika ,Gatitu</span></li>
	                <li><a href="#"><span className="icon fa fa-phone"></span><span className="text">+254 725783259</span></a></li>
	                <li><a href="mailto:mikethealchemis@yahoo.com"><span className="icon fa fa-paper-plane pr-4"></span><span className="text">mikethealchemis@yahoo.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 py-5 bg-black">
      	<div className="container">
      		<div className="row">
	          <div className="col-md-12">
            <p className="mb-0" style={{color:" rgba(255,255,255,.5)"}}>
	  All rights reserved | This template is made with <i class="fa fa-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a></p>
 
		
	    
	          </div>
	        </div>
      	</div>
      </div>
    </footer>
    
 
 
</BrowserRouter>
  );
}

export default App;
