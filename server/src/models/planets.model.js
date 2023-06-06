import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';

import planets from './planets.mongo.js';

const isHabitablePlanet = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

const savePlanet = async (planet) => {
  try {
    // use upsert operation
    await planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    })
  } catch (err) {
    console.log(`Could not save planet: ${err}`);
  }
}

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve('../server/data/kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetsFound = await getAllPlanets();
        console.log(`${planetsFound.length} planets have been found!`)
        resolve();
      });
  })
};

export const getAllPlanets = async () => await planets.find({}, {'_id': 0, '__v': 0});
