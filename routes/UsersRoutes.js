const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getAllUsers, 
  getUser, 
  updateUser, 
  deleteUser, 
  getUserRecommendations, 
  getUserReputation,
  addUserActivity,
  patchUser
} = require('../controllers/UsersController');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);
router.get('/recommend/:id', getUserRecommendations);
router.get('/reputation/:id', getUserReputation);
router.post('/:id/activity', addUserActivity); 

module.exports = router;