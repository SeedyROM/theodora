const { mocha, chai, expect } = require('../../helper')

const { app } = require('../../../server')

describe('the index route', () => {
    it('should return some json', async () => {
        const resp = await chai.request(app).get('/')
        expect(resp.body).to.equal({message: 'Hey!'})
    })
})