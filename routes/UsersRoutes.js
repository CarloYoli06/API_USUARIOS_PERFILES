// routes/UsersRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/UsersController');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;