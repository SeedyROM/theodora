const path = require('path')
const directoryTree = require('directory-tree')
const { parseRepositoryName, cloneRepository } = require('../git')
const git = require('simple-git')

const REPOSITORY_PATH = path.join(process.cwd(), 'repos')

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
            git(this.path).pull('origin', 'master', {'--rebase': 'true'})
        } finally {
            this.tree = directoryTree(this.path)
        }
    }
}

module.exports = Repository