import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar() {
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('tokenActivate')
    navigate("/Login")
  }
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
              <ul class="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
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
