import { createQueue } from 'kue';
import redis from 'redis';
import { promisify } from 'util';

let client;
let queue;
export const reservationStatus = {
  reservationEnabled: true,
};

if (!client) {
  client = redis.createClient();

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.on('error', (error) => {
    console.log(`Error connecting to redis client ${error}`);
  });
}

if (!queue) {
  queue = createQueue();
}

client.set('available_seats', 50, redis.print);

const getAsync = promisify(client.get).bind(client);

export const reserveSeat = (num) => {
  client.set('available_seats', num, redis.print);
};

export const getCurrentAvailableSeats = async () => {
  const availableSeats = await getAsync('available_seats');
  return availableSeats;
};

export const createReservationJob = () => {
  const job = queue.create('reserve_seat').save((error) => {
    if (error) {
      console.log(`Job creation failed: ${error}`);
      throw new Error('Reservation failed');
    }
    console.log(`Reservation job created: ${job.id}`);
  });

  job.on('complete', () => {
    console.log(`Seat reservation job #${job.id} completed`);
  }).on('failed', (error) => {
    console.log(`Seat reservation job #${job.id} failed: ${error}`);
  }).on('progress', (percentage) => {
    console.log(`Reservation job #${job.id} ${percentage}% complete`);
  });
};

export const processReservations = () => {
  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = Number(await getCurrentAvailableSeats()) - 1;
    if (availableSeats === 0) {
      reservationStatus.reservationEnabled = false;
    }
    if (availableSeats >= 0) {
      reserveSeat(availableSeats);
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
};
