pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract DMDCertifiedUnique is ERC721 {

    struct Certifier {

        //name of the certifier
        bytes32 name;

        //country regulation specific, like a tax ID
        bytes32 officialID;

        //main ethereum address used by the certifier.
        address mainAddress;
    }

    //represents a modified motorcycle
    struct ModdedMoto {

        address owner;
        bytes32 name;
        bytes32 nameBaseModel;

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
}