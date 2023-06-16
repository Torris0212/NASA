const API_HOST = '/';

async function httpGetPlanets() {
  const res = await fetch(`${API_HOST}/planets`);

  return await res.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const res = await fetch(`${API_HOST}/launches`);
  const launches = await res.json();
  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_HOST}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    });
  } catch (err) {
    console.log(err);
    return { ok: false }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_HOST}/launches/${id}`, {
      method: 'DELETE'
    })
  } catch (err) {
    console.log(err);
    return { ok: false }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};