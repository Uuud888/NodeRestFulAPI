const app = require('express')();
const bodyParser = require('body-parser')
const tasks = require('./task')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var port = process.env.PORT || 7777;

app.get('/', function(req, res) {
  res.send('<h1>Hello Node.js</h1>');
});
app.get('/task', (req, res) => {
  res.json(tasks)
})
app.get('/task/:id', (req, res) => {
  res.json(tasks.find(task => task.id === req.params.id))
})
app.post('/task', (req, res) => {
  tasks.push(req.body)
  res.status(201).json(req.body)
})
app.put('/task/:id', (req, res) => {
  const updateIndex = tasks.findIndex(task => task.id === req.params.id)
  res.json(Object.assign(tasks[updateIndex], req.body))
})
app.delete('/task/:id', (req, res) => {
  const deleteIndex = tasks.findIndex(task => task.id === req.params.id)
  tasks.splice(deleteIndex, 1)
  res.status(204).send()
})

app.listen(port, function() {
  console.log('Start server at port ' + port);
});