import express from 'express';
import {
  getCurrentReservedStockById, getItemById, getProductsList, reserveStockById, serializeProduct,
} from './utils';

const app = express();
const port = 1245;

app.use(express.json());

app.get('/list_products', (_, res) => {
  res.send(getProductsList());
});

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const rawProduct = getItemById(itemId);
  if (!rawProduct) {
    return res.send({ status: 'Product not found' });
  }
  const currentQuantity = await getCurrentReservedStockById(itemId);
  const product = serializeProduct(rawProduct);
  res.send({ ...product, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const rawProduct = getItemById(itemId);
  if (!rawProduct) {
    return res.send({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  if (rawProduct.stock - currentStock <= 0) {
    return res.send({ status: 'Not enough stock available', itemId });
  }

  reserveStockById(itemId, 1);

  res.send({ status: 'Reservation confirmed', itemId });
});

app.listen(port);
