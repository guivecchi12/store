const express = require('express');

const router = express.Router()
const orderModel = require('./order-model.js');
const restrict = require('../middleware/restrict')

//Find all Orders
router.get('/', restrict(), async(req, res, next) => {
    try{
        const orders = await orderModel.listOrders()
        return res.status(200).json(orders)
    }
    catch(err){
        next(err)
    }
})

// Find by order ID
router.get('/find/:id', restrict(), async(req, res, next) => {
    try{
        const order = await orderModel.findOrder(req.params.id)

        if(!order){
            return res.status(400).json({message: "Order not found"})
        }

        return res.status(200).json(order)
    }
    catch(err){
        next(err)
    }
})

// Find Order made by User
router.get('/user', restrict(),  async(req, res, next) => {
    try{
        const user = req.token.userID

        const orders = await orderModel.findUserOrders(user)

        if(!orders){
            return res.status(400).json({message: "Order not found"})
        }

        return res.status(200).json(orders)
            
    }
    catch(err){
        next(err)
    }
})

// Find Orders Paid for
router.get('/paid', restrict(), async(req, res, next) => {
    try{
        const paidOrders = await orderModel.listPaid()
        return res.status(200).json(paidOrders)
    }
    catch(err){
        next(err)
    }
})

// Find Orders not Paid for
router.get('/notPaid', restrict(), async(req, res, next) => {
    try{
        const unpaidOrders = await orderModel.listNotPaid()
        return res.status(200).json(unpaidOrders)

    }
    catch(err){
        next(err)
    }
})

// Add new Order
router.post('/', async(req, res, next) => {
    try{

        const newOrder = req.body;

        const response = await orderModel.addOrder(newOrder)
        // await orderModel.listOrders()
        return res.status(201).json(response)
    }
    catch(err){
        next(err)
    }
})

// Update Order
router.put('/:id', restrict(), async(req, res, next) => {
    try{
        const changeOrder = req.body;
        const orderId = req.params.id;
        const order = await orderModel.findOrder(orderId)

        if(!order){
            return res.status(401).json({message: 'Order not found'})
        }

        await orderModel.update(orderId, changeOrder)
        const updated = await orderModel.findOrder(orderId)
        return res.status(200).json(updated)
    }
    catch(err){
        next(err)
    }
})

// Delete Order
router.delete('/:id', restrict(), async(req, res, next) => {
    try{
        const orderId = req.params.id;
        const order = await orderModel.findOrder(orderId)

        if(!order){
            return res.status(401).json({message: 'Order not found'})
        }

        await orderModel.remove(orderId)
        orderList = await orderModel.listOrders()
        return res.status(200).json(orderList)
    }
    catch(err){
        next(err)
    }
})

module.exports = router