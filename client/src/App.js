// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TeacherLoginReg from './components/TeacherLoginReg';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherCreateList from './components/TeacherCreateList';
import TeacherViewList from './components/TeacherViewList';
import TeacherEditList from './components/TeacherEditList';
import StudentLoginReg from './components/StudentLoginReg';
import StudentSelectTeacher from './components/StudentSelectTeacher'
import ChooseTeacherStudent from './components/ChooseTeacherStudent';
import StudentSelectList from './components/StudentSelectList'
import StudentViewOneList from './components/StudentViewOneList';


function App() {
  const [user, setUser] = useState("")
  const [logged, setLogged] = useState(false)
  const [lists, setLists] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");  
  const [selectedListId, setSelectedListId] = useState("");

  return (
    <div className="App">
      {/* These are the routes for front end! */}

      <BrowserRouter>
        <Routes>
          <Route element={<ChooseTeacherStudent />} path="/"  user={user} setUser={setUser} setLogged={setLogged} default />

          <Route element={<TeacherLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherLoginReg" />

          <Route element={<TeacherDashboard user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherDashboard"  />

          <Route element={<TeacherCreateList user={user} setUser={setUser} setLogged={setLogged} />} path="/TeacherCreateList"  />

          <Route element={<TeacherViewList user={user} setUser={setUser} setLogged={setLogged}/>} path="/supplyList/readOne/:id"  />

          <Route element={<TeacherEditList user={user} setUser={setUser} setLogged={setLogged} />} path="/TeacherEditList/:id" />

          <Route element={<StudentLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/StudentLoginReg"  />
          
          <Route path="/StudentSelectTeacher" element={<StudentSelectTeacher user={user} setUser={setUser} setLogged={setLogged} selectedTeacherId={selectedTeacherId} setSelectedTeacherId={setSelectedTeacherId} />} />

          <Route path="/Student/TeacherList" element={<StudentSelectList user={user} setUser={setUser} setLogged={setLogged} selectedTeacherId={selectedTeacherId} selectedListId={selectedListId} setSelectedListId={setSelectedListId} />} />

          <Route element={<StudentViewOneList user={user} setUser={setUser} setLogged={setLogged} selectedListId={selectedListId} setSelectedListId={setSelectedListId}/>} path="Student/supplyList/:selectedListId"  />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
