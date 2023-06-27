import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StudentViewList = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("")

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        //console.log("logged user" + JSON.stringify(res.data))
        //console.log("res.data.level", res.data.level)
        //set logged in user in  state
        setUser(res.data);
        if (res.data.level !== "student") {
          console.log("student not logged in")
          navigate('/')
        } else {
          // console.log("student logged in")
        }
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [])


  //get all teachers for student to select which teacher has to view lists from 
  useEffect(() => {
    axios.get('http://localhost:8000/teachers/findAll')
      .then(res => {
        console.log("findAllTeachers res.data", res.data)
        setAllTeachers(res.data.teachers)
      })
      .catch(err => console.log(err));
  }, []);

  //get list from teacher's ID selected on form

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
        <h2 className="mt-3">Supplies for {user.firstName}:</h2>
        :
        <h2 className="mt-3 text-start">Supplies:</h2>
      }

      {/* Student Selects Teacher Has To Get Their Supply List */}
      <form>
        <label htmlFor="selectedTeacher" className="mt-3 fw-bolder">Select Teacher: </label>
        <select id="selectedTeacher" value={selectedTeacherId} className="form-select form-select-md mt-3" onChange={(e) => setSelectedTeacherId(e.target.value)}>
          <option>--Select Teacher --</option>
          {allTeachers && allTeachers.map(teacher => (
            <option key={teacher._id} value={teacher._id}>{teacher.pronoun} {teacher.firstName} {teacher.lastName}</option>
          ))}
        </select>
      </form>

      {/* Student Views Selected Teachers Supply List */}
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <p className="text-white">Map supplies go here!</p>
      </div>
    </div>
  )
}

export default StudentViewList