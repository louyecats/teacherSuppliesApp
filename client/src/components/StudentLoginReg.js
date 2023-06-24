import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
        navigate("/StudentViewList") //navigate to pet dashboard
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
        setUser(res.data.user._id)
        //console.log("res.data.user.email",res.data.user.email);
        setLogged(true)
        //put logged user in state
        navigate("/StudentViewList");
      })
      .catch(err => {
        console.log("Login errors", err);
        const errorResponse = err.response.data.message;
        setErrorsLogin(errorResponse)
      });
  }
  return (
    <div className="mx-auto m-5">
      <h1>Student</h1>
      <h2 className="text-start offset-2">Register</h2>
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <form action="" className="col" onSubmit={registerHandler}>
          {/* {errorsReg.map((err, index) => <p className="text-danger" key={index}>{err}</p>)} */}

          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="form-control" name="firstName" id="firstName" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="form-control" name="lastName" id="lastName" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" name="email" id="email" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" name="password" id="password" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" onChange={regChangeHandler}></input>
          </div>
          <button className="btn btn-dark mt-3">Register</button>
        </form>
      </div>

      <h2 className="text-start offset-2">Login</h2>
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <form action="" className="col" onSubmit={loginHandler}>
          {/* {errorsLogin && <p className="fst-italic text-danger">{errorsLogin}</p>} */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" name="email" id="email" onChange={logChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" name="password" id="password" onChange={logChangeHandler}></input>
          </div>
          <button className="btn btn-dark mt-3 col-3">login</button>
        </form>
      </div>
    </div>
  )
}

export default StudentLoginReg