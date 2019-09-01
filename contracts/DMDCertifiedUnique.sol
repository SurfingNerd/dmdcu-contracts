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

    uint32[] dataSuccessorID;
    uint32[] dataPredecessorID;
    uint32[] dataCertifierID;

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

    //mapping(bytes32 => uint32) public certifiersNameIndex;
    //mapping(address => ModdedMoto) public moddedMotos;


    function addCertifier(bytes32 name, bytes32 officialID, address mainAddress,bytes32 website, string memory text, bytes32 imageIPFSAddress)
    public
    onlyOwner
    returns (bool)
    {
        //require(certifiersNameIndex[name] == 0, "A Certifier with this name already exists!");

        certifiers.push(Certifier(name, officialID, mainAddress, website, text, imageIPFSAddress, block.timestamp));
        //todo: emit new certifier event.

        return true;
    }

    function addMotoModification(address owner, uint32 predecessorID,uint32 certifierID,  bytes32 name,bytes32 nameBaseModel,
        string memory modificationPlainText,bytes32 imageRessourcesIPFSAddress,
        uint32 horsepower,uint32 weight,uint32 topSpeed,uint64 modificationDate,
        uint8 vintageGrade,uint8 techGrade)
    public
    returns (uint256) {

        // todo: decide between:
        // - no storage optimization, easy to understand - high costs.
        // - verify that all information is written to the same slot.
        // - i optimize memory usage by placing 1 index, and don't write null values

        
        //todo: tokenURI.
        //super._setTokenURI(_tokenId, _tokenURI);

        //uint256 result = dataOwner.push(owner);
        uint256 tokenId = dataName.push(name);
        super._mint(owner,tokenId);

        dataNameBaseModel.push(nameBaseModel);
        dataModificationPlainText.push(modificationPlainText);
        dataImageRessourcesIPFSAddress.push(imageRessourcesIPFSAddress);
        dataSuccessorID.push(0);
        dataPredecessorID.push(predecessorID);
        dataCertifierID.push(certifierID);
        dataHorsepower.push(horsepower);
        dataWeight.push(weight);
        dataTopSpeed.push(topSpeed);
        dataModificationDate.push(modificationDate);
        dataVintageGrade.push(vintageGrade);
        dataTechGrade.push(techGrade);

        if (predecessorID > 0) {
            dataSuccessorID[predecessorID] = (uint32)(tokenId);
        }

        //uint256 result = motos.push(moto);

        return tokenId;
        //return 0;
    }

}