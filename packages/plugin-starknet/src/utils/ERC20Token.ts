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
* @property {string} contractAddress - The address of the contract to be called.
* @property {'approve'} entrypoint - The entrypoint of the call.
* @property {Calldata} calldata - The data for the call.
*/
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};

/**
 * Type representing a transfer call for a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract.
 * @property {string} entrypoint - The entrypoint function, always set to "transfer".
 * @property {Calldata} calldata - The data to be sent in the call.
 */
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};

/**
 * Represents an ERC20 Token with various methods for interacting with the token contract.
 */
export class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
/**
 * Constructor for a new instance of a contract.
 * 
 * @param {string} token - The token address.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - The provider or account to use.
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
 * This method asynchronously retrieves the balance of a specified account.
 * @param {string} account - The account for which the balance needs to be retrieved.
 * @returns {Promise<bigint>} The balance of the specified account as a BigInt.
 */
    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

/**
 * Asynchronously fetches the decimal value related to the contract.
 * @returns {Promise<bigint>} The decimal value as a big integer.
 */
    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

/**
 * Create an 'ApproveCall' object to approve the specified amount for the spender.
 * 
 * @param {string} spender - The address of the spender to approve the amount for.
 * @param {bigint} amount - The amount to approve for the spender.
 * @returns {ApproveCall} An object containing contract address, entrypoint, and calldata for approval.
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
 * Generates a TransferCall object to transfer a specified amount to a recipient.
 *
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount to transfer.
 *
 * @returns {TransferCall} - The TransferCall object containing contract address, entrypoint, and calldata.
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
