const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const Note = require('../models/noteModel');

// Get notes for a ticket
// Route - GET /api/tickets/:ticketId/notes
// Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const notes = await Note.find({ ticket: req.params.id });

  res.status(200).json(notes);
});

// Add note to a ticket
// Route - POST /api/tickets/:ticketId/notes
// Private
const createNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.id,
    user: req.user.id,
  });

  res.status(201).json(note);
});

module.exports = { getNotes, createNote };
