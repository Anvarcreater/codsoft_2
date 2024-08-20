import { useContext} from "react"
import { Link } from "react-router-dom";
import { GlobValues } from "../Globaldata";

export const Header = () => {
    const {auth,logout}=useContext(GlobValues)
  return (
    <div>
        <div className="navbar navbar-expand-lg">
            <div className="container"> 
                <h1 className="navbar-brand">Project Management Tool</h1>
                
                { auth &&
                     <div className="dropdown drop"> 
                            <h5 className=" dropdown-toggle proficon ms-3" data-bs-toggle="dropdown">Dashboard</h5>
                            <ul className="dropdown-menu">
                                <li><Link to="/dashboard?tab=content" className="text-decoration-none text-black ms-3">Dashboard</Link></li>
                                <li><Link to="/dashboard?tab=project" className="text-decoration-none text-black ms-3">Project</Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li style={{cursor:"pointer"}}><p className="ms-3" onClick={logout}>Logout</p></li>
                            </ul>
                    </div>  }  
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                <span className="navbar-toggler-icon"> </span></button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link to="/" className="nav-link  ">Home</Link></li>
                        {! auth &&
                            <>
                                <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                            </> 
                            }  
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
