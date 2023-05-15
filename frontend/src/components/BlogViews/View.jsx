import "./Bview.css"
import { FaSearch} from "react-icons/fa"
import React ,{ useEffect ,useState} from "react"
import axios from "axios"
import { useNavigate} from "react-router-dom"
import Moment from 'moment'

export const View =()=>{
    let history = useNavigate()


    const [blog,setBlogs] = useState([])
    const [review,setReviews] = useState([])
    const [show,setShow] = useState(false)
    const [BID,setBID] = useState([])
    const [stars,setStars] = useState(0)
    const [comment,setComment] = useState('')
    const [search,setSearch] = useState([])

    useEffect(()=>{
        const loadReviews = async()=>{
            const result = await axios.get('http://localhost:8070/review/')
            setReviews(result.data)
            setComment(result.comment)
            setStars(result.stars)
            setBID(result.BID)
        }
    loadReviews()
    console.log([stars])
       
    loadBlog()
       
},[])
      const loadBlog = async()=>{
          const result = await axios.get('http://localhost:8070/blog')
          setBlogs(result.data)
      }

return(< >
<body className="Bbody">
    <div>
      
    <h1 id="h1">Educational Content Blogs</h1>
        <br></br>
        <faFontAwesome icon="fa-solid fa-print" />
    {/*Search*/}
    <div id="searchBoxUser">
               <input id="search"
                     value={search}  onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='  Search Blogs' type='search'
                     /><span id="searchIcon"><FaSearch/></span>
           </div>

 <div>
<div id="vCards">  
{blog   .filter((B)=>B.heading.toLowerCase().includes(search))
        .map((B,k)=>{
            let totalStars = 0
            let count = 0
            function calStars(e)
            {
              totalStars = totalStars+e
            }
            {review.map((B)=>{
            
              count = count+1
                calStars(B.stars)
              })
            }
            console.log(count)
            totalStars = Math.round(totalStars/count) //wanna chnage 1 decimal
            console.log(totalStars)
         
return(

        <div key={k} id="Bcard" >
            <div key={k}className="Bcontainer" id="column" > <div onClick={()=>{history("/blog/"+B._id)}}>
                <img id="imgCard" src={'http://localhost:8070/'+B.image} alt="P 1" width="100%"></img>
                <h2 >{B.heading} </h2>
                <p >Category: {B.category}</p>
                <p >Date & Time: {Moment(B.createdAt).format(' d MMM yyyy - HH:MM')}</p>
                </div>
                <br></br>
            </div>
        </div>
      
)       
})}
       </div>{/*viewcard*/}
    </div>
     </div>
     </body>
</>     
)
}

export default View;