var express = require('express');
var router = express.Router();
const path = require('path');
const productsFile = path.join(__dirname, './products.json');
const fs = require('fs')

 function createProduct(req, res) {
    console.log("req.body", req.body);
    //get the existing product data
    const existProducts = getProductData()

    //get the new product data from post request
    const productData = req.body

    //check if the productData fields are missing
    if (productData.name == null || productData.price == null || productData.availability == null || productData.size == null) {
        return res.status(401).send({ error: true, msg: 'Product data missing' })
    }

    //check if the productname exist already
    const findExist = existProducts.find(product => product.name === productData.name)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'product already exist' })
    }

    //append the product data
    existProducts.push(productData)

    //save the new product data
    saveProductData(existProducts);
    res.status(200).send({ success: true, msg: 'Product data added successfully' })

}


 function getProducts(req, res) {
    try {
        const products = getProductData()
        if (products)
            res.status(200).send(products);
        else
            res.status(200).send({ "message": "No products" });
    }
    catch (error) {
        res.status(500).send({ "message": "No products" });
    }

};


 function editProduct(req, res) {
    //get the productId from url
    const productId = req.params.id

    //get the update data
    const productData = req.body

    //get the existing product data
    const existProducts = getProductData()

    //check if the productname exist or not       
    const findExist = existProducts.find(product => product.id === productId)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'product does not exist' })
    }

    //filter the productdata
    const updateProduct = existProducts.filter(product => product.id !== productId)

    //push the updated data
    updateProduct.push(productData)

    //finally save it
    saveProductData(updateProduct)

    res.send({ success: true, msg: 'Product data updated successfully' })
}

 function deleteProduct(req, res) {
    const productId = req.params.id

    //get the existing productdata
    const existProducts = getProductData()

    //filter the productdata to remove it
    const filterProduct = existProducts.filter(product => product.id !== productId)

    if (existProducts.length === filterProduct.length) {
        return res.status(409).send({ error: true, msg: 'product does not exist' })
    }

    //save the filtered data
    saveProductData(filterProduct)

    res.send({ success: true, msg: 'Product removed successfully' })

}

function getProductById(req, res) {
    //get the productId from url
    const productId = req.params.id

    //get the existing product data
    const existProducts = getProductData()

    //check if the productname exist or not       
    const findExist = existProducts.find(product => product.id === productId)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'product does not exist' })
    }

    res.status(200).send(findExist)
}



const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync( productsFile, stringifyData)
}

const getProductData = () => {
    const jsonData = fs.readFileSync(productsFile, 'utf8')
    return JSON.parse(jsonData)
}
module.exports = { createProduct,getProductById, getProducts, editProduct, deleteProduct };
