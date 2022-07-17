const userDao = require("../../daos/userDao/userDao.js");

async function addNewUser(req, data, res) {
  //check password length
  if (data.password && data.password.length > 0) {
    const response = (await userDao.ifExistUserAccount(data.email));
    if (response.length === 0) {
      if (await userDao.saveNewUserAccount(data)) {
        res.json({
          success: true,
          data: {
            msg: "Account created with success."
          },
          code: 200
        });
      } 
      else {
        // res.status(500);
      }
    } else {
      res.json({
        success: true,
        data: {
          valid: false,
          // msg: "This account is not active or exists"
          msg: "This email is already in use"
        },
        code: 201
      });
    }
  } 
  else {
    res.json({
      success: true,
      data: {
        valid: false,
        msg: "Password must include more than 0 characters",
        email: data.email,
      },
      code: 407
    });
  }

}

async function activeUser(req, res){
  const response = (await userDao.activeUser(req.params.teamname, req.params.usernickname));
  if(response === true){
    res.json({
      msg: "Active user's account with teamname successfully",
      code: 200,
    })
  } else {
    res.json({
      msg: "Failed",
      code: 406
    })
  }
}

async function loginUser(req, data, res){
  const response = (await userDao.ifExistUserAccount(data.email));
  if (response.length === 0) {
    res.json({
      success: false,
      data: {
        msg: "Account does not exist"
      },
      code: 401
    });
  } else{
    if(response[0].password === data.password){
      if(response[0].active[0] === false){
        res.json({
          success: false,
          data: {
            msg: "Wait please. You are pending!",
          },
          code: 201
        });
      } else {
        // req.session.email = response[0].email;
        // req.session.fullname = response[0].fullname;
        // req.session.role = response[0].role;
        // console.log(req);
        res.json({
          success: true,
          data: {
            msg: "Login success with correct password",
            userid: response[0]._id,
            role: response[0].role[0],
          },
          code: 200
        });
      }
    } else {
      res.json({
        success: false,
        data: {
          msg: "Password is incorrect"
        },
        code: 201
      });
    }
  }
}

async function watchUserProfile(req, data, res){
  if(req.params.user){
    const response = (await userDao.ifExistUserNickName(req.params.user));
    if(response.length === 0){
      res.json({
        success: true,
        data: {
          msg: "That user doesn't exist.",
        },
        code: 200
      });
    } else {
      res.json({
        success: true,
        data: {
          msg: "Success watch user's profile",
          fullename: response[0].fullname,
          email: response[0].email,
          role: response[0].role,
          password: response[0].password,
          nickname: response[0].nickname,
        },
        code: 200
      });
    }
  } else{
    res.json({
      success: true,
      data: {
        msg: "Type correct url",
      },
      code: 401
    });
  }
}

async function getUsers(req, res){
  // const response = (await userDao.getUsers(req.params.limitCount, req.params.pageIndex));
  const response = (await userDao.getUsers(req.body.pageSize, req.body.currentPage, req.body.search));
  const totalCount = (await userDao.getAllUserCount());
  if(response === false){
    res.json({
      success: true,
      data: {
        msg: "Error occured",
      },
      code: 500
    });
  } else {
    res.json({
      success: true,
      data: {
        msg: "Get users successfully",
        users: response,
        total: totalCount
      },
      code: 200
    });
  }
}

async function getAllUserCount(req, res){
  const response = (await userDao.getAllUserCount());
  if(response){
    // console.log(response);
    res.json({
      success: true,
      total: response,
      code: 200,
    }) 
  } else {
    res.json({
      success: false,
      total: 0,
      code: 406
    })
  }
}

async function deleteUser(req, res) {
  const response = (await userDao.deleteUser(req.params.usernickname));
  if(response === true){
    res.json({
      success: true,
      data: {
        msg: "Delete a user successfully",
      },
      code: 200
    });
  } else{
    res.json({
      success: false,
      data: {
        msg: "Failed to delete a user or the account dosen't exist",
      },
      code: 406
    })
  }
}

async function updateUser(req, res) {
  const response = (await userDao.updateUser(req.params.usernickname, req.body.data));
  if(response === true){
    res.json({
      success: true,
      data: {
        msg: "Update a user successfully",
      },
      code: 200
    });
  } else{
    res.json({
      success: false,
      data: {
        msg: "Failed to update a user or the account dosen't exist",
      },
      code: 200
    })
  }
}

module.exports = {
  addNewUser,
  loginUser,
  watchUserProfile,
  activeUser,
  getUsers,
  deleteUser,
  updateUser,
  getAllUserCount
};