import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const StudentSelectTeacher = ({ user, setUser, setLogged }) => {

    const navigate = useNavigate();
    const [allTeachers, setAllTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [errors, setErrors] = useState([]);
    const { id } = useParams();


    //get all teaachers in db
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
        navigate(`/Student/TeacherList/${selectedTeacherId}`)
        
        // axios.get(`http://localhost:8000/api/supplyList/getAllByTeacher/${selectedTeacherId}`)
        //     .then(res => {
        //         console.log("getAllByTeacher res.data", res.data)
        //         setAllTeachers(res.data.teachers)
        //     })
        //     .catch(err => console.log(err))
    }


        // axios.put(`http://localhost:8000/api/appt/${selectedPetId}`, apptObj, { withCredentials: true })
        // axios.patch(`http://localhost:8000/api/appt/${selectedPetId}`, {...pet, appointments: [...pet.appointments, apptObj]}, {withCredentials: true })
        // .then(res => {
        //     console.log("made new appointment!")
        //     window.location.reload(); // Refresh the page
        // })
        // .catch(err => {
        //     console.log(err);
        //     const errorResponse = err.response.data;
        //     const errorArr = [];
        //     for (const key of Object.keys(errorResponse)) {
        //         errorArr.push(errorResponse[key].message)
        //     }
        //     setErrors(errorArr);
        // });

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


return (
    <div className="mx-auto col-8 m-5">

        <div className="row">
            <h1 className="col text-start">School Supplies</h1>
            <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
        </div>

        {user && user.firstName ?
            <h2 className="mt-4">Welcome, {user.firstName}!</h2>
            :
            <h2 className="mt-3 text-start">Find Teacher's Supply List:</h2>
        }
        <div className="col mx-auto bg-info p-3 m-4 rounded">
            <form onSubmit={teacherHandler}>
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