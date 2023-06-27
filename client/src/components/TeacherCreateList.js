import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const TeacherCreateList = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [supplyList, setSupplyList] = useState({
    SupplyListName: "",
    SupplyListItems: ""
  });

  const onChangeHandler = (e) => {
    //console.log(e)
    setSupplyList({
      ...supplyList,
      [e.target.name]: e.target.value
    })
  }

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        console.log("logged user" + JSON.stringify(res.data))
        //console.log("res.data.level", res.data.level)
        //set logged in user in  state
        if (res.data.level !== "teacher") {
          navigate('/')
          console.log("teacher not logged in")
        } else {
          setUser(res.data);
          // console.log("teacher logged in")
        }
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // if no user logged in, redirect
    if (!user) {
      navigate('/')
      // if user logged in, continue
    } else {
      //prevent default behavior of the submit
      //make a post request to create a new supplyList
      console.log("---------", supplyList)
      axios.post('http://localhost:8000/api/supplyList/create', supplyList, { withCredentials: true })
        .then(res => {
          console.log("This is the response", res);
          console.log("This is response.data", res.data);
          navigate('/TeacherDashboard')
        })
        .catch((err) => {
          console.log("CreateList errors", err.response.data);
          const errorResponse = err.response.data.message;
          setErrors(errorResponse)
        })
    };
  }
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

    const homeButton = (e) => { navigate("/TeacherDashboard") }

    return (
      <div className="mx-auto col-8 m-5">
        <div className="row">
          <h1 className="col text-start">School Supplies</h1>
          <button className="col-2 btn btn-info" onClick={homeButton}>Home</button>
          <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
        </div>

        {/* <div className='App'> */}
        {/* ------- HEADER ------- */}

        {/* ------- MAIN -------*/}
        {/* <div className='prompt1_main'> */}

        {/* ------- ROW 1 -------*/}
        {/* <div className="row-1">
          <h1>Teacher Create List</h1>
        </div> */}

        <div className="col mx-auto bg-info p-3 m-4 rounded">
          {user && user.firstName ?
            <h2 className="mt-3 text-start">Create a List for {user.firstName}:</h2>
            :
            <h2 className="mt-3">Create a List:</h2>
          }

          {/* ------- ROW 2/FORM -------*/}
          <form className="col rounded p-2" onSubmit={onSubmitHandler}>
          {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
            <div className="">
              <label htmlFor="SupplyListName">Supply List Name:</label><br />
              <input type="text" name="SupplyListName" id="SupplyListName" value={supplyList.SupplyListName} className="form-control" onChange={onChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="SupplyListItems">Supply Items:</label><br />
              <textarea type="text" id="SupplyListItems" name="SupplyListItems" rows="15" cols="70" value={supplyList.SupplyListItems} className="form-control" onChange={onChangeHandler}>
              </textarea>
            </div>

            <button className="btn btn-dark mt-3">Submit Supply List</button>

          </form>

        </div>

      </div> // ------- app div ------- 
    ) // ------- closing return -------  
  }// ------- closing TeacherCreateList ------- 

  export default TeacherCreateList;