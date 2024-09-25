import express from 'express';
import {
  createReservationJob, getCurrentAvailableSeats,
  processReservations,
  reservationStatus,
} from './100-utils';

const app = express();
const port = 1245;

app.use(express.json());

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.send({ numberOfAvailableSeats });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationStatus.reservationEnabled) {
    return res.send({ status: 'Reservation are blocked' });
  }
  try {
    createReservationJob();
    return res.send({ status: 'Reservation in process' });
  } catch (error) {
    res.send({ status: error.message });
  }
});

app.get('/process', (req, res) => {
  try {
    processReservations();
    res.send({ status: 'Queue processing' });
  } catch (error) {
    return res.send({ status: `An error occured: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
