var express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authCheck = require('../middleware/check-auth');
//=> End of declared dependencies

// @desc    Signup new user
// @route   POST /api/v1/users/signup
// @access  Public
router.post('/signup', userController.createNewAccount);

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
router.post('/login', userController.loginUser);

//@desc    	Login user
//@route 	GET /api/v1/users/cjesus
router.get('/:user', authCheck.isLoggedIn, authCheck.watchUserProfile, userController.watchUserProfile);
router.put('/:teamname/:usernickname', authCheck.isLoggedIn, authCheck.activeUser, userController.activeUser);
// router.post('/getusers/:limitCount/:pageIndex', authCheck.isLoggedIn, authCheck.isWatchAuthorized, userController.getUsers);
router.post('/getusers', authCheck.isLoggedIn, authCheck.isWatchAuthorized, userController.getUsers);
router.post('/getallusercount', authCheck.isLoggedIn, authCheck.isWatchAuthorized, userController.getAllUserCount);

router.post('/delete/:usernickname', authCheck.isLoggedIn, authCheck.isEditAuthorized, userController.deleteUser);
router.post('/update/:usernickname', authCheck.isLoggedIn, authCheck.isEditAuthorized, userController.updateUser);

module.exports = router;