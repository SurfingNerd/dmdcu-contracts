
export class Certifier {
  constructor(public certifierName: string, public officialID: string, public mainAddress: string, public website: string, public text: string, public imageIPFSAddress: string) {
  }
}

export interface IUniqueAsset {
  id: number;
  owner: string;
  name: string;
  name2: string;
  assetPlainText: string;
  imageRessourcesIPFSAddress: string;
  certifier: Certifier;
  assetType: number;
  buildDate: Date;
  changeDate: Date;
  
}

export class UndefinedUniqAsset implements IUniqueAsset {

  constructor(public id: number, public owner: string, public name: string, public name2: string, public  assetPlainText: string, public imageRessourcesIPFSAddress: string, public certifier: Certifier, public assetType: number, public buildDate: Date, public changeDate: Date, public customizationGrade: number,  public rawData: number[]) {

  }
}

export class UniqMotorcycle implements IUniqueAsset {

  public static getIDasHexValue(id: number) : string {
    let result = id.toString(16);

    while(result.length < 8) {
      result = `0${result}`;
    }

    return result;
  }

  // const result = `0x${this.numberToUInt32Hex(horsepower * 1000)}${this.numberToUInt32Hex(weight * 1000)}${this.numberToUInt32Hex(topSpeed * 1000)}${this.numberToUInt8Hex(vintageGrade)}${this.numberTo8ByteHex(techGrade)}`;

  constructor(public id: number, public owner: string, public name: string, public name2: string, public  assetPlainText: string, public imageRessourcesIPFSAddress: string, public certifier: Certifier, public assetType: number, public buildDate: Date, public changeDate: Date, public customizationGrade: number, public horsepower: number, public weight: number, public topSpeed: number, public vintageGrade: number, public techGrade: number) {
  }

  public getIDasHexValue() : string {
    return UniqMotorcycle.getIDasHexValue(this.id);
  }

  public horsePowerAsKw() {
    return (this.horsepower  * 0.735499).toFixed(0);
  }

  public customizationGradeAsText() {
    if (this.customizationGrade === 0) {
      return 'Grade 0: none';
    }
    if (this.customizationGrade === 1) {
      return 'Grade 1 (10-25%)';
    }
    if (this.customizationGrade === 2) {
      return 'Grade 2 (25-50%)';
    }
    if (this.customizationGrade === 3) {
      return 'Grade 3 (50-75%)';
    }
    if (this.customizationGrade === 4) {
      return 'Grade 4 (75% and more)';
    }
    return '?';
  }

  public changeDateFormatted(): string {
    return this.getDateAsMonthFormat(this.changeDate);
  }

  public getDateAsMonthFormat(data: Date) : string {
    return `${data.getMonth().toFixed(0)}/${data.getFullYear()}`;
  }
}