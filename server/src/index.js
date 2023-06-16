import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import { loadPlanetsData } from './models/planets.model.js';
import { loadLaunchesData } from './models/launches.model.js';
import { mongoConnect } from './services/mongo.js';
import app from './app.js';

const PORT = process.env.PORT || 8005;

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  });
}

startServer();
