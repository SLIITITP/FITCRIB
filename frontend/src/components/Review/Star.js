import "./star.css"
import React from "react";
import {FaStar, FaStarHalf, FaStarHalfAlt} from "react-icons/fa"
import {AiOutlineStar} from "react-icons/ai"
import styled from "styled-components"

const Star=({stars})=>{
    const ratingStar = Array.from({length:5},(elem,index)=>{
       
        
        let number = index +0.5

        return( 
        <span key = {index}>
            {stars >= index + 1 ? (
                <FaStar className="icon"/>) :stars >= number? 
                ( <FaStarHalfAlt className="icon"/> ): (
                    <AiOutlineStar className="icon" />
                    )}
        </span>
        )
    })
    
    return (
        <Wrapper>
            
          <>{stars}</><div id="alignCon"><p></p>
        <div className="icon-style">{ratingStar}</div>
        </div>
        
        </Wrapper>
    )
}
const Wrapper = styled.section`

.icon-style{
    display: inline-block;
    gap:0.2rem;
    align-items: end;

.icon{
    font-size:2rem;
    color:orange;
}
.empty-icon{
    font-size: 2.6rem;
}
P{
    margin: 0;
    padding-left:1.2 rem;
}p{
    postition:absolute;
    bottom:23px;
}
}`

export default Star;