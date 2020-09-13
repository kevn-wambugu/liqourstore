import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsOrder, payOrder, deliverOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order ,} = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver || {};

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/profile';

  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
      //
    };
  }, [dispatch, successPay]);
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const handleDeliverOrder = () => {
    dispatch(deliverOrder(order));
  };
  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <section className="ftco-section">
       
      <div className="container">
        <div className="row">
        <h3 class="mb-4 billing-heading">Order was Created Successfully!!</h3>
       
            
           </div>
           <p> <a href='/'><button type="submit" className="btn btn-primary py-3 px-4">Continue Shopping</button></a></p>
        </div>
    
      </section>
      )
  );
}
export default OrderScreen;
