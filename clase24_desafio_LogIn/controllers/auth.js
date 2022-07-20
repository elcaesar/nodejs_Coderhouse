
//traigo el modelo de DB de Mongo
const Usuario = require('../model/userDB')

const authLogin = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const authLoginPost = async (req, res)=>{
    const {username} = req.body;
    if(username){
        req.session.user = username;
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
}

const authLogout = (req, res) => {
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

const dashboard = (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.session.user,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

const signup = async (req, res) => {
	const body = req.body
	const usuario = new Usuario(body)
	await usuario.save()

	console.log(body)
	res.redirect('/login', {
		msg : "Usuario creado con éxito. Por favor ingrese con sus credenciales"
	})
}

const formSignup = (req, res) => {
    res.render("pages/signup")
}

module.exports = {
    authLogin,
    authLoginPost,
    authLogout,
    dashboard,
		signup,
    formSignup
}

