import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import {BASE_URL} from "../constants";
import moment from "moment";

export default function TaskForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [task, setTask] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        (async () => {
            if (params.id) {

                try {
                    const token = localStorage.getItem("token");
                    const res = await axios.get(BASE_URL + `tasks/${params.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const task = res.data.data.task;

                    if (task) {
                        setTask({...task, dueDate: moment(task.dueDate).format("YYYY-MM-DD")});
                    } else {
                        navigate("/tasks");
                    }

                } catch (e) {
                    console.log(e);
                }
            }
        })();
    }, []);

    const handleChange = (e) => {
        let {name, value} = e.target;

        setTask(prev => {
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

    const cancel = () => {
        setTask({});
        setErrors({});
        navigate("/tasks");
    }

    const create = async () => {

        const validate = ["title", "description", "dueDate", "priority"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!task[validate[i]]) {
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

        const token = localStorage.getItem("token");

        try {
            await axios[task?.id ? "put" : "post"](BASE_URL + "tasks", task, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.log(e);
        }
        cancel();
    }

    return (
        <div>
            <Profile children={
                <button style={{width: "80px"}} onClick={() => navigate("/tasks")}>Tasks</button>
            }/>
            <div className="card">
                <div className="form">
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        await create();
                    }}>
                        <div className="title">
                            <p>{task.id ? "Update" : "Create"} Task</p>
                        </div>
                        <div className="space"/>
                        <div>
                            <label>Title<span className="mandatory">*</span></label>
                            <input type="text" name="title" value={task.title || ""} onChange={handleChange}/>
                            {
                                !!errors.title && <span className="mandatory">{errors.title}</span>
                            }
                        </div>
                        <div className="space"/>
                        <div>
                            <label>Description<span className="mandatory">*</span></label>
                            <textarea style={{width: "100%"}} rows="4" name="description" value={task.description || ""}
                                      onChange={handleChange}/>
                            {
                                !!errors.description && <span className="mandatory">{errors.description}</span>
                            }
                        </div>
                        <div className="space"/>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{width: "45%"}}>
                                <label>Priority<span className="mandatory">*</span></label>
                                <select value={task.priority || ""} name="priority" onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                {
                                    !!errors.priority && <span className="mandatory">{errors.priority}</span>
                                }
                            </div>
                            <div style={{width: "45%"}}>
                                <label>Due Date<span className="mandatory">*</span></label>
                                <input type="date" name="dueDate" value={task.dueDate || ""} onChange={handleChange}/>
                                {
                                    !!errors.dueDate && <span className="mandatory">{errors.dueDate}</span>
                                }
                            </div>
                        </div>
                        <div className="space"/>
                        <div>
                            <button type="button" onClick={() => cancel()}>Cancel</button>
                            <button type="submit" style={{marginLeft: "5px"}}>{task.id ? "Update" : "Create"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}