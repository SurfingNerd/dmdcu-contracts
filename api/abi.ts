
export function getAbiJson() : any[] {
  const abiJson =  [
    {
      "constant": true,
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "certifiersAddressIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uniques",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "name2",
          "type": "bytes32"
        },
        {
          "name": "assetPlainText",
          "type": "string"
        },
        {
          "name": "imageRessourcesIPFSAddress",
          "type": "bytes32"
        },
        {
          "name": "id",
          "type": "uint64"
        },
        {
          "name": "certifierID",
          "type": "uint32"
        },
        {
          "name": "assetType",
          "type": "uint16"
        },
        {
          "name": "buildDate",
          "type": "uint64"
        },
        {
          "name": "changeDate",
          "type": "uint64"
        },
        {
          "name": "customizationGrade",
          "type": "uint8"
        },
        {
          "name": "rawData",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "assetTypes",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "certifiers",
      "outputs": [
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "officialID",
          "type": "bytes32"
        },
        {
          "name": "mainAddress",
          "type": "address"
        },
        {
          "name": "website",
          "type": "bytes32"
        },
        {
          "name": "text",
          "type": "string"
        },
        {
          "name": "imageIPFSAddress",
          "type": "bytes32"
        },
        {
          "name": "timestampAdded",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllUniques",
      "outputs": [
        {
          "components": [
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "name",
              "type": "bytes32"
            },
            {
              "name": "name2",
              "type": "bytes32"
            },
            {
              "name": "assetPlainText",
              "type": "string"
            },
            {
              "name": "imageRessourcesIPFSAddress",
              "type": "bytes32"
            },
            {
              "name": "id",
              "type": "uint64"
            },
            {
              "name": "certifierID",
              "type": "uint32"
            },
            {
              "name": "assetType",
              "type": "uint16"
            },
            {
              "name": "buildDate",
              "type": "uint64"
            },
            {
              "name": "changeDate",
              "type": "uint64"
            },
            {
              "name": "customizationGrade",
              "type": "uint8"
            },
            {
              "name": "rawData",
              "type": "bytes"
            }
          ],
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "id",
          "type": "uint32"
        }
      ],
      "name": "getUnique",
      "outputs": [
        {
          "components": [
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "name",
              "type": "bytes32"
            },
            {
              "name": "name2",
              "type": "bytes32"
            },
            {
              "name": "assetPlainText",
              "type": "string"
            },
            {
              "name": "imageRessourcesIPFSAddress",
              "type": "bytes32"
            },
            {
              "name": "id",
              "type": "uint64"
            },
            {
              "name": "certifierID",
              "type": "uint32"
            },
            {
              "name": "assetType",
              "type": "uint16"
            },
            {
              "name": "buildDate",
              "type": "uint64"
            },
            {
              "name": "changeDate",
              "type": "uint64"
            },
            {
              "name": "customizationGrade",
              "type": "uint8"
            },
            {
              "name": "rawData",
              "type": "bytes"
            }
          ],
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isCertifier",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "officialID",
          "type": "bytes32"
        },
        {
          "name": "mainAddress",
          "type": "address"
        },
        {
          "name": "website",
          "type": "bytes32"
        },
        {
          "name": "text",
          "type": "string"
        },
        {
          "name": "imageIPFSAddress",
          "type": "bytes32"
        }
      ],
      "name": "addCertifier",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "typeName",
          "type": "bytes32"
        }
      ],
      "name": "addAssetType",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "certifierAddress",
          "type": "address"
        }
      ],
      "name": "getCertifierID",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "assetType",
          "type": "uint16"
        },
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "name2",
          "type": "bytes32"
        },
        {
          "name": "assetPlainText",
          "type": "string"
        },
        {
          "name": "imageRessourcesIPFSAddress",
          "type": "bytes32"
        },
        {
          "name": "buildDate",
          "type": "uint64"
        },
        {
          "name": "changeDate",
          "type": "uint64"
        },
        {
          "name": "customizationGrade",
          "type": "uint8"
        },
        {
          "name": "rawData",
          "type": "bytes"
        }
      ],
      "name": "addNewAsset",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "assetID",
          "type": "uint32"
        },
        {
          "name": "assetType",
          "type": "uint16"
        },
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "name2",
          "type": "bytes32"
        },
        {
          "name": "assetPlainText",
          "type": "string"
        },
        {
          "name": "imageRessourcesIPFSAddress",
          "type": "bytes32"
        },
        {
          "name": "changeDate",
          "type": "uint64"
        },
        {
          "name": "rawData",
          "type": "bytes"
        }
      ],
      "name": "modifyAsset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllAssetTypes",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "assetName",
          "type": "bytes32"
        }
      ],
      "name": "getIndexOfAssetType",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  return abiJson;
}

export default getAbiJson;