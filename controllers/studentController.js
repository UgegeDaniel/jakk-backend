const jwt = require('jsonwebtoken')
const Student = require('../models/studentModel')
const validator = require('validator')
const bcrypt = require("bcrypt")
const JWT_SECRET = process.env.JWT_SECRET

//TOKEN CREATION
const createToken = (_id) => {
    return jwt.sign({ _id }, `${JWT_SECRET}`, { expiresIn: '3d' })
}

//SIGN UP CREDENTIALS VALIDATION
const validateSignUpCredentials = async (email, password, userName) => {
    let error = ''
    const exists = await Student.findOne({ email }) ? true : false
    if (!email || !password || !userName) {
        error = 'Please fill in a valid email, user name and a password'
    } else if (!validator.isEmail(email)) {
        error = 'Please enter a valid Email Addresss'
    }
    else if (password && !validator.isStrongPassword(password)) {
        error = 'Please enter a strong password'
    }
    else if (exists) {
        error = ' A student already exists with that email'
    }
    else {
        error = ''
    }
    return error
}

//LOG IN CREDENTIALS VALIDATION
const validateLoginCredentials = async (email, password) => {
    const student = await Student.findOne({ email })
    let error = ''
    if (!email || !password) {
        error = 'Please provide an email and a password'
    } else if (!student) {
        error = 'Student not found with that email'
    } else if (student) {
        const match = await bcrypt.compare(password, student.password)
        if (!match) {
            error = 'Please provide a correct password'
        }
    }
    return error
}

//LOG IN  CONTROLLER
const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email })
    const error = await validateLoginCredentials(email, password)
    if (error) {
        res.status(400).json({ error })
    } else {
        const token = createToken(student._id)
        const { userName } = student
        res.status(200).json({ email, token, userName })
    }
}

//SIGN UP  CONTROLLER
const signupStudent = async (req, res) => {
    const { email, password, userName } = req.body;
    const error = await validateSignUpCredentials(email, password, userName)
    if (error) {
        res.status(400).json({ error })
    } else {
        const student = Student.signup(email, password, userName)
        const token = createToken(student._id)
        res.status(200).json({ email, token, student })
    }
}

//UPDATE STUDENT HISTORY CONTROLLER
const updateStudentHistory = async (req, res) => {
    const { email, newData } = req.body;
    try {
        const student = await Student.findOne({ email });
        const {_id, history} = student
        await Student.updateOne({_id} , {$push: {history : newData}});
        const token = createToken(student._id)
        res.status(200).json({ email, token, student })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    loginStudent,
    signupStudent,
    updateStudentHistory
}
