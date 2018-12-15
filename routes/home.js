const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", { title: "My express App", message: "hello.." })
})

module.exports = router
