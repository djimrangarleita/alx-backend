import { createClient } from 'redis';

let subscriber;

if (subscriber === undefined) {
  subscriber = createClient();

  subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
  });

  subscriber.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });

  subscriber.subscribe('holberton school channel');
}

subscriber.on('message', (_, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
