import axios from 'axios';

const API_URL = '/api/tickets';

// Get notes
const getNotes = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}/${id}/notes`, config);

  return data;
};

// Create note
const createNote = async (noteText, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `${API_URL}/${id}/notes`,
    { text: noteText },
    config
  );

  return data;
};

const noteService = { getNotes, createNote };
export default noteService;
