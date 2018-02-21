const path = require('path')
const directoryTree = require('directory-tree')
const { parseRepositoryName, cloneRepository } = require('../git')
const git = require('simple-git')

const REPOSITORY_PATH = path.join(process.cwd(), 'repos')
const EXCLUDE_PATTERN = /\.git|node_modules|env/
const ACCEPTED_FILETYPES = ['.md', '.png', '.jpeg', '.jpg']

class Repository {
    constructor(url) {
        this.name = parseRepositoryName(url)
        this.url = url
        this.path = path.join(REPOSITORY_PATH, this.name)
    }

    async clone() {
        try {
            await cloneRepository(this.url)
        } catch(error) {
            git(this.path).pull('origin', 'master', {'--rebase': 'false'})
        } finally {
            this.tree = directoryTree(this.path, {exclude: EXCLUDE_PATTERN})
        }
    }
}

module.exports = {
    Repository,
    REPOSITORY_PATH,
    EXCLUDE_PATTERN,
    ACCEPTED_FILETYPES
}