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
          <Route element={<ChooseTeacherStudent />} path="/"  user={user} setUser={setUser} setLogged={setLogged} default />
          <Route element={<TeacherLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherLoginReg" />
          <Route element={<TeacherDashboard user={user} setUser={setUser} setLogged={setLogged}/>} path="/TeacherDashboard"  />
          <Route element={<TeacherCreateList user={user} setUser={setUser} setLogged={setLogged} />} path="/TeacherCreateList"  />
          <Route element={<TeacherViewList user={user} setUser={setUser} setLogged={setLogged}/>} path="/supplyList/readOne/:id"  />
          <Route element={<TeacherEditList />} path="/TeacherEditList" user={user} setUser={setUser} setLogged={setLogged} />
          <Route element={<StudentLoginReg user={user} setUser={setUser} setLogged={setLogged}/>} path="/StudentLoginReg"  />
          <Route element={<StudentViewList user={user} setUser={setUser} setLogged={setLogged}/>} path="/StudentViewList"  />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
