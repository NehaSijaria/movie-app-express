const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

const genres= [
  { id:1, name:"comedy"},
   { id:1, name:"classic"}
]

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

});


app.listen(port, ()=>{
  console.log(`App listening on ${port} `);
})