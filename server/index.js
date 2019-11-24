const express = require('express')
// create new express app and save it as "app"
const app = express()
// server configuration
const PORT = 8080
const cors = require('cors')
const jsonfile = require('jsonfile')
const Model = require("./model")
const file = 'server/data.json'

app.use(express.json())
app.use(cors(
  { "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204}
))

    // create a route for the app
app.get('/get-list-user', async (req, res) => {
  let data = await jsonfile.readFile(file)
  let allUsers = data.listUsers
  let result = Model.getListUser(allUsers, req.query.key, req.query.page, req.query.sort, req.query.filter)
  res.json(result)
});
app.get('/get-list-suggestion', async (req, res) => {
  let data = await jsonfile.readFile(file)
  let allSuggestions = data.listSuggestion
    let result = Model.getListSuggestion(allSuggestions, req.query.key)
    res.json(result)
  });
app.post('/create-new-user', async (req, res) => {
  let data = await jsonfile.readFile(file)
  let allUsers = data.listUsers
  let checkId = allUsers.filter(e => e.id == req.body.user.id)
  if(checkId.length > 0){
    res.json({
      success: false,
      mess: "id existed"
    })
    return null
  }
  Model.createUser(data, req.body.user, file, jsonfile)
  let result = Model.getListUser(allUsers, req.body.key, req.body.page)
  result.success = true
  res.json(result)
});  
app.post('/remove-user', async (req, res) => {
  let data = await jsonfile.readFile(file)
  data.listUsers = data.listUsers.filter(e => e.id != req.body.user_id)
  Model.removeUser(data, file, jsonfile)
  let result = Model.getListUser(data.listUsers, req.body.key, req.body.page)
  result.success = true
  res.json(result)
});  
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
