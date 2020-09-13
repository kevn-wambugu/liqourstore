import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
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
    dispatch(register(name, email, password));
  }
  return  <section className="ftco-section">
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

            <div className="col-md-6">
              <div className="form-group">
                <label for="lastname">Re-enter Password</label>
                <input type="password" className="form-control" placeholder=""  required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)} />
              </div>
            </div>
            


            <div className="w-100"></div>
            <div className="col-md-12">
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}  className="mb-0" className="mr-2">Sign In</Link>
            </div>
          </div>
          <p><button type='submit' className="btn btn-primary py-3 px-4">Register</button></p>
        </form>



          
        </div>
      </div> 
    </div>
</section>
}
export default RegisterScreen;