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
exports.__esModule = true;
var dmdcuApi_1 = require("./dmdcuApi");
var dmdcuData_1 = require("./dmdcuData");
var DmdcuDataContext = /** @class */ (function () {
    function DmdcuDataContext(web3, knownContractAddress) {
        this.api = new dmdcuApi_1.DmdcuApi(web3, knownContractAddress);
        this.certifierMapCache = new Map();
        this.motorcycleMapCache = new Map();
    }
    DmdcuDataContext.prototype.hexStringToUtf8Text = function (inputString) {
        return this.api.web3.utils.hexToUtf8(inputString);
    };
    // public async getUniqueMotorcycle(id: number) : Promise<UniqMotorcycle[]> {
    //   let result: UniqMotorcycle[] = [];
    //   this.api.getUnique(id);
    //   return result;
    // }
    DmdcuDataContext.prototype.rawUniqueToMotorcycle = function (x) {
        return __awaiter(this, void 0, void 0, function () {
            var certifier, motoValues, horsepower, weight, topSpeed, vintageGrade, techGrade, customizationGrade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCertifier(x.certifierID)];
                    case 1:
                        certifier = _a.sent();
                        motoValues = this.api.convertRawDataToMotoValues(x.rawData);
                        horsepower = motoValues.horsepower;
                        weight = motoValues.weight;
                        topSpeed = motoValues.topSpeed;
                        vintageGrade = motoValues.vintageGrade;
                        techGrade = motoValues.techGrade;
                        customizationGrade = 2;
                        return [2 /*return*/, new dmdcuData_1.UniqMotorcycle(x.id, x.owner, this.hexStringToUtf8Text(x.name), this.hexStringToUtf8Text(x.name2), this.hexStringToUtf8Text(x.name3), x.assetPlainText, x.imageRessourcesIPFSAddress, certifier, x.assetType, new Date(x.changeDate * 1000), horsepower, weight, topSpeed, customizationGrade, vintageGrade, techGrade)];
                }
            });
        });
    };
    DmdcuDataContext.prototype.getAllUniqueMotorcycles = function (forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result, apiResult, _i, apiResult_1, x, moto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.api.getAllUniques()];
                    case 1:
                        apiResult = _a.sent();
                        _i = 0, apiResult_1 = apiResult;
                        _a.label = 2;
                    case 2:
                        if (!(_i < apiResult_1.length)) return [3 /*break*/, 5];
                        x = apiResult_1[_i];
                        return [4 /*yield*/, this.rawUniqueToMotorcycle(x)];
                    case 3:
                        moto = _a.sent();
                        result.push(moto);
                        //console.log('setting moto: ' + moto.id, moto);
                        this.motorcycleMapCache.set(moto.id, moto);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    //console.log('got all uniques, returning.');
                    return [2 /*return*/, result];
                }
            });
        });
    };
    DmdcuDataContext.prototype.getUniqueMotorcycle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, uniqueRaw, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.motorcycleMapCache.forEach(function (x) {
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
                            return [2 /*return*/, result];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.api.getUnique(id)];
                    case 2:
                        uniqueRaw = _a.sent();
                        return [4 /*yield*/, this.rawUniqueToMotorcycle(uniqueRaw)];
                    case 3:
                        result = _a.sent();
                        this.motorcycleMapCache.set(result.id, result);
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error("Unable to find Asset with ID: " + id);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DmdcuDataContext.prototype.addMotoToBlockchain = function (moto) {
        return __awaiter(this, void 0, void 0, function () {
            var motoID, allMotorCycles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.addNewMotorcycle(this.api.web3.eth.defaultAccount, moto.name, moto.name2, moto.name3, moto.assetPlainText, moto.imageRessourcesIPFSAddress, (+(moto.changeDate) / 1000), moto.horsepower, moto.weight, moto.topSpeed, moto.vintageGrade, moto.techGrade)];
                    case 1:
                        motoID = _a.sent();
                        return [4 /*yield*/, this.getAllUniqueMotorcycles(true)];
                    case 2:
                        allMotorCycles = _a.sent();
                        return [2 /*return*/, motoID];
                }
            });
        });
    };
    DmdcuDataContext.prototype.getCertifier = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, raw, newCertifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // premise: only certifier numbers are asked that also exist.
                        if (this.certifierMapCache.has(id)) {
                            result = this.certifierMapCache.get(id);
                            if (result === undefined) {
                                throw new Error("No certifier with ID " + id + " known.");
                            }
                            return [2 /*return*/, result];
                        }
                        return [4 /*yield*/, this.api.getCertifier(id)];
                    case 1:
                        raw = _a.sent();
                        newCertifier = new dmdcuData_1.Certifier(raw.name, raw.officialID, raw.mainAddress, raw.website, raw.text, raw.imageIPFSAddress);
                        this.certifierMapCache.set(id, newCertifier);
                        return [2 /*return*/, newCertifier];
                }
            });
        });
    };
    DmdcuDataContext.prototype.isOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.isOwnerCache === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.api.isOwner()];
                    case 1:
                        _a.isOwnerCache = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.isOwnerCache.valueOf()];
                }
            });
        });
    };
    DmdcuDataContext.prototype.isCertifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.isCertifierCache === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.api.isCertifier()];
                    case 1:
                        _a.isCertifierCache = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.isCertifierCache.valueOf()];
                }
            });
        });
    };
    DmdcuDataContext.prototype.impersonateViaPK = function (pk) {
        var privateKey = pk;
        // console.log('pk', pk);
        if (!pk.startsWith('0x')) {
            privateKey = "0x" + pk;
        }
        var accountFromPK = this.api.web3.eth.accounts.privateKeyToAccount(privateKey);
        // console.log(`impersonating to ${accountFromPK.address} ( ${accountFromPK.privateKey} )`);
        this.api.web3.eth.accounts.wallet.add(accountFromPK);
        this.api.web3.eth.defaultAccount = accountFromPK.address;
        this.isOwnerCache = undefined;
        this.isCertifierCache = undefined;
        return accountFromPK.address;
    };
    return DmdcuDataContext;
}());
exports.DmdcuDataContext = DmdcuDataContext;
//# sourceMappingURL=dmdcuDataContext.js.map