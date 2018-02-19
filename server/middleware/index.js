/* istanbul ignore next */
module.exports = (app) => {
    // This is a bare bones middleware.
    app.use((req, res, next) => {
        app.logger.info(JSON.stringify(req.headers))
        next() // Next is required to pass this object down the chain.
    })
}