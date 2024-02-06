import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function verification() {
    const [message,setMessage] =useState("")
    const param=useParams();
    try {
        const verify = async () => {
            await fetch("https://flosafeanalyticsbackend.onrender.com/api/getUserDetails", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({authToken:param.token})
            }).then(async (res) => {
                let response= await res.json()
                //console.log("res in verify" ,response.data.email)
                if(response.success){
                    await fetch("https://flosafeanalyticsbackend.onrender.com/api/verification", {
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({email:response.data.email})
                    }).then(response => response.json()).then(json => {
                        setMessage(json.message)
                    })
                }
                else alert(response.message)
            })
        }
        useEffect(() => {
            verify();
          }, [param])
    } catch (error) {
        alert("something went wrong try again later")
    }
    
    return(
    <div className="wrapper ">
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            FlowsafeAnalytics
        </div>
        <p className='text-center m-4 text-success'>{message}</p>
        {message=="Email verified successfully"?<Link to="/Login" className="btn mt-3 fs-6 bg-success">Login Here</Link>:<p className='text-center m-4 text-success'>Checking...</p> }
    </div>
  )
}
