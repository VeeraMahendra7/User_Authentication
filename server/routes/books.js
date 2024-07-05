const express = require('express')
const Book = require('../models/book')
const router = express.Router()

router.get('/', async(req,res) => {
   try {
        const books = await Book.find();
        res.json(books)
   } catch (error) {
        res.status(404).json({'msg':error})
   }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params;
    try {
         const book = await Book.findById({_id:id});
         res.json(book)
    } catch (error) {
         res.status(404).json({'msg':error})
    }
 })

router.post('/addbook', async(req,res) => {
    const {bookId,name,pages,author,cost} = req.body
    try {
        const book = new Book({
            bookId,name,pages,author,cost
        })
        const b1 = await book.save();
        res.json(b1); 
    } catch (error) {
        res.status(404).json({'msg':error})
    }
})

router.put('/updateBook/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndUpdate({_id:id},{$set:{pages:750}});
        const p1 = await book.save()
        res.json(p1)
    } catch (error) {
        res.status(404).json({'msg':error})
    }
})

router.delete('/deleteBook/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const deleteBook = await Book.findByIdAndDelete({_id:id})
        res.json(deleteBook);
    } catch (error) {
        return res.status(404).json({msg:error})
    }
})

module.exports = router
