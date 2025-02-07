const express = require('express');
const formRouting = require('./FormRouter/formRouter');

let router = express.Router();

router.use(formRouting)

module.exports = router;