
import { DmdcuApi } from './dmdcuApi';

import { UniqMotorcycle, Certifier } from './dmdcuData';

import BN from 'bn.js';
import web3 from 'web3';

//
// A caching datacontext for the DMD Certified Unique Contracts.
//


interface IDmdcuRawUnique {
  owner: string;
  name: string;
  name2: string;
  assetPlainText: string;
  imageRessourcesIPFSAddress: string;
  id: number;
  certifierID: number;
  assetType: number;
  buildDate: number;
  changeDate: number;
  customizationGrade: number;
  rawData: string;
}

export class DmdcuDataContext {

  private certifierMapCache : Map<Number, Certifier>;
  private motorcycleMapCache : Map<Number, UniqMotorcycle>;
  private isCertifierCache? : boolean;
  private isOwnerCache? : boolean;

  public api : DmdcuApi;

  constructor(web3: web3,  knownContractAddress: string) {
    this.api = new DmdcuApi(web3, knownContractAddress);
    this.certifierMapCache = new  Map<Number, Certifier>();
    this.motorcycleMapCache = new Map<Number, UniqMotorcycle>();
  }

  private hexStringToUtf8Text(inputString: string) : string {
    return this.api.web3.utils.hexToUtf8(inputString);
  }

  // public async getUniqueMotorcycle(id: number) : Promise<UniqMotorcycle[]> {
  //   let result: UniqMotorcycle[] = [];
  //   this.api.getUnique(id);
  //   return result;
  // }

  private async rawUniqueToMotorcycle(x: IDmdcuRawUnique) : Promise<UniqMotorcycle> {
    //console.log('unique:', x);
    //const certifierID = x.certifierID.toNumber();
    //console.log(`query certifierID: ${x.certifierID}`);
    const certifier = await this.getCertifier(x.certifierID);

    //TODD: RawData to moto data.
    const motoValues = this.api.convertRawDataToMotoValues(x.rawData);

    const horsepower = motoValues.horsepower;
    const weight = motoValues.weight;
    const topSpeed = motoValues.topSpeed;
    const vintageGrade = motoValues.vintageGrade;
    const techGrade = motoValues.techGrade;
    
    // Typechain says that customizationGrade is a number field, but web3 in fact returns a 
    const customizationGrade = parseInt(x.customizationGrade.toString());

    console.error('customizationGrade:' + customizationGrade);
    console.error('customizationGrade Type:' + typeof customizationGrade);

    return new UniqMotorcycle(x.id, x.owner, this.hexStringToUtf8Text(x.name), this.hexStringToUtf8Text(x.name2), x.assetPlainText, x.imageRessourcesIPFSAddress, certifier, x.assetType, new Date(x.buildDate  * 1000),  new Date(x.changeDate * 1000), customizationGrade, horsepower, weight, topSpeed, vintageGrade, techGrade);
  }

  public async getAllUniqueMotorcycles(forceRefresh: boolean = false) : Promise<UniqMotorcycle[]> {

    // TODO: It's currently always a "forceRefresh". use cache if possible ?!

    const result: UniqMotorcycle[] = [];

    // console.log('getAllUniques...');
    const apiResult = await this.api.getAllUniques();

    for (const x of apiResult) {

      const moto = await this.rawUniqueToMotorcycle(x);
      result.push(moto);
      //console.log('setting moto: ' + moto.id, moto);
      this.motorcycleMapCache.set(moto.id, moto);
      //console.log('getting moto: ' + moto.id, this.motorcycleMapCache.get(moto.id));
    }
    //console.log('got all uniques, returning.');
    return result;

    // apiResult.forEach(x=>{
    //   result.push();
    // })
  }

  public async getUniqueMotorcycle(id: number) : Promise<UniqMotorcycle> {

    // console.log('get Moto: ' + id);
    // console.log('motorcycleMapCache: ' , this.motorcycleMapCache);

    let result : UniqMotorcycle | undefined;

    this.motorcycleMapCache.forEach((x) => {
      // console.log('checking Asset: ' + x.id + ' ' + id);

      if (x.id.toString() === id.toString()) {
        // console.log('is SAME!');
        result = x;
        return x;
      }
      // else {
      //   console.log(`${x.id} is not ${id}`);
      // }
    });

    if (result) {
      return result;
    }

    try {
      const uniqueRaw = await this.api.getUnique(id);
      result = await this.rawUniqueToMotorcycle(uniqueRaw);
      this.motorcycleMapCache.set(result.id, result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to find Asset with ID: ${id}`);
    }

    //WHY THE FUCK FUCKING MAP FUCK does not work ?

    // const potentialResult = this.motorcycleMapCache[id];
    // console.log(potentialResult);
    // return potentialResult!;
  }

  public async addMotoToBlockchain(moto: UniqMotorcycle) : Promise<BN> {
    const motoID = await this.api.addNewMotorcycle(this.api.web3.eth.defaultAccount, moto.name, moto.name2, moto.assetPlainText, moto.imageRessourcesIPFSAddress, (+(moto.buildDate) / 1000), (+(moto.changeDate) / 1000), moto.customizationGrade,  moto.horsepower, moto.weight, moto.topSpeed, moto.vintageGrade, moto.techGrade);
    const allMotorCycles = await this.getAllUniqueMotorcycles(true);
    return motoID;
    // this.getUniqueMotorcycle(motoID.toNumber());
  }

  public async getCertifier(id: number) : Promise<Certifier> {

    // premise: only certifier numbers are asked that also exist.

    if (this.certifierMapCache.has(id)) {
      const result =  this.certifierMapCache.get(id);
      if (result === undefined) {
        throw new Error(`No certifier with ID ${id} known.`);
      }
      return result;
    }

    const raw = await this.api.getCertifier(id);
    const newCertifier = new Certifier(raw.name, raw.officialID, raw.mainAddress, raw.website, raw.text, raw.imageIPFSAddress);
    this.certifierMapCache.set(id, newCertifier);
    return newCertifier;
  }

  public async isOwner() {
    if (this.isOwnerCache === undefined) {
      this.isOwnerCache = await this.api.isOwner();
    }
    return this.isOwnerCache.valueOf();
  }

  public async isCertifier() {
    if (this.isCertifierCache === undefined) {
      this.isCertifierCache = await this.api.isCertifier();
    }
    return this.isCertifierCache.valueOf();
  }

  public impersonateViaPK(pk: string) : string {
    let privateKey = pk;
    // console.log('pk', pk);
    if (!pk.startsWith('0x')) {
      privateKey = `0x${pk}`;
    }

    const accountFromPK = this.api.web3.eth.accounts.privateKeyToAccount(privateKey);
    // console.log(`impersonating to ${accountFromPK.address} ( ${accountFromPK.privateKey} )`);
    this.api.web3.eth.accounts.wallet.add(accountFromPK);
    this.api.web3.eth.defaultAccount = accountFromPK.address;
    this.isOwnerCache = undefined;
    this.isCertifierCache = undefined;
    return accountFromPK.address;
  }
}
