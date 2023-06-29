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

  // ADDITIONAL STATE FOR SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // HANDLE SEARCH CHANGE
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  // HANDLE SEARCH SUBMIT
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // perform the search using the searchTerm state
    // and update the searchResults state with the result
    axios.get('https://api.redcircleapi.com/request', {searchTerm}) // replace with your actual search API endpoint
      .then((res) => {
        console.log('handleSearchSubmittttttt',res.data)
        console.log(JSON.stringify(res.data, 0, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onChangeHandler = (e) => {
    setSupplyList({
      ...supplyList,
      [e.target.name]: e.target.value
    })
  }

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/currentuser", { withCredentials: true })
      .then(res => {
        if (res.data.level !== "teacher") {
          navigate('/')
        } else {
          setUser(res.data);
        }
      })
      .catch(err => {
        setUser("")
      });
  }, [])

  const onSubmitHandler = (e) => {
    //prevent default behavior of the submit
    e.preventDefault();
    if (!user) {
      navigate('/')
    } else {
      //make a post request to create a new supplyList
      console.log("---------", supplyList)
      axios.post('http://localhost:8000/api/supplyList/create', supplyList, { withCredentials: true })
        .then(res => {
          navigate('/TeacherDashboard')
        })
        .catch((err) => {
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
            <h2 className="mt-3 text-start">{user.pronoun} {user.firstName}</h2>
            :
            <h2 className="mt-3">Create a List:</h2>
          }

        {/* ADDITIONAL SEARCH FORM */}
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search">Search:</label><br />
          <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
          <input type="submit" value="Search" />
        </form>
        {/* DISPLAY SEARCH RESULTS */}
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>

        <form className="col rounded p-2" onSubmit={onSubmitHandler}>
        {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
          <div className="">
            <label htmlFor="SupplyListName" className="fs-4 mt-2">Supply List Name:</label><br />
            <input type="text" name="SupplyListName" id="SupplyListName" value={supplyList.SupplyListName} className="form-control" onChange={onChangeHandler} />
          </div>

            <div className="form-group">
              <label htmlFor="SupplyListItems" className="fs-4 mt-2">Supply Items:</label><br />
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
