const mongoose = require('mongoose');

async function CreateNewUser(data) {
  return new Promise(async (resolve, reject) => {
    resolve({
      _id: new mongoose.Types.ObjectId(),
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      teamname: ["root"],
      role: [0],
      active: [false]
    });
  });
}


module.exports = {
  CreateNewUser,
};
