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
    <div>
      <nav className=" navbar-dark bg-success  ">
              {
                (!localStorage.getItem('token') || !localStorage.getItem('tokenActivate'))?
                <div className="container-fluid">  
                <div className="nav-item  ">
                    <Link className="navbar-brand fs-1 fst-normal mr-5 " to="/Login" >Flowsafe Analytics</Link>
                    <div style={{position:'absolute',right:0,top:0}}>
                      <button className="btn  text-white mt-3 " onClick={()=>{navigate("/Login")}}>Login</button>
                      <button className="btn  text-white mt-3 " onClick={()=>{navigate("/SignUp")}}>SignUp</button>
                    </div>     
                </div>
                </div>
                :
                <div className="container-fluid">  
                <div className="nav-item  ">
                  <Link className="navbar-brand fs-1 fst-normal mr-5" to="/">Flowsafe Analytics</Link>
                  <button className="btn  text-white m-1  " onClick={()=>{navigate("/")}}>Configuration</button>
                  <button className="btn  text-white m-1 " onClick={()=>{navigate("/")}}>Reports</button>
                  <select className='btn-success' onChange={(e)=>{setRequest(e.target.value)} } >
                      {Array.from(Array(3),(e,i)=>{
                      return (<option key={i+1} value={options[i]} >{options[i]}</option>)
                      })}
                  </select>
                  <button className="btn text-white" onClick={handleOnclick}>Get</button>
                  <div className="topRightNavLinks">
                    <button className="btn  text-white  profile-btn"  aria-current="page" onClick={handleProfile}>{p}</button>
                    <button className='btn  text-white logout-btn' onClick={handleLogout}>LogOut</button>
                  </div>
                </div>
                </div>
              }
    </nav>
  </div>
  )
}







