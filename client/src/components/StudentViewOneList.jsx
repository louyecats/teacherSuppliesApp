import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'


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
      <div className="row">
        <h1 className="col text-start">School Supplies</h1>
        <button className="col-2 btn btn-info" onClick={homeButton}>Home</button>
        <button className="col-2 btn btn-dark" onClick={logoutHandler}>Logout</button>
      </div>

      <div className="col mx-auto bg-info p-3 m-4 rounded">
        {user && user.firstName ?
          <h2 className="mt-3 text-start">{user.firstName}'s {supplyList.SupplyListName} List:</h2>
          :
          ""
        }
        <div>
          {/* orig SupplyListItems.replace(",", "<ul>") - but, replace only replaces the first occurrence of the comma in SupplyListItems string. For multiple items separated by commas, use split and map (c/o chatGPT) */}
          {supplyList.SupplyListItems.split(",").map((item, index) => (
            <li key={index} className="text-white text-start offset-1 fs-4">{item.trim()}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentViewOneList