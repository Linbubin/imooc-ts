import express from 'express'
import router from './router'
import bodyParser from "body-parser";

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

app.listen(1234, () => {
  console.log('port :: 1234');
})