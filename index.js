const Joi = require("joi"); //return class
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const genres = require("./data");
app.use(express.json());

// const genres= [
//   { id:1, name:"comedy"},
//    { id:2, name:"classic"}
// ] file moved to data.js

app.get("/", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  //data sent via req.body; resultis an obj with error&value prop
  //we need error property which is array of obj from result object which we destructure:err[details: {message:},{}]
  //const result = validateData(req.body);
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const sendData = {
    id: genres.length + 1,
    name: req.body.name,
  };
  //create & push to existing
  genres.push(sendData);
  console.log(sendData); //{ id: 3, name: 'oldies' }
  res.send(sendData);
});

app.put("/api/genres/:id", (req, res) => {
  const findData = genres.find((obj) => obj.id === parseInt(req.params.id));
  //{}
  console.log(findData);
  findData.name = req.body.name;
  res.send(genres);
});

//delete by id
app.delete("/api/genres/:id", (req, res) => {
  const findData = genres.find((obj) => obj.id === parseInt(req.params.id));
  //{whichere id is provide,that obj return here}
  const index = genres.indexOf(findData);
  const toDelete = genres.splice(index, 1);
  res.send(genres);
});
//find by id
app.get("/api/genres/:id", (req, res) => {
  const findData = genres.find((obj) => obj.id === parseInt(req.params.id));
  res.send(findData);
});
function validateData(genre) {
  //schema define shape of object
  const schema = {
    name: Joi.string().min(3).required(),
  };
  //req.body(genre) should follow rules in schema
  return Joi.validate(genre, schema);
}

app.listen(port, () => {
  console.log(`App listening on ${port} `);
});
