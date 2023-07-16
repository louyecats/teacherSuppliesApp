import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import teacher from '../assets/teacher.png';
import bOval from '../assets/bodyoval.png';

const TeacherViewList = ({ user, setUser, setLogged }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [supplyList, setSupplyList] = useState({
    SupplyListName: "",
    SupplyListItems: "",
    creator: ""
  })

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        //console.log("logged user" + JSON.stringify(res.data))
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

  //get one supply list by id
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      axios.get(`http://localhost:8000/api/supplyList/readOne/${id}`, { withCredentials: true })
        .then(res => {
          //console.log("one supply list", res.data.supplyList);
          setSupplyList(res.data.supplyList);
        })
        .catch(err => {
          console.log("get one supply list error", err);
        });
    }
  }, []);


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



  const deleteList = (e) => {
    axios.delete(`http://localhost:8000/api/supplyList/delete/${id}`, { withCredentials: true })
      .then(res => console.log(res))
      .catch(err => console.log("deleteList error", err))
    navigate("/")
  }

  const homeButton = (e) => { navigate("/TeacherDashboard") }

  return (
    <div className="mx-auto col-8 m-5">

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

      <div className="bodyOvalList" style={{ backgroundImage: `url(${bOval})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", backgroundPosition: "center" }}>
        {user && user.firstName ?
          <h2 className="mt-5 text-start">{user.firstName}'s {supplyList.SupplyListName} List:</h2>
          :
          ""
        }
        <div>
          {/* orig SupplyListItems.replace(",", "<ul>") - but, replace only replaces the first occurrence of the comma in SupplyListItems string. For multiple items separated by commas, use split and map (c/o chatGPT) */}
          {supplyList.SupplyListItems.split(",").map((item, index) => (
            <li key={index} className=" fs-4">{item.trim()}</li>
          ))}
        </div>
        <div className=" mx-auto p-5 m-4 rounded">
          <Link to={"/TeacherEditList/" + supplyList._id} className="btn btn-dark">Edit List</Link>
          <button className="btn btn-danger" onClick={(e) => {
            const confirmDelete = window.confirm(
              "Delete List?"
            )
            if (confirmDelete === true) { deleteList(id) }
          }}>Delete</button>
        </div>
      </div>


    </div>
  )
}

export default TeacherViewList