
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const postCharge = require('./stripe')


const app = express()
const router = express.Router()
const port = process.env.PORT || 7000


router.post('/stripe/checkout', postCharge)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use('/api', router)


app.listen(port, () =>console.log(`server running on port ${port}`))