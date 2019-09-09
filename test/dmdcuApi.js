"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bn_js_1 = __importDefault(require("bn.js"));
//import { Contract } from "web3";
var web3_1 = __importDefault(require("web3"));
var DmdcuApi = /** @class */ (function () {
    // public cc: Eth["Contract"];
    function DmdcuApi(web3, abiJSonInterface, knownContractAddress) {
        this.web3 = web3;
        this.abiJSonInterface = abiJSonInterface;
        this.knownContractAddress = knownContractAddress;
        var contractRaw = new this.web3.eth.Contract(this.abiJSonInterface, this.knownContractAddress);
        this.contract = contractRaw;
        this.contractJs = contractRaw;
    }
    DmdcuApi.prototype.addNewAssetType = function (web3account, assetTypeName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.addAssetType(this.toBytes32String(assetTypeName)).send({ gas: '0x100000', from: web3account })];
            });
        });
    };
    DmdcuApi.prototype.addNewCertifier = function (web3account, certifierName, officialID, mainAddress, website, text, imageIPFSAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var certifierNameHex, officialIDHex, websiteHex, imageIPFSAddressHex;
            return __generator(this, function (_a) {
                certifierNameHex = this.toBytes32String(certifierName);
                officialIDHex = this.toBytes32String(officialID);
                websiteHex = this.toBytes32String(website);
                imageIPFSAddressHex = this.toBytes32String(imageIPFSAddress);
                return [2 /*return*/, this.contract.methods.addCertifier(certifierNameHex, officialIDHex, mainAddress, websiteHex, text, imageIPFSAddressHex).send({ gas: '0x100000', from: web3account })];
            });
        });
    };
    DmdcuApi.prototype.addNewMotorcycle = function (web3account, addressOfOwner, assetType, name, name2, name3, assetPlainText, imageRessourcesIPFSAddress, changeDateInLinuxTime, horsepower, weight, topSpeed, vintageGrade, techGrade) {
        return __awaiter(this, void 0, void 0, function () {
            var motorcylceValues;
            return __generator(this, function (_a) {
                motorcylceValues = this.motorCycleValuesToNumberArray(horsepower, weight, topSpeed, vintageGrade, techGrade);
                return [2 /*return*/, this.addNewAsset(web3account, addressOfOwner, assetType, name, name2, name3, assetPlainText, imageRessourcesIPFSAddress, changeDateInLinuxTime, motorcylceValues)];
            });
        });
    };
    DmdcuApi.prototype.addNewAsset = function (web3account, addressOfOwner, assetType, name, name2, name3, assetPlainText, imageRessourcesIPFSAddress, changeDateInLinuxTime, rawData) {
        return __awaiter(this, void 0, void 0, function () {
            var allAssetTypes, assetTypeID, result, txReceipt, pastEventsOfContract, idUniqueAssetProposed, i, event_1, rawNewID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllAssetTypes()];
                    case 1:
                        allAssetTypes = _a.sent();
                        assetTypeID = allAssetTypes.indexOf(assetType);
                        if (assetTypeID < 0) {
                            throw Error("AssetType " + assetType + " is not known to this contract. add it first with addNewAssetType.");
                        }
                        return [4 /*yield*/, this.contract.methods.addNewAsset(addressOfOwner, assetTypeID, this.toBytes32String(name), this.toBytes32String(name2), this.toBytes32String(name3), assetPlainText, this.toBytes32String(imageRessourcesIPFSAddress), '0x' + this.numberToUInt64Hex(changeDateInLinuxTime), rawData).send({ gas: '0x100000', from: web3account })];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.web3.eth.getTransactionReceipt(result.transactionHash)];
                    case 3:
                        txReceipt = _a.sent();
                        return [4 /*yield*/, this.contractJs.getPastEvents("UniqueAssetProposed", { fromBlock: txReceipt.blockNumber, toBlock: txReceipt.blockNumber })];
                    case 4:
                        pastEventsOfContract = _a.sent();
                        for (i = 0; i < pastEventsOfContract.length; i++) {
                            event_1 = pastEventsOfContract[i];
                            if (event_1.transactionHash === result.transactionHash) {
                                rawNewID = event_1.returnValues.id;
                                if (idUniqueAssetProposed !== undefined) {
                                    throw new Error('Unable to retrieve result of function call: more than one result found!');
                                }
                                idUniqueAssetProposed = new bn_js_1["default"](rawNewID, 10);
                            }
                        }
                        if (idUniqueAssetProposed === undefined) {
                            throw new Error('Unexpected behavior: missing UniqueAssetProposed Event!');
                        }
                        return [2 /*return*/, idUniqueAssetProposed];
                }
            });
        });
    };
    DmdcuApi.prototype.getAllAssetTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assetTypesResult, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.getAllAssetTypes.call({}).call({})];
                    case 1: return [4 /*yield*/, (_a.sent())];
                    case 2:
                        assetTypesResult = _a.sent();
                        result = [];
                        //console.log(assetTypesResult);
                        for (i = 0; i < assetTypesResult.length; i++) {
                            result.push(web3_1["default"].utils.toUtf8(assetTypesResult[i]));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DmdcuApi.prototype.getIndexOfAssetType = function (assetType) {
        return __awaiter(this, void 0, void 0, function () {
            var assetTypeEncoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assetTypeEncoded = this.toBytes32String(assetType);
                        return [4 /*yield*/, this.contract.methods.getIndexOfAssetType.call({}, assetTypeEncoded)];
                    case 1: return [4 /*yield*/, (_a.sent()).call({}, assetTypeEncoded)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DmdcuApi.prototype.motorCycleValuesToHexString = function (horsepower, weight, topSpeed, vintageGrade, techGrade) {
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
        var result = "0x" + this.numberToUInt32Hex(horsepower * 1000) + this.numberToUInt32Hex(weight * 1000) + this.numberToUInt32Hex(topSpeed * 1000) + this.numberToUInt8Hex(vintageGrade) + this.numberTo8ByteHex(techGrade);
        //console.log('motoHexString: ' + result);
        return result;
    };
    DmdcuApi.prototype.motorCycleValuesToNumberArray = function (horsepower, weight, topSpeed, vintageGrade, techGrade) {
        return this.hexStringToNumberArray(this.motorCycleValuesToHexString(horsepower, weight, topSpeed, vintageGrade, techGrade));
    };
    DmdcuApi.prototype.numberToUInt8Hex = function (val) {
        return this.numberToXByteHex(val, 1);
    };
    DmdcuApi.prototype.numberToUInt16Hex = function (val) {
        return this.numberToXByteHex(val, 2);
    };
    DmdcuApi.prototype.numberToUInt32Hex = function (val) {
        return this.numberToXByteHex(val, 4);
    };
    DmdcuApi.prototype.numberToUInt64Hex = function (val) {
        return this.numberToXByteHex(val, 4);
    };
    DmdcuApi.prototype.numberTo8ByteHex = function (val) {
        return this.numberToXByteHex(val, 8);
    };
    DmdcuApi.prototype.numberToXByteHex = function (val, x) {
        if (val < 0)
            throw new Error('val need to be positiv');
        var cleanedNumber = Number.parseInt(val.toString());
        var result = cleanedNumber.toString(16);
        if (result.length > (x * 2))
            throw Error("The provided number cant be stored in " + x + " bytes: " + val);
        while (result.length < x) {
            result = '0' + result;
        }
        return result;
    };
    DmdcuApi.prototype.hexStringToNumberArray = function (hexString) {
        var hexStr = hexString;
        if (hexStr.startsWith('0x')) {
            hexStr = hexStr.substring(2, hexStr.length);
        }
        var result = new Array(hexStr.length / 2);
        var i;
        for (i = 0; i < result.length; i++) {
            result[i] = Number.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
        }
        return result;
    };
    DmdcuApi.prototype.hexStringToBuffer = function (hexString) {
        var hexStr = hexString;
        if (hexStr.startsWith('0x')) {
            hexStr = hexStr.substring(2, hexStr.length);
        }
        return Buffer.from(hexStr, 'hex');
    };
    DmdcuApi.prototype.toBytes32String = function (val) {
        var result = this.web3.utils.fromUtf8(val);
        if (result.length > 32 * 2 + 1) {
            throw new Error("This string is to long: " + val);
        }
        return result;
    };
    return DmdcuApi;
}());
exports.DmdcuApi = DmdcuApi;
//# sourceMappingURL=dmdcuApi.js.map