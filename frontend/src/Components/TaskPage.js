import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import {BASE_URL} from "../constants";
import moment from "moment";

export default function TaskPage() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");
    const [filters, setFilters] = useState({});

    useEffect(() => {
        (async () => {
            await getTasks();
        })();
    }, [filters]);

    const getTasks = async () => {

        try {
            const res = await axios.get(BASE_URL + `tasks?${new URLSearchParams(filters)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    params: {
                        ...filters
                    }
                }
            });

            setTasks(res.data.data.tasks);
        } catch (e) {
            console.log(e);
        }
    }

    const updateTask = async (id, value) => {
        console.log(value)
        try {
            await axios.put(BASE_URL + "tasks", {
                id, isCompleted: value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

        } catch (e) {
            console.log(e);
        }

        await getTasks();
    }

    const deleteTask = async (id) => {

        try {
            await axios.delete(BASE_URL + "tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {id}
            });
        } catch (e) {
            console.log(e);
        }

        await getTasks();
    }

    return (
        <div>
            <Profile children={
                <button style={{width: "80px"}} onClick={() => navigate("/tasks/new")}>Add Task</button>
            }/>
            <div className="eventPage">
                <div style={{display: "flex", justifyContent: "end"}}>
                    <p style={{fontWeight: "bold", marginRight: "5px"}}>Task Status:</p>
                    <select value={filters.type} onChange={(e) => setFilters({status: e.target.value})}
                            style={{width: "135px"}}>
                        <option value="all_tasks">All Tasks</option>
                        <option value="completed_tasks">Completed Tasks</option>
                        <option value="overdue_tasks">OverDue Tasks</option>
                    </select>
                </div>
                <div style={{margin: "10px 0"}}/>
                <table className="table">
                    <thead>
                    <tr>
                        <th width="6%">Sr no.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Is Complete</th>
                        <th width="10%" colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks?.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{moment(item.dueDate).format("YYYY-MM-DD")}</td>
                                <td>{item.priority}</td>
                                <th style={{width: "120px", textAlign: "center"}}>
                                    <input checked={item.isCompleted}
                                           onChange={(e) => updateTask(item.id, e.target.checked)}
                                           style={{width: "15px", height: "15px"}} type="checkbox"/></th>
                                <td>
                                    <button onClick={() => navigate(`/tasks/${item.id}`)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    !tasks.length &&
                    <p style={{textAlign: "center", marginTop: "15px"}}>No results</p>
                }
            </div>
        </div>
    )
}