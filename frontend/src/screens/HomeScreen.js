import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/Productactions';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category)); 

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <section className="ftco-section">
	  				{category &&
      <h2>{category}</h2>}
	      
			<div className="container">
				<div className="row">
					<div className="col-md-9">
					
						<div className="row">
		
							
            {
            products.map(product =>
							<div className="col-md-4 d-flex" key={product._id}>
								<div className="product ftco-animate-visible">
									<div className="img d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${product.image}`}}>
										<div className="desc">
											<p className="meta-prod d-flex">
												<Link to={'/product/' + product._id} className="d-flex align-items-center justify-content-center"><span className="flaticon-shopping-bag"></span></Link>
												<a href="#" className="d-flex align-items-center justify-content-center"><span className="flaticon-heart"></span></a>
												<Link to={'/product/' + product._id} className="d-flex align-items-center justify-content-center"><span className="flaticon-visibility"></span></Link>
											</p>
										</div> 
									 </div>
									  <div className="text text-center">
										<span className="sale">Sale</span>
                                     <span className="category">{product.category}</span>
										<h2>{product.name}</h2>
                                       <p className="mb-0"><span className="price price-sale"> </span> <span className="price">KSH {product.price}</span></p>
									</div>
								</div>
							</div>)}
							
						</div>
					
					</div>

					<div className="col-md-3">
						<div className="sidebar-box ftco-animate-visible">
              <div className="categories">
                <h3>Product Types</h3>
                <ul className="p-0">
                	<li><Link to="/category/BRANDY">Brandy <span className="fa fa-chevron-right"></span></Link></li>
	                <li><Link to="/category/GIN">Gin <span className="fa fa-chevron-right"></span></Link></li>
	                <li><Link to="/category/RUM">Rum <span className="fa fa-chevron-right"></span></Link></li>
	                <li><Link to="/category/WINE">Wine <span className="fa fa-chevron-right"></span></Link></li>
	                <li><Link to="/category/VODKA">Vodka <span className="fa fa-chevron-right"></span></Link></li>
	                <li><Link to="/category/WHISKEY">Whiskey <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/SPIRITS">Spirits <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/CREAMS">Creams<span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/BEER">Beer <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/CHAMPAGNE">Champagne <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/ROLLING PAPERS">Rolling Papers <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/SHOOTERS">Shooters <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/Extras">Extras <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/ENERGY DRINKS">Energy Drinks <span className="fa fa-chevron-right"></span></Link></li>
					<li><Link to="/category/COGNAC">Cognac <span className="fa fa-chevron-right"></span></Link></li>
                </ul>
              </div>
            </div>
					</div>
				</div>
			</div>
		</section>

}
export default HomeScreen;