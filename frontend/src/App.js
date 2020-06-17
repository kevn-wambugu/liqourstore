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
        <a href="/">Alchemis Liqours<i className="fas fa-glass-whiskey"></i></a>
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
    <footer class="footer-distributed">
 
			<div class="footer-left">
				<h3><span>Alchemis Liqours<i class="fa fa-glass-whiskey"></i></span></h3>
 
				<p class="footer-links">
					<a href="/">Home</a>
					|
					<a href="/">About</a>
					|
					<a href="/">Contact</a>
				</p>
 
				<p class="footer-company-name">©2020 Alchemis Liqours.</p>
			</div>
 
			<div class="footer-center">
				<div>
					<i class="fa fa-map-marker"></i>
					  <p><span><a href="https://goo.gl/maps/1CVe4wYH9grh6hUf6">GET DIRECTIONS</a></span>
            </p>
				</div>
 
				<div>
					<i class="fa fa-phone"></i>
					<p>+254 725783259</p>
				</div>
				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:mikethealchemis@yahoo.com">mikethealchemis@yahoo.com</a></p>
				</div>
		   	</div>
			<div class="footer-right">
				<p class="footer-company-about">
					<span>About us</span>
					Alchemis Liqours Bring ease and convenience of buying and ordering alcohol delivery Thika. Whether you are looking for whisky or wine we got you covered. Your favorite drink is a dial away, Dial a drink and enjoy.</p>
				<div class="footer-icons">
        <a href="https://www.facebook.com/AlchemistLiqours/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/alchemisliqours/?hl=en"><i className="fab fa-instagram "></i></a>
        <a href="https://www.Twitter.com"><i className="fab fa-twitter "></i></a>
        <a href="https://wa.me/254725783259"><i className="fab fa-whatsapp"></i></a>
				</div>
			</div>
		</footer>
 </div>
 
</BrowserRouter>
  );
}

export default App;
