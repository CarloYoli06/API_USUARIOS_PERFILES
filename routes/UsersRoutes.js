const express = require('express');
const { createUser, getUser,getAllUsers, updateUser, deleteUser } = require('../controllers/UsersController'); // Usa require

const router = express.Router();

// Rutas para usuarios
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; // Usa module.exports