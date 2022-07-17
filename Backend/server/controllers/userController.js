const userService = require("../services/userServices/index");

const createNewAccount = (req, res, next) => {
  userService.addNewUser(req, req.body, res);
};

const loginUser = (req, res, next) => {
	userService.loginUser(req, req.body, res);
}

const watchUserProfile = (req, res, next) => {
	userService.watchUserProfile(req, req.body, res);
}

const activeUser = (req, res, next) => {
	userService.activeUser(req, res);
}

const getUsers = (req, res, next) => {
	userService.getUsers(req, res);
}

const deleteUser = (req, res, next) => {
	userService.deleteUser(req, res);
}

const updateUser = (req, res, next) => {
	userService.updateUser(req, res);
}

const getAllUserCount = (req, res, next) => {
  userService.getAllUserCount(req, res);
}

module.exports = {
  createNewAccount,
  loginUser,
  watchUserProfile,
  activeUser,
  getUsers,
  deleteUser,
  updateUser,
  getAllUserCount
};
