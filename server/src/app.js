import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.static(path.resolve('../server/public')));
app.use(express.json());
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('../server/public/index.html'));
});

export default app;
