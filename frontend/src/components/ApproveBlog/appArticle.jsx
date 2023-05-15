
import React from "react"
import axios from "axios"
import { useNavigate  } from "react-router-dom"
import { useEffect ,useState} from "react"
import Moment from "moment"


export const MyBlogs =()=>{
    let history = useNavigate()
    const [blog,setApproves] = useState([])
   
const[redirect,setRedirect] = useState(false)

    useEffect(()=>{
  
        loadBlogs()
         
      },[])
      const loadBlogs = async()=>{
        const result = await axios.get("http://localhost:8070/bApprove/")
        setApproves(result.data)
    }


const handleDelete = async (email,Uname)=>{
   try{ 
        if(window.confirm('Are you sure you want to Approve  '+Uname+ " Blog?")){

            const response = await axios.delete('http://localhost:8070/bApprove/'+heading,{
                   
                 })
           console.log(response)
        }
        if(redirect.ok){
            setRedirect(true)
            return history("/bApprove")
        }
          }
    catch(err){
       console.log(err)   
       }
}
return(<>
<div>

</div>
<h1 id="h1">Pending Blogs</h1>
<br></br>
 <div id="vCards">
{blog.map((B,k)=>{
return(
        <div key={k} id="card" >
            <div key={k}className="container" id="column" > 
                <p>Heading:{B.heading} </p>
                <p>Email: {B.email}</p>
                <p>Date & Time: {Moment(B.createdAt).format(' d MMM yyyy - HH:MM')}</p>
                <button id="delete" onClick={()=>handleDelete(B.email,B.username)}>Delete</button>
            </div>
        </div>
)       
})}
</div>
</>
)
}
export default MyBlogs;