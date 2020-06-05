import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen1';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SignInScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  return (
  <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
      <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>
        <a href="/">alchemis Liqours <i className="fas fa-glass-cheers"></i></a>
      </div>
      <h2>Call us: +254 725 783259</h2>
      <h2>Drinks delivered within Thika</h2>
    <div className="header-links">
            <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>
            {cartItems.length !== 0 && <div className="badge">{cartItems.length}</div>}
            {<Link to="/cart/:id?"><i className="fas fa-cart-arrow-down fa-2x"></i></Link>}
      
        {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>
    </header>
    <main className="main">
    
      <div className="content">
      
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

      </div>

    </main>
    <div id="footer">
      <div>
        <h3> Place order through a call, sms or whatsapp to 0725783259</h3>
        <h3>We offer free drinks delivery services in Thika and its environs</h3>
	      <h3>Excessive drinking of alcohol is harmful to your health.</h3>
        <h3> We only sell to persons above 20 years. Don't drink and drive.</h3>
      </div>
      <div>
      <div className="header-links">
        <link href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" rel="stylesheet"></link>
        
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-facebook-f fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-instagram fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-twitter fa-2x"></i></a>
        <a href="https://wa.me/254725783259"><i className="fab fa-whatsapp fa-2x"></i></a>
        </div>
      </div>
      <div>
        <h2>@alchemis liqour store 2020.</h2>
        <h2>Thika Gatitu</h2>
        <h2>All Rights Reserved </h2>

      </div>
    </div>
 </div>
 
</BrowserRouter>
  );
}

export default App;
