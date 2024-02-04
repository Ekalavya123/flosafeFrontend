import React, { useEffect, useState } from 'react'
import '../index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from "chart.js"
import {Line} from "react-chartjs-2"
import { useNavigate } from 'react-router-dom'
ChartJS.register(
    CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend
);

export default function Home() {
  const [psi,setPsi]=useState(1),[bar,setBar]=useState(0),[edit,setEdit]=useState(0)
  let [pastData,setpatData]=useState([]),[currentData,setCurrentData]=useState({incoming:0,drain:0,pump:0,togglePressure:0,drainPressure:0})
  const [Incoming,setIncoming] =useState(0),[Drain,setDrain] =useState(0),[Pump,setPump] =useState(0);
  const [togglePressure,setTogglePressure]=useState(""),[drainPressure,setDrainPressure]=useState("")
  let navigate=useNavigate();
  const getpastData=()=>{
    fetch("https://flosafeanalyticsbackend.onrender.com/api/getData", {
        method: 'POST',
        headers:{'Content-Type':'application/json'}
    }).then(response => response.json()).then(json => {
      if(json.success){
        let response1= json.pastData,response2=json.currentData;
        setpatData(response1)
        setCurrentData(response2)
        setIncoming(response2.incoming),setDrain(response2.drain),setPump(response2.pump);
        setTogglePressure(response2.togglePressure),setDrainPressure(response2.drainPressure)
        console.log(response2)
      }
      else alert(json.message)
    })
  }
  const handleUpdate=(event)=>{
    fetch("https://flosafeanalyticsbackend.onrender.com/api/update", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({Incoming:Incoming,Drain:Drain,Pump:Pump,togglePressure:togglePressure,drainPressure:drainPressure})
    }).then(response => response.json()).then(json => {
      if(json.success){
        getpastData();setEdit(0)
      }
      else alert(json.message)
    })
  }
  useEffect(()=>{
    getpastData();
  },[])
  
  let pressurePsi=[],pressureBar=[],labels=[];
  for(let i=0;i<pastData.length;i++){
    pressureBar.push(pastData[i].pressureBar)
    pressurePsi.push(pastData[i].pressurePsi)
    labels.push(pastData[i].time)
  }
  const options={
    responsive:true,
    scales: {
      x:{
        beginAtZero:true,
        title:{
          display:true,
          text:"time "
        }
      },
      y:{
        beginAtZero:true,
        title:{
          display:true,
          text:(psi?"pressurePsi":"pressureBar")
        }
      }
    },
    plugins:{
      legend:{
        position:"bottom",
      },
      title:{
        display:true,text:"Graph",
      },
    },
  };
  
  const data={
    labels,
    datasets:[
      {
        label:(psi?"pressurePsi":"pressureBar"),
        data:(psi?pressurePsi:pressureBar),
        borderColor:(psi?"rgba(60,60,60,0.5)":"rgba(0,0,250,0.5)"),
        borderWidth:1,
        backgroundColor:(psi?'rgba(60,60,60,0.6)':"rgba(0,0,250,0.6)"),
        backgroundWidth:1,
        tension: 0.6
      },
    ],
  }
  const gotoLogin=()=>{navigate("/Login")}
  
  return (
    <div>
        <div><Navbar /></div>
        {(!localStorage.getItem('token') || !localStorage.getItem('tokenActivate'))?gotoLogin():
        <>
        <div className='m-3 border border-secondary text-center'style={{"position":"relative","margin":"auto",width:'90%',padding:'10px',paddingTop:'50px',left:'20px'}} >
            <Line   options={options} data={data} width='400%'  />
            <div className="topLeftNavLinks">
                <button className={(psi?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")}  aria-current="page" onClick={()=>{setPsi(1);setBar(0);}} >pressurePsi</button>
                <button className={(bar?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} onClick={()=>{setPsi(0);setBar(1);}} >pressureBar</button>
            </div>
            <div className="topRightNavLinks">
                <button className="btn  border border-danger text-black  m-1 btn profile-btn"  aria-current="page" >StartTestReport</button>
                <button className='btn  border border-danger text-black  m-1 btn profile-btn' >ExportTestCycle</button>
            </div>
        </div>
        {edit? <> 
        <div className='text-center' >
            <button className={(Incoming?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} onClick={()=>{setIncoming(!Incoming)}}>{(Incoming?"Incoming ON":"Incoming OFF")}</button>
            <button className={(Drain?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} onClick={()=>{setDrain(!Drain)}} >{(Drain?"Drain ON":"Drain OFF")}</button>
            <button className={(Pump?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} onClick={()=>{setPump(!Pump)}}>{(Pump?"Pump ON":"Pump OFF")}</button>
        </div>
        <div class="input-group m-2 " style={{"width":"60%"}}>
            <span class="input-group-text">Toggle Pressure</span>
            <input className='border border-danger text-center m-1' placeholder={togglePressure} type="text" aria-label="First name" class="form-control" value={togglePressure}  onChange={(e)=>{setTogglePressure(e.target.value)}} />
            <span class="input-group-text">Drain Pressure</span>
            <input className='border border-danger text-center m-1' placeholder={drainPressure} type="text" aria-label="Last name" class="form-control" value={drainPressure}  onChange={(e)=>{setDrainPressure(e.target.value)}} />
        </div></>:
        <> 
        <div className='text-center' >
            <p className={(currentData.incoming?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} >{(currentData.incoming?"Incoming ON":"Incoming OFF")}</p>
            <p className={(currentData.drain?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")}  >{(currentData.drain?"Drain ON":"Drain OFF")}</p>
            <p className={(currentData.pump?"btn bg-success":"").concat(" border border-danger text-black  m-1 btn profile-btn ")} >{(currentData.pump?"Pump ON":"Pump OFF")}</p>
        </div>
        <div class="input-group m-2 " style={{"width":"60%"}}>
            <p class="input-group-text">Toggle Pressure</p>
            <p className='border border-danger text-center m-1' type="text" aria-label="First name" class="form-control"  >{currentData.togglePressure}</p>
            <p class="input-group-text">Drain Pressure</p>
            <p className='border border-danger text-center m-1' type="text" aria-label="First name" class="form-control" >{currentData.drainPressure}</p>
        </div></>
        }
        <div className='text-center' >
          <button className={(edit?"btn bg-success":"").concat(" border border-danger text-black  m-2 btn profile-btn ") }  onClick={()=>{setEdit(!edit)}}>{(edit?"editON":"Edit")}</button>
          <button className= "border border-danger text-black  m-2 btn profile-btn " onClick={handleUpdate}>update</button>
        </div>
        </>
        }
        <div><Footer /></div>
    </div>
  )
}








