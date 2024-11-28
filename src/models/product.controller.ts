// fetch all, fetch one, add, edit, and delete products.

import { Request, Response } from "express";
import { Product } from "../controllers/product.model";


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `fail to fetch all products` })
    }
}

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ error: `product not found.` })
            return
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `fail to get product.` })
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `fail to add product.` })
    }
}

const updateProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!updatedProduct) {
            res.status(404).json({ error: `product not exist` })
            return
        }
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `fail to update product.` })
    }
}

const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deleteProductById) {
            res.status(404).json({ error: `product not found.` })
            return
        }
        res.status(200).json({ message: 'product deleted.' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `fail to delete product` })
    }
}

export default {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
}