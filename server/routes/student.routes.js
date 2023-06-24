const StudentController = require('../controllers/student.controller');

module.exports = app => {
    app.post('/student/register', StudentController.register);
    app.post('/student/login', StudentController.login);
    app.post('/student/logout', StudentController.logout);
    app.get('/currentuser', StudentController.loggedUser);
}