const handleError = (app) => {
  app.use((req, res, next) => {
    res.status(404).json('Not Found.');
  })

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error.message || error);
  })
}

module.exports = handleError;