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

        string website;

        string text;

        bytes32 imageIPFSAddress;

        uint timestampAdded;
    }

    //represents a modified motorcycle
    struct ModdedMoto {

        address owner;
        bytes32 name;
        bytes32 nameBaseModel;
        //planned identifiers for later uses.
        bytes32 additionalIdentifier1;
        bytes32 additionalIdentifier2;

        string modificationPlainText;

        //IPFS Hash with the imageRessources. (to be defined what is expected)
        bytes32 imageRessourcesIPFSAddress;

        uint32 successorID;
        uint32 predecessorID;
        uint32 certifierID;

        //all values are meant to have 3 dots precision. example: 86.731 horse power = 86731
        uint32 horsepower;
        uint32 weight;
        uint32 topSpeed;

        //modification time: unix time with 64 bit to bypass Y2038 problem (https://en.wikipedia.org/wiki/Unix_time https://en.wikipedia.org/wiki/Year_2038_problem)
        uint64 modificationDate;

        //0: no vintage
        //1: has vintage elements
        //2: pure vintage
        uint8 vintageGrade;

        //0: old base
        //1: modern bike
        //2: state of the art high end technology
        uint8 techGrade;
    }

    Certifier[] public certifiers;
    //mapping(bytes32 => uint32) public certifiersNameIndex;
    mapping(address => ModdedMoto) public moddedMotos;


    function addCertifier(bytes32 name, bytes32 officialID, address mainAddress,string memory website, string memory text, bytes32 imageIPFSAddress)
    public
    onlyOwner
    returns (bool)
    {
        //require(certifiersNameIndex[name] == 0, "A Certifier with this name already exists!");

        certifiers.push(Certifier(name, officialID, mainAddress, website, text, imageIPFSAddress, block.timestamp));
        //todo: emit new certifier event.

        return true;
    }

    function addMotoModification(address owner,bytes32 name,bytes32 nameBaseModel,bytes32 additionalIdentifier1,bytes32 additionalIdentifier2, string memory modificationPlainText,bytes32 imageRessourcesIPFSAddress,uint32 horsepower,uint32 weight,uint32 topSpeed,uint64 modificationDate,uint8 vintageGrade,uint8 techGrade)
    public
    returns (bool) {

        //uint32 successorID,
        //uint32 predecessorID = 0;
        //uint32 certifierID = 0;
        //todo: only a certifier can add a MotoModifiction
        //todo: a motoModification can only be done if the owner allows that
        //ModdedMoto newModdedMoto = ModdedMoto(owner, name, nameBaseModel, additionalIdentifier1, additionalIdentifier2, modificationPlainText, imageRessourcesIPFSAddress, certifierID);
        return true;
    }
}