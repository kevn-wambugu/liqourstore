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
      <aside>
          <div className="aside">
           <div className="aside-link">
            <h1>SHOP BY BRAND </h1>
            </div>  
            <h2>{<Link to="/brand/Jameson">Jameson </Link>}</h2>
            <h2>{<Link to="/brand/WHISKEY">Johnnie Walker </Link>}</h2>
            <h2>{<Link to="/brand/Johnnie Walker ">Jack Daniels</Link>}</h2>
            <h2>{<Link to="/brand/Ballantines">Ballantines</Link>}</h2>
            <h2>{<Link to="/brand/Grant's ">Grant's </Link>}</h2>
            <h2>{<Link to="/brand/Singleton">Singleton </Link>}</h2>
            <h2>{<Link to="/brand/Best Whisky">Best Whisky</Link>}</h2>
            <h2>{<Link to="/brand/Wild Turkey ">Wild Turkey  </Link>}</h2>
            <h2>{<Link to="/brand/Glenlivet">Glenlivet </Link>}</h2>
            <h2>{<Link to="/brand/Old Smuggler">Old Smuggler</Link>}</h2>
            <h2>{<Link to="/brand/Robertson Winery">Robertson Winery</Link>}</h2>
            <h2>{<Link to="/brand/Jumping Goat">Jumping Goat</Link>}</h2>
            <h2>{<Link to="/brand/Four Cousins ">Four Cousins </Link>}</h2>
            <h2>{<Link to="/brand/4th Street ">4th Street  </Link>}</h2>
            <h2>{<Link to="/brand/Southern Comfort ">Southern Comfort  </Link>}</h2>
            
            <h2>{<Link to="/brand/Bond 7">Bond 7</Link>}</h2>
            <h2>{<Link to="/brand/ Talisker"> Talisker </Link>}</h2>
            <h2>{<Link to="/brand/VAT 69 ">VAT 69 </Link>}</h2>
            <h2>{<Link to="/brand/Upper Valley ">Upper Valley </Link>}</h2>
            <h2>{<Link to="/brand/Mamma Mia">Mamma Mia </Link>}</h2>
            <h2>{<Link to="/brand/SThree Barrels ">Three Barrels </Link>}</h2>
            <h2>{<Link to="/brand/Crystal Head ">Crystal Head </Link>}</h2>
            <h2>{<Link to="/brand/Bumbu Rum  ">Bumbu Rum </Link>}</h2>
            <h2>{<Link to="/brand/ White Cap "> White Cap </Link>}</h2>
            <h2>{<Link to="/brand/Heineken">Heineken </Link>}</h2>
            <h2>{<Link to="/brand/Carlsberg ">Carlsberg </Link>}</h2>
            <h2>{<Link to="/brand/Hunter's">Hunter's </Link>}</h2>
            <h2>{<Link to="/brand/Four Cousins ">Faxe </Link>}</h2>
            <h2>{<Link to="/brand/Molly's">Molly's</Link>}</h2>
            <h2>{<Link to="/brand/Upper Valley">Upper Valley </Link>}</h2>

            <h2>{<Link to="/brand/Famous Grouse">Famous Grouse</Link>}</h2>
            <h2>{<Link to="/brand/Cellar Cask ">Cellar Cask  </Link>}</h2>
            <h2>{<Link to="/brand/Glenfiddich  ">Glenfiddich  </Link>}</h2>
            <h2>{<Link to="/brand/William Lawson ">William Lawson </Link>}</h2>
            <h2>{<Link to="/brand/Napoleon  ">Napoleon  </Link>}</h2>
            <h2>{<Link to="/brand/Viceroy">Viceroy</Link>}</h2>
            <h2>{<Link to="/brand/Flirt Vodka  ">Flirt Vodka  </Link>}</h2>
            <h2>{<Link to="/brand/KGB Vodka">KGB Vodka </Link>}</h2>
            <h2>{<Link to="/brand/Smirnoff ">Smirnoff </Link>}</h2>
            <h2>{<Link to="/brand/Ciroc ">Ciroc </Link>}</h2>
            <h2>{<Link to="/brand/Skyy Vodka ">Sky Vodka </Link>}</h2>
            <h2>{<Link to="/brand/Moet & Chandon ">Moet & Chandon </Link>}</h2>
            <h2>{<Link to="/brand/Charles Benoit   ">Charles Benoit  </Link>}</h2>
            <h2>{<Link to="/brand/Hennessy  ">Hennessy   </Link>}</h2>
            <h2>{<Link to="/brand/Upper Valley">Martell  </Link>}</h2>

            <h2>{<Link to="/brand/St-Remy ">St-Remy </Link>}</h2>
            <h2>{<Link to="/brand/Remy Martins  ">Remy Martins </Link>}</h2>
            <h2>{<Link to="/brand/Old Monk ">Old Monk</Link>}</h2>
            <h2>{<Link to="/brand/Captain Morgan ">Captain Morgan </Link>}</h2>
            <h2>{<Link to="/brand/Malibu ">Malibu</Link>}</h2>
            <h2>{<Link to="/brand/Monkey 47">Monkey 47</Link>}</h2>
            <h2>{<Link to="/brand/Beefeater">Beefeater </Link>}</h2>
            <h2>{<Link to="/brand/Gilbey's ">Gilbey's </Link>}</h2>
            <h2>{<Link to="/brand/Bombay Sapphire  ">Bombay Sapphire </Link>}</h2>
            <h2>{<Link to="/brand/Bulldog ">Bulldog </Link>}</h2>
            <h2>{<Link to="/brand/Jagermeister  ">Jagermeister </Link>}</h2>
            <h2>{<Link to="/brand/Amarula ">Amarula </Link>}</h2>
            <h2>{<Link to="/brand/Sheridan's ">Sheridan's   </Link>}</h2>
            <h2>{<Link to="/brand/Pilsner ">Pilsner   </Link>}</h2>
            <h2>{<Link to="/brand/Tusker">Tusker  </Link>}</h2>

            <h2>{<Link to="/brand/Atlas">Atlas</Link>}</h2>
            <h2>{<Link to="/brand/Tuborg">Tuborg</Link>}</h2>
            <h2>{<Link to="/brand/Guinness">Guinness</Link>}</h2>
            <h2>{<Link to="/brand/Havana Club">Havana Club</Link>}</h2>
            <h2>{<Link to="/brand/Tequila Rose ">Tequila Rose </Link>}</h2>
            <h2>{<Link to="/brand/Veuve Clicquot">Veuve Clicquot</Link>}</h2>
            <h2>{<Link to="/brand/Neon">Neon</Link>}</h2>
            <h2>{<Link to="/brand/Baileys">Baileys </Link>}</h2>
           

       </div>
      
       </aside>	
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt={<i className="fas fa-wine-bottle fa-7x" ></i>}/>
                  </Link>
                  <div className="product-name">{product.name}
                  </div>
                  <div className="product-price">KSH {product.price}</div>
                  <div className="product-rating">
                       <Rating value={product.rating} />
                     (
                        {product.numReviews}
                     {' '}
               Reviews)
                </div>
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