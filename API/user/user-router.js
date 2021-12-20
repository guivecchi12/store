const express = require('express')
const router = express.Router()
const userModel = require('./user-model')

router.get("/", async (req, res, next) => {
	try {
		res.json(await userModel.findAll())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	console.log("NEW USER: ", req.body)
	try {
		const { name, username, password } = req.body
		const user = await userModel.findByUserName( username ).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await userModel.add({
            name,
			username,
            password: await bcrypt.hash(password, 14)
		})
		res.status(201).json(newUser)

	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
        const user = await userModel.findByUserName( username ).first()
		
		if (user) {
            // hash the password again and see if it matches what we have in the database
            const passwordValid = await bcrypt.compare(password, user.password)
            
            if (passwordValid){
                const user = await userModel.findByUserName( username ).first()

                // generate a new JSON web token
                const token = jwt.sign({
                userID: user.id,
                name: user.name
                }, "Super safe")

                // send the token back as a cookie
                res.cookie("token", token)
                
                res.json({
                    message: `Welcome ${user.name}!`,
                    token: token
                })
            }
            else{
                return res.status(401).json({
                    message: "You shall not pass!",
                })
            }
        }
        
        else{
            return res.status(401).json({
				message: "You shall not pass!",
			})
        }

	} catch(err) {
		next(err)
	}
})

router.get("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
		// but it becomes useless to them once the session is deleted server-side.
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})



module.exports = router