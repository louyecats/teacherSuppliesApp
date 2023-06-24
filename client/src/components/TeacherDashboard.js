import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TeacherDashboard = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        console.log("logged user" + JSON.stringify(res.data))
        console.log("res.data.level",res.data.level)
        //set logged in user in  state
        setUser(res.data);
        if (res.data.level !== "teacher") {
          console.log("teacher not logged in")
          navigate('/')
        } else {
          console.log("teacher logged in")
          }
        })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [])

  const logoutHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/teacher/logout", {}, { withCredentials: true })
      .then(res => {
        setUser(null);
        setLogged(null);
        console.log("logged out", res.data.firstName);
        window.location.href = '/'; //when user logs out route home
      })
      .catch(err => console.log('logoutHandler error', err));
  };

  const createList = (e) => { navigate("/TeacherCreateList") }
  const viewList = (e) => { navigate("/TeacherViewList") }

  return (
    <div className="mx-auto m-5">
      <div className="row">
        <h1 className="col text-start offset-2">School Supplies</h1>
        <button className="col-1 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>

      <h2 className="mt-3">Welcome {user.firstName}</h2>
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <button className="btn btn-dark d-flex mx-auto" onClick={viewList}>View List</button>
        <button className="btn btn-dark d-flex mx-auto mt-3" onClick={createList} >Create List</button>

      </div>
    </div>
  )
}

export default TeacherDashboard