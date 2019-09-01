pragma solidity >=0.5.8 <0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract DMDCertifiedUnique is ERC721, Ownable {

    struct Certifier {

        //name of the certifier
        bytes32 name;

        //country regulation specific, like a tax ID
        bytes32 officialID;

        //main ethereum address used by the certifier.
        address mainAddress;

        bytes32 website;

        string text;

        bytes32 imageIPFSAddress;

        uint timestampAdded;
    }

    //represents a modified motorcycle
    address[] public dataOwner;
    bytes32[] dataName;
    bytes32[] dataNameBaseModel;
        //planned identifiers for later uses.
    //bytes32[] additionalIdentifier1;
    //bytes32[] additionalIdentifier2;

    string[] dataModificationPlainText;

    //IPFS Hash with the imageRessources. (to be defined what is expected)
    bytes32[] dataImageRessourcesIPFSAddress;

    uint256[] dataSuccessorID;
    uint256[] dataPredecessorID;
    uint256[] dataCertifierID;

        //all values are meant to have 3 dots precision. example: 86.731 horse power = 86731
    uint32[] dataHorsepower;
    uint32[] dataWeight;
    uint32[] dataTopSpeed;

    //     //modification time: unix time with 64 bit to bypass Y2038 problem (https://en.wikipedia.org/wiki/Unix_time https://en.wikipedia.org/wiki/Year_2038_problem)
    uint64[] dataModificationDate;

    //     //0: no vintage
    //     //1: has vintage elements
    //     //2: pure vintage
    uint8[] dataVintageGrade;

    //     //0: old base
    //     //1: modern bike
    //     //2: state of the art high end technology
    uint8[] dataTechGrade;

    Certifier[] public certifiers;
    //ModdedMoto[] public motos;

    mapping(address => uint256) public certifiersAddressIndex;
    //mapping(address => ModdedMoto) public moddedMotos;


    function addCertifier(bytes32 name, bytes32 officialID, address mainAddress,bytes32 website, string memory text, bytes32 imageIPFSAddress)
    public
    onlyOwner
    returns (uint256)
    {
        //require(certifiersNameIndex[name] == 0, "A Certifier with this name already exists!");
        uint256 certifierID = certifiers.push(Certifier(name, officialID, mainAddress, website, text, imageIPFSAddress, block.timestamp));
        certifiersAddressIndex[mainAddress] = certifierID;
        //todo: emit new certifier event.

        return certifierID;
    }

    function addMotoModificationDetails(uint256 tokenId, uint256 predecessorID, uint256 certifierID, bytes32 nameBaseModel,
    string memory modificationPlainText,bytes32 imageRessourcesIPFSAddress,
    uint32 horsepower,uint32 weight,uint32 topSpeed,uint64 modificationDate,
    uint8 vintageGrade,uint8 techGrade)
    internal
    returns (bool) {

        dataNameBaseModel[tokenId] = nameBaseModel;
        dataModificationPlainText[tokenId] = modificationPlainText;
        dataImageRessourcesIPFSAddress[tokenId] = imageRessourcesIPFSAddress;
        dataCertifierID[tokenId] = certifierID;
        dataHorsepower[tokenId] = horsepower;
        dataWeight[tokenId] = weight;
        dataTopSpeed[tokenId] = topSpeed;
        dataModificationDate[tokenId] = modificationDate;
        dataVintageGrade[tokenId] = vintageGrade;
        dataTechGrade[tokenId] = techGrade;

        return true;
    }

    // bytes32 nameBaseModel,
    //     string memory modificationPlainText,bytes32 imageRessourcesIPFSAddress,
    //     uint32 horsepower,uint32 weight,uint32 topSpeed,uint64 modificationDate,
    //     uint8 vintageGrade,uint8 techGrade


    function addMotoModification(address owner, uint256 predecessorID,address certifierAddress, bytes32 name)
    public
    returns (uint256) {

        // todo: decide between:
        // - no storage optimization, easy to understand - high costs.
        // - verify that all information is written to the same slot.
        // - i optimize memory usage by placing 1 index, and don't write null values

        //todo: tokenURI.
        //super._setTokenURI(_tokenId, _tokenURI);

        //uint256 result = dataOwner.push(owner);
        uint256 certifierID = certifiersAddressIndex[certifierAddress];
        require(certifierID >= 0, 'the provided certifierAddress is not a known certifier!');

        uint256 tokenId = dataName.push(name);
        super._mint(owner,tokenId);
        require(dataCertifierID.push(certifierID) == tokenId, 'internal logical error. array IDs not consistent');

        require(dataNameBaseModel.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataModificationPlainText.push("") == tokenId, 'internal logical error. array IDs not consistent');
        require(dataImageRessourcesIPFSAddress.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataSuccessorID.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataPredecessorID.push(predecessorID) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataHorsepower.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataWeight.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataTopSpeed.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataModificationDate.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataVintageGrade.push(0) == tokenId, 'internal logical error. array IDs not consistent');
        require(dataTechGrade.push(0) == tokenId, 'internal logical error. array IDs not consistent');

        if (predecessorID > 0) {
            dataSuccessorID[predecessorID] = (uint32)(tokenId);
        }

        // addMotoModificationDetails(tokenId,predecessorID, certifierID, nameBaseModel,
        // modificationPlainText, imageRessourcesIPFSAddress,
        // horsepower, weight, topSpeed, modificationDate,
        // vintageGrade, techGrade);
        //uint256 result = motos.push(moto);

        return tokenId;
        //return 0;
    }

}