import { useContext, useState } from "react"
import Axios from "axios"
import { GlobValues } from "../Globaldata";

export const Dashcontent = () => {
    const {getAllproject} = useContext(GlobValues);
    const [create,setCreate] = useState(false);
    const [message,setMessage] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    Axios.defaults.withCredentials=true;
    const createproj = ()=>{
        if(title === '' || description === ''){
            setMessage("field should not be empty..!");
                setTimeout(()=>{
                    setMessage("");
                },2000);
        }else{
        Axios.post('http://localhost:4000/createproject',{title,description}).then((res)=>{
            if(res.data.status){
                setMessage(res.data.message);
                setTimeout(()=>{
                    setMessage("");
                },2000);
                setTitle("");
                setDescription("");
                getAllproject();
            }
        }).catch((err)=>{
            console.log(err);
        })}
    }
  return (
    <div>
        <div className="create-new">
            <button type="button" className="create-btn" onClick={()=>{setCreate(!create)}}>Create New Project</button>
        </div>
        { create && 
            <div className="create-proj">
                <button className="btn btn-warning mb-4" onClick={()=>{setCreate(!create)}} style={{marginLeft:"200px"}}>Cancel</button>
                {message.length > 0 && <p className="text-success">{message}</p>}
                <div className="form-group">
                    <input type="text" className="form-control sigfield" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Project title"/><br></br>
                    <textarea placeholder="description"value={description} onChange={(e)=>{setDescription(e.target.value)}} className="form-control sigfield" style={{height:"200px"}}></textarea><br></br>
                    <button type="submit" className="btn btn-success mb-3" onClick={createproj}>Create</button>
                </div>
            </div>
        }
    </div>
  )
}
