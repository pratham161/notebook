const express = require('express')
const connnectToMongo = require('./db')
var cors = require('cors')
const app = express()
const port = 4000
connnectToMongo();
// routes
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

// Middlewares
app.use(cors())
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/notes',notesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});