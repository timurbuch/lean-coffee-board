const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.set('Content-type', 'text/html; charset=utf-8')
  res.send('<h1>Hello, Backend!</h1>')
})
router.get('/:id', (req, res) => {
  res.set('Content-type', 'text/html; charset=utf-8')
  res.send('<h2>I am a card object...</h2>')
})
router.post('/', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})
router.put('/:id', (req, res) => {
  const params = req.params
  console.log(params)
  console.log(req.body)

  res.send(req.body)
})
router.patch('/:id', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

router.delete('/:id', (req, res) => {
  const params = req.params
  res.send(`Post with id: ${params.id} was deleted!`)
})

module.exports = router
