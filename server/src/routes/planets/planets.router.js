import { Router } from "express";

import { getAllPlanets } from './planets.controller.js';

const planetsRouter = Router();

planetsRouter.get('/planets', getAllPlanets);

export default planetsRouter;
