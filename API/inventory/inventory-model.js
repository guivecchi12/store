const db = require('../../data/configs')
const table = 'inventory';

// List all inventory
function listInv(){
    return db(table)
        .orderBy('title')
        .select('*');
}

// Find by id
function findID(id){
    return db(table)
        .where({id: id})
        .first()
        .select('*');
}

// Find by name
function findProdByTitle(title){
    return db(table)
        .whereRaw('LOWER(title) LIKE ?', [`%${title}%`])
        .select('*');
}

// Check for existing name
function findTitle(title){
    return db(table)
        .where({title: title})
        .first();
}

// Add new Product
function addProduct(prod){
    return db(table)
        .insert(prod)
        .returning('*');
}

// Update Inventory
function updateProduct(prod, changes){
    return db(table)
        .where({id: prod})
        .first()
        .update(changes)
        .returning('*');
}

// Delete Product
function deleteProduct(prod){
    return db(table)
        .where({id: prod})
        .del()
        .returning('*')
}

module.exports = {
    listInv,
    findID,
    findProdByTitle,
    findTitle,
    addProduct,
    updateProduct,
    deleteProduct
}