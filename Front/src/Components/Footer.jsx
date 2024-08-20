import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"


export const Footer = () => {
  return (
    <div>
        <div className="container-fluid foot-comp bg-dark">
            <div className="container p-2">
                <div>
                    <h3 className="text-center mt-5" style={{color:"#df0bca"}}>About Project Management Tool</h3>
                    <p className="text-center foottext"> In this Project Management Tool you can able to create new projects,
                        and assign task for the project and also able to check the project status.
                    </p>
                </div>
                <div className="footqf">
                    <div className="quick">
                        <Link to="/" className="footlinks">Home</Link>
                        <Link to="/signup" className="footlinks">signup</Link>
                        <Link to="/login" className="footlinks">login</Link>
                    </div>
                    <div>
                        <h5 className="text-warning text-center">Follow us:</h5>
                        <div className="follow">
                            <Link to="#"> <FaLinkedin className="social-media"/> </Link>
                            <Link to="#"><FaInstagram className="social-media"/></Link>
                            <Link to="#"><FaFacebook className="social-media"/></Link>
                        </div>
                    </div>
                </div>
                <p className="text-dark text-center mt-3"> Created by @Anvar Thaseem</p>
            </div>
        </div>
    </div>
  )
}

