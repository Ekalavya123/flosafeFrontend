import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div className='mt-3'>
<footer className="text-center text-lg-start bg-light text-muted">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <div>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </section>
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Website name
          </h6>
          <p>
          FlowsafeAnalytics
          </p>
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Features
          </h6>
          <p className="text-reset">Analysing and visualising the data   </p>
          <p className="text-reset"> Analysing and visualising the data</p>
        </div>
              
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="/" className="text-reset">Reports</a>
          </p>
          <p>
            <a href="/" className="text-reset">Configuration</a>
          </p>
          <p>
            <a href="/" className="text-reset">sites</a>
          </p>
          <p>
            <a href="/" className="text-reset">Home</a>
          </p>
        </div>
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i> village , city, SWEDEN</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            FlowsafeAnalytics@gmail
          </p>
          <p><i className="fas fa-phone me-3"></i> + 91 1234567890</p>
        </div>
        
      </div>
    </div>
  </section>  
  <div className="text-center p-4" style={{"background-color":"rgba(0, 0, 0, 0.05)"}}>
    © 2024 Copyright : 
    <a className="text-reset fw-bold" href="/"> FlowsafeAnalytics</a>
  </div>
  
</footer>
</div>
  )
}
