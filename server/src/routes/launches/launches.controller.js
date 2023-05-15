import { launches } from "../../models/launches.model.js";

export const getAllLaunches = (req, res) => {
  res.json(Array.from(launches.values()));
};
