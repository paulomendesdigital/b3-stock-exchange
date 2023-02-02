import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

app.listen(3000, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
