import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";
import axios from "axios";
import {BASE_URL} from "../constants";

export default function Register() {
    const navigate = useNavigate();
    const [params, setParams] = useState({});
    const [errors, setErrors] = useState({});

    const user = getUser();

    useEffect(() => {
        if (user) {
            navigate("/tasks");
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setParams(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
    }

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const register = async () => {

        const validate = ["username", "password"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!params[validate[i]]) {
                errs = {...errs, [validate[i]]: `${validate[i]} is required`};
            }
        }

        setErrors(prev => {
            return {
                ...prev,
                ...errs
            }
        });

        if (!Object.keys(errs).length) {
            await save();
        }
    }

    const save = async () => {

        try {
            await axios.post(BASE_URL + "signup", {
                ...params
            });
            setParams({});
            navigate("/");
        } catch (e) {
            console.log(e);
            if (e.response.data.message === "Username Already Registered") {
                setError("registered", "Username already Registered");
            }
        }
    }

    return (
        <div className="card">
            <div className="form">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await register();
                }}>
                    <div className="title">
                        <p>Register</p>
                    </div>
                    <div className="space"/>
                    <div>
                        <label>Username<span className="mandatory">*</span></label>
                        <input type="text" name="username" value={params.username || ""} onChange={handleChange}/>
                        {
                            !!errors.username && <span className="mandatory">{errors.username}</span>
                        }
                        {
                            !!errors.registered && <span className="mandatory">{errors.registered}</span>
                        }
                    </div>
                    <div className="space"/>
                    <div>
                        <label>Password<span className="mandatory">*</span></label>
                        <input type="password" name="password" value={params.password || ""} onChange={handleChange}/>
                        {
                            !!errors.password && <span className="mandatory">{errors.password}</span>
                        }
                    </div>
                    <div className="space"/>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className="space"/>
                <div>
                    <span>Already registered? <span className="account"
                                                    onClick={() => navigate("/")}>Login</span></span>
                </div>
            </div>
        </div>
    )
}