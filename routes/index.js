const express = require('express');
const router = express.Router();
const RequestTrapController = require('../controllers/RequestTrapController');

router.get('/', (req, res) => { res.render('home', { req }) });
router.get('/favicon.ico', (req, res) => { res.status(204).json() });
router.all('/:trap_id', RequestTrapController.save);
router.get('/:trap_id/requests', RequestTrapController.getRequestList);

module.exports = router;
