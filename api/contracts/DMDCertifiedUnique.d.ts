/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { Contract, ContractOptions, EventOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, TransactionObject, ContractEvent } from "./types";

export class DMDCertifiedUnique extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  methods: {
    supportsInterface(
      interfaceId: string | number[]
    ): TransactionObject<boolean>;

    getApproved(tokenId: number | string): TransactionObject<string>;

    uniqueIDs(arg0: number | string): TransactionObject<BN>;

    certifiersAddressIndex(arg0: string): TransactionObject<BN>;

    uniques(
      arg0: number | string
    ): TransactionObject<{
      id: BN;
      owner: string;
      name: string;
      name2: string;
      name3: string;
      assetPlainText: string;
      imageRessourcesIPFSAddress: string;
      certifierID: BN;
      assetType: BN;
      changeDate: BN;
      rawData: string;
      0: BN;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: BN;
      8: BN;
      9: BN;
      10: string;
    }>;

    ownerOf(tokenId: number | string): TransactionObject<string>;

    balanceOf(owner: string): TransactionObject<BN>;

    assetTypes(arg0: number | string): TransactionObject<string>;

    certifiers(
      arg0: number | string
    ): TransactionObject<{
      name: string;
      officialID: string;
      mainAddress: string;
      website: string;
      text: string;
      imageIPFSAddress: string;
      timestampAdded: BN;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: BN;
    }>;

    proposedUniques(
      arg0: number | string
    ): TransactionObject<{
      id: BN;
      owner: string;
      name: string;
      name2: string;
      name3: string;
      assetPlainText: string;
      imageRessourcesIPFSAddress: string;
      certifierID: BN;
      assetType: BN;
      changeDate: BN;
      rawData: string;
      0: BN;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: BN;
      8: BN;
      9: BN;
      10: string;
    }>;

    isApprovedForAll(
      owner: string,
      operator: string
    ): TransactionObject<boolean>;

    getUnique(index: number | string): TransactionObject<string>;

    calcID(
      assetType: number | string,
      name: string | number[],
      name2: string | number[],
      name3: string | number[],
      assetPlainText: string,
      imageRessourcesIPFSAddress: string | number[],
      changeDate: number | string,
      rawData: string | number[]
    ): TransactionObject<BN>;

    getIndexOfAssetType(assetName: string | number[]): TransactionObject<BN>;

    approve(to: string, tokenId: number | string): TransactionObject<void>;

    transferFrom(
      from: string,
      to: string,
      tokenId: number | string
    ): TransactionObject<void>;

    safeTransferFrom(
      from: string,
      to: string,
      tokenId: number | string
    ): TransactionObject<void>;

    renounceOwnership(): TransactionObject<void>;

    setApprovalForAll(to: string, approved: boolean): TransactionObject<void>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    addCertifier(
      name: string | number[],
      officialID: string | number[],
      mainAddress: string,
      website: string | number[],
      text: string,
      imageIPFSAddress: string | number[]
    ): TransactionObject<BN>;

    addAssetType(typeName: string | number[]): TransactionObject<BN>;

    addNewAsset(
      owner: string,
      assetType: number | string,
      name: string | number[],
      name2: string | number[],
      name3: string | number[],
      assetPlainText: string,
      imageRessourcesIPFSAddress: string | number[],
      changeDate: number | string,
      rawData: string | number[]
    ): TransactionObject<BN>;

    acceptNewUniqueAsset(uniqueId: number | string): TransactionObject<BN>;

    owner(): TransactionObject<string>;
    isOwner(): TransactionObject<boolean>;
    getAllUniques(): TransactionObject<
      ({
        id: BN;
        owner: string;
        name: string;
        name2: string;
        name3: string;
        assetPlainText: string;
        imageRessourcesIPFSAddress: string;
        certifierID: BN;
        assetType: BN;
        changeDate: BN;
        rawData: string;
      })[]
    >;
    isCertifier(): TransactionObject<boolean>;
    getAllAssetTypes(): TransactionObject<(string)[]>;
  };
  events: {
    UniqueAssetProposed: ContractEvent<{
      owner: string;
      certifier: string;
      id: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    OwnershipTransferred: ContractEvent<{
      previousOwner: string;
      newOwner: string;
      0: string;
      1: string;
    }>;
    Transfer: ContractEvent<{
      from: string;
      to: string;
      tokenId: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    Approval: ContractEvent<{
      owner: string;
      approved: string;
      tokenId: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    ApprovalForAll: ContractEvent<{
      owner: string;
      operator: string;
      approved: boolean;
      0: string;
      1: string;
      2: boolean;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
