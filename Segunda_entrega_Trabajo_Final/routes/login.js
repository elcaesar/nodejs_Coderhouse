const {Router} = require('express')
const userLogin = require('../controllers/login')
const router = Router()

router.post('/', userLogin)

module.exports = router