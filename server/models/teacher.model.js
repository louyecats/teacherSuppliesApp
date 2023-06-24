const mongoose = require('mongoose');
//bring in middleware to create model/collection
const {isEmail} = require('validator'); 
//instead of bringing in everything from npm validator package - just bring in {isEmail}, then use it to validate the email key in Teacher Model //this creates a built-in REGEX email pattern validation 
const bcrypt = require('bcrypt');

const TeacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "Last name cannot exceed 50 characters"],

    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [50, "Last name cannot exceed 50 characters"],

    },
    pronoun: {
        type: String,
        required: [true, "Pronoun is required"],
        minlength: [2, "Pronoun must be at least 2 characters"],
        maxlength: [10, "Pronoun cannot exceed 10 characters"],

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long']
    }

}, { timestamps: true });

//middleware to create virtual field confirm password
TeacherSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

//middleware to validate the password and confirm password
TeacherSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

//pre(save) meaning before save Teacher instance, use middleware to hash the password
TeacherSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

//export the model file to access it on controller.js
const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
//blueprint created, now goes into mongoose.model - & creates collection with the 'name' 
