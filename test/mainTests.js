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

  let uniquesContract;
  let apiWrapper;

  it('contract deployment', async()=> {


    
    //uniquesContract DMDCertifiedUnique
    uniquesContract = await DMDCertifiedUnique.new({from: blockservOrganisation});
    //uniquesContract = (await deployContract("DumbContract")) as DumbContract;
    //console.log('contract address:' + uniquesContract.address);
    //console.log(typeof DMDCertifiedUnique.abi);
    apiWrapper = new api.DmdcuApi(web3, DMDCertifiedUnique.abi, uniquesContract.address);
    console.log('apiWRapperType: ' + typeof apiWrapper);

  })

  
  it('blockservOrganisation adds certifier1', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    const result = await apiWrapper.addNewCertifier(blockservOrganisation, 'certifier1', '001',certifier1, 'www.nomansland.example', 'a test certifier!', '');
    //console.log('certifier added:');
    //console.log(result);
  })

  it('certifier1 tries to add certifier2 but fails', async()=> {
    try {
      await apiWrapper.addNewCertifier(certifier1, 'certifier2', '002',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
  })

  it('certifier1 tries to add a new certifacte type but fails', async() => {
    try {
      await apiWrapper.addNewAssetType(certifier1, 'motorcycle');
    } catch (error) {
      return;
    }
    throw new Error('addNewCertifier should fail, but it did not.');
  })


  // it('blockcerv adds motorcycle certifacte ', async() => {
    
  //   await apiWrapper.addNewAssetType(certifier1, 'motorcycle');

  // })

  // it('certifier1 creates an motorcycle certificate for endConsumer1', async()=> {
  //   console.log(apiWrapper.motorCycleValuesToHexString(100, 611, 213, 0, 1));
  // })

  it('endConsumer1 accepts that certificate', async()=> {

  })

  it('blockservOrganisation adds certifier2', async()=> {

  })


  //V2 requirements
  // as a certifier
  // - i can change my data
  //
  // as a owner
  // - i can change the address of a certifier (use case: certifier lost his keys)
  

  

});