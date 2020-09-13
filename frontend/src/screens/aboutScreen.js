import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function AboutScreen (props){
  
  const [visible, setVisible] = useState(true);

  function hideMe(){
    setVisible(false);
  }


    return<section className="ftco-section ftco-no-pb">
    <div className="container"> 
        <div className="row">
            <div className="col-md-6 img img-3 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${require('../images/about.jpg')}`}} >
            </div>
            
            <div className="col-md-6 wrap-about pl-md-5 ftco-animate-visible py-5" >
      <div className="heading-section">
          <span className="subheading">Since 2017</span>
        <h2 className="mb-4">Desire meets a new Taste</h2>

        <p>Alchemis Liqours Bring ease and convenience of buying and ordering alcohol delivery Thika.</p>
        <p>Whether you are looking for whisky or wine we got you covered. Your favorite drink is a dial away, Dial a drink and enjoy.</p>
        <p className="year">
            <strong className="number" data-number="3">3</strong>
            <span>Years of Experience In Business</span>
        </p>
      </div>

            </div>
           
        </div>
    </div>
</section>

  
}

export default AboutScreen;