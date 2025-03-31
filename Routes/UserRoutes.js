// const express = require('express')
// const route = express.Router()
// const {login,register,about,contact} = require("../Controller/Api")
// const { SpecificAuth } = require('../Middleware/auth')

// route.get('/login',SpecificAuth, login)
// route.get('/register',SpecificAuth, register)
// route.get('/about',about)
// route.get('/contact',contact)

// module.exports = route

const route = require("express").Router()
const {login,register,home,dashboard} = require("../Controller/Api")
const auth = require('../Middleware/auth')


route.post("/register",register);

route.post("/login",login );

route.get('/home',home)

route.get('/dashboard',auth, dashboard)


module.exports = route;
