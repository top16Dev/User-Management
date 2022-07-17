const userDao = require('../userDao/userDao.js');

const activeUser = (data) => {
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

module.exports = {
  ifExistUserAccount,
  ifExistUserNickName,
  saveNewUserAccount
};