const express = require('express')
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./views');
const twing = new TwingEnvironment(loader);

const router = express.Router()

router.get('/', (req, res) => {
    twing.render('index.twig', {'name': 'World'}).then((output) => {
        res.end(output);
    });
})

router.get('/register', (req, res) => {
    //res.render('register')
})

module.exports = router