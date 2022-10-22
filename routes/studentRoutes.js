const express = require('express')
const { loginStudent, signupStudent, updateStudentHistory } = require('../controllers/studentController')
const router = express.Router()

// @desc    Login Student
// @route   POST /student/login
// @access  Public
router.post('/login', loginStudent)

// @desc    Sign up Student
// @route   POST /student/signup
// @access  Public
router.post('/signup', signupStudent)

// @desc    Update student history
// @route   POST /student/updateHistory
// @access  Private
router.post('/updateHistory', updateStudentHistory)
module.exports = router