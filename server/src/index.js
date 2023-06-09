import http from 'http';
import { loadPlanetsData } from './models/planets.model.js';
import { mongoConnect } from './services/mongo.js';
import app from './app.js';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  });
}

startServer();
