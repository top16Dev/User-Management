const User = require('../../model/user');
const UserClass = require('../../class/UserClass');

const ifExistUserAccount = (email) => {
  return new Promise((resolve, reject) => {
    User.find({
        email: email,
      })
      .exec()
      .then((response) => {
        resolve(response);
      })
      .catch((err) => console.log('existEmailToBeValidated ERR :', err));
  });
};

const ifExistUserNickName = (nickname) => {
  return new Promise((resolve, reject) => {
    User.find({
        nickname: nickname,
      })
      .exec()
      .then((response) => {
        resolve(response);
      })
      .catch((err) => console.log('existNickNameToBeValidated ERR :', err));
  });
};

const saveNewUserAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    let user = new User(await UserClass.CreateNewUser(data));
    user
      .save()
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        console.log('saveNewUserAccount ERR :', err);
        resolve(false);
      });
  });
}

const activeUser = (teamname, nickname) => {
  return new Promise(async (resolve, reject) => {
    var response = (await ifExistUserNickName(nickname));
    var active = response[0].active;
    for(var i = 0; response[0].teamname[i]; i++){
      if(response[0].teamname[i] === teamname){
        active[i] = !active[i];
        break;
      }
    }
    User.updateOne({
      nickname: nickname
    }, {active: active})
    .then((res) => {
      resolve(true);
    })
    .catch((err) => {
      console.log('activeUser with teamname ERR : ', err);
      resolve(false);
    });
  });
}

const getUsers = (limitCount, pageIndex, search) => {
  return new Promise(async(resolve, reject) => {
    // if(totalCount + limit > pageIndex * limit){
      User.find({
        nickname: {$regex: `.*${search}.*`}
      })
      .skip((pageIndex - 1) * limitCount)
      .limit(parseInt(limitCount))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log('Error occured in getting users : ', err);
        resolve(false);
      });
    // } 
  });
}

const getAllUserCount = () => {
  return new Promise(async(resolve, reject) => {
    User.find({})
    .then((res) => {
      resolve(res.length);
    })
    .catch((err) => {
      resolve(0);
    });
  });
}

const deleteUser = (nickname) => {
  return new Promise(async(resolve, reject) => {
    if((await ifExistUserNickName(nickname)).length != 1){
      resolve(false);
    } else {
      User.deleteOne({
        nickname: nickname
      })
      .then((res) => {
        // console.log(nickname, res.length);
        resolve(true);
      })
      .catch((err) => {
        console.log('Error occured in deleting a user : ', err);
        resolve(false);
      });
    }
  })
}

const updateUser = (nickname, data) => {
  return new Promise(async(resolve, reject) => {
    if((await ifExistUserNickName(nickname)).length != 1){
      resolve(false);
    } else {
      User.updateOne({
        nickname: nickname
      },{
        nickname: data.nickname,
        password: data.password,
        email: data.email,
        fullname: data.fullname,
        // role: data.role,
      })
      .then((res) => {
        // console.log(nickname, res.length);
        resolve(true);
      })
      .catch((err) => {
        console.log('Error occured in deleting a user : ', err);
        resolve(false);
      });
    }
  })
}

module.exports = {
  ifExistUserAccount,
  ifExistUserNickName,
  saveNewUserAccount,
  activeUser,
  deleteUser,
  getUsers,
  updateUser,
  getAllUserCount
};