const db = require('../../data/configs')
const table = 'user';

async function add(user) {
	const [id] = await db(table).insert(user)
	return findById(id)
}

function findAll() {
	return db(table).select("id", "name", "username")
}

function findByUserName(username) {
	return db(table)
		.where({ username: username })
        .select("id", "name", "username")
}

function logIn(username){
    return db(table)
        .where({ username: username })
        .select('password')
}

module.exports = {
	add,
	findAll,
    findByUserName,
    logIn
}