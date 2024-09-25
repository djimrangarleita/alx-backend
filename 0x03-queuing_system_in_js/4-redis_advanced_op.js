import redis from 'redis';

let client;
const data = [
  { key: 'Portland', value: 50 },
  { key: 'Seattle', value: 80 },
  { key: 'New York', value: 20 },
  { key: 'Bogota', value: 20 },
  { key: 'Cali', value: 40 },
  { key: 'Paris', value: 2 },
];

if (client === undefined) {
  client = redis.createClient();

  client.on('connect', () => {
    console.log('Redis client connected to the server');
  });

  client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });
}

const setHash = (hkey, { key, value }) => {
  if (!hkey || !key) {
    console.error('Please provide a valid key');
    return;
  }
  client.hset(hkey, key, value, redis.print);
};

const getHashAll = (hkey) => {
  client.hgetall(hkey, (err, reply) => {
    if (err || !hkey) {
      console.error(err || 'Please provide a valid key');
    }
    console.log(reply);
  });
};

data.forEach((item) => setHash('HolbertonSchools', item));

getHashAll('HolbertonSchools');
