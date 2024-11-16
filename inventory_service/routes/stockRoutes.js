const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.post('/', stockController.createStock);
router.put('/increase', stockController.increaseStock);
router.put('/decrease', stockController.decreaseStock);
router.get('/', stockController.getStocks);

module.exports = router;
