import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import student from '../assets/student.png';
import bOval from '../assets/bodyoval.png';

const StudentSelectTeacher = ({ user, setUser, setLogged, selectedTeacherId, setSelectedTeacherId }) => {

    const navigate = useNavigate();
    const [allTeachers, setAllTeachers] = useState([]);
    //const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [errors, setErrors] = useState([]);
    const { id } = useParams();


    //get all teachers in db
    useEffect(() => {
        axios.get('http://localhost:8000/teachers/findAll', { withCredentials: true })
            .then(res => {
                //the response is an array of objects that we will set in state
                console.log("findAllTeachers res.data.teachers", res.data.teachers)
                setAllTeachers(res.data.teachers)
            })
            .catch(err => console.log(err))
    }, []);

    const teacherHandler = (e) => {
        e.preventDefault();
        console.log("selecteteacherid", selectedTeacherId)
        //navigate(`/Student/TeacherList/${selectedTeacherId}`)
        navigate('/Student/TeacherList')
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/student/logout", {}, { withCredentials: true })
            .then(res => {
                setUser(null);
                setLogged(null);
                console.log("logged out", res.data.firstName);
                window.location.href = '/'; //when user logs out route home
            })
            .catch(err => console.log('logoutHandler error', err));
    };

    const homeButton = (e) => { navigate("/StudentSelectTeacher") }

    return (
        <div className="mx-auto col-8 m-5">

            {/* ------- HEADER ------- */}
            <div className='row align-items-center'>
                <div className='col-md-6'>
                    <img className="img-fluid SSlogo-image" alt="School Supplies Logo Home button" onClick={homeButton} src={SSlogo} />
                </div>
                <div className='col-md-6 text-md-end mt-3 mt-md-0'>
                    <button className="btn btn-dark" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className="col text-end">
                <img className='student' alt="Student Login and Registration" src={student} />
            </div>
            {/* ------- MAIN -------*/}

            <div className="bodyOval" style={{ backgroundImage: `url(${bOval})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}>
                {user && user.firstName ?
                    <h2 className="welcome">Welcome, {user.firstName}!</h2>
                    :
                    <h2 className="welcome">Find Teacher's Supply List:</h2>
                }
                <form className="bOvalForm" onSubmit={teacherHandler}>
                    {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

                    <div className="form-group">
                        <label htmlFor="teacherSelect" className="fw-bolder">Select Teacher: </label>
                        <select id="teacherSelect" value={selectedTeacherId} className="form-control" onChange={(e) => setSelectedTeacherId(e.target.value)}>
                            <option value="">-- Select Teacher --</option>
                            {allTeachers && allTeachers.map(teacher => (
                                <option key={teacher._id} value={teacher._id}>
                                    {teacher.pronoun} {teacher.firstName} {teacher.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-dark text-light d-flex mx-auto m-3 p-2">Submit</button>
                </form>
            </div>

        </div>
    )
}
export default StudentSelectTeacher;