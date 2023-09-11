import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import TaskPage from "./Components/TaskPage";
import TaskForm from "./Components/TaskForm";
import {getUser} from "./user";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}>
                </Route>
                <Route path="/register" element={<Register/>}>
                </Route>
                <Route path="/tasks" element={
                    <PrivateRoute>
                        <TaskPage/>
                    </PrivateRoute>
                }>
                </Route>
                <Route path="/tasks/new" element={
                    <PrivateRoute>
                        <TaskForm/>
                    </PrivateRoute>
                }>
                </Route>
                <Route path="/tasks/:id" element={
                    <PrivateRoute>
                        <TaskForm/>
                    </PrivateRoute>
                }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function PrivateRoute({children}) {
    const user = getUser();
    return user ? children : <Navigate to="/"/>;
}

export default App;