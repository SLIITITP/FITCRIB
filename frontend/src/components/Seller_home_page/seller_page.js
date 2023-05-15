import React from "react";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import '../Seller_home_page/seller_page.css';

export default function Seller_home(){

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

//Log out function
    function logOut(){
        localStorage.clear();
    }

    return(
        <div className="seller_page">
            <div>
                <h1>Seller</h1>
            </div>
        </div>
    )
}