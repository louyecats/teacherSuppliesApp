const TeacherController = require('../controllers/teacher.controller');

module.exports = app => {
    app.post('/teacher/register', TeacherController.register);
    app.post('/teacher/login', TeacherController.login);
    app.post('/teacher/logout', TeacherController.logout);
    app.get('/currentuser', TeacherController.loggedUser);
    app.get('/teachers/findAll', TeacherController.findAllTeachers);
}