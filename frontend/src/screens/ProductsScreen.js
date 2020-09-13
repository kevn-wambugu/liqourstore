import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts, saveProduct, deleteProduct } from '../actions/Productactions';

function ProductsScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const showModal = (product) => {
    setId(product._id);
    setName(product.name);
    setDescription(product.description);
    setBrand(product.brand);
    setImage(product.image);
    setPrice(product.price);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setModalVisible(true);
  };
  const uploadImageFile = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    axios.post('/upload', bodyFormData, {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    })
      .then((response) => {
        setImage(response.data);
      })
      .catch((response) => {
        alert('Upload Error');
      });
  };
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id, name, brand, image, price, category, countInStock, description,
    }));
  };
  const productList = useSelector((state) => state.productList);
  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);

  const { loading, products, error } = productList;
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <section className="ftco-section">
      <div className="container">
    <div className="row">
          <h3>Products</h3>
          <button type="button" className="btn btn-primary py-3 px-4" onClick={() => showModal({})}>
            Create Product
          </button>
        </div>

        {modalVisible
          && (
            <div className="container">
              <h3>Create Product</h3>
              {errorSave && <ErrorBox message={error} />}
              {loading && <LoadingBox />}
              <div className="row justify-content-center">
             <div className="col-xl-10 ftco-animate-visible"> 
              <form action="#" className="billing-form" onSubmit={submitHandler}>
                 <h3 className="mb-4 billing-heading">Sign In</h3>
                 <div className="row align-items-end">
                 <div className="col-md-6">
                  <div className="col-md-6">
                 <div className="form-group">
                    <label htmlFor="name">
                      Name
                    </label>
                    <input required name="name" id="name" className="form-control" value={name} onChange={(e) => { setName(e.target.value); }} />
                 </div>
                 </div>

                 <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="brand">
                      Brand
                    </label>
                    <input required name="brand" id="brand" className="form-control" value={brand} onChange={(e) => { setBrand(e.target.value); }} />
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="image">
                      Image (680 X 830)
                    </label>
                    <input required name="image" id="image" className="form-control" value={image} onChange={(e) => { setImage(e.target.value); }} />
                    <input type="file" name="imageFile" onChange={uploadImageFile} />
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">
                      Price
                    </label>
                    <input required type="number" name="price"  className="form-control" id="price" value={price} onChange={(e) => { setPrice(e.target.value); }} />
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group"></div>
                    <label htmlFor="category">
                      Category
                    </label>
                    <input required name="category" id="category" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value); }} />
                  </div>
                  </div>
                  <div className="col-md-6">
                 <div className="form-group"></div>
                    <label htmlFor="countInStock">
                      Count In Stock
                    </label>
                    <input required type="number" name="countInStock" className="form-control" id="countInStock" value={countInStock} onChange={(e) => { setCountInStock(e.target.value); }} />
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="description">
                      Description
                    </label>
                    <textarea required name="description" id="description" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value); }} />
                  </div>
                  </div>
                  <li>
                    <button type="submit" className="btn btn-primary py-3 px-4">
                      {id ? 'Update' : 'Create'}
                      {' '}
                      Product
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => { setModalVisible(false); }} className="button">Back</button>
                  </li>

                  </form>
                </div>
                </div>
                </div>
               
            
          
            
          )}
        {products.length === 0 ? (
          <div className="empty-list">
            There is no products.
          </div>
        )
          : (
            <table>
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    NAME
                  </th>
                  <th>
                    PRICE
                  </th>
                  <th>
                    CATEGORY
                  </th>
                  <th>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      {product._id}
                    </td>
                    <td>
                      {product.name}
                    </td>
                    <td>
                      {product.price}
                    </td>
                    <td>
                      {product.category}
                    </td>
                    <td>
                      <button type="button" onClick={() => showModal(product)} className="button">Edit</button>
                      {' '}
                      <button type="button" onClick={() => deleteHandler(product)} className="button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      </section>
    );
}
export default ProductsScreen;
