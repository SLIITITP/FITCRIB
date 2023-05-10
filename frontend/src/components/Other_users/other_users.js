import React, {useEffect, useState} from "react";
import axios from "axios";
import '../Other_users/other_user.css';

export default function Other_users(){

    const [data, setData] = useState([]);

    //get all users

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8070/user");

        // console.log(response.data);
        if (response.status === 200) {
            setData(response.data);
            console.log(response.data);
        }
    }

    return(
        <div className="Otherusers_page">
            <h1>Other Users Account</h1>

            {/* search bar */}
            <input type="" placeholder="Search user" className="usersearch " />


            {data && [data].map((item, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.Fullname}</td>
                        <td>{item.Username}</td>
                    </tr>
                );
            })}

        </div>
    )
}