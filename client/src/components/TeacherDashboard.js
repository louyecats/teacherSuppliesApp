import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

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

  return (
    <div className="mx-auto m-5 col-8">
      <div className="row">
        <h1 className="col text-start">School Supplies</h1>
        <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>


      {/* ------- MAIN -------*/}
      {user && user.firstName? 
      <h2 className="mt-3">Welcome {user.firstName}</h2>
      :
      <h2 className="mt-3">Welcome!</h2>} 
      <table className="table table-bordered mx-auto text-dark mx-auto bg-info col-8 m-5 rounded">
          <thead>
            <tr>
              <th className="h3">Supply Lists:</th>
            </tr>
          </thead>
          <tbody>
            {state.map((supplyList) => {
              return ( 
                <tr key={supplyList._id}>
                  <td>
                    <Link to={`/supplyList/readOne/${supplyList._id}`} className="link-light"> {supplyList.SupplyListName} </Link>
                  </td>
                  {/* Link to needs to have the route! and then the variable is linked */}
                </tr>
              )
            })}
          </tbody>

      </table>
        <button className="btn btn-dark text-light d-flex mx-auto mt-3" onClick={createList} >Create New List</button>

    </div>
  )
}

export default TeacherDashboard