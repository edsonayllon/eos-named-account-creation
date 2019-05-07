const express = require('express');
const router = express.Router();
let { Keystore, Keygen } = require('eosjs-keygen');

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "5JCiDALQ2G2UEKXUAPs91K4c6eXCNPoubCTx9924To4jW7NvtSd"; // james
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

/* GET users listing. */
router.post('/', async (req, res, next) => {
  //res.send('respond with a resource');
  var keys = await Keygen.generateMasterKeys();

  console.log(req.body);

  keys.publicKeys.active
  try {
    const result = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'newaccount',
      authorization: [{
        actor: 'james',
        permission: 'active',
      }],
      data: {
        creator: 'james',
        name: req.body.name,
        owner: {
          threshold: 1,
          keys: [{
            key: keys.publicKeys.owner,
            weight: 1
          }],
          accounts: [],
          waits: []
        },
        active: {
          threshold: 1,
          keys: [{
            key: keys.publicKeys.active,
            weight: 1
          }],
          accounts: [],
          waits: []
        },
      },
    },
    {
      account: 'eosio',
      name: 'buyrambytes',
      authorization: [{
        actor: 'james',
        permission: 'active',
      }],
      data: {
        payer: 'james',
        receiver: req.body.name,
        bytes: 819200000,
      },
    },
    {
      account: 'eosio',
      name: 'delegatebw',
      authorization: [{
        actor: 'james',
        permission: 'active',
      }],
      data: {
        from: 'james',
        receiver: req.body.name,
        stake_net_quantity: '0.0001 EOS',
        stake_cpu_quantity: '0.0001 EOS',
        transfer: false,
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });

    console.log({
      keys: keys,
      transaction: result
    });
    res.json({
      keys: keys,
      transaction: result
    });
  } catch (e) {
    console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError)
    console.log(JSON.stringify(e.json, null, 2));

    console.log({
      keys: keys,
      transaction: result
    });
    res.json({
      keys: keys,
      transaction: result
    });
  }
});

module.exports = router;
