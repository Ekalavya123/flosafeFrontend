import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar() {
  const [request,setRequest] =useState("")
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('tokenActivate')
    navigate("/Login")
  }
  const handleProfile=()=>{navigate("/About")}
  const handleOnclick=()=>{
    // navigate("/".concat("",request));
    navigate("/")
  }
  let p=<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
  let options=['Sites','Site1','Site2'];
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
    <div class="container-fluid">
      <Link class="navbar-brand m-3" to="/">FlowsafeAnalytics</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {(localStorage.getItem('token') && localStorage.getItem('tokenActivate'))?
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="btn btn-outline-black mt-1" aria-current="page" to="">Configuration</Link>
            </li>
            <li class="nav-item">
              <Link className="btn btn-outline-black mt-1" to="">Reports</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle mt-1 text-black" style={{width:'50%',paddingLeft:'15px'}} to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sites
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" to="">Site1</a></li>
                <li><a class="dropdown-item" to="">Site2</a></li>
              </ul>
            </li>
          </ul>:""
        }
        {(localStorage.getItem('token') && localStorage.getItem('tokenActivate'))?
          <div class="d-flex">
            <Link class="btn btn-outline-white" to="/About">profile</Link>
            <button class="btn btn-outline-white" onClick={handleLogout}>LogOut</button>
          </div>:
          <div class="d-flex">
          <Link class="btn btn-outline-white" to="/Login">Login</Link>
          <Link class="btn btn-outline-white" to="/SignUp">SignUp</Link>
        </div>
        }
      </div>
    </div>
    </nav>
  )
}
