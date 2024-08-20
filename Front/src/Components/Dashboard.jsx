import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { MdDashboardCustomize, MdLogout} from "react-icons/md"
import { Link } from "react-router-dom"
import { GlobValues } from "../Globaldata"
import Axios from 'axios'
import { Project } from "./Project"
import { Dashcontent } from "./Dashcontent"

export const Dashboard = () => {
  const {logout,setAuth}=useContext(GlobValues);
  const Navigate = useNavigate();
  const location = useLocation();
  const [tab,setTab]=useState("cont");
  Axios.defaults.withCredentials = true;
  useEffect(()=>{
     Axios.get('http://localhost:4000/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
        }else{
          console.log(res.data.message);
          setAuth(false);
          Navigate('/login');
        }
     })
  },[setAuth,Navigate]);
  useEffect(()=>{
      const urlparams=new URLSearchParams(location.search);
      const tabfromurl = urlparams.get('tab');
       if(tabfromurl){
         setTab(tabfromurl);
       }
  },[location.search]);
  return (
    <div>
        <div className="row row-w">
          <div className="col-lg-2 dashbars">
              <p><Link to="/dashboard?tab=content" className="dashlinks"><MdDashboardCustomize/>Dashboard</Link></p>
              <p><Link to="/dashboard?tab=project"className="dashlinks">My projects</Link></p>
              <p onClick={()=>{logout()}} className="dashlinks"><MdLogout/> Logout</p>
          </div>
          <div className="col-lg-8">
            {tab === 'content' && <Dashcontent/>}
            {tab === 'project' && <Project/> }
          </div>
        </div>
    </div>
  )
}
