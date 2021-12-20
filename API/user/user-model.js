const db = require('../../data/configs')
const table = 'user';

async function add(user) {
	return db(table)
        .insert(user)
        .returning('*');
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