import axios from 'axios';

const API_URL = '/api/tickets';

// Creat ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(`${API_URL}`, ticketData, config);

  return data;
};

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}`, config);

  return data;
};

// Get user ticket
const getSingleTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}/${ticketId}`, config);

  return data;
};

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `${API_URL}/${ticketId}`,
    { status: 'closed' },
    config
  );

  return data;
};

const ticketService = {
  createTicket,
  getTickets,
  getSingleTicket,
  closeTicket,
};

export default ticketService;
