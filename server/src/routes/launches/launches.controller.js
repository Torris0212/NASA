import { getAllLaunches, addNewLaunch, launches } from "../../models/launches.model.js";

export const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

export const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch)
};
