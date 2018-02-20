const os = require('os')
const fs = require('fs')
const path = require('path')
const process = require('process')
const clone = require('git-clone')
const chalk = require('chalk')

const parseRepositoryName = (url) => {
    const httpPattern = /http[s?]:\/\/(.*)/
    if(url.match(httpPattern)) {
        return path.basename(url)
    } else {
        throw new Error('Could not parse repository name)')
    }
}

const cloneRepository = (url, location) => {
    return new Promise((res, rej) => {
        /* istanbul ignore next */
        const repositoryPath = location || path.join(process.cwd(), 'repos')
        
        if(fs.existsSync(path.join(repositoryPath, parseRepositoryName(url)))) {
            rej(new Error(`Git repository already exists at "${repositoryPath}"`))
        } 

        clone(url, repositoryPath, {}, function(err) {
            if(err) rej(err)
            else res(true)
        })
    })
}

module.exports = { cloneRepository, parseRepositoryName }