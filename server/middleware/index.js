const url = require('url')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const directoryTree = require('directory-tree')
const Repository = require('../git/repository')

// Promise wrapped fs.lstat of this function.
const fileStatistics = (path) => {
    return new Promise((res, rej) => {
        fs.lstat(path, (err, stats) => {
            if(err) rej(new Error(err))
            else res(stats)
        })
    })
}

module.exports = (app) => {
    // Hack to keep the repo in memory
    const repo = new Repository('https://github.com/SeedyROM/test_document')
    repo.clone()
    
    // Middleware the intercept calls to valid markdown paths.
    app.use(asyncHandler(async (req, res, next) => {
        // Full local repo path.
        const relativeUrl = req.url.replace('/api/', '/')
        const fullPath = path.join(repo.path, url.parse(relativeUrl).pathname)
        
        if(req.url.indexOf('/api/') !== 0) {
            next()
        }
        
        if(req.url.indexOf('/api/structure') === 0) {
            res.json({
                tree: repo.tree
            })
        }

        try {
            // Get file statistics
            const stats = await fileStatistics(fullPath)
            if(stats.isDirectory()) {
                // For now do nothing if a directory is found.
                next()
            } else {
                // Return some json about the current URL.
                res.json({
                    type: 'markdown',
                    page: fs.readFileSync(fullPath, 'utf8')
                })
            }
        } catch(error) {
            // 404
            /* istanbul ignore else  */
            if(error.message.includes('ENOENT')) {
                res.status(404).send(`Cannot ${req.method} ${req.url}`)
            } else {
                next(error)
            }
        }

        next()
    }))
}