// importar roteador
const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json('teste com sucesso!')
})

router.get('/about', (req, res, next) => {
  res.json('teste about com sucesso!')
})

module.exports = router;