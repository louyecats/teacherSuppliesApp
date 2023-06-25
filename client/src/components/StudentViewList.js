import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StudentViewList = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        console.log("logged user" + JSON.stringify(res.data))
        console.log("res.data.level", res.data.level)
        //set logged in user in  state
        setUser(res.data);
        if (res.data.level !== "student") {
          console.log("student not logged in")
          navigate('/')
        } else {
          console.log("student logged in")
        }
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [])

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
    <div className="mx-auto m-5">
      <div className="row">
        <h1 className="col text-start offset-2">School Supplies</h1>
        <button className="col-1 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>

      <h2 className="mt-3">Supplies for {user.firstName}:</h2>
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <p className="text-white">Supplies go here</p>
      </div>

    </div>
  )
}

export default StudentViewList