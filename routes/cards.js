const express = require('express')
const { nanoid } = require('nanoid')

const router = express.Router()

let cards = [
  {
    text: 'What is node.js?',
    author: 'John Doe',
    id: '1',
  },
  {
    text: 'What is express?',
    author: 'Jane Foster',
    id: '2',
  },
  {
    text: 'What is nodemon?',
    author: 'Peter Parker',
    id: '3',
  },
]

router.get('/', (req, res) => {
  res.status(200).json(cards)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const card = cards.find(card => card.id === id)
  if (card) {
    res.status(200).json(card)
  } else {
    res.status(404).send('Sorry, this card does not exist.')
  }
})

router.post('/', (req, res) => {
  const { text, author } = req.body
  if (text === '' || author === '') {
    const error = { message: 'Please fill out all the information' }
    res.status(400).json(error.message)
  }
  const newCard = { text, author, id: nanoid() }
  cards.push(newCard)
  res.send(`You're card has been added to the collection.`)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const newText = req.body.text
  const newAuthor = req.body.author
  console.log(req.body)
  const card = cards.find(card => card.id === id)
  if (card) {
    if (newText === '' || newAuthor === '') {
      const error = { message: 'Please fill out all the information' }
      res.status(400).json(error.message)
    } else {
      card.text = newText
      card.author = newAuthor
      res.status(200).json(`The card with id ${id} was sucessfully edited`)
    }
  } else {
    res.status(404).send('Sorry, this card does not exist.')
  }
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const newText = req.body.text
  const newAuthor = req.body.author
  const card = cards.find(card => card.id === id)
  const index = cards.findIndex(card => card.id === id)
  if (card) {
    if (!newText && !newAuthor) {
      const error = { message: 'Please fill some information' }
      res.status(400).json(error.message)
    } else if (newText && !newAuthor) {
      card.text = newText
    } else if (!newText && newAuthor) {
      card.author = newAuthor
    } else {
      card.author = newAuthor
      card.text = newText
    }
    return res
      .status(200)
      .send(`The card with the id ${id} was successfully updated.`)
  } else {
    res.status(404).send('Sorry, this card does not exist.')
  }
  cards = [...cards.slice(0, index), card, ...cards.slice(index + 1)]
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const card = cards.find(card => card.id === id)
  if (card) {
    cards.filter(card => card.id !== id)
    res.status(200).send(`Post with id: ${id} was deleted!`)
  } else {
    const error = { message: ` The id ${id} doesn't exist.` }
    res.status(404).json(error.message)
  }
})

module.exports = router
