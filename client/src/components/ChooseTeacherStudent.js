import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import IATeacher from '../assets/IAmTeacherOval.png';
import IAStudent from '../assets/IAmStudentOval.png';

const ChooseTeacherStudent = ({ user, setUser, setLogged }) => {
    const navigate = useNavigate();
    const ChooseButton = (e) => { navigate("/") }

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
        <div className="mx-auto col-8 m-5">
            {/* ------- HEADER ------- */}
            <div className='row align-items-center'>
                <div className='col'>
                    <img className="img-fluid SSlogo-image" alt="School Supplies Logo Home button" onClick={ChooseButton} src={SSlogo} />
                </div>
            </div>{/* Header close */}

            {/* ------- MAIN -------*/}

            <div className='chooseTS'>
                <a className="chooseT" href="./TeacherLoginReg"><img className="chooseTimage" alt="I am a teacher" src={IATeacher} /></a>
                <a className="chooseS" href="./StudentLoginReg"><img className="chooseSimage" alt="I am a student" src={IAStudent} /></a>
            </div>
        </div> // Big div close
    )
}

export default ChooseTeacherStudent