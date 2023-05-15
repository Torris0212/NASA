import { Router } from "express";

import { httpGetAllPlanets } from './planets.controller.js';

const planetsRouter = Router();

planetsRouter.get('/planets', httpGetAllPlanets);

export default planetsRouter;
