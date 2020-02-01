import {Router} from 'express'
import doSomething from './crowller'

const router = Router()

router.get('/aaa', (req, res) => {
  doSomething()
  res.end('done success')
})
router.get('/', (req, res) => {
  res.end('hello world')
})

export default router