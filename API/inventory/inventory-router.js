const express = require('express')
const router = express.Router()
const invModel = require('./inventory-model')

// List all inventory
router.get('/', async(req, res, next) => {
    try{
        const inventory = await invModel.listInv()
        console.log(inventory)
        return res.status(200).json(inventory)
    }
    catch(err){
        next(err)
    }
})

// Find Inventory by name/id
router.get('/:search', async(req, res, next) => {
    try{
        let inv = await invModel.findID(req.params.search)
        if(!inv){
            inv = await invModel.findProdByTitle(req.params.search)
            if(!inv){
                return res.status(400).json({error: "This book doesn't exist"})
            }
        }
        return res.status(200).json(inv)
    }
    catch(err){
        next(err)
    }
})

// Add new Product
router.post('/', async (req, res, next) => {
    console.log("New product: ", req.body)
    try{
        const newProd = req.body;
        if(!newProd.title || newProd.title.trim() === '' || !newProd.price || !newProd.image || newProd.image.trim() === ''){
            return res.status(400).json({error: "More information on the book is required"})
        }

        const prodExists = await invModel.findTitle(newProd.title)
        if(prodExists){   
            return res.status(200).json({message: 'already exists', product: prodExists})
        }

        await invModel.addProduct(newProd)
        const response = await invModel.listInv()
        
        return res.status(201).json(response)
    }
    catch(err){
        next(err)
    }
})

// Update Product
router.put('/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const body = req.body
        const exist = await invModel.findID(id)

        if(!exist){
            return res.status(401).json({error: "Book not found"})
        }
        else if(!body){
            return res.status(400).json({error: "No changes made"})
        }

        await invModel.updateProduct(id, body)
        const updated = await invModel.findID(id)

        return res.status(200).json(updated)
    }
    catch(err){
        next(err)
    }
})

// Delete Product
router.delete('/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const removed = await invModel.findID(id)

        console.log(removed);

        if(!removed){
            return res.status(401).json({error: "Book not found"})
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
        next(err)
    }
})

module.exports = router