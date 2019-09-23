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
  
  const blockservOrganisation = accounts[1];
  const titanAccount = accounts[2];
  const monacoTestUser = '0x6aC85035886B8a9a7d9C8Af90Ca8F838C6D3be2D';


  let uniquesContract;
  let api;

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
  
  it('blockservOrganisation adds Titan', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    const result = await api.addNewCertifier(blockservOrganisation, 'TITAN Motorcycles', 'ATU69699506',titanAccount, 'https://titan-motorcycles.com', 'TITAN Motor - HANDCRAFTED WITH PASSION', '');
    //console.log('certifier added:');
    //console.log(result);
  })
    
  it('blockservOrganisation adds monaco Demo Certifier', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    //const result = await api.addNewCertifier(blockservOrganisation, 'TITAN Motorcycles', 'ATU69699506',certifier1, 'https://titan-motorcycles.com', 'a test certifier!', '');
    await api.addNewCertifier(blockservOrganisation, 'Monaco  Demo', 'monaco-demo', monacoTestUser, 'https://monacoyachtshow.com', 'Monaco Yachting Show Demo Certifier', '');
    //console.log('certifier added:');
    //console.log(result);
  })

  it('blockservs adds motorcycle, yacht, watch:  asset type', async() => {

    await api.addNewAssetType(blockservOrganisation, 'motorcycle');
    await api.addNewAssetType(blockservOrganisation, 'yacht');
    await api.addNewAssetType(blockservOrganisation, 'watch');
    const allAssetTypes = await api.getAllAssetTypes();
    if (allAssetTypes[0] != 'motorcycle') {
      console.error(allAssetTypes);
      throw Error('addNewAssetType failed!');
    }
  })

  it('TITAN Motorcycles adds Titan Two', async()=> {

    const titan2ShortText = 'Best of Show CoN Professional Category 2019, Stealth Fighter, Nickname “The Shark”.';
      await api.addNewMotorcycle(titanAccount, 'TITAN Two', 'BMW R45 / R75',
      titan2ShortText, dataContext.api.web3.utils.fromUtf8('titan-two-1') , new Date(1978, 02, 01) / 1000,
      Date.now()/1000,4, 57, 197, 203, 1, 1);
  })

});