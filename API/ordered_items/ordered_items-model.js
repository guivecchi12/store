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
function listOrderItems(id){
    return db(table)
        .join('order as o', `${table}.order`, 'o.id')
        .where('o.userID', id)
        .join('inventory as i', `${table}.inventory_sku`, `i.id`)
        .orderBy('o.id')
        .select('o.id as order_number', 'o.created_at as order_date', 'o.total_cost', 'o.paid', 'i.title', `${table}.quantity_ordered as quantity`, 'i.price as unit_price')
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