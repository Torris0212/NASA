import launches from './launches.mongo.js';
import planets from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;

export const getAllLaunches = async () => await launches.find({}, {'_id': 0, '__v': 0});

export const saveLaunch = async (launch) => {
  // findOne returns object. find returns list of ducuments
  const planet = await planets.findOne({
    keplerName: launch.destination
  })

  if (!planet) {
    throw new Error("No matching planet was found");
  }

  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches.findOne().sort('-flightNumber') ?? DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

export const scheduleNewLaunch = async (launch) => {
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
  return await launches.findOne({ flightNumber: launchId });
}

export const abortLaunchById = async (launchId) => {
  return await launches.updateOne({
    flightNumber: launchId}, {
      upcoming: false,
      success: false,
    });
}
