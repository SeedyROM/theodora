const express = require('express') // Import express
const morgan = require('morgan') // Use morgan to log express events
const chalk = require('chalk') // Chalk for console output
const bodyParser = require('body-parser') // JSON Parsing and Encoding

const app = express() // Create an express server

app.use(morgan('combined')) // Setup the morgan middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Add our routes and middleware
require('./middleware')(app)
require('./routes')(app)

const PORT = 3000 // Port constant, will come from a configuration file.

// Start our express server and pass a callback 
// that runs when the server is online.
app.listen(PORT, () => {
    console.log('================================')
    console.log(chalk.green(`Listening on port ${PORT}...`))
    console.log('================================')    
})

module.exports = app