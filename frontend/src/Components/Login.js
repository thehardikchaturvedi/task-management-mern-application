import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";
import axios from "axios";
import {BASE_URL} from "../constants";

export default function Login() {
    const navigate = useNavigate();
    const [params, setParams] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const {name, value} = e.target;

        setParams(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
        setError("not_registered", "");
        if (name === "password") {
            setError("incorrect_password", "");
        }
    }

    const user = getUser();

    // document.onkeyup = async (e) => {
    //     if (e.which === 13) await login();
    // };

    useEffect(() => {
        if (user) {
            navigate("/tasks");
        }
    }, []);

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const login = async () => {
        const {username, password} = params;

        if (!username) {
            setError("username", "username is required");
        }

        if (!password) {
            setError("password", "password is required");
        }

        if (username && password) {

            try {
                const res = await axios.post(BASE_URL + "login", {
                    ...params
                });
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
                localStorage.setItem("token", res.data.data.token);
                navigate("/tasks");
                setParams({});
            } catch (e) {
                console.log(e);
                if (e.response.data.message === "Invalid Username and Password") {
                    setError("not_registered", "Invalid Username and Password");
                }
            }
        }
    }

    return (
        <div className="card">
            <div className="form">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await login();
                }}>
                    <div className="title">
                        <p>Login</p>
                    </div>
                    {
                        !!errors.not_registered && <span className="mandatory">{errors.not_registered}</span>
                    }
                    <div className="space"/>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" value={params.username || ""} onChange={handleChange}/>
                        {
                            !!errors.username && <span className="mandatory">{errors.username}</span>
                        }
                    </div>
                    <div className="space"/>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={params.password || ""} onChange={handleChange}/>
                        {
                            !!errors.password && <span className="mandatory">{errors.password}</span>
                        }
                        {
                            !!errors.incorrect_password &&
                            <span className="mandatory">{errors.incorrect_password}</span>
                        }
                    </div>
                    <div className="space"/>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="space"/>
                <div>
                    <span>Not registered? <span className="account" onClick={() => navigate("/register")}>Create an account</span></span>
                </div>
            </div>
        </div>
    )
}