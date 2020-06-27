require('dotenv/config');
const express = require('express');
const jwt = require('jwt-simple');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const PORT = process.env.PORT || 3000;
const hash = require('./lib/hash');
const { jwtSecret } = require('./config/jwt');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { username, password, name, email } = req.body;
    if (!name) throw new ClientError(`${name} name is not defined`, 404);
    if (!email) throw new ClientError(`${email} email is not defined`, 404);
    if (!password) throw new ClientError(`${password} password is not defined`, 404);

    const passHash = await hash.generate(password);

    let insertId = null;

    try {
      const { rows: [newUser] } = await db.query(`
        INSERT INTO "users"
        ("username", "password", "Name", "email")
        VALUES ($1, $2, $3, $4)
        returning "user_id"`,
      [username, passHash, name, email]
      );
      // console.log(newUser);
      insertId = newUser.user_id;
    } catch (error) {
      if (error.code === '23505') {
        throw new ClientError('email already in use', 422);
      }
      throw new ClientError('error saving user', 500);
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to insertId
    // - "ts" | set to the current Unix timestamp
    const tokenData = {
      user_id: insertId,
      ts: 1588731932
    };

    const token = jwt.encode(tokenData, jwtSecret);
    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    res.send({
      token: token
    });

    // Send the token to the client

  } catch (error) {
    next(error);
  }
});

app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const errorMessage = 'Invalid email/password combination';

    if (!username) throw new ClientError('Missing users username', 422);
    if (!password) throw new ClientError('Missing users password', 422);

    const { rows: [user = null] } = await db.query(`
      SELECT "user_id", "password" FROM "users"
      WHERE "username" = $1`,
    [username]
    );

    if (!user) {
      throw new ClientError(errorMessage, 500);
    }

    const passMatch = await hash.compare(password, user.password);

    if (!passMatch) {
      throw new ClientError(errorMessage, 401);
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to user.userId
    // - "ts" | set to the current Unix timestamp
    const tokenData = {
      userId: user.userId,
      ts: 1588731932
    };

    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    const token = jwt.encode(tokenData, jwtSecret);

    // Send the token to the client
    res.send({
      Token: token
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ClientError('Not authorized', 401);
    }

    const { rows: products = [] } = await db.query('SELECT * FROM "users"');

    res.send(products);
  } catch (error) {
    next(error);
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT);
});
