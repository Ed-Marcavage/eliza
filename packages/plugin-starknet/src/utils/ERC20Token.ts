import {
    AccountInterface,
    cairo,
    CallData,
    Calldata,
    Contract,
    ProviderInterface,
} from "starknet";
import erc20Abi from "./erc20.json";

/**
 * Represents a request to approve a contract call.
 * @typedef {Object} ApproveCall
 * @property {string} contractAddress - The address of the contract.
 * @property {"approve"} entrypoint - The entrypoint of the call.
 * @property {Calldata} calldata - The calldata for the call.
 */
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};

/**
 * Definition of TransferCall type.
 * Represents a transfer call to a contract address with specific entrypoint and calldata.
 * @typedef { object } TransferCall
 * @property { string } contractAddress - The address of the contract.
 * @property {"transfer"} entrypoint - The specific entrypoint for the transfer.
 * @property { Calldata } calldata - The calldata associated with the transfer.
 */
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};

/**
 * ERC20Token class representing an ERC20 token contract.
 */
export class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
/**
 * Constructor for initializing a new instance of the class. 
 * 
 * @param {string} token - The token address.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - Optional parameter for provider or account interface.
 */
    constructor(
        token: string,
        providerOrAccount?: ProviderInterface | AccountInterface
    ) {
        this.contract = new Contract(erc20Abi, token, providerOrAccount);
        this.calldata = new CallData(this.contract.abi);
    }

/**
 * Get the address of the contract.
 * @returns {string} The address of the contract.
 */
    public address() {
        return this.contract.address;
    }

/**
 * Get the balance of the specified account.
 * @param {string} account - The account to get the balance for.
 * @returns {Promise<bigint>} The balance of the account as a promise.
 */
    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

/**
 * Retrieves the decimals number from the smart contract.
 * @returns {Promise<bigint>} The number of decimal places as a BigInt.
 */
    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

/**
 * Returns an object with details for approving a call.
 * @param {string} spender - The address of the spender.
 * @param {bigint} amount - The amount to approve.
 * @returns {ApproveCall} - The object with contract address, entrypoint, and calldata.
 */
    public approveCall(spender: string, amount: bigint): ApproveCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "approve",
            calldata: this.calldata.compile("approve", {
                spender: spender,
                amount: cairo.uint256(amount),
            }),
        };
    }

/**
 * Creates a transfer call object for invoking the 'transfer' entrypoint with specified recipient and amount.
 * 
 * @param {string} recipient - The recipient address for the transfer.
 * @param {bigint} amount - The amount to transfer.
 * @returns {TransferCall} The transfer call object containing contract address, entrypoint, and calldata.
 */
    public transferCall(recipient: string, amount: bigint): TransferCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "transfer",
            calldata: this.calldata.compile("transfer", {
                recipient: recipient,
                amount: cairo.uint256(amount),
            }),
        };
    }
}
