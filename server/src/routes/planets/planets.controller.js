import { getAllPlanets } from '../../models/planets.model.js';

export async function httpGetAllPlanets (req, res) {
  return res.json(await getAllPlanets());
}
