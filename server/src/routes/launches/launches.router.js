import { Router } from 'express';

import { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

export default launchesRouter;
