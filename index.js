const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const genres = require('./data')
app.use(express.json());

// const genres= [
//   { id:1, name:"comedy"},
//    { id:2, name:"classic"}
// ]

app.get('/',(req,res)=>{
  res.send(genres)
})

app.post("/api/genres", (req, res) => { 
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
  const findData = genres.find(obj=> obj.id === parseInt(req.params.id))
  //{}
  console.log(findData);
  findData.name = req.body.name
  res.send(genres);

});

//delete by id
app.delete("/api/genres/:id", (req, res) => {
  const findData = genres.find((obj) => obj.id === parseInt(req.params.id));
  //{whichere id is provide,that obj return here}
const index = genres.indexOf(findData);
const toDelete = genres.splice(index,1)
  res.send(genres);
});
//find by id
app.get("/api/genres/:id", (req, res) => {
   const findData = genres.find((obj) => obj.id === parseInt(req.params.id));
  res.send(findData);
});


app.listen(port, ()=>{
  console.log(`App listening on ${port} `);
})