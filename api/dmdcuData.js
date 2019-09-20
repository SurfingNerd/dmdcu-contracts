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
            return 'Grade 4 (75% and more)';
        }
        return '?';
    };
    UniqMotorcycle.prototype.changeDateFormatted = function () {
        return this.getDateAsMonthFormat(this.changeDate);
    };
    UniqMotorcycle.prototype.getDateAsMonthFormat = function (data) {
        return data.getMonth().toFixed(0) + "/" + data.getFullYear();
    };
    return UniqMotorcycle;
}());
exports.UniqMotorcycle = UniqMotorcycle;
//# sourceMappingURL=dmdcuData.js.map