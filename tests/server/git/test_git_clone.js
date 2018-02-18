const { mocha, chai, http, assert } = require('../../helper')
const tmp = require('tmp')
const rimraf = require('rimraf')
const path = require('path')
const clone = require('../../../server/git')

beforeEach(function() {
    this.dir = tmp.dirSync()
})
afterEach(function() {
    rimraf(this.dir.name)
})

describe('cloning git repositories', function() {
    it('should be able to clone github repositories', async function() {
        const result = await clone('https://github.com/SeedyROM/test_document', this.dir.name)
        console.log(result)
    })
})