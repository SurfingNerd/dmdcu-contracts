
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

    public async addNewMotorcycle(web3account: string, addressOfOwner: string, assetType: string, name: string, name2: string, name3: string,
        assetPlainText: string, imageRessourcesIPFSAddress,
        changeDate: number, horsepower: number, weight: number, topSpeed: number,
        vintageGrade: number, techGrade: number) {

            const motorcylceValues = this.motorCycleValuesToNumberArray(horsepower, weight, topSpeed, vintageGrade, techGrade);
            return this.addNewAsset(web3account, addressOfOwner, assetType, name, name2, name3, assetPlainText, imageRessourcesIPFSAddress, 
            changeDate, motorcylceValues);
    }

    public async addNewAsset(web3account: string, addressOfOwner: string, assetType: string, name: string, name2: string, name3: string,
        assetPlainText: string, imageRessourcesIPFSAddress,
        changeDate: number, rawData: number[]) {

            

        //console.log('rawDataHexString: ' + rawDataHexString);
        //const assetTypeID = await this.getIndexOfAssetType(assetType);
        const allAssetTypes = await this.getAllAssetTypes();
        const assetTypeID = allAssetTypes.indexOf(assetType);

        if (assetTypeID < 0) {
            throw Error(`AssetType ${assetType} is not known to this contract. add it first with addNewAssetType.`);
        }

        return this.contract.methods.addNewAsset(addressOfOwner, assetTypeID, this.toBytes32String(name), this.toBytes32String(name2), this.toBytes32String(name3), assetPlainText, this.toBytes32String(imageRessourcesIPFSAddress), '0x' + this.dateToUInt64Hex(changeDate), rawData).send({gas:'0x100000', from:web3account});
    }

    public async getAllAssetTypes() : Promise<String[]> {

        const assetTypesResult = await (await this.contract.methods.getAllAssetTypes.call({}).call({}) );
        const result = [];

        //console.log(assetTypesResult);
        for (let i = 0; i < assetTypesResult.length; i++) {
            result.push(web3.utils.toUtf8(assetTypesResult[i]));
        }

        return result;
    }

    public async getIndexOfAssetType(assetType : string) : Promise<number> {

        const assetTypeEncoded =  this.toBytes32String(assetType);
        return await (await this.contract.methods.getIndexOfAssetType.call({}, assetTypeEncoded )).call({}, assetTypeEncoded);
    }

    public motorCycleValuesToHexString(horsepower: number, weight: number, topSpeed: number,
        vintageGrade: number, techGrade: number) : string {

        //all values are meant to have 3 dots precision. example: 86.731 horse power = 86731
        // uint32[] dataHorsepower;
        // uint32[] dataWeight;
        // uint32[] dataTopSpeed;
        //
        //     //0: no vintage
        //     //1: has vintage elements
        //     //2: pure vintage
        // uint8[] dataVintageGrade;
        //
        //     //0: old base
        //     //1: modern bike
        //     //2: state of the art high end technology
        // uint8[] dataTechGrade;

        
        let result = `0x${this.numberToUInt32Hex(horsepower * 1000)}${this.numberToUInt32Hex(weight * 1000)}${this.numberToUInt32Hex(topSpeed * 1000)}${this.numberToUInt8Hex(vintageGrade)}${this.numberTo8ByteHex(techGrade)}`;
        //console.log('motoHexString: ' + result);
        return result;
    }

    public motorCycleValuesToNumberArray(horsepower: number, weight: number, topSpeed: number,
        vintageGrade: number, techGrade: number) : number[] {
        
        return this.hexStringToNumberArray(this.motorCycleValuesToHexString(horsepower, weight, topSpeed, vintageGrade, techGrade));
    }

    private dateToUInt64Hex(val: number) : string {
        return this.numberToUInt64Hex(val / 1000);
    }

    // private numberTo64ByteHex(val: number) {
    //     return this.numberToXByteHex(val, 64);
    // }


    private numberToUInt8Hex(val: number) {
        return this.numberToXByteHex(val, 1);
    }

    private numberToUInt16Hex(val: number) {
        return this.numberToXByteHex(val, 2);
    }

    private numberToUInt32Hex(val: number) {
        return this.numberToXByteHex(val, 4);
    }

    private numberToUInt64Hex(val: number) {
        
        return this.numberToXByteHex(val, 4);
    }

    private numberTo8ByteHex(val: number) {
        return this.numberToXByteHex(val, 8);
    }

    private numberToXByteHex(val: number, x: number) {

        if (val < 0) throw new Error('val need to be positiv');
        const cleanedNumber = Number.parseInt(val.toString());
        let result = cleanedNumber.toString(16);
        if (result.length > (x*2)) throw Error(`The provided number cant be stored in ${x} bytes: ${val}`);
        while(result.length < x) {
            result = '0' + result;
        }
        return result;
    }

    private hexStringToNumberArray(hexString: string) : number[] {

        let hexStr: string = hexString;
        
        if (hexStr.startsWith('0x')) {
          hexStr = hexStr.substring(2, hexStr.length);
        }
        
        let result = new Array<number>(hexStr.length / 2);
        var i;
        for (i = 0; i < result.length; i++) {
            result[i] = Number.parseInt(hexStr.substring(i*2, i*2+1), 16);
        } 
        return result;
    }

    private hexStringToBuffer(hexString: string) : Buffer {
        let hexStr = hexString;
        if (hexStr.startsWith('0x')) {
          hexStr = hexStr.substring(2, hexStr.length);
        }
        return Buffer.from(hexStr, 'hex');
    }

    private toBytes32String(val: string) : string {
        const result = this.web3.utils.fromUtf8(val);
        if (result.length > 32*2 + 1) {
            throw new Error(`This string is to long: ${val}`);
        }
        return result;
    }
}