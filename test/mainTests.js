// import { getLastBlockTimestamp } from './utils.mjs'; // ES6 imports seem still not to be a thing in nodejs
//const utils = require('./utils');

//const dmdcuApi = require('../api/dmdcuApi.js');
const dmdcuDataContext = require('../api/dmdcuDataContext.js');
const DMDCertifiedUnique = artifacts.require('DMDCertifiedUnique');
const BN = web3.utils.BN;


function expect(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}


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
  
  const motoHorsepower = 100; 
  const motoWeight = 611;
  const motoTopspeed = 213;
  const motoVintageGrade = 1;
  const motoTechGrade = 2;
  const motoCustomizationGrade = 4;
  const motoBuildDate = new Date(2001, 3) / 1000;

  let dataContext; 

  it('contract deployment', async()=> {

    //uniquesContract DMDCertifiedUnique
    uniquesContract = await DMDCertifiedUnique.new({from: blockservOrganisation});
    //uniquesContract = (await deployContract("DumbContract")) as DumbContract;
    //console.log('contract address:' + uniquesContract.address);
    //console.log(typeof DMDCertifiedUnique.abi);
    dataContext = new dmdcuDataContext.DmdcuDataContext(web3, uniquesContract.address);
    api = dataContext.api;

  })

  it('user noone tries to add a certifier, and fails as expected', async()=> {
    try {
      await api.addNewCertifier(noone, 'certifier2 should fail', 'certifier2 should fail',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
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
    const result = await api.addNewCertifier(blockservOrganisation, 'TITAN Motorcycles', 'ATU69699506',certifier1, 'https://titan-motorcycles.com', 'a test certifier!', '');
    //console.log('certifier added:');
    //console.log(result);
  })

  it('certifier1 tries to add certifier2 but still fails', async()=> {
    try {
      await api.addNewCertifier(certifier1, 'Monaco  Demo', '002', certifier2, 'https://monacoyachtshow.com', 'Monaco Yachting Show Demo Certifier', '');
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

    
  it('blockservOrganisation adds monaco Demo Certifier', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    //const result = await api.addNewCertifier(blockservOrganisation, 'TITAN Motorcycles', 'ATU69699506',certifier1, 'https://titan-motorcycles.com', 'a test certifier!', '');
    await api.addNewCertifier(blockservOrganisation, 'Monaco  Demo', 'monaco-demo', '0x70A830C7EffF19c9Dd81Db87107f5Ea5804cbb3F', 'https://monacoyachtshow.com', 'Monaco Yachting Show Demo Certifier', '');
    //console.log('certifier added:');
    //console.log(result);
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
    
    return api.addNewMotorcycle(certifier, 'myName1', 'myName2',
      'this is worlds first blockchain certified motorcycle', '', motoBuildDate,
      Date.now()/1000,motoCustomizationGrade, motoHorsepower, motoWeight, motoTopspeed, motoVintageGrade, motoTechGrade);
  }

  it('blockservOrganisation fails creating an motorcycle certificate as expected', async()=> {

    try{
      await addNewMoto(blockservOrganisation);
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

  it('certifier2 creates moto2, certifier3 creates moto3 and the values match the exptected ones', async()=> {

    moto2BN = await api.addNewMotorcycle(certifier2, 'moto2', 'tha moto 2',
      'this is worlds second blockchain certified motorcycle', '',
      motoBuildDate, Date.now()/1000, motoCustomizationGrade, motoHorsepower, motoWeight, motoTopspeed, motoVintageGrade, motoTechGrade);

    moto3BN = await api.addNewMotorcycle(certifier3, 'moto3', 'tha moto 3', 
      'this is worlds third blockchain certified motorcycle', '',
      motoBuildDate, Date.now()/1000, motoCustomizationGrade, 99, 445, 181, 0, 1);

      const moto2 = await dataContext.getUniqueMotorcycle(moto2BN.toNumber());
      //console.log('moto2: ', moto2);
      //expect()
      expect(moto2.horsepower === motoHorsepower, 'correct horsepower');
      expect(moto2.weight === motoWeight, 'correct weight');
      expect(moto2.topSpeed === motoTopspeed, 'correct topspeed');
      expect(moto2.vintageGrade  === motoVintageGrade, 'correct vintageGrade');
      expect(moto2.techGrade   === motoTechGrade, 'correct techGrade');
      expect(moto2.customizationGrade   === motoCustomizationGrade, 'correct customizationGrade');
      //console.log('moto3: ', moto3);

    

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

    //console.log('2:' ,await api.getUnique(1));
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