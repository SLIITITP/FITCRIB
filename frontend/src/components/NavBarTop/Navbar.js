import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'; 
import './Navbar.css'; 
import { useNavigate } from "react-router-dom";

export default function Navbar()  {

    const navigate = new useNavigate();
  const MyWorkouts = () => {
    let path = `/MyWorkouts`;
    navigate(path);
  };

  const Home = () => {
    let path = `/`;
    navigate(path);
  }
    return(
        <>
            <div className='navBar'>
                <div className='navBar-left'>
                    <Link to='/' className='navBar-logo' onClick={Home}>
                        <img src='' alt='logo' />
                    </Link>
                </div>
                <div className='navBar-center'>
                    <ul className='navBar-menu'>
                        <li className='navBar-item' onClick={MyWorkouts}>
                            <Link  className='navBar-link' onClick={MyWorkouts}>
                                WORKOUT PLANS
                            </Link>
                        </li>
                        <li className='navBar-item'>
                            <Link to='/profile' className='navBar-link'>
                                EXERCISES
                            </Link>
                        </li>
                        <li className='navBar-item'>
                            <Link to='/myorders' className='navBar-link'>
                                MARKETPLACE
                            </Link>
                        </li>
                        <li className='navBar-item'>
                            <Link to='/myorders' className='navBar-link'>
                                EDUCATIONAL CONTENT
                            </Link>
                        </li>
                        <li className='navBar-item'>
                            <Link to='/myorders' className='navBar-link'>
                                NUTRITION PLAN
                            </Link>
                        </li>
                        <li className='navBar-item'>
                            <Link to='/myorders' className='navBar-link'>
                                RECIPES
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='navBar-Right'>
                    <div className='Profile-Wrap'>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -17 40 60" id="user"><path fill="#ffffff" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"></path></svg>
                    </div> 
                </div>
            </div>  
        </>
    );
}  

