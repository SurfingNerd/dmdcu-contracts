
import { DMDCertifiedUnique } from './api/contracts/DMDCertifiedUnique';
//import { contract } from "web3-eth-contract";
import web3 from 'web3';

//import Contract from "web3/eth/contract";


import * as fs from 'fs';
import * as path from 'path';





// async function deployNewDMDCertifiedUniqueContract(web3: web3, abiBasePath: string, account: string) {
//     //Buffer abiFile = fs.readFileSync('DMDCertifiedUnique.json');
//     const contract = new DMDCertifiedUnique(getABI('DMDCertifiedUnique', abiBasePath), null, {from: account});
    
//     return contract;
// }

export async function addNewCertifier(abiJSonInterface : any[], knownContractAddress: string, account: string, certifierName: string, officialID: string,mainAddress: string,website: string,text: string,imageIPFSAddress: string) {
    
    const x = new web3();
    
    
    const contractRaw = new x.eth.Contract(abiJSonInterface, knownContractAddress, {from: account});
    const contract = contractRaw as unknown as DMDCertifiedUnique;
    const result = await contract.methods.addCertifier(certifierName, officialID,mainAddress, website, text, imageIPFSAddress).send();
    return result;
    //return 'hello!';
}

function getABI(contractName: string, abiBasePath: string) {
    // It will read the ABI & byte code contents from the JSON file in ./build/contracts/ folder
    const jsonOutputName = `${path.parse(contractName).name}.json`;
    const jsonFile = `${abiBasePath}/${jsonOutputName}`;
    
    // Read the JSON file contents
    const contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
    const jsonOutput = JSON.parse(contractJsonContent);
    
    // Retrieve the ABI
    const { abi } = jsonOutput;
    return abi;
}

// function createDMDCertifiedUniqueContractObject(contractName: string, abiBasePath: string, existingContractAddress?: string )
//  : DMDCertifiedUnique {
//     return new DMDCertifiedUnique(getABI(contractName, abiBasePath), existingContractAddress);
// }



//const contract = new DMDCertifiedUnique.DMDCertifiedUnique()