
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

    public async addNewAsset(web3account: string, addressOfOwner: string, assetType: string, name: string, name2: string, name3: string,
        assetPlainText: string, imageRessourcesIPFSAddress, certifierAddress: string,
        changeDate: Date, rawDataHexString: string) {
        
             
        //this.contract.methods.addNewAsset(addressOfOwner, assetType, name) 
    }

    // public async addNewMotorcycle(web3account: string, addressOfOwner: string, assetType: string, name: string, name2: string, name3: string,
    //     assetPlainText: string, imageRessourcesIPFSAddress, certifierAddress: string,
    //     changeDate: Date, horsepower: number, weight: number, topSpeed: number,
    //     vintageGrade: number, techGrade: number
    //     )
    // {
    //     //all values are meant to have 3 dots precision. example: 86.731 horse power = 86731
    //     // uint32[] dataHorsepower;
    //     // uint32[] dataWeight;
    //     // uint32[] dataTopSpeed;

    //     //     //0: no vintage
    //     //     //1: has vintage elements
    //     //     //2: pure vintage
    //     // uint8[] dataVintageGrade;

    //     //     //0: old base
    //     //     //1: modern bike
    //     //     //2: state of the art high end technology
    //     // uint8[] dataTechGrade;

    //     //let rawData =  Buffer.of();
    // }

    public motorCycleValuesToHexString(horsepower: number, weight: number, topSpeed: number,
        vintageGrade: number, techGrade: number) : string {
        
        let result = `0x${this.numberTo32ByteHex(horsepower * 1000)}${this.numberTo32ByteHex(weight * 1000)}${this.numberTo32ByteHex(topSpeed * 1000)}${this.numberTo8ByteHex(vintageGrade * 1000)}${this.numberTo8ByteHex(techGrade * 1000)}`;
        console.log('motoHexString: ' + result);
        return result;
    }

    private numberTo32ByteHex(val: number) {
        return this.numberToXByteHex(val, 32);
    }

    
    private numberTo8ByteHex(val: number) {
        return this.numberToXByteHex(val, 8);
    }

    private numberToXByteHex(val: number, x: number) {
        const cleanedNumber = Number.parseInt(val.toString());
        let result = cleanedNumber.toString(16);
        if (result.length > (x*2)) throw Error(`The provided number cant be stored in ${x} bytes: ${val}`);
        while(result.length < x) {
            result = '0' + result;
        }
        return result;
    }

    private toBytes32String(val: string) : string {
        const result = this.web3.utils.fromUtf8(val);
        if (result.length > 32*2 + 1) {
            throw new Error(`This string is to long: ${val}`);
        }
        return result;
    }
}