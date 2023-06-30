// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
// import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
// app.use('/api/upload', uploadRoutes)

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`)
//   res.status(400) // set the status code
//   next(error) // throw the error
// })
// app.use((req, res, next) => {
//   res.status(404).send(`Not Found - ${req.originalUrl}`)
// })


// app.get('/api/products', (req, res) => {
//     res.json(products)
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id == req.params.id)
//     res.json(product)
// })

// app.use((err, req, res, next) => {
//     const statusCode =res.statusCode ===200 ? 500 : res.statuscode
//     res.status(statusCode)
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? numm : err.stack,
//     })
// })
// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// });

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5005

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))