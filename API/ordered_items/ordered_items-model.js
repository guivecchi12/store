const db = require('../../data/configs')
const table = 'ordered_item';

// List all inventory
function listOrderedItems(){
    return db(table)
        .select('*');
}

// Find item
function findItem(id){
    return db(table)
        .where('id', id)
        .select('*')
}

// Items in order
function listOrderItems(order){
    return db(table)
        .where('order', order)
        .select('*')
}

// Add new Item
function addOrderItem(item){
    return db(table)
        .insert(item)
        .returning('*');
}

// Update Item
function updateItem(id, update){
    return db(table)
        .where('id', id)
        .update(update)
        .select('*')

}

// Delete Item
function deleteItem(id){
    return db(table)
        .where({id: id})
        .del()
        .returning('*')
}

module.exports = {
    listOrderedItems,
    findItem,
    listOrderItems,
    addOrderItem,
    updateItem,
    deleteItem
}