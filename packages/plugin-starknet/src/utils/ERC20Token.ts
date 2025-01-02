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
 * Type representing an approve call for a contract.
 * @typedef {Object} ApproveCall
 * @property {string} contractAddress - The address of the contract.
 * @property {string} entrypoint - The entrypoint, which is always "approve".
 * @property {Calldata} calldata - The calldata for the call.
 */ 
        
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};

/**
 * Type representing an approve call for a contract.
 * @typedef {Object} ApproveCall
 * @property {string} contractAddress - The address of the contract.
 * @property {string} entrypoint - The entrypoint, which is always "approve".
 * @property {Calldata} calldata - The calldata for the call.
 */ 

/**
 * Represents a transfer call data structure.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract.
 * @property {"transfer"} entrypoint - The entrypoint to be called ("transfer").
 * @property {Calldata} calldata - The payload data for the call.
 */
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};

/**
 * Class representing an ERC20 Token.
 */
 
export class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
/**
 * Constructor for creating an instance of the class.
 * 
 * @param {string} token - The token address.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - The provider or account interface.
 */ 

    constructor(
        token: string,
        providerOrAccount?: ProviderInterface | AccountInterface
    ) {
        this.contract = new Contract(erc20Abi, token, providerOrAccount);
        this.calldata = new CallData(this.contract.abi);
    }

/**
 * Returns the address of the contract.
 * 
 * @returns {string} The address of the contract.
 */
    public address() {
        return this.contract.address;
    }

/**
 * Asynchronously retrieves the balance of the specified account.
 * 
 * @param {string} account - The account for which to retrieve the balance.
 * @returns {Promise<bigint>} - A Promise that resolves to the balance as a bigint.
 */
    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

/**
 * Get the decimal value of the contract asynchronously.
 * @returns {Promise<bigint>} The decimal value of the contract.
 */
    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

/**
 * Approves a call to spend a specified amount of tokens.
 * @param {string} spender - The address of the account that will be allowed to spend the tokens.
 * @param {bigint} amount - The amount of tokens to be approved for spending.
 * @returns {ApproveCall} - An object containing the contract address, entrypoint, and calldata for the approval call.
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
 * Transfers a specified amount of tokens to the recipient.
 *
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount of tokens to transfer.
 * @returns {TransferCall} - Object containing contract address, entrypoint, and calldata for the transfer call.
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
