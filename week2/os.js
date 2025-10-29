const os = require("os");
// get the current user name
const userName = os.userInfo().username;

console.log({ userName });
