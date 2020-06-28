
const express = require("express")
const app = express()
const http = require("http").Server(app)
const path = require('path')
const dotenv = require('dotenv')

const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./templates');
const twing = new TwingEnvironment(loader);
const cookieSession = require('cookie-session');
//var io = require("socket.io")(http)

dotenv.config({path: './.env'})

const publicDirectory = path.join(process.cwd(), './public')

app.use(express.static(publicDirectory))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge:  3600 * 1000 // 1hr
}));

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/', (req,res) => {
  res.status(404).send('<h1>404 Page Not Found!</h1>');
});


/*
app.get("/", function(req, res) {
  //res.render("index")
  
  twing.render('index.twig', {'name': 'World'}).then((output) => {
    res.end(output);
});
})

app.get("/employee/add", function(req, res) {
  res.render("employee/add")
})

let connected = []

io.on("connection", function(socket) {
  connected.push(socket)
  console.log("A user connected! [ %s sockets online ]", connected.length)
  io.emit("connected", { status: "Connected to the server!" })
  socket.on("disconnect", () => {
    connected.pop()
    console.log("A user disconnected! [ %s sockets online ]", connected.length)
  })
 
})*/

http.listen(3000, function() {
  console.log("listening on *:3000")
})