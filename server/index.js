require('dotenv/config');
const express = require('express');
const jwt = require('jwt-simple');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const PORT = process.env.PORT || 3000;
const hash = require('./lib/hash');
const { jwtSecret } = require('./config/jwt');

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

// add other middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));
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
      if (req.session.userId === undefined) {
        req.session.userId = insertId;
      }
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
      token: token,
      userId: insertId,
      userName: username
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
    req.session.userId = user.user_id;
    req.session.save();
    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    const token = jwt.encode(tokenData, jwtSecret);

    // Send the token to the client
    res.send({
      Token: token,
      userName: username,
      userId: user.user_id
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   throw new ClientError('Not authorized', 401);
    // }

    const { rows: products = [] } = await db.query(`SELECT * FROM "users" WHERE "user_id" != ${req.session.userId}`);

    res.send(products);
  } catch (error) {
    next(error);
  }
});

app.get('/api/grabUserInfo/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { rows: [newUser] } = await db.query(`
    SELECT * FROM "users" WHERE "user_id" = ${userId}`
    );
    res.send({
      status: true,
      message: 'Current user',
      data: {
        userName: newUser.username,
        name: newUser.Name
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/grabUserPosts/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { rows: posts = [] } = await db.query(`
    SELECT * FROM "userPosts" WHERE "userId" = ${userId}`
    );
    res.send({
      status: true,
      message: `Successfully loaded user ${userId}'s posts`,
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/grabUserFeed', async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { rows: posts = [] } = await db.query(`
    SELECT * FROM "userPosts" WHERE "userId" != ${userId} ORDER BY "createdAt" DESC`
    );
    res.send({
      status: true,
      message: `Successfully loaded user ${userId}'s feed`,
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/upload-avatar', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const avatar = req.files.avatar;
      // Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./server/public/images/uploads/' + avatar.name);

      const { rows: [newUser] } = await db.query(`
      INSERT INTO "userPosts"
      ("userId", "pictureUrl")
      VALUES ($1, $2)
      returning "userId"`,
      [req.session.userId, avatar.name]
      );
      // send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/upload-profile', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const profile = req.files.profile;
      // Use the mv() method to place the file in upload directory (i.e. "uploads")
      profile.mv('./server/public/images/uploads/users/' + profile.name);

      // send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: profile.name,
          mimetype: profile.mimetype,
          size: profile.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/setProfilePicture', async (req, res, next) => {
  try {
    const picUrl = req.body.pic;
    const { rows: [newUser] } = await db.query(`
      UPDATE "profiledata" SET "profilepicurl" = $1 WHERE "user_id" = ${req.session.userId}
      `,
    [picUrl]
    );
    // send response
    res.send({
      status: true,
      message: 'profile picture uploaded'
    });
  } catch (error) {
    next(error);
    // res.status(500).send(err);
  }
});

app.get('/api/profileData/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { rows: [profileData] } = await db.query(`SELECT * FROM "profiledata" WHERE "user_id" = ${userId}`);
    res.send({
      data: profileData
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/upload-data', async (req, res) => {
  try {
    if (req.body.data.status === true) {
      try {
        const userId = req.body.userId;
        const description = req.body.description;
        const profilepicurl = req.body.profilepicurl;
        const { rows: [newUser] } = await db.query(`
          INSERT INTO "profiledata"
          ("user_id", "numberofposts", "saved", "description", "profilepicurl")
          VALUES ($1, $2, $3, $4, $5)
          returning "user_id"`,
        [userId, 0, 0, description, profilepicurl]
        );
        res.status(200).send({
          message: 'Data has been sent successfully!',
          status: 200
        });
      } catch (error) {
        if (error.code === '23505') {
          throw new ClientError('email already in use', 422);
        }
        throw new ClientError('error saving user', 500);
      }

    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/upload-comment-data', async (req, res) => {
  try {
    try {
      const commentData = req.body.commentData;
      const stageData = req.body.stageData;
      const postId = req.body.postId;
      const user_id = req.body.userId;

      // console.log(commentData)
      // console.log(stageData)
      const { rows: [newComment] } = await db.query(`
          INSERT INTO "comments"
          ("postId", "user_id", "commentPicUrl", "commentEditString")
          VALUES ($1, $2, $3, $4)
          returning "user_id"`,
      [postId, user_id, commentData, stageData]
      );
      res.status(200).send({
        message: 'Data has been sent successfully!',
        status: 200
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ClientError('email already in use', 422);
      }
      throw new ClientError('error saving user', error);
    }

  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/grabPostComments/:commentId', async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const { rows: comments = [] } = await db.query(`
    SELECT * FROM "comments" WHERE "postId" = ${commentId}`
    );
    res.send({
      status: true,
      message: `Successfully loaded user's commentId ${commentId}`,
      data: comments
    });
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
