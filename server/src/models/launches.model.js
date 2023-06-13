import axios from 'axios';

import launchesDatabase from './launches.mongo.js';
import planets from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

const findLaunch = async (filter) => {
  return await launchesDatabase.findOne(filter);
}

export const saveLaunch = async (launch) => {
  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}

export const loadLaunchesData = async () => {
  const firstLaunch = await findLaunch({ flightNumber: 1, mission: 'FalconSat' });

  if (firstLaunch) {
    console.log('Launch data already loaded');
    return;
  }

  const res = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
              customers: 1
          }
        }
      ]
    }
  });

  if (res.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }

  const launchDocs = res.data.docs;

  launchDocs.map(async (launchDoc) => (
    await saveLaunch({
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers: launchDoc.payloads.flatMap(payload => payload.customers)
    })
  ));
}

export const getAllLaunches = async (limit, skip) => {
  return await launchesDatabase
    .find({}, {'_id': 0, '__v': 0})
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await findLaunch().sort('-flightNumber') ?? DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

export const scheduleNewLaunch = async (launch) => {
  // findOne returns object. find returns list of ducuments
  const planet = await planets.findOne({
    keplerName: launch.destination
  })

  if (!planet) {
    throw new Error("No matching planet was found");
  }

  const newFlightNumber = await getLatestFlightNumber();

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber + 1
  });

  await saveLaunch(newLaunch);
}

export const existsLaunchWithId = async (launchId) => {
  return await findLaunch({ flightNumber: launchId });
}

export const abortLaunchById = async (launchId) => {
  return await launchesDatabase.updateOne({
    flightNumber: launchId}, {
      upcoming: false,
      success: false,
    });
}
