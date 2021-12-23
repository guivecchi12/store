const express = require('express')
const router = express.Router()
const itemsModel = require('./ordered_items-model');
const restrict = require('../middleware/restrict')

router.get('/', restrict(), async(req, res, next) => {
    try{
        const orders = await itemsModel.listOrderedItems()
        return res.status(200).json(orders)
    }
    catch(err){
        next(err)
    }
})

// Get the products within an order
router.get('/user', restrict(), async(req, res, next) => {
    try{
        const user = req.token.userID
        const order = await itemsModel.listOrderItems(user)
        return res.status(200).json(order)
    }
    catch(err){
        next(err)
    }
})

// Add new Product
router.post('/', restrict(), async(req, res, next) => {
    try{

        const newOrder = req.body;
        if(!newOrder.order){
            return res.status(400).json({message: "Order ID is required"})
        }
        if(!newOrder.inventory_sku){
            return res.status(400).json({message: "Purchasing SKU needed"})
        }
        if(!newOrder.quantity_ordered){
            return res.status(400).json({message: "Quantity needed"})
        }

        await itemsModel.addOrderItem(newOrder)
        const response = await itemsModel.listOrderedItems()
        
        return res.status(201).json(response)
    }
    catch(err){
        next(err)
    }
})

// Update item
router.put('/:id', restrict(), async(req, res, next) => {
    try{
        const changeItem = req.body;
        const itemId = req.params.id;
        const item = await itemsModel.findItem(itemId)

        if(!item){
            return res.status(401).json({message: 'Item not found'})
        }

        await itemsModel.updateItem(itemId, changeItem)
        const updated = await itemsModel.findItem(itemId)
        return res.status(200).json(updated)
    }  
    catch(err){
        next(err)
    }
    
})

// Remove item
router.delete('/:id', restrict(), async(req, res, next) => {
    try{
        const itemId = req.params.id;
        const item = await itemsModel.findItem(itemId)
        console.log(item)

        if(!item || item.length === 0){
            return res.status(401).json({message: 'Order not found'})
        }

        await itemsModel.deleteItem(itemId)
 
        return res.status(200).json({message: "Item successfully removed"})
    }
    catch(err){
        next(err)
    }
})


module.exports = router