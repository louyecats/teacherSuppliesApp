import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

const StudentViewList = ({ user, setUser, setLogged }) => {

    const navigate = useNavigate();
    const [allDbLists, setAllDbLists] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [errors, setErrors] = useState([]);
    const { id } = useParams();


    //get all lists in db
    useEffect(() => {
        axios.get('http://localhost:8000/api/supplyList/allLists')
            .then(res => {
                //the response is an array of objects that we will set in state
                console.log("findAllDbLists res.data", res.data)
                setAllDbLists(res.data.supplyLists)
            })
            .catch(err => console.log(err))
    }, []);

    // const [formObj, setFormObj] = useState({
    //     teacherSelect: "",
    //     listSelect: ""
    // })

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

            {/* Student Selects Teacher Has To Get Their Supply List */}
            <div className="mx-auto bg-info p-3 m-4 rounded">
                <div>
                    {allDbLists.map(list => {
                        const { creator } = list; // Destructure the creator object from the list
                        return (
                            <form key={creator._id}>
                                <div className="form-group">
                                    <label htmlFor="teacherSelect" className="fw-bolder">Select Teacher:</label>
                                    <select id="teacherSelect" className="form-control">
                                        <option value="">-- Select Teacher --</option>
                                        <option key={creator._id} value={creator._id}>
                                            {creator.firstName} {creator.lastName}
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="listSelect" className="fw-bolder">Select List:</label>
                                    <select id="listSelect" className="form-control">
                                        <option value="">-- Select List --</option>
                                        {allDbLists.filter(thisList => thisList.creator._id === creator._id).map(list => (
                                            <option key={list._id} value={list._id}>
                                                {list.SupplyListName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btn-dark text-light d-flex mx-auto m-3 p-2">Submit</button>
                            </form>
                        );
                    })}

                </div>
            </div >
        </div >
    )
}
export default StudentViewList