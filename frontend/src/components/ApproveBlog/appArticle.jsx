import "./approve.css"
import React from "react"
import axios from "axios"
import { useNavigate  } from "react-router-dom"
import { useEffect ,useState} from "react"


import { faSearch,faPlusCircle,faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Moment from "moment"


export const PendingBlogs =()=>{
    let history = useNavigate()
    const [blog,setApproves] = useState([])
    const[heading,setHeading]= useState('')
const[Email,setEmail]= useState('')
const[username,setName]= useState('')
const[content,setContent]= useState('')
const[files,setFiles]=useState('')
const[category,setCategory]=useState('')
    
const[redirect,setRedirect] = useState(false)

    useEffect(()=>{
  
        loadBlogs()
         
      },[])
      
      const loadBlogs = async()=>{
        const result = await axios.get("http://localhost:8070/bApprove/")
        setApproves(result.data)

    }
const handleApprove = async(uID,Email,Uname,IMG,Head,Cat,Con,ID) =>{

    if(window.confirm('Are you sure you want to Aprove  '+Uname+ " Blog?")){

        const data = new FormData()
data.set('userId',uID )
data.set('username',Uname)
data.set('heading',Head)
data.set('email',Email)
data.set('content',Con)
data.set('category',Cat)
data.set('file',IMG)

 await axios.post('http://localhost:8070/blog/',{
             "userId":uID,
             "username":Uname,
             "heading":Head,
             "email":Email,
             "content":Con,
             "category":Cat,
             "image":IMG,
           })
  console.log(data)
  const response = await axios.delete('http://localhost:8070/bApprove/'+ID,{
                   
})
    }

}

const handleDelete = async (Uname,ID)=>{
   try{ 
        if(window.confirm('Are you sure you want to Deny Aprove  '+Uname+ " Blog?")){

            console.log(ID)
            const response = await axios.delete('http://localhost:8070/bApprove/'+ID,{
                   
                 })
                 setRedirect(true)

        }
        if(redirect===true){
            return history("/bApprove")
        }
          }
    catch(err){
       console.log(err)   
       }
       
}
return(<>
<body id="Bbody">
<div>

</div>
<h1 id="h1">Pending Blogs</h1>
<div id="buttons"><button id="btn3" onClick={()=>{history("/BReport")}}><span id="btnText">Generate Report</span><span id="file"><FontAwesomeIcon className="Bicon" icon={faFileAlt}/></span></button></div>
        
<br></br>

 <div id="vCards">
{blog.map((B,k)=>{
return(
    
    
        <div key={k} id="BPcard" >
            <div key={k}className="BPcontainer" id="column" > 

                <p>Heading:{B.heading} </p>
                <p>Content</p>
                <div dangerouslySetInnerHTML={{__html:B.content}} className="content"/><br></br>
                <p>Email: {B.email}</p>
                <p>Date & Time: {Moment(B.createdAt).format(' d MMM yyyy - HH:MM')}</p>
                <button id="approve" onClick={()=>handleApprove(B.userId,B.email,B.username,B.image,B.heading,B.category,B.content,B._id)}>Approve</button>
                <button id="delete" onClick={()=>handleDelete(B.username,B._id)}>Delete</button>
            
            </div>
        </div>
)       
})}
</div>
</body>
</>
)
}
export default PendingBlogs;