import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTicket, closeTicket } from '../features/tickets/ticketSlice';
import {
  getNotes,
  reset as noteReset,
  createNote,
} from '../features/notes/noteSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: loadingNotes } = useSelector((state) => state.note);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getSingleTicket(id));
    dispatch(getNotes(id));
  }, [isError, message, dispatch, id]);

  const handleCloseTicket = () => {
    dispatch(closeTicket(id));
    toast.success('Ticket has been closed');
    navigate('/tickets');
  };

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createNote({ noteText, id }));
      closeModal();
    } catch (error) {
      toast.error(toast.error);
    }
  };

  if (isLoading || loadingNotes) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }
  return (
    <div className="ticket-page">
      <BackButton url={'/tickets'} />
      <header className="ticket-header">
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h2>Date: {new Date(ticket.createdAt).toLocaleString('en-US')}</h2>
        <h2>Product: {ticket.product}</h2>
        <hr />
        <div className="ticket-desc">
          <h3>Description:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="note-text"
              id="note-text"
              className="form-control"
              placeholder="your text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}
      {ticket.status !== 'closed' && (
        <button
          className="btn btn-block btn-danger"
          onClick={handleCloseTicket}
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
