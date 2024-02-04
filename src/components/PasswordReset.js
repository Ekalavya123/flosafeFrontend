import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function PasswordReset() {
    const [credentials,setCredentials]=useState({password:"",confirmPassword:""})
    let authToken=localStorage.getItem("resetToken"),navigate=useNavigate();
    const setPassword = async () => {
        if(credentials.password!=credentials.confirmPassword){alert("confirmPassword is not matching");return;}
        await fetch("https://flosafeanalyticsbackend.onrender.com/api/getUserDetails", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({authToken:authToken})
        }).then(async (res) => {
            let response= await res.json()
            //console.log("res in rest" ,response.data.email)
            if(response.success){
                await fetch("https://flosafeanalyticsbackend.onrender.com/api/updatePassword", {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:response.data.email,password:credentials.password})
                }).then(response => response.json()).then(json => {
                    if(json.success) localStorage.removeItem('resetToken')
                    alert(json.message);
                    navigate('/Login')
                })   
            }
            else alert(response.message)
        })
    } 
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
    
    return(
        <div className="wrapper" >
        <div className="logo">
            <img src="https://i.ibb.co/883YwKr/Whats-App-Image-2023-04-04-at-21-30-15.jpg" alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            FlowsafeAnalytics
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">resetPassword</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="confirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
        </div>
        <button className="btn mt-3 bg-success" onClick={setPassword}>update</button>
      </div>
  )
}


