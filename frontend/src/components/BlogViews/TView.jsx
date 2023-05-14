
import 'swiper/css'
import 'swiper/css/free-mode'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect ,useState} from "react"
import { faSearch,faPlusCircle,faFileAlt } from "@fortawesome/free-solid-svg-icons"
import Moment from 'moment'

export const TView =()=>{
    let history = useNavigate()
    const [blog,setBlogs] = useState([])
    const [search,setSearch] = useState([])

    useEffect(()=>{
  
        loadBlogs()
         
      },[])
      const loadBlogs = async()=>{
        const result = await axios.get("http://localhost:8070/blog")
        setBlogs(result.data)
    }
return(<>

 <h1 id="h1">Educational Content Blogs</h1>
 <div id="searchBox">
               <input id="search"
                     value={search}  onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='  Search Blogs' type='search'
                     /><span id="searchIcon"><FontAwesomeIcon icon={faSearch}/></span>
           </div>
        <div id="buttons" style={{marginLeft:"40px"}}><button id="btn3" onClick={()=>{history.push("/bCreate")}} ><span id="btnText">Create Blog</span><span id="create"><FontAwesomeIcon icon={faPlusCircle}/></span></button></div>
        <div id="buttons"><button id="btn3" onClick={()=>{history.push("/myBlogs")}}><span id="btnText">My Blog</span><span id="file"><FontAwesomeIcon icon={faFileAlt}/></span></button></div>
        <br></br>

<div id="vCards">
{blog.filter((B)=>B.heading.toLowerCase().includes(search))
    .map((B,k)=>{
return(
        <div key={k} id="card" >
            <div key={k}className="container" id="column" > <div onClick={()=>{history.push("/Tblog/"+B._id)}}>
                <img id="imgCard" src={'http://localhost:8070/'+B.image} alt="P 1" width="100%"></img>
                <p >Heading: {B.heading} </p>
                <p >Username: {B.username}</p>
                <p >Email: {B.email}</p>
                <p >Category : {B.category}</p>
                <p >Date & Time: {Moment(B.createdAt).format(' d MMM yyyy - HH:MM')}</p></div>
                <br></br>
            </div>
        </div>
)       
})}</div>

</>
)
}

export default TView;