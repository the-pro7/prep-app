// This function handles asynchronous activities and also handles error in a clean manner as in shows where errors originate
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    res.status(500).json({ message: error.message })
  })
}

module.exports = asyncHandler
