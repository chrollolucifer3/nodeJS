const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.post('/login', UserController.login);
router.get('/login', UserController.get);  
router.get('/signup', UserController.signup); 
router.post('/signup/create-user', UserController.createUser); 
router.get('/logout', UserController.out)
router.get('/update-user', UserController.getUser)
router.get('/update-user/:id', UserController.manageUser)
router.post('/update-user/:id', UserController.updateUser)
router.get('/delete-user/:id', UserController.deleteUser)

module.exports = router