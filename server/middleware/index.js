const url = require('url')
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const directoryTree = require('directory-tree')
const { Repository, EXCLUDE_PATTERN, ACCEPTED_FILETYPES } = require('../git/repository')

// Promise wrapped fs.lstat.
const fileStatistics = (path) => {
    return new Promise((res, rej) => {
        fs.lstat(path, (err, stats) => {
            if(err) rej(new Error(err))
            else res(stats)
        })
    })
}
// Promise wrapped fs.readFile.
/* istanbul ignore next */
const readFile = (...args) => {
    return new Promise((res, rej) => {
        fs.readFile(...args, (err, data) => {
            if(err) rej(new Error(err))
            else res(data)
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
            return res.json({
                tree: repo.tree
            })
        }

        try {
            // Get file statistics
            const stats = await fileStatistics(fullPath)
            if(stats.isDirectory()) {
                const indexPath = path.join(fullPath, 'index.md')
                if(fs.existsSync(indexPath)) {
                    return res.json({
                        type: "index",
                        page: await readFile(indexPath, 'utf8')
                    })
                } else {
                    return res.json({
                        type: "tree",
                        tree: directoryTree(fullPath, {excludes: EXCLUDE_PATTERN}) 
                    })
                }

            } else {
                // Return some json about the current URL.
                const ext = path.extname(fullPath)
                
                /* istanbul ignore if */
                if(!ext.match(ACCEPTED_FILETYPES)) {
                    throw new Error('ENOENT Unaccepted filetype')
                }

                switch(ext) {
                    case '.md':
                        return res.json({
                            type: ext,
                            page: await readFile(fullPath, 'utf8')
                        })
                    default:
                        return res.sendFile(fullPath)
                }
                
            }
        } catch(error) {
            // 404
            /* istanbul ignore else  */
            if(error.message.includes('ENOENT')) {
                next()
            } else {
                next(error)
            }
        }
        next()
    }))
}