const debug = require("debug")("app:startup")
const config = require("config")
const morgan = require("morgan")
const helmet = require("helmet")
const Joi = require("joi")
const logger = require("./middleware/logger")
const courses = require("./routes/courses")
const home = require("./routes/home")
const express = require("express")
const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json()) // it parse the body of the request and if there is a JSON it will populate req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(helmet())
app.use("/api/courses", courses) // tell express for any Api start from that use courses router
app.use("/", home)

// configuration settings (developemnt or production)
console.log(`Application name: ${config.get("name")}`)
console.log(`Mail Server name: ${config.get("mail.host")}`)
console.log(`Mail Password name: ${config.get("mail.password")}`) // display the password of mail server or find value of mail.password

if (app.get("env") === "development") {
  app.use(morgan("tiny"))
  debug("Morgan enabled")
}

app.use(logger)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening on port ${port}...`))
