const { mocha, chai, http, expect } = require('./helper')

describe('chai tests being run with mocha', () => {
    it('should run tests and assert valid expectations', () => {
        expect(true).to.not.equal(false)
    })
})