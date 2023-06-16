const API_URL = 'http://localhost:5000';

async function httpGetPlanets() {
  // Load planets and return as JSON
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
