import "./Bcreate.css"
import React from "react"
import 'react-quill/dist/quill.snow.css'
import { useState,useContext } from "react"
import {  useNavigate } from "react-router-dom"
import Editor from "../BlogUpdate/Editor"
import { FaChevronLeft } from "react-icons/fa"

import UserContext from '../ContextComponent/ContextComponent';

export const Create =()=>{

  
  const { user } = useContext(UserContext);
  const userID = user._id

    const history = useNavigate()

const[heading,setHeading]= useState('')
const[email,setEmail]= useState('')
const[username,setName]= useState('')
const[content,setContent]= useState('')
const[files,setFiles]=useState('')
const[category,setCategory]=useState('')
const[redirect,setRedirect] = useState('')

async function createNewPost(event)
{
    const data = new FormData()

    data.set('userId',userID)
    data.set('username',username)
    data.set('heading',heading)
    data.set('email',email)
    data.set('content',content)
    data.set('category',category)
    data.set('file',files[0])
    

    event.preventDefault()
   /* 
    const response = await fetch('http://localhost:8070/blog',{
     method : 'POST',
        body: data,
      })
      console.log(files)
        */
  
    const response = await fetch('http://localhost:8070/bApprove',{
      method:'POST',
      body: data,
    })
    if(response.ok){
      setRedirect(true)
    }
     /* axios.post('/create-pdf',data)
      .then(()=>axios.get('fetch-pdf',{ responseType:'blob'}))
      .then((res)=>{
        const pdfBlob = new Blob([res.data],{type:'application/pdf'})
      })*/
}

if(redirect){
    return history("/tBview")
}
    
    return(<>
    <body id="Bbody">
    <div><button className="Bback" onClick={()=>{history("/tBview")}}><FaChevronLeft></FaChevronLeft></button></div>
        
        <h1 id="bH1">Create Blog Page</h1><br></br>
    <form id="Bform" onSubmit={createNewPost}>

    <label className="Blabel">Username*</label> <br></br> 
    <input type="username" id="Binput" value={username} onChange={event=> setName(event.target.value)}  required/><br></br>
    <label className="Blabel">Email</label> <br></br> 
    <input type="email" id="Binput" value={email} onChange={event=> setEmail(event.target.value)} required/><br></br>
    <label className="Blabel">Blog Heading</label> <br></br> 
    <input type="heading" id="Binput" value={heading} onChange={event=> setHeading(event.target.value)} required/><br></br>
    <label className="Blabel">Category</label>
    <br></br>
    <select id="selectItems" name="category" placeholder="select category" onChange={event => setCategory(event.target.value)} required>
    <option id="bOption" value="Phisic">Phisic</option>
    <option id="bOption" value="Health">Health</option>
    <option id="bOption" value="Diet">Diet</option>
    <option id="bOption" value="Exercises">Exercise</option>
  </select>
  <br></br>
    <label className="Blabel" >Image</label>
    <input  type="file"  name="image" className="imgStyle"
    onChange={event => setFiles(event.target.files)} required/><br></br><br></br>
    <label className="Blabel">Content</label> <br></br> 
    <Editor 
    value={content} 
    onChange={setContent}/>
    
    <button style={{marginTop:'60px',marginLeft:'30px'}} type="submit" className="Btncreate">create</button>
     </form>
     </body>
        </>
    )
    
}
export default Create;