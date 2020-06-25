const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body)

    const { name, email, password, passwordConfirm } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, result) => {
        if (error) {
            console.log(error)
        }

        if (result > 0) {
            return twing.render('register.twig', { 'message': 'That email is already in use !' }).then((output) => {
                res.end(output);
            });
        } else if (password !== passwordConfirm) {
            return twing.render('register.twig', { 'message': 'Passwords do not match !' }).then((output) => {
                res.end(output);
            });
        }
    })

    res.send('Form submitted')
}