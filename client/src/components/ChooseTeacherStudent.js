import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChooseTeacherStudent = ({ user, setUser, setLogged }) => {
    const navigate = useNavigate();

    //get logged in user w/token credentials
    //so if user is logged in, this page navigates forward
    useEffect(() => {
        axios.get("http://localhost:8000/currentuser", { withCredentials: true })
            .then(res => {
                if (res.data.level === "student") {
                    navigate('/StudentSelectTeacher')
                    console.log("student logged in")
                } else if (res.data.level === "teacher") {
                    navigate('/TeacherDashboard')
                    console.log("teacher logged in")
                } else {
                    console.log("teacher or student not logged in")
                }
            })
            .catch(err => {
                console.log('currentuser error', err)
            });
    }, [])

    return (
        <div className="mx-auto m-5">
            <h1 className="text-start offset-2">School Supplies</h1>
            <div className="col col-4 mx-auto bg-info p-3 m-4 rounded">
                <a className="btn btn-light m-3 d-flex" href="./TeacherLoginReg">I am a teacher</a>
                <a className="btn btn-light m-3 d-flex" href="./StudentLoginReg">I am a student</a>
            </div>
        </div>
    )
}

export default ChooseTeacherStudent