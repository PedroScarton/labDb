const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUser);
router.post('/add-user', UserController.postAddUser);
router.get('/edit-user/:userId', UserController.getEditUser);
router.post('/edit-user', UserController.postEditUser);
router.post('/delete-user', UserController.postDeleteUser);