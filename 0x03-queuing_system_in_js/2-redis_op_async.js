import redis from 'redis';
import { promisify } from 'util';

let client;

if (client === undefined) {
  client = redis.createClient();

  client.on('connect', () => {
    console.log('Redis client connected to the server');
  });

  client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });
}

const getAsync = promisify(client.get).bind(client);

const setNewSchool = (schoolName, value) => {
  if (!schoolName) {
    console.error('Please provide a valid key');
    return;
  }
  client.set(schoolName, value, redis.print);
};

const displaySchoolValue = async (schoolName) => {
  if (!schoolName) {
    console.error('Please provide a valid key');
  }

  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (error) {
    console.error(error);
  }
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
