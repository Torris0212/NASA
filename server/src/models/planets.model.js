import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';

export const planets = [];

const isHabitablePlanet = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

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

export const getAllPlanets = () => planets;
