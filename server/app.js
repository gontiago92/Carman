
const express = require("express")
const app = express()
const http = require("http").Server(app)
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./templates');
const twing = new TwingEnvironment(loader);
const mysql = require('mysql')
const dotenv = require('dotenv')
//var io = require("socket.io")(http)

dotenv.config({path: './.env'})

console.log(process.env.DATABASE)



//app.set('views', './views') // specify the views directory
//app.set("view engine", "pug")

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})


app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

db.connect(error => {
  if(error) {
    console.log(error)
  } else {
    console.log('Connected to MYSQL....')
  }
})

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
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