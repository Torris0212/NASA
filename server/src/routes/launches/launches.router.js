import { Router } from 'express';

import { httpGetAllLaunches, httpAddNewLaunch } from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);

export default launchesRouter;
