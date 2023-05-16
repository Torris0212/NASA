export const launches = new Map();

let flightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch);

export const getAllLaunches = () => Array.from(launches.values());

export const addNewLaunch = (launch) => {
  flightNumber++;
  launches.set(
    flightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ['ZTM', 'NASA'],
      flightNumber
    })
  );
}
