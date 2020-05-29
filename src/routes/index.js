module.exports = (app, uuid, DB, Request, access) => {
    let title;
    let resul;
    app.post('/access', (req, res) => {
        let { user, pass } = req.body
        let id0 = DB.access(user, pass)
        if (id0) {
            req.session.user = id0
                //res.status(200).send({ resul: 'Exito' })
            res.redirect('/home')
            res.end()
        } else {
            //res.status(400).send({ error: 'Usuario o contraseña incorrectos' })
            resul = 'Error Usuario o contraseña incorrectos'
                //res.status(301).send({ resul: 'Error' })
            res.redirect('/login')
        }
        return;
    })
    const acceso = (req, res, next) => {
        console.log(req.session.user)
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
        res.render('Login', {
            resul
        });
    });
    app.post('/fingame', acceso, (req, res, next) => {
        res.render('home', { user: req.session.user });
    });
    const simondice = ["casa", "lapiz", "tv", "teclado", "silla", "pc", "mouse", "mesa", "manzana", "control"]
    app.get('/play', (req, res, next) => {
        res.render('play', {
            user: DB.findObject("users", req.session.user, "id", false).user,
            user2: "COM",
            simondice
        });
    });

    app.get('/user', acceso, (req, res, next) => {
        let user = {
            name: '',
            email: '',
            pass: '',
            user: ''
        }
        res.render('User', { user, action: '' });
    });
    app.get('/user/:id', acceso, (req, res, next) => {
        /* Request.get('http://localhost:5000/api/user/' + req.params.id, (error, response, body) => {
             if (error) {
                 return console.dir(error);
             }
             console.log(body)
             res.render('User', { body });
         })
         */
        let user = DB.findObject('users', req.params.id)
            //  console.log(user)
        res.render('User', { user, action: '/' + req.params.id });
    });

    app.get('/users', acceso, (req, res, next) => {
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    });


    app.get('/singup', (req, res) => {
        let user = {
            email: '',
            pass: '',
            pass2: '',
            user: ''
        }
        resul = ""
        res.render('User', { user, resul, action: '/singup' });
    });
    app.post('/singup', (req, res, next) => {
        let { user, pass, pass2, email, con } = req.body
        console.log(req.body)
        let newuser = {
            id: uuid(),
            user,
            pass,
            email,
            puntos: "0"
        }
        if (!user || !pass || !pass2 || !email) {
            resul = "Error campos vacios"
            res.render('User', { user, resul, action: '/singup' })
                //res.status(400).send('Error Campos Vacios');
            return;
        }
        if (!con) {
            resul = "Debe aceptar los terminos y condiciones"
            res.render('User', { user, resul, action: '/singup' })
                //res.status(400).send('Error Campos Vacios');
            return;
        }
        if (pass == pass2) {
            DB.insert("users", newuser)
            let id0 = DB.access(user, pass)
            req.session.user = id0
            res.redirect('/home')
        } else {
            resul = "Error la contrase;a no coicide"
            res.render('User', { newuser, resul, action: '/singup' })
            return
        }
    })

    app.post('/user', acceso, (req, res, next) => {
        let { user, pass, name, email } = req.body
        let newuser = {
            id: uuid(),
            user,
            pass,
            name,
            email
        }
        if (!user || !pass || !name || !email) {
            res.render('Error', {
                link: 'user',
                mensaje: 'Error campos Vacios'
            });
            //res.status(400).send('Error Campos Vacios');
            return;
        }
        DB.insert("users", newuser)
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
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