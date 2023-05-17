
import './style_Appbmi.css';
import React from "react";
import {useState} from "react";


function Appbmi(){
  const [weight,setWeight] = useState();
  const [height,setHeight] = useState();
  const [bmi,setBMI] = useState("");
  const [message,setMessage] = useState("......");

  let Bmical = (event) => {
    //change inputs
    event.preventDefault()

    if(Number(weight === 0 || height === 0)){
        alert("Please enter a valid weight and height");
    }else{
        let bmi = (weight/(height * height) * 703);
        setBMI(bmi.toFixed(1))
        //Display message

        if(bmi < 25){
            setMessage("You Are Underweight");
          
        }else if(bmi >= 25 && bmi < 30){
          setMessage("You Are Healthyweight")
           
        }else {
            setMessage("You Are Overweight");
         
        }
        
    }
  }

  //Image result fro user input
  let imgSrc;
  if(bmi <1) {
      imgSrc = null;
  } else{
      if(bmi < 25){
             imgSrc = require('./img/overweight.png');
          }else if (bmi >= 25 && bmi < 30){
              imgSrc = require('./img/vector1.png');

      }
      else{
          imgSrc = require('./img/overweight.png');
         


      }
      
  }

  let  reload =() =>{
      window.location.reload()
  }


  return(
    <body>
      <div className="Appbmi">
        <div className="containerbmi">
          <h2 className="txth2">BMI Calculater</h2><hr></hr>
          <form onSubmit={Bmical}>
            <div>
              <label className='txth2'>Weight(lbs)</label>
              <input className='number_input' type="number" value={weight} onChange={(event) => setWeight(event.target.value)} min="0" required/>
            </div>
            <div>
              <label className='txth2'>Height(in)</label>
              <input className='input height' type="number" value={height} onChange={(event) => setHeight(event.target.value)} min="0" required/>
            </div>
            <div>
              <button className="NTMBIbtn1" type="submit">Submit</button>
              <button className="NTMBIbtn2" onClick={reload} type="submit">Re-Enter</button>
            </div>
          </form>
          <div className="view">
            <h3 className='txth2'>your BMI is :{bmi}</h3>
            <p className='txth2'>{message}</p>
            <div className="img-container">
              <img className='img' src={imgSrc} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Appbmi;
