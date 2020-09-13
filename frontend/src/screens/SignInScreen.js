import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // 
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return  <section class="ftco-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 ftco-animate-visible">
        <form action="#" class="billing-form" onSubmit={submitHandler} >
          <h3 class="mb-4 billing-heading">Sign In</h3>
          <div class="row align-items-end">
            
           
            
          <div class="col-md-6">
              <div class="form-group">
                <label for="emailaddress">Email Address</label>
                <input type="text" class="form-control" placeholder="" required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>


            
            <div class="col-md-6">
              <div class="form-group">
                <label for="lastname">password</label>
                <input type="password" class="form-control" placeholder="" required
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>


            <div class="w-100"></div>
            <p><button type='submit' class="btn btn-primary py-3 px-4" onClick={submitHandler}>Sign In</button></p>
            <div class="col-md-12">
            <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}  className="mb-0" className="mr-2">Create your Alchemis account</Link>
            </div>
          </div>
        </form>



          
        </div>
      </div> 
    </div>
</section>
}
export default SigninScreen;