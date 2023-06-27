import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const TeacherCreateList = () => {
  const [supplyList, setSupplyList] = useState({
    SupplyListName: "",
    SupplyListItems: ""
  });

  const onChangeHandler = (e) => {
    console.log(e)
    setSupplyList({
      ...supplyList,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //prevent default behavior of the submit
    //make a post request to create a new supplyList
    console.log("---------", supplyList)
    axios.post('http://localhost:8000/api/supplyList/create', supplyList)
      .then(res => {
        console.log("This is the response", res);
        console.log("This is response.data", res.data);
        navigate('/TeacherDashboard')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='App'>
      {/* ------- HEADER ------- */}

      {/* ------- MAIN -------*/}
      <div className='prompt1_main'>

        {/* ------- ROW 1 -------*/}
        <div className="row-1">
          <h1>Teacher Create List</h1>
        </div>

        {/* ------- ROW 2/FORM -------*/}
        <form className="col-md-6 offset-3 mt-6 bg-white rounded p-2" onSubmit={onSubmitHandler}>


          <div className="">
            <label htmlFor="SupplyListName">Supply List Name:</label><br/>
            <input type="text" name="SupplyListName" id="SupplyListName" value={supplyList.SupplyListName} className="form-control" onChange={onChangeHandler} />
          </div>

          <div className="form-group">
            <label htmlFor="SupplyListItems">Supply Items:</label><br/>
            <textarea type="text" id="SupplyListItems" name="SupplyListItems" rows="15" cols="70" value={supplyList.SupplyListItems} className="form-control" onChange={onChangeHandler}>
            </textarea>
          </div>

          <button className="btn btn-success mt-3">Submit Supply List</button>

        </form>

      </div>

    </div> // ------- app div ------- 
  ) // ------- closing return -------  
}// ------- closing TeacherCreateList ------- 

export default TeacherCreateList;