import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import student from '../assets/student.png';
import bOval from '../assets/bodyoval.png';

const StudentViewOneList = ({ user, setUser, setLogged, selectedListId }) => {
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

  //get one supply list by id
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      axios.get(`http://localhost:8000/api/supplyList/readOne/${selectedListId}`, { withCredentials: true })
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
    axios.post("http://localhost:8000/student/logout", {}, { withCredentials: true })
      .then(res => {
        setUser(null);
        setLogged(null);
        //console.log("logged out", res.data.firstName);
        window.location.href = '/'; //when user logs out route home
      })
      .catch(err => console.log('logoutHandler error', err));
  };

  const homeButton = (e) => { navigate("/StudentSelectTeacher") }

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
        <img className='student' alt="Student Login and Registration" src={student} />
      </div>
      {/* ------- MAIN -------*/}


      <div className="bodyOvalList" style={{ backgroundImage: `url(${bOval})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}>
        {user && user.firstName ?
          <h2 className="mt-3 text-start">{user.firstName}'s {supplyList.SupplyListName} List:</h2>
          :
          ""
        }
        <div>
          {/* orig SupplyListItems.replace(",", "<ul>") - but, replace only replaces the first occurrence of the comma in SupplyListItems string. For multiple items separated by commas, use split and map (c/o chatGPT) */}
          {supplyList.SupplyListItems.split(",").map((item, index) => (
            <li key={index} className="text-white text-start  fs-4">{item.trim()}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentViewOneList