import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function Login() {
  const [credentials,setCredentials] =useState({email:"",password:""})
  const [loading,setLoading] =useState(0)
  const [forgot,setForgot] =useState(0)
  let navigate=useNavigate()
  const handlesubmit= (event)=>{
    try {
      setLoading(1)
      if(forgot){
        fetch("https://flosafeanalyticsbackend.onrender.com/api/forgotPassword", {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email:credentials.email})
        }).then(response => response.json()).then(json => {
          setLoading(0);setForgot(0)
          alert(json.message);
        })
      }
      else{
        fetch("https://flosafeanalyticsbackend.onrender.com/api/loginuser", {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email:credentials.email,password:credentials.password})
        }).then(response => response.json()).then(json => {
          if(!json.success) alert(json.message)
          else{
            // localStorage.setItem('userEmail',credentials.email)
            localStorage.setItem('token',json.data)
            navigate("/");
          }
          setLoading(0)
        })
      }
      
    } catch (error) {
      setLoading(0)
      alert("Somthing went wrong try later")
    }
  }
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return(
    <div> 
    <div><Navbar /></div>
    <div className="wrapper ">
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            FlowsafeAnalytics
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">{!forgot?"Login Here":"enterEmail"}</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>

        {!forgot?<div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>:""}
        <button className="btn  bg-success" style={{width:'70%'}} onClick={handlesubmit}>{!forgot?'Login':'Submit'}</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}
        {!forgot?<div className='text-center'>
          <button  className=" mt-3 fs-6 border-white" onClick={()=>{setForgot(1)}}>forgotPassword</button>
          </div>:<button className=" m-3 fs-6 border-white " onClick={()=>{setForgot(0)}} >back</button>}
        
      </div>
      <><Footer /></>
    </div>
  )
}
