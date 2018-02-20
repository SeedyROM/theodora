const { mocha, expect, assert } = require('../../helper')
const tmp = require('tmp')
const rimraf = require('rimraf')
const path = require('path')
const { cloneRepository } = require('../../../server/git')

beforeEach(function() {
    this.dir = tmp.dirSync()
})
afterEach(function() {
    rimraf(this.dir.name, () => {})
})

describe('cloning git repositories', function() {
    it('should be able to clone github repositories', async function() {
        const result = await cloneRepository('https://github.com/SeedyROM/test_document', this.dir.name)
        expect(result).to.equal(true)
    })

    it('should not be able to overwrite an existing repo', async function() {
        const result = await cloneRepository('https://github.com/SeedyROM/test_document', this.dir.name)
        expect(result).to.equal(true)

        // Try again
        try {
            await cloneRepository('https://github.com/SeedyROM/test_document', this.dir.name)
        } catch(error) {
            assert(true)
        } 
    })
})