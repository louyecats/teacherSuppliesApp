import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const StudentSelectTeacherList = ({ user, setUser, setLogged }) => {

    const navigate = useNavigate();
    const [allLists, setAllLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState("");
    const [errors, setErrors] = useState([]);
    const { selectedTeacherId } = useParams();

    //get all lists from one teacher
    useEffect(() => {
        axios.get(`http://localhost:8000/api/supplyList/getAllByTeacher/${selectedTeacherId}`)
            .then(res => {
                //the response is an array of objects that we will set in state
                console.log("findAllListsByOneTeacher res.data", res.data)
                setAllLists(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    const listHandler = (e) => {
        e.preventDefault();
        navigate(`/`)
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
                <form onSubmit={listHandler}>
                    <div className="form-group">
                        <label htmlFor="teacherSelect" className="fw-bolder">Select List: </label>
                        <select id="teacherSelect" value={selectedListId} className="form-control" onChange={(e) => setSelectedListId(e.target.value)}>
                            <option value="">-- Select List --</option>
                            {allLists && allLists.map(list => (
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

export default StudentSelectTeacherList