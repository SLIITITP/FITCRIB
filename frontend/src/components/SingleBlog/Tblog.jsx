import "./blog.css"
import { FaChevronLeft} from "react-icons/fa"
import React from "react"
import 'react-quill/dist/quill.snow.css'
import { useEffect ,useState} from "react"
import { useParams ,useNavigate} from "react-router-dom"
import Star from "../Review/Star"
import Moment from 'moment'

export const Tblog =()=>{

const [blog,setBlogs] = useState([])
const [review,setReview] = useState([])
const [show,setShow] = useState(false)
const [BID,setBID] = useState('')
const [stars,setStars] = useState(0)
const [comment,setComment] = useState('')

let history = useNavigate()

let totalStars = 0
let count = 0
const {id} = useParams() 

const bid = id;


useEffect(()=>{
  
    fetch('http://localhost:8070/review/'+bid)
    
    .then(response =>{
      response.json().then(rev =>{
          setReview(rev)
      })
    })
    console.log(review)

    fetch('http://localhost:8070/blog/'+id)
    
    .then(response =>{
      response.json().then(blog =>{
          setBlogs(blog)
          setBID(blog.id)
      })
    })


},[])
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
totalStars =(totalStars/count).toFixed(1) //wanna chnage 1 decimal
console.log(totalStars)

return(<>
<body id="BTbody">
<div >
  
<button className="Bback" onClick={()=>{history("/tBview")}}><FaChevronLeft></FaChevronLeft></button></div>
        <h1 className="h1">Educational Content Blog</h1>
        <br></br>

        <div className="viewBack">
                
                <img src={'http://localhost:8070/'+blog.image} alt="P 1" width="100%"></img>
               <div className="contentView">
                <h2 >{blog.heading} </h2>
                <p >Category: {blog.category}</p>
                <div dangerouslySetInnerHTML={{__html:blog.content}} className="content"/>
                 <br></br>
                <p >Author : {blog.username}</p>
                
                <br></br>
                <p>Date & Time:{Moment(blog.createdAt).format(' d MMM yyyy')}</p>
                <br></br>
              
                <div id="review"><h2>Reviews & Ratings</h2></div><br></br>
                <div  id="review"><h2><Star stars={totalStars}></Star></h2></div>
                
                
              </div>  
        </div>
        </body>
    </>     
)
}
export default Tblog;