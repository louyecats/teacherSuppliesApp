import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import student from '../assets/student.png';
import bOval from '../assets/bodyoval.png';

const StudentSelectList = ({ user, setUser, setLogged, selectedTeacherId, selectedListId, setSelectedListId }) => {

    const navigate = useNavigate();
    const [allLists, setAllLists] = useState([]);
    const [teacherLists, setTeacherLists] = useState([])
    const [errors, setErrors] = useState([]);


    //get all lists from one teacher
    useEffect(() => {
        console.log("selectedTeacherId", selectedTeacherId)
        axios.get(`http://localhost:8000/api/supplyList/getAllByTeacher/${selectedTeacherId}`)
            .then(res => {
                console.log(("findAllListsByTeachers res.data", res.data))
                setTeacherLists(res.data)
            })
            .catch(err => {
                console.log('findAllListsByTeachers error', err)
            });
    }, [])


    const listHandler = (e) => {
        e.preventDefault();
        console.log("about to navigate to selected list", selectedListId)
        navigate(`/Student/supplyList/${selectedListId}`)
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
                    <h2 className="mt-4">Welcome, {user.firstName}!</h2>
                    :
                    <h2 className="mt-3 text-start">Find Teacher's Supply List:</h2>
                }

                <form onSubmit={listHandler}>
                    <div className="form-group">
                        <label htmlFor="teacherSelect" className="fw-bolder">Select List: </label>
                        <select id="teacherSelect" value={selectedListId} className="form-control" onChange={(e) => setSelectedListId(e.target.value)}>
                            <option value="">-- Select List --</option>
                            {teacherLists && teacherLists.map(list => (
                                <option key={list._id} value={list._id}>
                                    {list.SupplyListName}
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

export default StudentSelectList