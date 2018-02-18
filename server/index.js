const express = require('express') // Import express
const morgan = require('morgan') // Use morgan to log express events
const chalk = require('chalk') // Chalk for console output

const app = express() // Create an express server

app.use(morgan('combined')) // Setup the morgan middle ware.

// This is a bare bones middleware.
app.use((req, res, next) => {
    console.log(req.body)
    next() // Next is required to pass this object down the chain.
})

const PORT = 3000 // Port constant, will come from a configuration file.

// Start our express server and pass a callback 
// that runs when the server is online.
app.listen(PORT, () => {
    console.log(chalk.green(`Listening on port ${PORT}...`))
})

module.exports = app