const dal = require("../dal/dal");
const uuid = require("uuid");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper")


async function registerAsync(user) {
    const sqlCheckIfUserNameExists = `SELECT  user_name FROM users WHERE user_name = '${user.user_name}'  LIMIT 1`;
    const userName = await dal.executeAsync(sqlCheckIfUserNameExists);
    if (userName.length > 0) {
        return null
    }
    // hash password
    user.password = cryptoHelper.hash(user.password);
    // Create uuid
    user.uuid = uuid.v4();
    const sql = `INSERT INTO users VALUES( '${user.uuid}', '${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}',DEFAULT)`;
    const info = await dal.executeAsync(sql);
    // Delete password so it won't returned to the frontend:
    delete user.password;
    user.token = jwtHelper.getNewToken(user);
    return user;
}

async function loginAsync(credentials) {
    // Hash password:
    credentials.password = cryptoHelper.hash(credentials.password);
    // Get back all columns for login without password
    const sql = `SELECT uuid, first_name, last_name, user_name,isAdmin FROM users WHERE user_name = '${credentials.user_name}' AND password = '${credentials.password}' LIMIT 1`;
    const users = await dal.executeAsync(sql);
    if (users.length === 0) return null;
    const user = users[0];
    user.token = jwtHelper.getNewToken(user);
    return user;
}

module.exports = {
    registerAsync,
    loginAsync,
};
