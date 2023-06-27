import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TeacherViewList = ({ user, setUser, setLogged }) => {
  const navigate = useNavigate();

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        //console.log("logged user" + JSON.stringify(res.data))
       // console.log("res.data.level", res.data.level)
        //set logged in user in  state
        setUser(res.data);
        if (res.data.level !== "teacher") {
          console.log("teacher not logged in")
          navigate('/')
        } else {
         // console.log("teacher logged in")
        }
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [user])

  const logoutHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/teacher/logout", {}, { withCredentials: true })
      .then(res => {
        setUser(null);
        setLogged(null);
        //console.log("logged out", res.data.firstName);
        window.location.href = '/'; //when user logs out route home
      })
      .catch(err => console.log('logoutHandler error', err));
  };

  const homeButton = (e) => { navigate("/TeacherDashboard") }
  const editList = (e) => { navigate("/TeacherEditList") }
////////// DELETE NEEDS FINISHED
  const deleteList = (e) => {""}

  return (
    <div className="mx-auto col-8 m-5">
      <div className="row">
        <h1 className="col text-start">School Supplies</h1>
        <button className="col-2 btn btn-info" onClick={homeButton}>Home</button>
        <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>

      <div className="col mx-auto bg-info p-3 m-4 rounded">
        <h2 className="mt-3 text-start ">{user.firstName}'s List:</h2>
        <ul>
          <li className="text-white text-start">Supplies go here</li>
        </ul>
      </div>

      <div className="col mx-auto bg-info p-3 m-4 rounded">
        <button className="btn btn-light d-flex mx-auto" onClick={editList}>Edit List</button>
        <button className="btn btn-light d-flex mx-auto mt-3" onClick={deleteList} >Delete List</button>
      </div>
    </div>
  )
}

export default TeacherViewList