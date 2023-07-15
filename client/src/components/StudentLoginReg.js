import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Import images 📷
import SSlogo from '../assets/SSLogo_bTyC.png';
import loginImage from '../assets/LoginOval.png';
import regImage from '../assets/RegOval.png';
import student from '../assets/student.png';

const StudentLoginReg = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();
  const [errorsLogin, setErrorsLogin] = useState([]);
  const [errorsReg, setErrorsReg] = useState([]);

  //register 
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  //get logged in user w/token credentials
  //so if user is logged in, this page navigates forward
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        if (res.data.level === "student") {
          navigate('/StudentViewList')
          console.log("student logged in")
        } else if (res.data.level === "teacher") {
          navigate('/TeacherDashboard')
          console.log("teacher logged in")
        } else {
          console.log("teacher or student not logged in")
        }
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [])


  const regChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value
    })
  }

  const registerHandler = (e) => {
    e.preventDefault()
    //on submit, do an axios post request to the route, passing in the form data, now since we have cookies, we need to also pass {withcredentials: true}
    axios.post("http://localhost:8000/student/register", userInfo, { withCredentials: true })
      .then(res => {
        console.log("new registered user", res.data)
        setUser(res.data._id) //put loggedUser in state
        setLogged(true) //put logged user in state
        navigate("/StudentSelectTeacher")
      })
      .catch(err => {
        console.log("Reg errors", err);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        console.log("Something went wrong submitHandler")
        setErrorsReg(errorArr);
      });
  }

  //login
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const logChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.id]: e.target.value
    })
  }


  const loginHandler = (e) => {
    e.preventDefault()
    //on submit, do an axios post request to the route, passing in the form data, now since we have cookies, we need to also pass {withcredentials: true}
    axios.post("http://localhost:8000/student/login", loginInfo, { withCredentials: true })
      .then(res => {
        console.log("logged in res.data._id", res.data._id);
        setUser(res.data.user)
        //console.log("res.data.user.email",res.data.user.email);
        setLogged(true)
        //put logged user in state
        navigate("/StudentSelectTeacher");
      })
      .catch(err => {
        console.log("Login errors", err.response);
        const errorResponse = err.response.data.message;
        setErrorsLogin(errorResponse)
      });
  }

  const ChooseButton = (e) => { navigate("/") }

  return (
    <div className="mx-auto col-8 m-5">

      {/* ------- HEADER ------- */}
      <div className='row align-items-center'>
        <div className='col'>
          <img className="img-fluid SSlogo-image" alt="School Supplies Logo Home button" onClick={ChooseButton} src={SSlogo} />
        </div>
        <div className="col text-end">
          <img className='student' alt="Student Login and Registration" src={student} />
        </div>
      </div>{/* Header close */}

      {/* ------- MAIN -------*/}

      <div className='mainLoginReg'>
        {/* ------- Login -------*/}
        <div className="loginDiv" style={{ backgroundImage: `url(${loginImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "right" }}>
          <form action="" className="loginForm" onSubmit={loginHandler}>
            {errorsLogin && <p className="fst-italic text-danger">{errorsLogin}</p>}
            <div className="">
              <label htmlFor="email">Email:</label>
              <input type="text" className="" name="email" id="email" onChange={logChangeHandler}></input>
            </div>
            <div className="">
              <label htmlFor="password">Password:</label>
              <input type="password" className="" name="password" id="password" onChange={logChangeHandler}></input>
            </div>
            <button className="btn btn-dark mt-3">Login</button>
          </form>
        </div>

        {/* ------- Register ------- */}

        <div className="regDiv" style={{ backgroundImage: `url(${regImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
          <form action="" className="registerForm" onSubmit={registerHandler}>

            {errorsReg.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

            <div className="">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" className="" name="firstName" id="firstName" onChange={regChangeHandler}></input>
            </div>
            <div className="">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" className="" name="lastName" id="lastName" onChange={regChangeHandler}></input>
            </div>
            <div className="">
              <label htmlFor="email">Email:</label>
              <input type="text" className="" name="email" id="email" onChange={regChangeHandler}></input>
            </div>
            <div className="">
              <label htmlFor="password">Password:</label>
              <input type="password" className="" name="password" id="password" onChange={regChangeHandler}></input>
            </div>
            <div className="">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" className="" name="confirmPassword" id="confirmPassword" onChange={regChangeHandler}></input>
            </div>
            <button className="btn btn-dark mt-3">Register</button>
          </form>
        </div>

      </div> {/* MainLoginReg div close  */}

    </div> // Big div close 
  )
}

export default StudentLoginReg