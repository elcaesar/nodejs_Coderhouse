const passport = require('passport')
const { Router } = require('express')
const { sessionChecker } = require('../middlewares/session-checker')

const {
  getlogin,
  postlogin,
  getsignup,
  postsignup,
  getdashboard,
  getlogout,
  loginError,
  signupError,
  failLoginDisplay,
  failSignupDisplay
} = require('../controllers/auth')

const router = Router()

router.get('/', sessionChecker, (req,res) => {
  res.redirect('/login')
})

router.get('/login', sessionChecker, getlogin)

router.post('/login',
            passport.authenticate('login', {successRedirect:'/dashboard', failureRedirect:'/flogin'}), postlogin)

router.get('/signup', getsignup)

router.post('/signup',passport.authenticate('register', {failureRedirect: '/fregister'}), postsignup)

router.get('/dashboard', getdashboard)

router.get('/logout', getlogout)

router.get('/flogin', loginError)
router.get('/fregister', signupError)
router.get('/faillogin', failLoginDisplay)
router.get('/failregister', failSignupDisplay)


module.exports = router