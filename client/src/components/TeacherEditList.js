import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const TeacherEditList = ({ user, setUser, setLogged }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [supplyList, setSupplyList] = useState({
    SupplyListName: "",
    SupplyListItems: ""
  });

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        console.log("logged user" + JSON.stringify(res.data))
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
      });
  }, [])

  //get one supply list by id, set DB values in state to fill in form to edit
  useEffect(() => {
    // if (!user) {
    //   navigate('/')
    //   // if user logged in, continue
    // } else {
    axios.get(`http://localhost:8000/api/supplyList/readOne/${id}`, { withCredentials: true })
      .then(res => {
        //console.log("one supply list", res.data.supplyList);
        setSupplyList(res.data.supplyList);
      })
      .catch(err => console.log("readOne error on edit list", err))
    //}
  }, [])

  const changeHandler = (e) => {
    setSupplyList({
      ...supplyList,
      [e.target.id]: e.target.value
    })
  }

  //send updated data to DB
  const submitHandler = (e) => {
    //console.log("in updateList!", e)
    e.preventDefault();
    axios.patch(`http://localhost:8000/api/supplyList/update/${id}`, supplyList, { withCredentials: true }
    )
      .then(res => {
        console.log("updatelist submithandler res.data", res.data);
        navigate(`/supplyList/readOne/${id}`);
      })
      .catch(err => {
        console.log(err.response.data);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      });
  }

  const deleteList = (e) => {
    axios.delete(`http://localhost:8000/api/supplyList/delete/${id}`, { withCredentials: true })
      .then(res => console.log(res))
      .catch(err => console.log("deleteList error", err))
    navigate("/")
  }
  const homeButton = (e) => { navigate("/TeacherDashboard") }

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

  return (
    <div className="mx-auto col-8 m-5">
      <div className="row">
        <h1 className="col text-start">School Supplies</h1>
        <button className="col-2 btn btn-info" onClick={homeButton}>Home</button>
        <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>

      <div className="col mx-auto bg-info p-3 m-4 rounded">
        {user && user.firstName ?
          <h2 className="mt-3 text-start">{user.firstName}'s List:</h2>
          :
          ""
        }
        <div>
          <form className="col rounded p-2" onSubmit={submitHandler}>

            {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

            <div>
              <label htmlFor="SupplyListName" className="fs-4 mt-2">Name:</label><br />
              <input type="text"
                name="SupplyListName" id="SupplyListName" className="form-control"
                value={supplyList.SupplyListName}
                onChange={changeHandler} />
            </div>
            <div>
              <label className="fs-4 mt-2">Items: </label><br />
              <textarea type="text" id="SupplyListItems" name="SupplyListItems" rows="15" cols="70" value={supplyList.SupplyListItems} className="form-control" onChange={changeHandler}>
              </textarea>
            </div>

            <button className="btn btn-light mt-3 me-2">Submit</button>

            <button className="btn btn-danger mt-3" onClick={(e) => {
              const confirmDelete = window.confirm(
                "Delete List?"
              )
              if (confirmDelete === true) { deleteList(id) }
            }}>Delete</button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default TeacherEditList