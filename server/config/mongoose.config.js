const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/teacherStudentSupplies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    //promise below - since don't know how long connection will take
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));
