const express = require('express')
const router = express.Router()
const invModel = require('./inventory-model')
const errorMessage = require('../errorMessage')

// List all inventory
router.get('/', async(req, res) => {
    try{
        const inventory = await invModel.listInv()
        console.log(inventory)
        return res.status(200).json(inventory)
    }
    catch(err){
        return errorMessage(res, 500, err.message)
    }
})

// Find Inventory by name/id
router.get('/:search', async(req, res) => {
    try{
        let inv = await invModel.findID(req.params.search)
        if(!inv){
            inv = await invModel.findProdByTitle(req.params.search)
            if(!inv){
                return errorMessage(res, 400, "This book doesn not exist")
            }
        }
        return res.status(200).json(inv)
    }
    catch(err){
        return errorMessage(res, 500, err.message)
    }
})

// Add new Product
router.post('/', async(req,res) => {
    try{
        const newProd = req.body;
        if(!newProd.title || newProd.title.trim() === '' || !newProd.price || !newProd.image || newProd.image.trim() === ''){
            return errorMessage(res, 400, "Book title is required")
        }

        const prodExists = await invModel.findTitle(newProd.title)
        if(prodExists){
            // return errorMessage(res, 400, 'This product already exists would you like to add stock instead?')    
            return res.status(200).json({message: 'already exists', product: prodExists})
        }

        await invModel.addProduct(newProd)
        const response = await invModel.listInv()
        
        return res.status(201).json(response)
    }
    catch(err){
        return errorMessage(res, 500, err.message)
    }
})

// Update Product
router.put('/:id', async(req,res) => {
    try{
        const id = req.params.id
        const body = req.body
        const exist = await invModel.findID(id)

        if(!exist){
            return errorMessage(res, 401, "Book not found")
        }
        else if(!body){
            return errorMessage(res, 400, "No changes made")
        }

        await invModel.updateProduct(id, body)
        const updated = await invModel.findID(id)

        return res.status(200).json(updated)
    }
    catch(err){
        return errorMessage(res, 500, err.message)
    }
})

// Delete Product
router.delete('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const removed = await invModel.findID(id)

        console.log(removed);

        if(!removed){
            return errorMessage(res, 401, "Book not found")
        }

        else{
            console.log(id)
            const r = await invModel.deleteProduct(id)
            console.log(r)
            return res.status(200).json({
                message: 'Book successfully removed',
                product: removed
            })
        }
    }
    catch(err){
        return errorMessage(res, 500, err.message)
    }
})

module.exports = router