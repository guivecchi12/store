const jwt = require("jsonwebtoken")
const { nextTick } = require("process")

function restrict() {
	return async (req, res, next) => {
		const authError = {
			message: "You need to login to view Orders!",
		}

		try {
			// token is coming from the client's cookie jar, in the "Cookie" header
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			// decode the token, re-sign the payload, and check if signature is valid
			jwt.verify(token, "Super safe", (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				req.token = decoded

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict