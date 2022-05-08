function getBuildTime() {
  const timeNow = new Date();

  return timeNow.toUTCString();
}

module.exports = getBuildTime;
