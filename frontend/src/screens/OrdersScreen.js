import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
  <section className="ftco-section">
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
              <th>USER</th>
              <th>MOBILE NUMBER</th>
              <th>CITY/TOWN</th>
             
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.shipping.mobnumber}</td>
              
              <td>
                <Link to={"/order/" + order._id} className="btn btn-primary py-3 px-4" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="btn btn-secondary py-3 px-4">Delete</button>
              </td>
            </tr>))}
          </tbody>
          </thead>
        </table>
      </div>
      </div>
      </section>
 
}
export default OrdersScreen;