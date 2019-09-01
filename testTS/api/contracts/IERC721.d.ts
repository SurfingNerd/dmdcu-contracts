/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { Contract, ContractOptions, EventOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, TransactionObject, ContractEvent } from "./types";

export class IERC721 extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  methods: {
    supportsInterface(
      interfaceId: string | number[]
    ): TransactionObject<boolean>;

    balanceOf(owner: string): TransactionObject<BN>;

    ownerOf(tokenId: number | string): TransactionObject<string>;

    getApproved(tokenId: number | string): TransactionObject<string>;

    isApprovedForAll(
      owner: string,
      operator: string
    ): TransactionObject<boolean>;

    transferFrom(
      from: string,
      to: string,
      tokenId: number | string
    ): TransactionObject<void>;

    approve(to: string, tokenId: number | string): TransactionObject<void>;

    setApprovalForAll(
      operator: string,
      _approved: boolean
    ): TransactionObject<void>;

    safeTransferFrom(
      from: string,
      to: string,
      tokenId: number | string
    ): TransactionObject<void>;
  };
  events: {
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
