import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/Productactions';

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

  return <>
  <main className="main">
   <div className="content">
    {category &&
      <h2>{category}</h2>}
   <ul className="filter">
      <li>
        <form class="form-inline  mt-2" onSubmit={submitHandler}>
          <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search" a onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </li>
       
    </ul>
     <aside>
     <ul className="filter">
     <h1>
         <h2> Sort By</h2> 
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Highest to Lowest</option>
          <option value="highest">Lowest to Highest</option>
        </select>
        </h1> 
        </ul>   
            <h1>{<Link to="/category/BEER">BEER</Link>}</h1>
            <h2>{<Link to="/category/WHISKEY">WHISKEY</Link>}</h2>
            <h2> {<Link to="/category/BRANDY">BRANDY</Link>}</h2>
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
            <h2>{<Link to="/category/SODAS N MIXERS">SODAS n MIXERS</Link>}</h2>
            <h2>{<Link to="/category/ENERGY DRINKS">ENERGY DRINKS</Link>}</h2>
    </aside>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt={product.name} />

                  </Link>
                  <div className="product-name">{product.name}
                  </div>
                  <div className="product-price">KSH {product.price}</div>
                  
                  <div className="product-buy">
                    <Link to={'/product/' + product._id}> BUY NOW <i className="fas fa-cart-arrow-down fa-2x"></i></Link>
                  </div>
                  
                </div>
              </li>)
          }
        </ul>
    }
    </div>
    </main>
  </>

}
export default HomeScreen;