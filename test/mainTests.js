// import { getLastBlockTimestamp } from './utils.mjs'; // ES6 imports seem still not to be a thing in nodejs
//const utils = require('./utils');

const dmdcuApi = require('./dmdcuApi.js');
const DMDCertifiedUnique = artifacts.require('DMDCertifiedUnique');
const BN = web3.utils.BN;


contract('DMDCertifiedUnique', (accounts) => {
  console.log(`Accounts: ${accounts}`);

  // initial setup
  const noone = accounts[0]; //noone account should never be used. it's the default account used by web3.
  
  const blockservOrganisation = accounts[1];
  const certifier1 = accounts[2];
  const certifier2 = accounts[3];
  const certifier3 = accounts[4];
  const endConsumer1 = accounts[5];
  const endConsumer2 = accounts[6];
  const endConsumer3 = accounts[7];

  let uniquesContract;
  let api;

  it('contract deployment', async()=> {

    //uniquesContract DMDCertifiedUnique
    uniquesContract = await DMDCertifiedUnique.new({from: blockservOrganisation});
    //uniquesContract = (await deployContract("DumbContract")) as DumbContract;
    //console.log('contract address:' + uniquesContract.address);
    //console.log(typeof DMDCertifiedUnique.abi);
    api = new dmdcuApi.DmdcuApi(web3, DMDCertifiedUnique.abi, uniquesContract.address);

  })


  it('certifier1 tries to add certifier2 but fails', async()=> {
    try {
      await api.addNewCertifier(certifier1, 'certifier2', '002',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
  })

  
  it('blockservOrganisation adds certifier1', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    const result = await api.addNewCertifier(blockservOrganisation, 'certifier1', '001',certifier1, 'www.nomansland.example', 'a test certifier!', '');
    //console.log('certifier added:');
    //console.log(result);
  })

  it('certifier1 tries to add certifier2 but still fails', async()=> {
    try {
      await api.addNewCertifier(certifier1, 'certifier2', '002',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
  })

  it('certifier1 tries to add a new certifacte type but fails', async() => {
    try {
      await api.addNewAssetType(certifier1, 'motorcycle');
    } catch (error) {
      return;
    }
    throw new Error('addNewCertifier should fail, but it did not.');
  })

  it('blockservs adds motorcycle asset type', async() => {

    await api.addNewAssetType(blockservOrganisation, 'motorcycle');

    const allAssetTypes = await api.getAllAssetTypes();
    if (allAssetTypes[0] != 'motorcycle') {
      console.error(allAssetTypes);
      throw Error('addNewAssetType failed!');
    }
  })


  async function addNewMoto(certifier) {
    
    return api.addNewMotorcycle(certifier, 'motorcycle', 'myName1', 'myName2', 'myName3',
      'this is worlds first blockchain certified motorcycle', '',
      Date.now()/1000, 100, 611, 213, 0, 1);
  }


  it('blockservOrganisation fails creating an motorcycle certificate as expected', async()=> {

    try{
      await addNewMoto(blockservOrganisation);
    } catch(error) {
      return;
    }
    throw new Error('addNewCertifier should fail, but it did not.');

  })



  let idFirstMoto;

  it('certifier1 creates an motorcycle certificate', async()=> {
    idFirstMoto = await addNewMoto(certifier1);
  })


  // it('endConsumer2 tries to accept that certificate, but fails', async()=> {

  //   try{
  //     await api.acceptNewUniqueAsset(endConsumer2, idFirstMoto);
  //   } catch(error) {
  //     return;
  //   }
  //   throw new Error('acceptNewUniqueAsset should fail, but it dit not.');
  // })



  // it('certifier1 tries to accepts that certificate, but fails', async()=> {

  //   try{
  //     await api.acceptNewUniqueAsset(certifier1, idFirstMoto);
  //   } catch(error) {
  //     return;
  //   }
  //   throw new Error('acceptNewUniqueAsset should fail, but it dit not.');
  // })

  // it('endConsumer1 accepts fantasy number certificate, but fails.', async()=> {
  //   try{
  //     await api.acceptNewUniqueAsset(endConsumer1, new BN('0x3dbf9d2e186dabe6922c32b02a290105b0cd4ff00cf6fc076a6a24f61c3fe498', 'hex'));
  //   } catch(error) {
  //     return;
  //   }
  //   throw new Error('acceptNewUniqueAsset should fail, but it dit not.');
  // })



  // it('endConsumer1 accepts that certificate', async()=> {

  //   await api.acceptNewUniqueAsset(endConsumer1,  new BN(idFirstMoto, 'hex'));
  // })


  it('certifier2 fails creating an motorcycle certificate as expected (not whitelisted yet)', async()=> {

    try{
      await addNewMoto(certifier2);
    } catch(error) {
      return;
    }
    throw new Error('addNewCertifier should fail, but it did not.');

  })

  it('blockservOrganisation whitelists certifier2 and certifier3 as well', async()=> {
    await api.addNewCertifier(blockservOrganisation, 'certifier2', '002',certifier2, 'www.certifier2.example', 'a second test certifier!', '');
    await api.addNewCertifier(blockservOrganisation, 'certifier3', '003',certifier3, 'www.certifier3.example', 'a third test certifier!', '');
  })

  let moto2;
  let moto3;

  it('certifier2 creates moto2, certifier3 creates moto3', async()=> {

    moto2 = api.addNewMotorcycle(certifier2, 'motorcycle', 'moto2', 'tha moto 2', 'm2',
      'this is worlds second blockchain certified motorcycle', '',
      Date.now()/1000, 86, 552, 194, 0, 1);

    moto3 = api.addNewMotorcycle(certifier3, 'motorcycle', 'moto3', 'tha moto 3', 'm3',
      'this is worlds third blockchain certified motorcycle', '',
      Date.now()/1000, 99, 445, 181, 0, 1);

  })


  it('query assets 0 (zero) fails as expected.', async()=> {

    try{
      await api.getUnique(0);
    } catch(error) {
      return;
    }
    throw new Error('query assets 0 (zero) should fail, but it dit not.');

    
  })


  

  it('query all available assets.', async()=> {

    const allUniques = await api.getAllUniques();

    //console.log('2:' ,await api.getUnique(2));
    //console.log('3:' ,await api.getUnique(3));

    //console.log('All Uniques:', allUniques);
  })

  

  // it('blockservOrganisation adds certifier2', async()=> {

  // })

  //V2 requirements
  // as a certifier
  // - i can change my data
  //
  // as a owner
  // - i can change the address of a certifier (use case: certifier lost his keys)
  

});