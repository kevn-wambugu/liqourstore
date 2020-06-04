import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
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
    <div className="header-links">
            <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>
            {<Link to="/category/Beer">Beer</Link>}
            {<Link to="/category/Whiskey">Whiskey</Link>}
            {<Link to="/category/Brandy">Brandy</Link>}
            {<Link to="/category/Wines">Rum</Link>}
            {<Link to="/category/Vodka">Vodka</Link>}
            {<Link to="/category/Wines">Wines</Link>}
            {<Link to="/category/Spirits">Spirits</Link>}
            {<Link to="/category/Others">Others</Link>}
            {<Link to="/cart/:id?"><i className="fas fa-cart-arrow-down fa-2x"></i></Link>}
            {cartItems.length !== 0 && <div className="badge">{cartItems.length}</div>}
      
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
        <h3>Call us: +254 725 783259</h3>
        <h3>Email: mikethealchemis@yahoo.com</h3>
	      <h3>Alchemis liqour store</h3>
	      <h3>Thika Gatitu</h3>
      </div>
      <div>
      <div className="header-links">
        <link href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" rel="stylesheet"></link>
        <a href="https://www.gmail.com/"><i className="fas fa-envelope-open fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-facebook-f fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-instagram fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-twitter fa-2x"></i></a>
        <a href="https://wa.me/254725783259"><i className="fab fa-whatsapp fa-2x"></i></a>
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fas fa-sms fa-2x"></i></a>
        </div>
      </div>
      <div>
        <h2>@alchemis liqour store 2020.</h2>
        <h2>  All Rights Reserved </h2>

      </div>
    </div>
 </div>
 
</BrowserRouter>
  );
}

export default App;
