import redis from 'redis';
import { promisify } from 'util';

let client;

if (!client) {
  client = redis.createClient();

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.on('error', (error) => {
    console.log(`Error connecting to redis client ${error}`);
  });
}

const getAsync = promisify(client.get).bind(client);

const listProducts = [
  {
    Id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    Id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    Id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    Id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
];

export const getItemById = (id) => listProducts.find((item) => item.Id === Number(id));

export const serializeProduct = (product) => ({
  itemId: product.Id,
  itemName: product.name,
  price: product.price,
  initialAvailableQuantity: product.stock,
});

export const getProductsList = () => listProducts.map((product) => serializeProduct(product));

export const reserveStockById = (itemId, stock) => {
  client.set(itemId, stock, redis.print);
};

export const getCurrentReservedStockById = async (itemId) => {
  const item = await getAsync(itemId);
  return item;
};
