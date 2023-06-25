// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChooseTeacherStudent from './components/ChooseTeacherStudent';
import TeacherLoginReg from './components/TeacherLoginReg';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherCreateList from './components/TeacherCreateList';
import TeacherViewList from './components/TeacherViewList';
import TeacherEditList from './components/TeacherEditList';
import StudentLoginReg from './components/StudentLoginReg';
import StudentViewList from './components/StudentViewList';


function App() {
  const [user, setUser] = useState("")
  const [logged, setLogged] = useState(false)

  return (
    <div className="App">
      {/* These are the routes for front end! */}

      <BrowserRouter>
        <Routes>
          <Route element={<ChooseTeacherStudent />} path="/" default />
          <Route element={<TeacherLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherLoginReg" default />
          <Route element={<TeacherDashboard user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherDashboard" default />
          <Route element={<TeacherCreateList />} path="/TeacherCreateList" default />
          <Route element={<TeacherViewList user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherViewList" default />
          <Route element={<TeacherEditList />} path="/TeacherEditList" default />
          <Route element={<StudentLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/StudentLoginReg" default />
          <Route element={<StudentViewList user={user} setUser={setUser} setLogged={setLogged}/>} path="/StudentViewList" default />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
