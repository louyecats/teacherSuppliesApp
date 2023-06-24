const Student = require('../models/student.model');
//in order to use the secret key on .env file, need to use process for .env files, then the key variable name
const secret = process.env.SECRET_KEY; //refer to web token - package we installed 
const jwt = require('jsonwebtoken'); //need for login functionality - since we won't know the password to compare
const bcrypt = require('bcrypt');


module.exports = {
    register: async (req, res) => {
        try { //before create student, check to see if they already exist, use wait so doesn't run to rest of code
            const potentialStudent = await Student.findOne({ email: req.body.email });
            if (potentialStudent) { //if that findOne returns a value matching existing email- return error message
                return res.status(400).json({
                    message: "Email already exits"
                });
            }
            //instead of creating a new student right away, want to initiate a web token first
            const newStudent = await Student.create(req.body)
            //the info we want to save inside student token is their id and email, any time use token have to pass in the secret variable declared above holding secret key, you can also pass in when it expires
            const userToken = jwt.sign({ _id: newStudent._id, email: newStudent.email, firstName: newStudent.firstName, level: "student"}, secret, { expiresIn: "2h" });
            //create the new cookie that is called userToken that holds our webtoken secret, the httpOnly is based off request, response message
            res.cookie("userToken", userToken, { httpOnly: true }).json({
                message: "Successfully registered a new student!",
                student: newStudent
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // login an existing student
    login: async (req, res) => {
        try { //student is trying to log in w/email+password, so we need to check if there's a student in our database who's email matches the value that comes across in the request form key "email" input 
            //we need to use await to wait to run code to log student in until we find out if they're in database or not
            const student = await Student.findOne({ email: req.body.email });
            if (student) { //if student email is in database, wait to to compare passwords from the request form key "password" input to the found students password in database from findOne method above & return true or false for match
                const passwordMatch = await bcrypt.compare(req.body.password, student.password);
                if (passwordMatch) { //if passwords match, create web token called userToken, that holds the id and email, must pass in the secret variable declared above holding secret key, pass in when expries
                    const userToken = jwt.sign({ _id: student._id, email: student.email, firstName: student.firstName, level: 'student' }, secret, { expiresIn: "2h" });
                    res.cookie("userToken", userToken, secret, { httpOnly: true }).json({
                        message: "Successfully logged in a student!",
                        student: student
                    });
                }
                else { //if passwords don't match
                    res.status(400).json({
                        message: "Invalid login attempt"
                    });
                }
            } else { // error message for  try above, if student email on log in form input is not in database
                res.status(400).json({
                    message: "Invalid login attempt"
                });
            }
        }
        catch (err) {
            return res.json(err);
        }
    },
    //logout an existing student
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}