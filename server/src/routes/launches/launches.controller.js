import { getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById } from "../../models/launches.model.js";
import { getPagination } from '../../services/query.js';

export const httpGetAllLaunches = async (req, res) => {
  const { limit, skip } = getPagination(req.query);

  return res.status(200).json(await getAllLaunches(limit, skip));
};

export const httpAddNewLaunch = async (req, res) => {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.destination || !launch.launchDate) {
    return res.status(400).json({ error: 'Missing required launch property.' });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch date' });
  };

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch)
};

export const httpAbortLaunch = async (req, res) => {
  const launchId = Number(req.params.id);
  const existLaunch = await existsLaunchWithId(launchId);

  if (!existLaunch) {
    return res.status(404).json({ error: 'Launch not found' });
  }

  const aborted = await abortLaunchById(launchId);

  if (aborted.modifiedCount === 1) {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(400).json({ error: "launch not aborted" });
  };
}
