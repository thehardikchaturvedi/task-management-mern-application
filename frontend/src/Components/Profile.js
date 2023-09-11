import React from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";
import axios from "axios";
import {BASE_URL} from "../constants";

export default function Profile({children}) {
    const navigate = useNavigate();
    const user = getUser();

    const logOut = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(BASE_URL + "logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.log(e);
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div style={{margin: "50px 100px", display: "flex", justifyContent: "end"}}>
            <div style={{marginRight: "500px"}}>
                <h2>Tasks</h2>
            </div>
            <div style={{textAlign: "center"}}>
                <p>Profile</p>
                <p style={{fontSize: "20px"}}>{user.username}</p>
                <div style={{marginTop: "10px"}}>
                    {children}
                    <span>&nbsp;</span>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}