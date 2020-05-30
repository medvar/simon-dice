module.exports = (app, uuid, DB, Request) => {
    let title;
    let globalresult = ""
    const simondice = ["Casa", "Lapiz", "Silla", "tv", "laptop", "MANZANA", "Teclado", "Control", "mesa", "mouse"]

    app.post('/access', (req, res) => {
        let { user, pass } = req.body
        let id0 = DB.access(user, pass)
        if (id0) {
            req.session.user = id0
            res.redirect('/home')
            res.end()
        } else {
            globalresult = 'Error Usuario o contraseña incorrectos'
            res.redirect('/login')
        }
        return;
    })
    const acceso = (req, res, next) => {
        if (!req.session.user)
            res.redirect('/login')

        next()
    }

    app.get('/', acceso, (req, res, next) => {
        res.render('home', { user: req.session.user });
    });
    app.get('/home', acceso, (req, res, next) => {
        res.render('home', { user: req.session.user });
    });

    app.get('/Login', (req, res, next) => {
        let resul = globalresult
        req.session.user = undefined
        globalresult = ""
        res.render('Login', { resul });
    });
    app.post('/fingame', acceso, (req, res, next) => {
        res.redirect('/home');
    });

    app.get('/play', acceso, (req, res, next) => {
        res.render('play', {
            user: DB.findObject("users", req.session.user, "id", false).user,
            user2: "COM",
            simondice
        });
    });

    app.get('/user/:id', acceso, (req, res, next) => {
        let user = DB.findObject('users', req.params.id)
        res.render('User', { user, action: '/' + req.params.id });
    });

    app.get('/users', acceso, (req, res, next) => {
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    });


    app.get('/singup', (req, res) => {
        let userval = {
            email: '',
            pass: '',
            pass2: '',
            user: ''
        }
        res.render('User', { userval, resul: "", action: '/singup' });
    });
    app.post('/singup', (req, res, next) => {
        let resul
        let { user, pass, pass2, email, con } = req.body
        let userval = {
            email,
            pass,
            pass2,
            user
        }
        if (!user || !pass || !pass2 || !email) {
            resul = "Error campos vacios"
            res.render('User', { userval, resul, action: '/singup' })
                //res.status(400).send('Error Campos Vacios');
            return;
        }
        if (!con) {
            resul = "Debe aceptar los terminos y condiciones"
            res.render('User', { userval, resul, action: '/singup' })
                //res.status(400).send('Error Campos Vacios');
            return;
        }
        if (pass == pass2) {
            let newuser = {
                id: uuid(),
                user,
                pass,
                email,
                puntos: "0"
            }
            DB.insert("users", newuser)
            let id0 = DB.access(user, pass)
            req.session.user = id0
            res.redirect('/home')
        } else {
            resul = "Error la contrase;a no coicide"
            res.render('User', { userval, resul, action: '/singup' })
            return
        }
    })

    app.post('/user/:id', acceso, (req, res, next) => {
        let { user, pass, name, email } = req.body
        let newuser = {
            id: req.params.id,
            user,
            pass,
            name,
            email
        }
        if (!user || !pass || !name || !email) {
            //res.status(400).send('Error Campos Vacios');
            res.render('Error', {
                link: 'user/' + req.params.id,
                mensaje: 'Error campos Vacios'
            });
            return;
        }
        DB.update("users", newuser)
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    })


    app.get('/aboutus', acceso, (req, res, next) => {
        res.render('aboutus', );
    });

    app.get('/aboutproyect', acceso, (req, res, next) => {
        res.render('aboutproyect', );
    });
}