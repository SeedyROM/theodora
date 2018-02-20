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
    
    // Middle ware the intercept calls to valid markdown paths.
    app.use(asyncHandler(async (req, res, next) => {
        // Full local repo path.
        const fullPath = path.join(repo.path, url.parse(req.url).pathname)
        try {
            // Get file statistics
            const stats = await fileStatistics(fullPath)
            if(stats.isDirectory()) {
                // For now do nothing if a directory is found.
                next()
            } else {
                // Return some json about the current URL.
                res.json({
                    structure: repo.tree,
                    page: fs.readFileSync(fullPath, 'utf8')
                })
            }
        } catch(error) {
            // 404
            /* istanbul ignore else  */
            if(error.message.includes('ENOENT')) {
                res.status(404).json({'error': '404'})
            } else {
                next(error)
            }
        }
    }))
}