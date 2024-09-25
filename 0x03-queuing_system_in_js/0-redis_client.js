import { createClient } from 'redis';

let client;

if (client === undefined) {
  client = createClient();

  client.on('connect', () => {
    console.log('Redis client connected to the server');
  });

  client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });
}
