import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobValues } from "../Globaldata"
import Axios from 'axios';


export const Login = () => {
    const Navigate = useNavigate();
    const [message,setMessage]=useState("");
    const {email,setEmail,password,setPassword,setAuth}=useContext(GlobValues);
    Axios.defaults.withCredentials=true;
    const handle= ()=>{
            Axios.post('http://localhost:4000/login',{
                email,password
            }).then((res)=>{
                if(res.data.status){
                    console.log(res);
                    setAuth(true);
                    Navigate('/');
                }else{
                    console.log(res);
                    setMessage(res.data.message);
                    setTimeout(() => {
                        setMessage("");
                    },2000);
                }
            }).catch((err)=>{
                console.log(err);
            })
    }
  return (
    <div>
       <div className="container-fluid sign-con">
            <h3 className="text-center">Login</h3>
            { message.length >0 && <p className="text-center text-danger">{message}</p>}
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Your Email</label>
                    <input type="email" className="form-control sigfield" autoComplete="off" id="email" name="email"
                     placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/><br></br>
                    <label className="form-label" htmlFor="password">Your Password</label>
                    <input type="password" className="form-control sigfield"id="password" name="password"
                     placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/><br></br>
                    <input type="submit" value="Login" className="btn btn-primary" onClick={handle}/><br></br><br></br>
                    <div className="d-flex justify-content-between">
                        <p>Dont you have an Account ?</p>
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
