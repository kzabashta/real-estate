'use strict';

var express = require('express');
var controller = require('./raw.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/municipalities', controller.municipalities)
router.get('/aggregate_sales', controller.aggregate_sales)
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;