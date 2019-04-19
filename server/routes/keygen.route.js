const express = require('express');
const router = express.Router();
let { Keystore, Keygen } = require('eosjs-keygen')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  //res.send('respond with a resource');
  var keys = await Keygen.generateMasterKeys();
  res.json(keys);
});

module.exports = router;
