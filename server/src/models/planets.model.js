import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';

import { getAllPlanets } from '../routes/planets/planets.controller.js';

export const planets = [];

const isHabitablePlanet = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

// const savePlanet = (planet) => {
//   planets.push(planet);
// };

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve('../server/data/kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          planets.push(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        // const countPlanetsFound = (await getAllPlanets()).length;
        // console.log(`${countPlanetsFound} habitable planets found!`);
        console.log(`${planets.length} planets have been found!`)
        resolve();
      });
  })
};
