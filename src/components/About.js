import React,{useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default  function About() {
    let [data,setData]=useState(["",""])
    let authToken=localStorage.getItem("token")
    try {
        const fetchUser = async () => {
            await fetch("https://flosafeanalyticsbackend.onrender.com/api/getUserDetails", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({authToken:authToken})
            }).then(async (res) => {
                let response= await res.json()
                if(response.success) setData([response.data.name,response.data.email])
                else alert(response.message)
            })
        }
        useEffect(() => {
            fetchUser()
        }, [])
        
    } catch (error) {
        alert("smothing went wront")
    }
    
    return (
        <div>
        <div><Navbar /></div>
        <div className="wrapper ">
            <div className="logo ">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""/>
            </div>
            <div className='d-flex mt-3'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Name :</label></div>
              <div className="form-label m-1 mt-4">{data[0]}</div>
            </div>
            <div className='d-flex'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Email:</label></div>
              <div className="form-label mt-4">{data[1]}</div>
            </div>
            
            <br/>
            <Link to="/InfoUpdate" className="btn mt-3 fs-6 bg-success">Edit</Link>
        </div>
        <div><Footer /></div>
        </div>
        
    )
}
