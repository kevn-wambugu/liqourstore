import React, { useEffect } from 'react';
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
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';
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
  const openSidebar = () => document.querySelector('.sidebar').classList.add('open');
  const closeSidebar = () => document.querySelector('.sidebar').classList.remove('open');

  return (
  <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <link href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" rel="stylesheet"></link>
        <button type="button" onClick={openSidebar}>&#9776;</button>
        <a href="/">Alchemis Liqours</a>
      </div>
      <div className="header-links">
            <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>
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
                    <Link  to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>
    </header>
        <aside className="sidebar">
          <ul className="categories">
            <li>
            <div className="category-links">
              <h1>SHOP BY CATEGORY</h1>
            </div> 
              <button type="button" className="sidebar-menu-close" onClick={closeSidebar}>
                X
              </button>
            </li>
            <div className="category-links">
            <h2>{<Link to="/category/BEER">BEER</Link>}</h2>
            <h2>{<Link to="/category/WHISKEY">WHISKEY</Link>}</h2>
            <h2>{<Link to="/category/BRANDY">BRANDY</Link>}</h2>
            <h2>{<Link to="/category/WINES">RUM</Link>}</h2>
            <h2>{<Link to="/category/VODKA">VODKA</Link>}</h2>
            <h2>{<Link to="/category/WINE">WINE</Link>}</h2>
            <h2>{<Link to="/category/SPIRITS">SPIRITS</Link>}</h2>
            <h2>{<Link to="/category/COGNAC">COGNAC</Link>}</h2>
            <h2>{<Link to="/category/CHAMPAGNE">CHAMPAGNE</Link>}</h2>
            <h2>{<Link to="/category/GIN">GIN</Link>}</h2>
            <h2>{<Link to="/category/TEQUILA">TEQUILA</Link>}</h2>
            <h2>{<Link to="/category/CREAMS">CREAMS</Link>}</h2>
            <h2>{<Link to="/category/ROLLING PAPERS">ROLLING PAPERS</Link>}</h2>
            <h2>{<Link to="/category/SHOOTERS">SHOOTERS</Link>}</h2>
            <h2>{<Link to="/category/Extras">EXTRAS</Link>}</h2>
            <h2>{<Link to="/category/ENERGY DRINKS">ENERGY DRINKS</Link>}</h2>
            </div>
          </ul>
        </aside>
        <main onClick={closeSidebar} className="main">
    
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
      <div className="f1">
      <div className="footer-links">
       <h1>CONTACT US</h1>
        <h2><a href="https://wa.me/254725783259"> Phone : 0725783259</a></h2>
        <h2> Email: mikethealchemis@yahoo.com</h2>
        <h2> We only sell to persons above 18 years.</h2>
        </div>
      </div>
      <div className="f2">
      <div className="footer-links">
          <h1>FOLLOW US</h1>
          <h1><a href="https://www.facebook.com/groups/961397400867395/">Facebook</a></h1>
          <h2><a href="https://www.instagram.com/alchemisliqours/?hl=en">Instagram</a></h2>
          <h2><a href="https://www.Twitter.com/">Twitter</a></h2>
          </div>
      </div>
      <div className="f3">
        <div className="footer-links">
        <h1>VISIT OUR SHOP</h1>
        <h2><a href="https://goo.gl/maps/1CVe4wYH9grh6hUf6">GET DIRECTIONS</a></h2>
        <h2>Thika Gatitu</h2>
        <h2>All Rights Reserved.</h2>
        </div>
      </div>
    </div>
 </div>
 
</BrowserRouter>
  );
}

export default App;
