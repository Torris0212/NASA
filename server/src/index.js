import http from 'http';
import mongoose from 'mongoose';

import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://torris:1peGHgSLIxHIwB7H@nasacluster.unzzfmy.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
})

mongoose.connection.once('error', (err) => {
  console.error(err);
})

const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  });
}

startServer();
