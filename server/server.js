const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser'); //to use cookies in express for JWT
require('dotenv').config(); //to access and use process.env
require('./config/mongoose.config');

require('./config/mongoose.config');
app.use(express.json(), express.urlencoded({extended:true}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser()); //to use cookies in express for JWT


//bring in routes to server & give app we imported access to them
require('./routes/teacher.routes')(app); //comment out til later
require('./routes/student.routes')(app); 
require('./routes/supplyList.routes')(app); 

app.listen(port, () => console.log(`Listening on port: ${port}`));