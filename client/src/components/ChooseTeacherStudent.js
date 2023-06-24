import React from 'react'

const ChooseTeacherStudent = () => {
    return (
        <div>
            <h1 className="text-start offset-2">School Supplies</h1>
            <div className="col col-3 mx-auto bg-info p-3 m-4 rounded">
                <a className="btn btn-dark m-3" href="./TeacherLoginReg">I am a teacher</a>
                <a className="btn btn-dark m-3" href="./StudentLoginReg">I am a student</a>
            </div>
        </div>
    )
}

export default ChooseTeacherStudent