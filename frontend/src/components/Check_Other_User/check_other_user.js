import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OthUsericon from '../Check_Other_User/OthUsericon.png';
import '../Check_Other_User/check_other_user.css';

export default function CheckOtherUser() {

    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        let result = await axios.get(`http://localhost:8070/user/get/${params.id}`);

        if (result.status === 200) {
            setData(result.data);
        }
    }
    console.log(data);

    return (
        <div className="CheckOtherUserProfilepage">
            <br/>
            <div className="OthRec">
                <div className="OthHeading"><h1>Other User profile</h1></div>
            </div>
            <div className="otherUserContnet">
                <div className="View_other_user_photo">
                    <form>
                        <img src={OthUsericon} alt="avatar"
                            className="rounded-circle img fluid OthUserImg" />
                        <h3 className="OthName">{data.user?.Fullname}</h3>
                        <h4 className="OthType">{data.user?.UserType}</h4>
                    </form>
                </div>
                <div className="View_other_user_data">
                    <form>
                        <h4 className="OthViewHeading">Full Name : </h4>
                        <h4 className="OthViewDetails">{data.user?.Fullname}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">Email :</h4>
                        <h4 className="OthViewDetails">{data.user?.Email}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">Address :</h4>
                        <h4 className="OthViewDetails">{data.user?.Address}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">Telephone Number :</h4>
                        <h4 className="OthViewDetails">{data.user?.TelephoneNumber}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">User Type :</h4>
                        <h4 className="OthViewDetails">{data.user?.UserType}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">Gender :</h4>
                        <h4 className="OthViewDetails">{data.user?.Gender}</h4>
                        <hr className="Othhrline" />
                        <h4 className="OthViewHeading">Username :</h4>
                        <h4 className="OthViewDetails">{data.user?.Username}</h4>
                    </form>
                </div>
                <br />
                <button type="submit" className="cancelViewOthProfile" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/users`
                }} >Cancel</button>

            </div>
            <br />
        </div>

    )
}