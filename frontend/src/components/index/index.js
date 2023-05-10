import React from "react";
import '../index/index.css';

export default function Index(){
    return(
        <div className= "index_bg">
            <div>
                <h1 className="name">FitCrib</h1>
                <ul class="nav justify-content-end nav-underline">
                    <li class="nav-item1">
                        <a class="nav-link" href="/login">LOGIN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/add">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <div className="he1">
                <p>BUILD</p>
            </div>
            <div className="he2">
                <p>YOUR BODY</p>
            </div>
            <div className="he3">
                <p>TRANSFORM YOUR SELF</p>
            </div>
            <div className="he4">
                <p align = "left">WE PROVIDE OUR BEST OPPORTUNITY AND QUALIFIED TRAINERS<br></br>
                FOR THE BEST WORKOUT YOURSELF AS YOU WANT</p>
            </div>
        </div>
    )
}