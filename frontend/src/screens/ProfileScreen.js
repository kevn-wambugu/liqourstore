import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return <section className="ftco-section">
   <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-10 ftco-animate-visible">
        <form action="#" className="billing-form" onSubmit={submitHandler}>
          <h3 className="mb-4 billing-heading">Sign In</h3>
          <div className="row align-items-end">
           <div className="col-md-6">
	                <div className="form-group">
	                	<label for="firstname">Name</label>
                    <input type="text" className="form-control" placeholder=""
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                    />
	                </div>
	              </div>
            
           
            
            <div className="col-md-6">
              <div className="form-group">
                <label for="emailaddress">Email Address</label>
                <input type="text" className="form-control" placeholder="" required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="lastname">password</label>
                <input type="password" className="form-control" placeholder="" required
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

          
            <div className="w-100"></div>
            <div className="col-md-12">
            <p><button type='submit' className="btn btn-primary py-3 px-4" onClick={submitHandler}>Update</button></p>
            </div>
          </div>
          <p><button type='submit' className="btn btn-primary py-3 px-4" onClick={handleLogout}>Logout</button></p>
        </form>



          
        </div>
      </div> 
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders} </div> :
          <div className="container">
          <div className="row">
            <div className="table-wrap" />
               <table className="table" >
               <thead className="thead-primary">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                  </td>
                </tr>)}
              </tbody>
              </thead>
            </table>
            </div>
            </div>
      }
    </div>
  </section>
}

export default ProfileScreen;