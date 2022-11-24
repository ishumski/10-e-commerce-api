require('dotenv').config()
require('express-async-errors');
//express
const express = require('express')
const app = express()
//rest of the packages
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
//DB connection
const connectDB = require('./db/connect')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const {authUser} = require("./middleware/authentication");
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => res.send('E-commerce'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', authUser, productRouter)

//middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()

