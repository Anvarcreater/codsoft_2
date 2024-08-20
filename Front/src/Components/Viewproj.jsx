import { useContext, useEffect, useState } from "react"
import { GlobValues } from "../Globaldata"
import { useParams } from "react-router-dom";
import Axios from "axios";


export const Viewproj = () => {
  const {setAuth,task,setTask} = useContext(GlobValues);
  const [details,setDetails] = useState({});
  const {id} = useParams();
  const [taskname,setTaskname] = useState("");
  const [taskstatus,setTaskstatus]=useState(false);
  const [msg,setMsg] = useState("");
  const [projectstatus,setProjectstatus]=useState("incomplete");

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

  const getdetails = ()=>{
    Axios.get('http://localhost:4000/viewproject/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setDetails(res.data.data);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }

 
  const gettask = ()=>{
    Axios.get('http://localhost:4000/viewtasks/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setTask(res.data.data);
        console.log(res.data.data);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }
  
  const handletask = ()=>{
      if(taskname !== ""){
        Axios.post('http://localhost:4000/assigntask',{
          projectid:id,
          taskname
      }).then((res)=>{
         if(res.data.status){
            console.log(res.data.message);
            gettask();
            setTaskname("");
         }else{
           console.log(res);
         }
      }).catch((err)=>{
         console.log(err);
      })
      }else{
          setMsg("Field should not be empty...!");
          setTimeout(()=>{
            setMsg("");
          },2000);
      }
  }
  const statusupdate = (id)=>{
    Axios.put('http://localhost:4000/updatestatus/'+id,{
      taskstatus:taskstatus }).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        gettask();
      }
    }).catch((err)=>{
       console.log(err);
    })
  }
  const deletetask = (id)=>{
    Axios.delete('http://localhost:4000/deletetask/'+id).then((res)=>{
      if(res.data.status){
        setMsg(res.data.message);
          setTimeout(()=>{
            setMsg("");
          },2000);
          gettask();
      }
    }).catch((err)=>{
       console.log(err);
    })

  }
  useEffect(()=>{
    getdetails();
    gettask();
    },[])
    
   useEffect(()=>{
      var projectstat=0;
      for(let i=0;i<task.length;i++){
        if(task[i].taskstatus === true){
           projectstat+=1;
        }
      }
      if(projectstat === task.length){
          setProjectstatus("complete");
      }else if(projectstat >= 1){
         setProjectstatus("inprogress");
      }else{
        setProjectstatus("incomplete");
      }
   },[task]); 
  return (
    <div>
         <div className="container">
              <div className="project-details">
                  <h4>Project title :  {details.title}</h4>
                  <p className="view-des"><span style={{fontWeight:"bold",fontSize:"18px"}}>Project Description :
                    </span>{details.description}</p>
                <h4>Project status:</h4> { task.length !== 0 ? <button type="button" className={projectstatus === "complete"?"btn btn-success":projectstatus ==="inprogress"?"btn btn-warning":"btn btn-danger"}>
                    {projectstatus === "complete"?"Project Completed":projectstatus ==="inprogress"?"Project Inprogress":"Project InComplete"}</button>:<h5>Project created no task assigned yet....!</h5>}
              </div>
              <div className="view-content mt-4 mb-4">
                    { msg.length >0 ? <p className="text-danger">{msg}</p>:null}
                  <div style={{display:"flex",columnGap:"10px"}}>
                        <input type="text" placeholder="Enter task here" className="form-control sigfield" value={taskname} onChange={(e)=>setTaskname(e.target.value)}/>
                        <button className="btn btn-warning" type="submit" onClick={handletask}>Assign</button>
                  </div>  
              </div>
              { task.length !== 0 ?<div className="view-content mb-4">
                 <h4>Assigned Tasks</h4>
                 <div className="assig-task">
                    {task.map((element,index)=>(
                      <div key={index} className="tasks">
                          <p style={{fontSize:"20px"}}>{element.taskname}</p>
                           <button className={element.taskstatus === true ? "btn btn-success":"btn btn-danger"} onClick={()=>{setTaskstatus(!taskstatus),statusupdate(element._id)}}>
                            {element.taskstatus === true ? "completed":"incomplete"}
                           </button>
                           <button type="button" className="btn btn-danger" onClick={()=>{deletetask(element._id)}}>Delete</button>
                      </div>
                    ))}
                 </div>
              </div>:<div><p className="text-secondary fs-5 text-center">No Task assigned yet</p></div>}
          </div>                   
            
    </div>
  )
}
