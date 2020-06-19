const jwt = require('jwt-simple');
const { jwtSecret } = require('./config/jwt');
const ClientError = require('./client-error');
const db = require('./database');

module.exports = async (req, res, next) => {
  try {
    // Get token from request headers, header name should be "access-token"
    const token = req.body['access-token'];
    // res.send("token", token)
    // Throw error if no access-token
    // console.log(token);
    if (!token) {
      throw new ClientError('No Token', 401);
    }

    // Use jwt to decode the token
    const decode = jwt.decode(token, jwtSecret);
    // console.log(decode);
    const userId = decode.user_id;
    // console.log(userId);
    // Query the DB to get the users name and email, and to ensure the userId is valid
    const sql = `SELECT "name", "email" FROM "users" WHERE "user_id" = ${userId}`;
    const { rows: [user = null] } = await db.query(sql);

    // Throw error if no user
    // Add the user to req.user
    req.user = user;
    if (!user) {
      throw new ClientError('Not Authorized', 401);
    }
    // Go to the next thing...
    next();
  } catch (error) {
    throw new ClientError('Not Authorized', 401);
  }
};
