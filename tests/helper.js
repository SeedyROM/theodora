const mocha = require('mocha')
const chai = require('chai')
const http = require('chai-http')
const expect = chai.expect

// Setup chai to use the chai-http library
chai.use(http)

// Bundle these imports together after configuration
module.exports = {
    mocha,
    chai,
    http,
    expect
}