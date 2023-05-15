import { defaults } from "chart.js";
import React from "react";
import style_Main from './style_Main.css';
import { Link } from "react-router-dom";

export default function Main() {
  return (
  
        <div className="NThome">
        <body>
          <div className="con">
            <h1 className="txtindex">Nutrition Tracking Management System</h1>

            <div className="row">
              <div className="col-sm-3">
                <div className="card_main">
                  <div className="card-body_main">
                    <h2 className="card-title_main">Create Diet Plan</h2>
                    <hr></hr>
                    
                    <h3 className="card-text_main">
                      Create Your Diet Plan Here!
                    </h3><Link to="/addDietPlan">
                    <button type="button" className="btn btn-success"> 
                      Create Diet Plan
                    </button></Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="card_main">
                  <div className="card-body_main">
                    <h2 className="card-title_main">BMI Calculator</h2>
                    <hr></hr>
                    <h3 className="card-text_main">
                     Calculate Your BMI  Value with Weight(lbs) and 
                    </h3>
                    <Link to="/appBMI">
                    <button type="button" class="btn btn-success">
                      BMI Calculator
                    </button></Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="card_main">
                  <div className="card-body_main">
                    <h2 className="card-title_main">Set Nutrition Goal</h2>
                    <hr></hr>
                    <h3 className="card-text_main">
                        Set your Nutrition Goal With Time Duration
                    </h3>
                    <Link to="/goalSetting/">
                    <button type="button" class="btn btn-success">
                      Set Nutrition Goal
                    </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          
        </body>
        </div>
    
  );
}
