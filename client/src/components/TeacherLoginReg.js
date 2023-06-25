import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TeacherLoginReg = ({ user, setUser, setLogged }) => {

  const navigate = useNavigate();
  const [errorsLogin, setErrorsLogin] = useState([]);
  const [errorsReg, setErrorsReg] = useState([]);

  //register 
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pronoun: "",
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
    axios.post("http://localhost:8000/teacher/register", userInfo, { withCredentials: true })
      .then(res => {
        console.log("new registered user", res.data)
        setUser(res.data._id) //put loggedUser in state
        setLogged(true) //put logged user in state
        navigate("/TeacherDashboard") //navigate to pet dashboard
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
    axios.post("http://localhost:8000/teacher/login", loginInfo, { withCredentials: true })
      .then(res => {
        console.log("logged in res.data", res.data);
        setUser(res.data.teacher._id)
        //console.log("res.data.user.email",res.data.user.email);
        setLogged(true)
        //put logged user in state
        navigate("/TeacherDashboard");
      })
      .catch(err => {
        console.log("Reg errors", err.response.data);
        const errorResponse = err.response.data.message;
        setErrorsLogin(errorResponse)
      });
  }

  return (
    <div className="mx-auto m-5">
      <h1>Teacher</h1>
      <h2 className="text-start offset-2">Register</h2>
      <div className="col-8 mx-auto bg-info p-3 m-4 rounded">
        <form action="" className="col" onSubmit={registerHandler}>
          {errorsReg.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="form-control" name="firstName" id="firstName" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="form-control" name="lastName" id="lastName" onChange={regChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="pronoun">Pronoun:</label>
            <select
              name="pronoun"
              id="pronoun"
              className="form-control"
              onChange={regChangeHandler}>
              <option value=""></option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
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
          {errorsLogin && <p className="fst-italic text-danger">{errorsLogin}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" name="email" id="email" onChange={logChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" name="password" id="password" onChange={logChangeHandler}></input>
          </div>
          <button className="btn btn-dark mt-3">login</button>
        </form>
      </div>
    </div>
  )
}

export default TeacherLoginReg