
import React ,{ useRef,useState} from "react"

import { FaStar } from "react-icons/fa";
import {  useNavigate} from "react-router-dom";
import axios from "axios"

function Modal(props) {

  const history = useNavigate()
  const { BID,heading } = props;
  
    const [comment,setComment] = useState([])
    const [stars,setStars] = useState(0)
    const [hover,setHover] = useState(null)
    const [redirect,setRedirect] = useState('')
    
    const valueRef = useRef();

    valueRef.current = stars

   async function addReview(event){
    console.log(valueRef.current)

    const data = new FormData()

    data.set('BID',BID)
    data.set('comment',comment)
    data.set('stars',stars)
        

        event.preventDefault()

        await axios.post('http://localhost:8070/review/',{
             "BID":BID,
             "comment":comment,
             "stars":stars
           })
           setRedirect(true)
        
       }
            
    if(! props.show){
        return null
    }
    if(redirect){
      return history("/Bview")
      }
      

    return(
        <div className="modal">

                <div className="model-header">
                </div>
                <div className="modal-body">
                <form onSubmit={addReview}>
                        <div className="d1"><label>Heading</label>
                        <p>{heading}</p></div>
                        <label>Rating</label><br></br>
                        <div className="center">
                          {[...Array(5)].map((star,i)=>{
                          
                            const ratingValue = i + 1
                            
                             return (
                              <label>
                              <input type="radio" name="stars"  value={ratingValue} onClick={event=> setStars(event.target.value)}></input>

                            <FaStar className="star" size={30} color={ratingValue <=(hover || stars)? "orange" : "#a3a3a3" }
                             onMouseEnter={()=>setHover(ratingValue)}
                             onMouseLeave={()=>setHover(null)}
                             ></FaStar></label>
                          )})}

                      </div>
                      <label>The Rating is {stars}</label><br></br>
                       
                        <label>Review</label><br></br>
                        <textarea name="comment" value={comment}  onChange={event=> setComment(event.target.value)}></textarea><br></br>
                                
                        <button type="submit" className="add">Add</button>
                        <br></br>
                        
                    <button  className="can" onClick={props.onClose}>cancel</button>
                    </form>
                </div>
            </div>
        
    )
}

export default Modal