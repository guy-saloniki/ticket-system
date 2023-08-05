const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTickets, createTicket, getSingleTicket, deleteTicket, updateTicket} = require('../BLL/ticketBLL')


router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getSingleTicket).put(protect, updateTicket).delete(protect, deleteTicket)

module.exports = router