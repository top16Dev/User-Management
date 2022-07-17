const userDao = require('../daos/userDao/userDao.js');
// const teamDao = require('../daos/teamDao/teamDao.js');

async function watchUserProfile(req, res, next){
  try { 
    const response = (await userDao.ifExistUserNickName(req.params.user));
    if(response.length === 0){
      res.json({
        message: "That user dosen't exist",
      });

    // } else if(response[0].email === req.session.email || req.session.role[0] >= 4){
    } else if(response[0].email === req.body.email || req.body.role[0] >= 4){
      next();
    } else {
      res.json({
        success: true,
        data: {
          msg: "You aren't authorized",
          fullname: response[0].fullname,
        },
        code: 401
      });
    }
  } catch (error) {
    console.error('error occured while parsing access_token', error, req.headers.authorization);
    res.status(500).json({
      message: 'Not authorized attempt access, this incedent will be reported',
    });
  }
}

async function activeUser(req, res, next){
  try {
    // const response = (await teamDao.ifExistUserNickName(req.params.user));
    if(req.params.teamname === "root"){
      next();
    } else {
      res.json({
        msg: "That team dosen't exist"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error occured while authorizing',
    });
  }
}

async function isWatchAuthorized(req, res, next){
  try {
    // if(req.session.role[0] >= 4){
    if(req.body.role[0] >= 4){
      next();
    } else {
      res.json({
        msg: "You aren't authorized"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error occured while authorizing',
    });
  }
}

async function isEditAuthorized(req, res, next){
  try {
    // if(req.session.role[0] === 7){
    if(parseInt(req.body.role[0]) === 7){
      next();
    } else {
      res.json({
        msg: "You aren't authorized",
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error occured while authorizing',
    });
  }
}

async function isLoggedIn(req, res, next){
  try {
    // console.log(req);
    // if (!req.session.fullname) {
    if (!req.body.email) {
      res.json({
        message: 'Login please',
        success: false,
        code: 401
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occured while checking logged in"
    })
  }
}

module.exports = {
  watchUserProfile,
  activeUser,
  isWatchAuthorized,
  isEditAuthorized,
  isLoggedIn
};
