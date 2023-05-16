import React, { useState } from "react";
import "../Other_users/other_user.css";
import {FaSearch} from "react-icons/fa"
import Othimg1 from "../Other_users/OthSearchimg1.jpg";
import Othimg2 from "../Other_users/OthSearchimg2.jpg";
import Othimg3 from "../Other_users/OthSearchimg3.jpg";

export default function OtherUsers(){

    const [input,setInput] = useState("");
    const [result, setResult] = useState([]);

    const fetchData = (value) => {
        fetch("http://localhost:8070/user").then((Response) => Response.json()).then(json => {
            const results = json.filter((users) => {
                return (value && users && users.Fullname && users.Fullname.includes(value))
            });
            setResult(results)
        });
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return(
        <div className="otheruserPage">
            <div className="User-search-bar-container">
                <div className="User-input-wrapper">
                    <FaSearch id="User-search-icon"/>
                    <input placeholder=" &nbsp;Type to search..." className="UserSearchInput" value={input} onChange={(e)=>
                        handleChange(e.target.value)
                    }/>
                </div>
                <div className="User-results-list" results={result}>
                    {
                        result.map((resu, _id) => {
                            return <div key={_id} className="User-search-result" onClick={(e)=> {
                                e.preventDefault();
                                window.location.href = `/otherUserProfile/${resu._id}`
                            }}>{resu.Fullname}</div>
                        })
                    }
                </div>
            </div>
            <br/><br/><br/>
            <div className="row othimgR">
                <div className="column othimgC">
                    <img src={Othimg1} className="Othimg1"/>
                </div>
                <div className="column othimgC">
                    <img src={Othimg2} className="Othimg2"/>
                </div>
                <div className="column othimgC">
                    <img src={Othimg3} className="Othimg3"/>
                </div>
            </div>
        </div>
    )
}