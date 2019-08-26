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
    //     //2: state of the aaddMotoModificationaddMotoModificationrt high end technology
    uint8[] dataTechGrade;

    Certifier[] public certifiers;
    //ModdedMoto[] public motos;

    //mapping(bytes32 => uint32) public certifiersNameIndex;
    //mapping(address => ModdedMoto) public moddedMotos;


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

    function addMotoModification(address owner,bytes32 name,bytes32 nameBaseModel,
        string memory modificationPlainText,bytes32 imageRessourcesIPFSAddress,
        uint32 horsepower,uint32 weight,uint32 topSpeed,uint64 modificationDate,
        uint8 vintageGrade,uint8 techGrade)
    public
    returns (uint256) {

        //uint32 successorID = 0;
        //uint32 predecessorID = 0;
        //uint32 certifierID = 0;
        //todo: only a certifier can add a MotoModifiction
        //todo: a motoModification can only be done if the owner allows that
        // ModdedMoto memory moto = ModdedMoto(owner, name, nameBaseModel, modificationPlainText, imageRessourcesIPFSAddress,
        //     successorID, predecessorID, certifierID,
        //     horsepower, weight, topSpeed,
        //     modificationDate, vintageGrade, techGrade);

        //
        //todo: decide between: 
        // - no storage optimization, easy to understand - high costs.
        // - verify that all information is written to the same slot.
        // - i optimize memory usage by placing 1 index, and don't write null values

        uint256 result = dataOwner.push(owner);
        dataName.push(name);
        dataNameBaseModel.push(nameBaseModel);
        dataModificationPlainText.push(modificationPlainText);
        dataImageRessourcesIPFSAddress.push(imageRessourcesIPFSAddress);
        dataSuccessorID.push(0);
        dataPredecessorID.push(0);
        dataCertifierID.push(0);
        dataHorsepower.push(horsepower);
        dataWeight.push(weight);
        dataTopSpeed.push(topSpeed);
        dataModificationDate.push(modificationDate);
        dataVintageGrade.push(vintageGrade);
        dataTechGaddMotoModificationrade.push(techGrade);


        //uint256 result = motos.push(moto);

        return result;
        //return 0;
    }
}