import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AuctionBharat Backend Server is Running');
});

app.get('/api/properties', (req, res) => {
  fs.readFile('./ibapi_all_states_properties.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not load property data.' });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.status(500).json({ error: 'Error parsing JSON data.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
