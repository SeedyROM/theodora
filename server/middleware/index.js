const url = require('url')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const directoryTree = require('directory-tree')
const Repository = require('../git/repository')

const fileStatistics = (path) => {
    return new Promise((res, rej) => {
        fs.lstat(path, (err, stats) => {
            if(err) rej(new Error(err))
            else res(stats)
        })
    })
}

module.exports = (app) => {
    const repo = new Repository('https://github.com/SeedyROM/test_document')
    repo.clone()
    
    app.use(asyncHandler(async (req, res, next) => {
        const fullPath = path.join(repo.path, url.parse(req.url).pathname)
        try {
            const stats = await fileStatistics(fullPath)
            if(stats.isDirectory()) {
                next()
            } else {
                res.json({
                    structure: repo.tree,
                    page: fs.readFileSync(fullPath, 'utf8')
                })
            }
        } catch(error) {
            if(error.message.includes('ENOENT')) {
                res.status = 404
                res.json({'error': '404'})
            } else {
                next(error)
            }
        }
    }))
}