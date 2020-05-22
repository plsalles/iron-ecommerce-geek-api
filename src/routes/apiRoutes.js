const { Router } = require('express');
const ProcuctsController = require('../controlers/products.controler');

const router = Router();

router.get('/', ProcuctsController.listAll);

module.exports = router;
