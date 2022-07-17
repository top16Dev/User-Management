var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var pino = require('pino')();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var userRouter = require('./routes/user')

var app = express();
var router = express.Router();

pino.debug('Starting the usermanagement project');

// user set variables
const port = process.env.API_PORT || process.env.PORT || 3001;
// const mongoURL = process.env.MONGO_URL || 'localhost/test';
// const mongoUser = process.env.MONGO_USER || '';
// const mongoPass = process.env.MONGO_PASS || '';
// const staticDir = process.env.STATIC_DIR || 'build';

// connect to the MongoDB
let mongoConnect = 'mongodb://localhost:27017/usermanagement'
// if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
//   mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}`;
// } else if (mongoURL !== '') {
//   mongoConnect = `mongodb://${mongoURL}`;
// }

// pino.info(`Connect to ${mongoConnect}`);
mongoose.connect(mongoConnect, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', (error) => {
  pino.error(error);
});
db.once("open", function () {
  console.log("Connected to mongodb!");
});

// set up other middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

var sess = {
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  name: 'mern example',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
};

app.use(session(sess));


app.use("/api/v1/users", userRouter);
app.listen(port, function () {
  pino.info(`api running on port ${port}`);
});


