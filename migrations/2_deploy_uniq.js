

const DMDCertifiedUnique = artifacts.require('DMDCertifiedUnique');

module.exports = function(deployer) {

  const uniquesContract = deployer.deploy(DMDCertifiedUnique);
  //uniquesContract = await DMDCertifiedUnique.new({from: blockservOrganisation});

  //console.log('deployed:');
  //console.log(uniquesContract);
  //api = new dmdcuApi.DmdcuApi(web3, DMDCertifiedUnique.abi, uniquesContract.address);
};
