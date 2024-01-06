function determineSignInStatus (signInTime, referenceTime) {
  const signInDate = new Date(signInTime)
  let referenceDate = new Date(referenceTime)

  if (signInDate > referenceDate) {
    return 'late'
  } else if (signInDate < referenceDate) {
    return 'early'
  } else {
    return 'on-time'
  }
}

module.exports = determineSignInStatus
