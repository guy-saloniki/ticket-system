const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
} = require('../BLL/ticketBLL');

//Re-route into note router
const noteRoutes = require('./noteRoutes');
router.use('/:id/notes', noteRoutes);

router.route('/').get(protect, getTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getSingleTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
