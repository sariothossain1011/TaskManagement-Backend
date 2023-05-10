const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { readdirSync } = require("fs");
require('./DB/Conn');
dotenv.config({path:'./config.env'});
// SECURITY MIDDLEWARE

const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xssClean = require('xss-clean');
const expressMongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Enable CORS for all requests
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
  });


//security middleware implement
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.json());
app.use(xssClean());
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb'}));
// request rate limiting 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// routes middleware
readdirSync("./Routers").map(r => app.use("/api/v1", require(`./Routers/${r}`)))


module.exports = app 