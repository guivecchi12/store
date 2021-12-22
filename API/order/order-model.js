const db = require('../../data/configs')
const table = 'order';

// List all inventory
function listOrders(){
    return db(table)
        .select('*');
}

// Find Order by Id
function findOrder(id){
    return db(table)
        .where({id: id})
        .first()
        .select('*')
}

// Find Order by UserID
function findUserOrders(id){
    return db(table)
        .where('userID', id)
        .select('*')
}

// List paid Orders
function listPaid(){
    return db(table)
        .where("paid", 1)
        .select('*')
}

// List not paid Orders
function listNotPaid(){
    return db(table)
        .where("paid", 0)
        .select('*')
}

// Add new Product
function addOrder(order){
    return db(table)
        .insert(order)
        .returning('*');
}

// Update Order
function update(id, order){
    return db(table)
        .where('id', id)
        .update(order)
        .returning('*')
}

// Delete Order
function remove(id){
    return db(table)
        .where('id', id)
        .delete()
        .returning('*')
}

module.exports = {
    listOrders,
    findOrder,
    findUserOrders,
    listPaid,
    listNotPaid,
    addOrder,
    update,
    remove
}