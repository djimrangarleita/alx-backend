import redis from "redis";

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

const setNewSchool = (schoolName, value) => {
  if (!schoolName) {
    console.error('Please provide a valid key');
    return;
  }
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err || !schoolName) {
      console.error(err || 'Please provide a valid key');
    }
    console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
