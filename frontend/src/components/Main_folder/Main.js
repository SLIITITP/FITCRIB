import { defaults } from "chart.js";
import React from "react";
import style_Main from './style_Main.css';
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="NThome">
      <div className="NT_con">
        <h1 className="NT_txtindex">Nutrition Tracking Management System</h1>
  
        <div className="NTmain_row_duplicate">
          <div className="NT_col">
            <div className="NTcard_main">
              <div className="card-body_main">
                <h2 className="card-title_main">Create Diet Plan </h2>
                <hr />
                <h3 className="NTcard-text_main">
                  Create Your Diet Plan Here! Let's Start Now
                </h3>
                <Link to="/addDietPlan">
                  <button type="button" className="btn btn-success"> 
                    Create Diet Plan
                  </button>
                </Link>
              </div>
            </div>
          </div>
  
          <div className="NT_col">
            <div className="NTcard_main">
              <div className="card-body_main">
                <h2 className="card-title_main">BMI Calculator</h2>
                <hr />
                <h3 className="card-text_main">
                  Calculate Your BMI Value with Weight(lbs)
                </h3>
                <Link to="/appBMI">
                  <button type="button" className="btn btn-success">
                    BMI Calculator
                  </button>
                </Link>
              </div>
            </div>
          </div>
  
          <div className="NT_col">
            <div className="NTcard_main">
              <div className="card-body_main">
                <h2 className="card-title_main">Set Nutrition Goal</h2>
                <hr />
                <h3 className="card-text_main">
                  Set your Nutrition Goal With Time Duration
                </h3>
                <Link to="/goalSetting/">
                  <button type="button" className="btn btn-success">
                    Set Nutrition Goal
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}
