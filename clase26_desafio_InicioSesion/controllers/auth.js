
//traigo el modelo de DB de Mongo
const Usuario = require('../model/userDB')

const getlogin = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const postlogin = async (req, res)=>{
    //verificar en db
    const {username, userpass} = req.body;
    if(username){
        req.session.user = username;
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
}

const getlogout = (req, res) => {
    if (req.session.user != undefined) {
        const name = req.session.user;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                userName: name,
                loggedIn: false,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}

const getdashboard = (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.session.user,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

const postsignup = async (req, res) => {
	const body = req.body
	const usuario = new Usuario(body)
	await usuario.save()

	console.log(body)
	res.redirect('/login', {
		msg : "Usuario creado con éxito. Por favor ingrese con sus credenciales"
	})
}

const getsignup = (req, res) => {
    res.render("pages/signup")
}

const loginError = (req, res) => {
    // res.status(400).json({
    //     message:'Acceso no autorizado',
    //     authenticated: false
    // })
    res.render('pages/error', {
        errMsg: 'Acceso no autorizado',
        backUrl: '/login'
    })
}

const signupError = (req, res) => {
    // res.status(400).json({
    //     message:'No se pudo registrar el usuario',
    //     registered: false
    // })
    res.render('pages/error', {
        errMsg: 'El usuario ya existe en la base de datos.',
        backUrl: '/login'
    })
}

const failLoginDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const failSignupDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}

module.exports = {
    getlogin,
    postlogin,
    getlogout,
    getdashboard,
	postsignup,
    getsignup,
    loginError,
    signupError,
    failLoginDisplay,
    failSignupDisplay
}

