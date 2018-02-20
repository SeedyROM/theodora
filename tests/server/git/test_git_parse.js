const { mocha, expect, assert } = require('../../helper')
const { parseRepositoryName } = require('../../../server/git')

describe('parsing out a github repo name', function() {
    before(function() {
        this.url = 'https://github.com/SeedyROM/test_document'
        this.name = 'test_document'
    })

    it('should parse the name from valid urls', function() {
        const name = parseRepositoryName(this.url)
        expect(name).to.equal(this.name)
    })

    it('should throw an Error if passed an invalid format url', function() {
        try {
            parseRepositoryName('22l2l2kfkf..c,kk444')
        } catch(error) {
            assert(true)
        }
    })
})