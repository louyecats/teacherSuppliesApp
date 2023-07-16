import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import teacher from '../assets/teacher.png';
import bOval from '../assets/bodyoval.png';

const TeacherDashboard = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        // console.log("logged user" + JSON.stringify(res.data))
        //console.log("res.data.level", res.data.level)
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

  const [state, setState] = useState([]);
  // curly brackets make this an object
  // square brackets an array

  useEffect(() => {
    axios.get("http://localhost:8000/api/supplyList/readAll", { withCredentials: true })
      // This needs to match the the axios route to call the getAllProducts function
      .then((res) => {
        console.log("readAllSupplyList", res.data);
        setState(res.data);
        navigate('/TeacherDashboard')
      })
      .catch((err) => {
        console.log("readAllSupplyList", err);
      })
  }, [navigate]);


  const createList = (e) => { navigate("/TeacherCreateList") }

  const homeButton = (e) => { navigate("/TeacherDashboard") }

  return (
    <div className="mx-auto m-5 col-8">

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
        <img className='student' alt="Teacher Login and Registration" src={teacher} />
      </div>
      {/* ------- MAIN -------*/}

      <div className="bodyOval" style={{ backgroundImage: `url(${bOval})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}>
        <h2 className="mt-2">{user.pronoun} {user.firstName}'s' Supply Lists:</h2>
        <div className="mt-4">
          {state.map((supplyList) => {
            return (
              <ul className="list-group" key={supplyList._id}>

                <li className="list-group-item">
                  <Link to={`/supplyList/readOne/${supplyList._id}`} className="link-dark fs-4"> {supplyList.SupplyListName} </Link>
                </li>
              </ul>
            )
          })}
          <button className="btn btn-dark text-light d-flex mx-auto mt-3 p-3" onClick={createList} >Create New List</button>
        </div>

      </div>


    </div>
  )
}

export default TeacherDashboard