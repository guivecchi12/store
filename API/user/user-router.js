const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
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
	try {
		const body = req.body
		const user = await userModel.findByUserName( body.username ).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await userModel.add({
			name: body.name, 
			username: body.username, 
			password: await bcrypt.hash(body.password, 14)
		})

		res.status(201).json(newUser)

	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const body = req.body
        const password = await userModel.logIn( body.username ).first()
		const user = await userModel.findByUserName( body.username )

		if (user) {
            const passwordValid = await bcrypt.compare(body.password, password.password)
            
            if (passwordValid){
                const user = await userModel.findByUserName( body.username ).first()

                // generate a new JSON web token
                const token = jwt.sign({
                userID: user.id,
                name: user.name
                }, "Super safe")

                // send the token back as a cookie
                res.cookie("token", token)
                
                res.json({
                    name: user.name,
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

router.delete("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
		// but it becomes useless to them once the session is deleted server-side.
		if(req.session){
			req.session.destroy(err => {
				if (err) {
				  res.status(400).send('Unable to log out')
				} else {
				  res.send('Logout successful')
				  res.redirect('/')
				}
			  });
		}
		else{
			res.status(400).json({error: "No Session"})
		}
	} catch (err) {
		next(err)
	}
})



module.exports = router