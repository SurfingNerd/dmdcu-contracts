// import { getLastBlockTimestamp } from './utils.mjs'; // ES6 imports seem still not to be a thing in nodejs
//const utils = require('./utils');

const api = require('./dmdcuApi.js');
const DMDCertifiedUnique = artifacts.require('DMDCertifiedUnique');
const BN = web3.utils.BN;

contract('DMDCertifiedUnique', (accounts) => {
  console.log(`Accounts: ${accounts}`);

  // initial setup
  const blockservOrganisation = accounts[0];
  const certifier1 = accounts[1];
  const certifier2 = accounts[2];
  const endConsumer1 = accounts[3];
  const endConsumer2 = accounts[4];
  const endConsumer3 = accounts[5];

  it('blockservOrganisation adds certifier1', async()=> {

  })

  it('certifier1 tries to add certifier2 but fails', async()=> {

  })

  it('certifier1 creates an certificate for endConsumer1', async()=> {

  })

  it('endConsumer1 accepts that certificate', async()=> {

  })

  it('blockservOrganisation adds certifier2', async()=> {

  })

});