import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSingleTicket,
  reset,
  closeTicket,
} from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Ticket = () => {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getSingleTicket(id));
  }, [isError, message, dispatch, id]);

  const handleCloseTicket = () => {
    dispatch(closeTicket(id));
    toast.success('Ticket has been closed');
    navigate('/tickets');
  };

  if (isLoading) {
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
      </header>
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
