import { useContext } from "react"
import { GlobValues } from "../Globaldata";
import { Link} from "react-router-dom"

export const Project = () => {
    const {allproject} = useContext(GlobValues);

  return (
    <div>
         <div className="">
        { allproject.length !== 0 ?
        <div>
          <h3 className="text-center">My Project</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                allproject.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <div className="card-body">
                              <h4 className="card-title">{element.title}</h4>
                              <p className="card-text">{element.description}</p>
                              <Link to={`/viewproject/${element._id}`} className="btn btn-warning">View Project</Link>
                          </div>
                      </div>
                  </div>
                ))
              } 
          </div> </div>:
          <div>
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Blogs yet Created........!</p>
          </div>}
        </div>
    </div>
  )
}
