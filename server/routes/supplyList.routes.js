const SupplyListController = require('../controllers/supplyList.controller');

module.exports = app => {
    app.post('/api/supplyList/create', SupplyListController.createSupplyList);
    app.get('/api/supplyList/readAll', SupplyListController.getAllSupplyLists);
    app.get('/api/supplyList/readOne/:id', SupplyListController.getOneSupplyList);
    app.patch('/api/supplyList/update', SupplyListController.updateSupplyList);
    app.delete('/api/supplyList/delete/:id', SupplyListController.deleteSupplyList);
}