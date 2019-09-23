
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

export class DocumentDetails {
  constructor(public uploadDate: Date, public documentLocation: string) {

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
      return 'Grade 4 (75%+)';
    }
    return '?';
  }

  public changeDateFormatted(): string {
    return this.getDateAsMonthFormat(this.changeDate);
  }

  public buildDateFormatted(): string {
    return this.getDateAsMonthFormat(this.buildDate);
  }

  public getDateAsMonthFormat(data: Date) : string {
    return `${data.getMonth().toFixed(0)}/${data.getFullYear()}`;
  }

  public getAdditionalImages() : string[] {

    console.error('id ' + this.id);
    console.error('id ' + typeof this.id)
    if (this.id === 1) {
      console.error('returning titan two ');
      return [ 
        'titan-two-2',
        'titan-two-3',
        'titan-two-4',
        'titan-two-5',
      ];
    }

    return [];
  }

  public getDocuments() :  DocumentDetails[] {

    if (this.id === 1) {
      console.error('returning titan two ');
      return [
        new  DocumentDetails(new Date(2019, 9, 15), '01_Data-Sheet_TITAN-Two_TITAN-Motorcycle-Co.pdf'),
        new  DocumentDetails(new Date(2019, 9, 15), '02_Data-Sheet_TITAN-Two_TITAN-Motorcycle-Co_MYS-2019.pdf'),
        new  DocumentDetails(new Date(2019, 9, 15), '03_Look-Book-Extract_TITAN-Two_TITAN-Motorcycle-Co_MYS-2019.pdf'),
        new  DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-Blinkers_Kellermann-BL2000_ECE-Certificate.pdf'),
        new  DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-High-Beam_223-457_SATELLITE_E4-Certificate.pdf'),
        new  DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-Low-Beam_223-456_SATELLITE_E4-Certificate.pdf'),
        new  DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Rear-Light-Stripes_255-025_STRIPE_E4-Certificate.pdf'),
        new  DocumentDetails(new Date(2019, 9, 10), 'TITAN-Two_Asset-Rear-Tyre_Continental-TKC80-Datasheet.pdf'),
        new  DocumentDetails(new Date(2019, 9, 2), 'TITAN-Two_Asset-Rear-Tyre_Continental-TKC80-Spider-Diagramm-Enduro.png'),
      ];
    }

    return [];
  }

  public getLongText() : string {
    if (this.id === 1) {
      return 'Every good Thing starts with an Idea. After TITAN “One” representing a true Café Racer for the Quarter Mile racing in the Salt Desert, TITAN went back to the Roots of BMW Motors which originally where build for Aircraft Engines. The Basic Idea was to build a Modern Speedster, a Combat Jet to Ride – A Stealth Fighter for the Street. Thus the unique Look of the TITAN “Two” was defined: An Homage to Stealth Fighter Jets. A Tribute to Aviation. /n Like her Predecessor, Main Custom Parts of the TITAN “Two” are unique handcrafted and made out of TITANIUM: Front Mask, Seat Base and Tail were handcrafted by famous BLECHMANN. The Fuel Tank was custom and tailor-made by TITAN decorated with a Handdrawn Custom Art by SHENFU – again a Tribute to the Bomber Pilot’s Pinup Girls, named “The Fat Lady”.  Originally build to represent TITAN Motorcycle Co. Re-Birth 2.0, it was built under the Topic for the Monaco Yacht Show 2019: Water+Air meet Fire+Earth too, thus representing the Elements Water and Air.  Not only resembling a Stealth Fighter, it received real Sturgeon Leather for Grips and Seat and moreover got nicknamed “The Shark”.';
    }
    return '';
  }

  public isForSale() : boolean {
    return (this.id === 1);
  }
}