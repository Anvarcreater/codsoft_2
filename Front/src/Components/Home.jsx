import { useContext,useEffect } from "react";
import { GlobValues } from "../Globaldata";
import Axios from "axios";

export const Home = () => {
  const {setAuth}=useContext(GlobValues);
  Axios.defaults.withCredentials = true;
  useEffect(()=>{
     Axios.get('http://localhost:4000/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
        }else{
          setAuth(false);
        }
     })
  },[setAuth]);
  return (
    <div>
      <div className="container-fluid bg-white p-5 mt-3">
          <div className="container ">
            <h1 className="ms-lg-5 mt-lg-5 text-dark" style={{fontfamily:"sans-serif"}}>Project Mangement tool</h1>
            <p className="ms-lg-5 mt-lg-5 mt-sm-3 text-dark"style={{fontfamily:"sans-serif",fontSize:"25px"}}>
                  In this Project Management Tool you can able to create new projects
                  and assign task for the project and also able to check the project status.
            </p>

          </div>
       </div>
    </div>
  )
}
