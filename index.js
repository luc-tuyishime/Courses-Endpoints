const Joi = require("joi")
const express = require("express")
const app = express()

app.use(express.json())

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
]

app.get("/", (req, res) => {
  res.send("hello world!!!")
})

app.get("/api/courses", (req, res) => {
  res.send(courses)
})

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put("/api/courses/:id", (req, res) => {
  // look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("The course was not found")

  // validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Update course & return the updated course
  course.name = req.body.name
  res.send(course)
})

app.delete("/api/courses/:id", (req, res) => {
  // look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("The course was not found")

  // Delete by getting the index of array
  const index = courses.indexOf(course)
  courses.splice(index, 1) // use splice to remove object from array, go to the index and remove 1 object

  // Return the same course
  res.send(course)
})

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  }
  return Joi.validate(course, schema)
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("The course was not found")
  res.send(course)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening on port ${port}....`))
