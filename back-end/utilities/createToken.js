const jwt = require('jsonwebtoken')

const createToken = (res, userId, userName, userEmail, isAdmin) => {
  let token = jwt.sign(
    { userId, userName, userEmail, isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )

  // Set jwt as an HTTP-Only Cookie
  res.cookie('jwt', token, {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 24 * 30 * 60 * 60 * 1000
  })

  return token
}

module.exports = createToken
