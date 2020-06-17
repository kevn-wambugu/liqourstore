import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
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
      <li>
        Sort By {' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </li>
      </ul>
      <ul>

      <div className="message">
        <h1>Pick, Order & We will Deliver!</h1>
      </div>
      </ul>		
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
                  <Link to={'/product/' + product._id}>
                   BUY NOW <i className="fas fa-cart-arrow-down fa-2x"></i>
                   </Link>
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