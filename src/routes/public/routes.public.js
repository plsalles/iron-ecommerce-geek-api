const { Router } = require('express');
const ProductsControler = require('../../controlers/productsControler/products.controler');
const AuthControler = require('../../controlers/authControler/auth.controler');


const router = Router();

router.get('/products', ProductsControler.listAll);

router.post('/auth/signup', AuthControler.signup);

router.post('/auth/login', AuthControler.login);

module.exports = router;
