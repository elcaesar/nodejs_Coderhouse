const {Router} = require('express')
const {userLogin} = require('../controllers/login')
const router = Router()

router.post('/login', userLogin)

module.exports = router