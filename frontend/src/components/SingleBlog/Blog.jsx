
import { FaChevronLeft, FaPlusCircle } from "react-icons/fa"
import React from "react"
import 'react-quill/dist/quill.snow.css'
import { useEffect ,useState} from "react"
import { useParams ,useNavigate} from "react-router-dom"
import Modal from "../Review/ReviewModal"
import Star from "../Review/Star"
import Moment from 'moment'

export const Blog =()=>{

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
const OpenModel =(ID)=>{
  
  setBID(ID)
   setShow(true)
   console.log(ID)
   
}
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
totalStars = (totalStars/count).toFixed(1) //wanna chnage 1 decimal

console.log(totalStars)

return(<>
<div >
<button className="back" onClick={()=>{history("/Bview")}}><FaChevronLeft></FaChevronLeft></button></div>
        <h1 id="h1">Educational Content Blog</h1>
        <br></br>

        <div className="viewBack">
                
                <img src={'http://localhost:8070/'+blog.image} alt="P 1" width="100%"></img>
               <div className="contentView">
                <h2 >{blog.heading} </h2>
                <p >Category: {blog.category}</p>
                <div dangerouslySetInnerHTML={{__html:blog.content}} className="content"/>
                 <br></br>
                <p >Author : {blog.username}</p>
              
                <br /><h2>Date</h2>
                <p>{Moment(blog.createdAt).format(' d MMM yyyy - HH:MM')}</p>
                
                <h2>Reviews & Ratings</h2>
                <p><Star stars={totalStars}>{review.BID}</Star></p>
                <h2>{review.BID}</h2>
                
                <button id="btn2" onClick={()=>OpenModel(blog._id)}><span id="addtxt">Add Review </span><span id="add"><FaPlusCircle /></span></button>
             <div className="modal-card">
        	      {show && <Modal BID={blog._id} heading={blog.heading} onClose={()=>setShow(false)} show={show}>
                    </Modal>}</div></div>
                    {review.map((R)=>{
                      return(
                      <>
                        <h3>Comment</h3>
                        <p>{R.comment}</p>
                        <p><Star stars={R.stars}>{R.id}</Star></p>
                        </>
                      )

})
}
            </div>
    </>     
)
}
export default Blog;