
import { DMDCertifiedUnique } from './contracts/DMDCertifiedUnique';
//import { contract } from "web3-eth-contract";
import web3 from 'web3';

//import Contract from "web3/eth/contract";

import * as fs from 'fs';
import * as path from 'path';

export class DmdcuApi {

    public contract: DMDCertifiedUnique;

    constructor (public web3: web3, public abiJSonInterface : any[], public knownContractAddress: string) {
        const contractRaw = new this.web3.eth.Contract(this.abiJSonInterface, this.knownContractAddress);
        this.contract = contractRaw as unknown as DMDCertifiedUnique;
    }

    public async addNewAssetType(web3account: string, assetTypeName: string) {
        return this.contract.methods.addAssetType(this.toBytes32String(assetTypeName)).send({gas:'0x100000', from:web3account});
    }

    public async addNewCertifier(web3account: string, certifierName: string, officialID: string,mainAddress: string,website: string,text: string,imageIPFSAddress: string) {
        const certifierNameHex = this.toBytes32String(certifierName);
        const officialIDHex = this.toBytes32String(officialID);
        const websiteHex = this.toBytes32String(website);
        const imageIPFSAddressHex = this.toBytes32String(imageIPFSAddress);
        return this.contract.methods.addCertifier(certifierNameHex, officialIDHex, mainAddress, websiteHex, text, imageIPFSAddressHex).send({gas:'0x100000', from:web3account});
    }

    private toBytes32String(val: string) : string {

        const result = this.web3.utils.fromUtf8(val);
        if (result.length > 32*2 + 1) {
            throw new Error(`This string is to long: ${val}`);
        }
        return result;
    }
}