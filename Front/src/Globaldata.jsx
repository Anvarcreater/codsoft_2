import {createContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"

export const GlobValues =createContext(null);

export const Globaldata = ({children}) => {
    const [auth,setAuth] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const Navigate= useNavigate();
    const [allproject,setAllproject]= useState([]);
    const [task,setTask] = useState([]);
    
    useEffect(()=>{
        getallproject();
     },[auth]);
 

    Axios.defaults.withCredentials=true;
    const getallproject= ()=>{
       Axios.get('http://localhost:4000/getproject').then((res)=>{
          if(res.data.status){
             console.log(res.data.message);
             setAllproject(res.data.data);
          }
       }).catch((err)=>{
          console.log(err);
       })
    }

    const logout=()=>{
        Axios.get('http://localhost:4000/logout').then((res)=>{
            if(res.data.status){
                console.log(res);
                setAuth(false);
                Navigate('/login');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <GlobValues.Provider value={{auth,setAuth,email,setEmail,password,setPassword,allproject,task,setTask,logout}}>
                {children}</GlobValues.Provider>
    </div>
  )
}

Globaldata.propTypes={
    children:PropTypes.node.isRequired,
};