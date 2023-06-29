const SupplyListController = require('../controllers/supplyList.controller');
const TeacherController = require('../controllers/teacher.controller');

module.exports = app => {
    app.post('/api/supplyList/create', SupplyListController.createSupplyList);
    app.get('/api/supplyList/readAll', SupplyListController.getAllByLoggedTeacher);

    app.get('/api/supplyList/allLists', SupplyListController.getAllSupplyLists);

    app.get('/api/supplyList/getAllByTeacher/:id', SupplyListController.getAllBySelectedTeacher);
    app.get('/api/supplyList/readOne/:id', SupplyListController.getOneSupplyList);
    app.patch('/api/supplyList/update/:id', SupplyListController.updateSupplyList);
    app.delete('/api/supplyList/delete/:id', SupplyListController.deleteSupplyList);
    app.get('/currentuser', TeacherController.loggedUser);

}