"use strict";
exports.__esModule = true;
var Certifier = /** @class */ (function () {
    function Certifier(certifierName, officialID, mainAddress, website, text, imageIPFSAddress) {
        this.certifierName = certifierName;
        this.officialID = officialID;
        this.mainAddress = mainAddress;
        this.website = website;
        this.text = text;
        this.imageIPFSAddress = imageIPFSAddress;
    }
    return Certifier;
}());
exports.Certifier = Certifier;
var UndefinedUniqAsset = /** @class */ (function () {
    function UndefinedUniqAsset(id, owner, name, name2, assetPlainText, imageRessourcesIPFSAddress, certifier, assetType, buildDate, changeDate, customizationGrade, rawData) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.name2 = name2;
        this.assetPlainText = assetPlainText;
        this.imageRessourcesIPFSAddress = imageRessourcesIPFSAddress;
        this.certifier = certifier;
        this.assetType = assetType;
        this.buildDate = buildDate;
        this.changeDate = changeDate;
        this.customizationGrade = customizationGrade;
        this.rawData = rawData;
    }
    return UndefinedUniqAsset;
}());
exports.UndefinedUniqAsset = UndefinedUniqAsset;
var DocumentDetails = /** @class */ (function () {
    function DocumentDetails(uploadDate, documentLocation) {
        this.uploadDate = uploadDate;
        this.documentLocation = documentLocation;
    }
    return DocumentDetails;
}());
exports.DocumentDetails = DocumentDetails;
var UniqMotorcycle = /** @class */ (function () {
    // const result = `0x${this.numberToUInt32Hex(horsepower * 1000)}${this.numberToUInt32Hex(weight * 1000)}${this.numberToUInt32Hex(topSpeed * 1000)}${this.numberToUInt8Hex(vintageGrade)}${this.numberTo8ByteHex(techGrade)}`;
    function UniqMotorcycle(id, owner, name, name2, assetPlainText, imageRessourcesIPFSAddress, certifier, assetType, buildDate, changeDate, customizationGrade, horsepower, weight, topSpeed, vintageGrade, techGrade) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.name2 = name2;
        this.assetPlainText = assetPlainText;
        this.imageRessourcesIPFSAddress = imageRessourcesIPFSAddress;
        this.certifier = certifier;
        this.assetType = assetType;
        this.buildDate = buildDate;
        this.changeDate = changeDate;
        this.customizationGrade = customizationGrade;
        this.horsepower = horsepower;
        this.weight = weight;
        this.topSpeed = topSpeed;
        this.vintageGrade = vintageGrade;
        this.techGrade = techGrade;
    }
    UniqMotorcycle.getIDasHexValue = function (id) {
        var result = id.toString(16);
        while (result.length < 8) {
            result = "0" + result;
        }
        return result;
    };
    UniqMotorcycle.prototype.getIDasHexValue = function () {
        return UniqMotorcycle.getIDasHexValue(this.id);
    };
    UniqMotorcycle.prototype.horsePowerAsKw = function () {
        return (this.horsepower * 0.735499).toFixed(0);
    };
    UniqMotorcycle.prototype.customizationGradeAsText = function () {
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
    };
    UniqMotorcycle.prototype.changeDateFormatted = function () {
        return this.getDateAsMonthFormat(this.changeDate);
    };
    UniqMotorcycle.prototype.buildDateFormatted = function () {
        return this.getDateAsMonthFormat(this.buildDate);
    };
    UniqMotorcycle.prototype.getDateAsMonthFormat = function (data) {
        return data.getMonth().toFixed(0) + "/" + data.getFullYear();
    };
    UniqMotorcycle.prototype.getAdditionalImages = function () {
        console.error('id ' + this.id);
        console.error('id ' + typeof this.id);
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
    };
    UniqMotorcycle.prototype.getDocuments = function () {
        if (this.id === 1) {
            console.error('returning titan two ');
            return [
                new DocumentDetails(new Date(2019, 9, 15), '01_Data-Sheet_TITAN-Two_TITAN-Motorcycle-Co.pdf'),
                new DocumentDetails(new Date(2019, 9, 15), '02_Data-Sheet_TITAN-Two_TITAN-Motorcycle-Co_MYS-2019.pdf'),
                new DocumentDetails(new Date(2019, 9, 15), '03_Look-Book-Extract_TITAN-Two_TITAN-Motorcycle-Co_MYS-2019.pdf'),
                new DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-Blinkers_Kellermann-BL2000_ECE-Certificate.pdf'),
                new DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-High-Beam_223-457_SATELLITE_E4-Certificate.pdf'),
                new DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Front-Low-Beam_223-456_SATELLITE_E4-Certificate.pdf'),
                new DocumentDetails(new Date(2019, 9, 12), 'TITAN-Two_Asset-Rear-Light-Stripes_255-025_STRIPE_E4-Certificate.pdf'),
                new DocumentDetails(new Date(2019, 9, 10), 'TITAN-Two_Asset-Rear-Tyre_Continental-TKC80-Datasheet.pdf'),
                new DocumentDetails(new Date(2019, 9, 2), 'TITAN-Two_Asset-Rear-Tyre_Continental-TKC80-Spider-Diagramm-Enduro.png'),
            ];
        }
        return [];
    };
    UniqMotorcycle.prototype.getLongText = function () {
        if (this.id === 1) {
            return 'Every good Thing starts with an Idea. After TITAN “One” representing a true Café Racer for the Quarter Mile racing in the Salt Desert, TITAN went back to the Roots of BMW Motors which originally where build for Aircraft Engines. The Basic Idea was to build a Modern Speedster, a Combat Jet to Ride – A Stealth Fighter for the Street. Thus the unique Look of the TITAN “Two” was defined: An Homage to Stealth Fighter Jets. A Tribute to Aviation. /n Like her Predecessor, Main Custom Parts of the TITAN “Two” are unique handcrafted and made out of TITANIUM: Front Mask, Seat Base and Tail were handcrafted by famous BLECHMANN. The Fuel Tank was custom and tailor-made by TITAN decorated with a Handdrawn Custom Art by SHENFU – again a Tribute to the Bomber Pilot’s Pinup Girls, named “The Fat Lady”.  Originally build to represent TITAN Motorcycle Co. Re-Birth 2.0, it was built under the Topic for the Monaco Yacht Show 2019: Water+Air meet Fire+Earth too, thus representing the Elements Water and Air.  Not only resembling a Stealth Fighter, it received real Sturgeon Leather for Grips and Seat and moreover got nicknamed “The Shark”.';
        }
        return '';
    };
    UniqMotorcycle.prototype.isForSale = function () {
        return (this.id === 1);
    };
    return UniqMotorcycle;
}());
exports.UniqMotorcycle = UniqMotorcycle;
//# sourceMappingURL=dmdcuData.js.map