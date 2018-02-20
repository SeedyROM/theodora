const { mocha, chai, expect } = require('../../helper')

const Repository = require('../../../server/git/repository')
const app  = require('../../../server')

const repo = new Repository('https://github.com/SeedyROM/test_document')
repo.clone()

describe('markdown middleware routing', async () => {
    it('should serve valid repository paths', async () => {
        const resp = await chai.request(app).get('/index.md')
        expect(resp.body).to.haveOwnProperty('structure')        
        expect(resp.body).to.haveOwnProperty('page')
    })
    it('should 404 for unknown paths', async () => {
        const resp = await chai.request(app).get('/fxdsjajd20jd09sja0d9sa09.md')
        expect(resp).to.have.status(404)       
    })
})