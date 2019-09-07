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

    struct UniqueAsset {
        bytes32 name;
        bytes32 name2;
        bytes32 name3;
        string  assetPlainText;

        //IPFS Hash with the imageRessources. (to be defined what is expected)
        bytes32 imageRessourcesIPFSAddress;

        //array index of the certifer ID
        uint16 certifierID;
        uint16 assetType;

        //modification time: unix time with 64 bit to bypass Y2038 problem (https://en.wikipedia.org/wiki/Unix_time https://en.wikipedia.org/wiki/Year_2038_problem)
        uint64 changeDate;

        bytes rawData;
    }


        //all values are meant to have 3 dots precision. example: 86.731 horse power = 86731
    // uint32[] dataHorsepower;
    // uint32[] dataWeight;
    // uint32[] dataTopSpeed;



    //     //0: no vintage
    //     //1: has vintage elements
    //     //2: pure vintage
    // uint8[] dataVintageGrade;

    //     //0: old base
    //     //1: modern bike
    //     //2: state of the art high end technology
    // uint8[] dataTechGrade;


    Certifier[] public certifiers;
    bytes32[] public assetTypes;
    UniqueAsset[] public uniques;
    //ModdedMoto[] public motos;

    mapping(address => uint256) public certifiersAddressIndex;
    //mapping(address => ModdedMoto) public moddedMotos;

        /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyCertifier() {
        require(isCertifier(), "only certifiers are allowed for this action.");
        _;
    }


    function isCertifier() public view returns (bool) {
        //return false;
        return certifiersAddressIndex[msg.sender] != 0;
    }



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

    function addAssetType(bytes32 typeName)
    public
    onlyOwner
    returns (uint16){
        assetTypes.push(typeName);
    }

    function addNewAsset(address owner, uint16 assetType, bytes32 name, bytes32 name2, bytes32 name3,
        string memory assetPlainText, bytes32 imageRessourcesIPFSAddress,
        uint64 changeDate, bytes memory rawData)
    public
    onlyCertifier
    returns (uint256) {

        //todo: tokenURI.
        //super._setTokenURI(_tokenId, _tokenURI);

        require(assetType < assetTypes.length, 'assetType does not exist.');

        uint256 certifierID = certifiersAddressIndex[msg.sender];
        require(certifierID >= 0, 'the provided certifierAddress is not a known certifier!');

        //the first asset will have the number 1, we don't start at zero.
        super._mint(owner,uniques.length + 1);

        //todo: add plausibility check of changeDate.

        uniques.push(UniqueAsset(name, name2, name3, assetPlainText, imageRessourcesIPFSAddress,
            (uint16)(certifierID), assetType, changeDate, rawData));

        return uniques.length;
        //return 0;
    }

    function getAllAssetTypes()
    public
    view
    returns (bytes32[] memory) {
        return assetTypes;
    }

    function getIndexOfAssetType(bytes32 assetName)
    public
    view
    returns (int256) {

        for (uint i = 0; i<assetTypes.length; i++) {
            if (assetTypes[i] == assetName) {
                return (int256)(i);
            }
        }
        return -1;
    }

}