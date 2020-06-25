const express = require('express')
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./views');
const twing = new TwingEnvironment(loader);

const router = express.Router()

router.get('/', (req, res) => {
    twing.render('index.twig', { 'title': 'Login' }).then((output) => {
        res.end(output);
    });
})

router.get('/register', (req, res) => {
    twing.render('register.twig', { 'title': 'Database Setup' }).then((output) => {
        res.end(output);
    });
})

module.exports = router