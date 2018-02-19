/* istanbul ignore file */
const express = require('express') // Import express
const morgan = require('morgan') // Use morgan to log express events
const chalk = require('chalk') // Chalk for console output
const bodyParser = require('body-parser') // JSON Parsing and Encoding
const winston = require('winston')

// Create a log for our own debug purposes.
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: '.error.log', level: 'error' }),
        new winston.transports.File({ filename: '.combined.log' })
    ]
})
if (process.env.NODE_ENV == 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    )
}

const app = express() // Create an express server

// We only need this for debug and production.
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')) // Setup the morgan middleware
}
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Add our routes and middleware
require('./middleware')(app)
require('./routes')(app)

const PORT = 3000 // Port constant, will come from a configuration file.

// Start our express server and pass a callback 
// that runs when the server is online.
app.listen(PORT, () => {
    logger.info(chalk.green(`Listening on port ${PORT}...`)) 
})

app.logger = logger
module.exports = app