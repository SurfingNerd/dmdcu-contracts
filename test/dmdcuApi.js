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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
//import Contract from "web3/eth/contract";
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
// async function deployNewDMDCertifiedUniqueContract(web3: web3, abiBasePath: string, account: string) {
//     //Buffer abiFile = fs.readFileSync('DMDCertifiedUnique.json');
//     const contract = new DMDCertifiedUnique(getABI('DMDCertifiedUnique', abiBasePath), null, {from: account});
//     return contract;
// }
function addNewCertifier(web3, abiJSonInterface, knownContractAddress, account, certifierName, officialID, mainAddress, website, text, imageIPFSAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var certifierNameHex, officialIDHex, websiteHex, imageIPFSAddressHex, contractRaw, contract, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    certifierNameHex = web3.utils.fromUtf8(certifierName);
                    officialIDHex = web3.utils.fromUtf8(officialID);
                    websiteHex = web3.utils.fromUtf8(website);
                    imageIPFSAddressHex = web3.utils.fromUtf8(imageIPFSAddress);
                    contractRaw = new web3.eth.Contract(abiJSonInterface, knownContractAddress, { from: account });
                    contract = contractRaw;
                    return [4 /*yield*/, contract.methods.addCertifier(certifierNameHex, officialIDHex, mainAddress, websiteHex, text, imageIPFSAddressHex).send({ gas: '0x100000' })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.addNewCertifier = addNewCertifier;
function getABI(contractName, abiBasePath) {
    // It will read the ABI & byte code contents from the JSON file in ./build/contracts/ folder
    var jsonOutputName = path.parse(contractName).name + ".json";
    var jsonFile = abiBasePath + "/" + jsonOutputName;
    // Read the JSON file contents
    var contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
    var jsonOutput = JSON.parse(contractJsonContent);
    // Retrieve the ABI
    var abi = jsonOutput.abi;
    return abi;
}
// function createDMDCertifiedUniqueContractObject(contractName: string, abiBasePath: string, existingContractAddress?: string )
//  : DMDCertifiedUnique {
//     return new DMDCertifiedUnique(getABI(contractName, abiBasePath), existingContractAddress);
// }
//const contract = new DMDCertifiedUnique.DMDCertifiedUnique()
//# sourceMappingURL=dmdcuApi.js.map