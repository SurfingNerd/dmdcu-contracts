pragma solidity >=0.5.8 <0.6.0;
pragma experimental ABIEncoderV2;

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
        
        address owner;
        bytes32 name;
        bytes32 name2;
        bytes32 name3;
        string  assetPlainText;

        //IPFS Hash with the imageRessources. (to be defined what is expected)
        bytes32 imageRessourcesIPFSAddress;

        uint32 id;

        //array index of the last certifer that has modified the asset.
        uint32 certifierID;

        uint16 assetType;

        //modification time: unix time with 64 bit to bypass Y2038 problem (https://en.wikipedia.org/wiki/Unix_time https://en.wikipedia.org/wiki/Year_2038_problem)
        uint64 changeDate;

        bytes rawData;
    }

    Certifier[] public certifiers;
    bytes32[] public assetTypes;


    // proposed unique assets are proposed by certifiers and have not been accepted yet by the owner of the assets.
    //mapping(uint256 => UniqueAsset) public proposedUniques;
    UniqueAsset[] public uniques;
    

    mapping(address => uint32) public certifiersAddressIndex;

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyCertifier() {
        require(isCertifier(), "only certifiers are allowed for this action.");
        _;
    }

    function getAllUniques()
    public
    view
    returns (UniqueAsset[] memory) {
        // UniqueAsset[] memory result = new UniqueAsset[](uniqueIDs.length);

        // for (uint i = 0; i < uniqueIDs.length; i++) {
        //     UniqueAsset memory asset = uniques[uniqueIDs[i]];
        //     result[i] = asset;
        // }
        // return result;
        return uniques;
    }

    function getUnique(uint32 id)
    public
    view
    returns (UniqueAsset memory) {
        require(id > 0, 'asset id starts with 1');
        return (uniques[id - 1]);
    }

    function isCertifier()
    public
    view
    returns (bool) {
        
        //uint32 certifierID = certifiersAddressIndex[certifierAddress];
        //require(certifiers[certifierID] == certifierAddress, 'given certifierAddress is not a known certifier.');

        return certifiersAddressIndex[msg.sender] != 0;
    }

    function addCertifier(bytes32 name, bytes32 officialID, address mainAddress,bytes32 website, string memory text, bytes32 imageIPFSAddress)
    public
    onlyOwner
    returns (uint256)
    {
        //require(certifiersNameIndex[name] == 0, "A Certifier with this name already exists!");
        uint256 certifierID = certifiers.push(Certifier(name, officialID, mainAddress, website, text, imageIPFSAddress, block.timestamp));
        certifiersAddressIndex[mainAddress] = (uint32)(certifierID);
        //todo: emit new certifier event.

        return certifierID;
    }

    function addAssetType(bytes32 typeName)
    public
    onlyOwner
    returns (uint16){
        assetTypes.push(typeName);
    }

    function getCertifierID(address certifierAddress)
    public
    view
    returns (uint32) {
        uint32 certifierID = certifiersAddressIndex[certifierAddress];
        //TODO: the mapping also returns 0 as default ?!
        //require(certifiers[certifierID] == certifierAddress, 'given certifierAddress is not a known certifier.');
        return certifierID;
    }

    function addNewAsset(uint16 assetType, bytes32 name, bytes32 name2, bytes32 name3,
        string memory assetPlainText, bytes32 imageRessourcesIPFSAddress,
        uint64 changeDate, bytes memory rawData)
    public
    onlyCertifier
    returns (uint256) {
        //todo: tokenURI.
        //super._setTokenURI(_tokenId, _tokenURI);

        require(assetType < assetTypes.length, 'assetType does not exist.');

        uint256 id = uniques.length + 1;
        //the first asset will have the number 1, we don't start at zero.

        uint32 certifierID = getCertifierID(msg.sender);

        //todo: add plausibility check of changeDate.
        super._mint(msg.sender, id);

        uniques.push(UniqueAsset(msg.sender, name, name2, name3, assetPlainText, imageRessourcesIPFSAddress,(uint32)(id),
            certifierID, assetType, changeDate, rawData));

        return id;
        //return 0;
    }

    function modifyAsset(uint32 assetID, uint16 assetType, bytes32 name, bytes32 name2, bytes32 name3,
        string memory assetPlainText, bytes32 imageRessourcesIPFSAddress,
        uint64 changeDate, bytes memory rawData)
    public
    onlyCertifier {
        //todo: tokenURI.
        //super._setTokenURI(_tokenId, _tokenURI);

        //maybe later: an Owner can allow an certifier to modify data from an asset?!
        require(super.ownerOf((uint256)(assetID)) == msg.sender, 'only the owner can modify data from an asset!');

        require(assetType < assetTypes.length, 'assetType does not exist.');
        
        uint32 certifierID = getCertifierID(msg.sender);

        UniqueAsset storage asset = uniques[assetID - 1];
        asset.assetType = assetType;
        asset.name = name;
        asset.name2 = name2;
        asset.name3 = name3;
        asset.assetPlainText = assetPlainText;
        asset.imageRessourcesIPFSAddress = imageRessourcesIPFSAddress;
        asset.certifierID = certifierID;
        asset.changeDate = changeDate;
        asset.rawData = rawData;
    }

    //accepts the new unique assetr with the given indexID
    // function acceptNewUniqueAsset(uint256 uniqueId)
    // public
    // returns (uint256){

    //     UniqueAsset storage uniqueAsset = proposedUniques[uniqueId];

    //     require(uniqueAsset.id == uniqueId, 'The accepted asset requires to match the unique ID');
    //     require(uniqueAsset.owner == msg.sender, 'The accepted asset requires to match the unique ID');
    //     require(uniques[uniqueId].id == 0, 'There exists already a unique with this ID');

    //     super._mint(msg.sender, uniqueId);
    //     uniques[uniqueId] = uniqueAsset;
    //     delete proposedUniques[uniqueId];
    //     uniqueIDs.push(uniqueId);

    //     return uniqueId;
    // }

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