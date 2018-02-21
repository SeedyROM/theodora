const { mocha, chai, expect } = require('../../helper')

const { Repository } = require('../../../server/git/repository')
const app  = require('../../../server')

const repo = new Repository('https://github.com/SeedyROM/test_document')
repo.clone()

describe('markdown middleware routing', async () => {
    it('should serve valid repository paths', async () => {
        const resp = await chai.request(app).get('/api/index.md')
        expect(resp.body.type).to.equal('.md')      
        expect(resp.body).to.haveOwnProperty('page')
    })
    it('should return index.md when path is a directory', async () => {
        const resp = await chai.request(app).get('/api/')
        expect(resp.body.type).to.equal('index')  
        expect(resp.body).to.haveOwnProperty('page')
    })
    it('should return directory layout when path is a directory and no index.md is found', async () => {
        const resp = await chai.request(app).get('/api/todos')
        expect(resp.body.type).to.equal('tree')  
        expect(resp.body).to.haveOwnProperty('tree')
    })
    it('should return the actual file', async () => {
        const resp = await chai.request(app).get('/api/test.jpg')
        expect(resp).to.have.status(200)
        expect(resp).to.have.header('content-type', 'image/jpeg')
    })
    it('should 404 when unaccepted filetype is specified', async () => {
        const resp = await chai.request(app).get('/api/fake/.git/HEAD')
        expect(resp).to.have.status(404)
    })
    it('should 404 for unknown paths', async () => {
        const resp = await chai.request(app).get('/api/fxdsjajd20jd09sja0d9sa09.md')
        expect(resp).to.have.status(404)       
    })
    it('should return repo structure from api hit', async() => {
        const resp = await chai.request(app).get('/api/structure')   
        expect(resp.body).to.haveOwnProperty('tree')
    })
    it('should ignore .git and other patterns for structure', async() => {
        const resp = await chai.request(app).get('/api/structure')   
        expect(resp.body.tree.children).to.not.contains({name: '.git'})
        expect(resp.body.tree.children).to.not.contains({name: 'node_modules'})
        expect(resp.body.tree.children).to.not.contains({name: 'env'})
    })
})