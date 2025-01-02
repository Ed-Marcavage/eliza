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
 * Type representing an approve call, with properties:
 * - contractAddress: string
 * - entrypoint: "approve"
 * - calldata: Calldata
 */
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};

/**
 * Type representing a transfer call to a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract.
 * @property {"transfer"} entrypoint - The entrypoint function "transfer".
 * @property {Calldata} calldata - The data payload for the call.
 */
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};

/**
 * Represents an ERC20 token with methods for interacting with the token contract.
 */
export class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
/**
 * Constructor for initializing a new contract instance with the provided token address and optional provider or account.
 * @param {string} token - The address of the ERC20 token contract.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - Optional provider or account interface.
 */
    constructor(
        token: string,
        providerOrAccount?: ProviderInterface | AccountInterface
    ) {
        this.contract = new Contract(erc20Abi, token, providerOrAccount);
        this.calldata = new CallData(this.contract.abi);
    }

/**
 * Retrieve the address of the contract.
 * @returns {string} The address of the contract.
 */
    public address() {
        return this.contract.address;
    }

/**
* Retrieves the balance of the specified account.
* @param {string} account - The account address to retrieve the balance for.
* @returns {Promise<bigint>} - The balance of the specified account as a bigint.
*/
    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

/**
 * Asynchronously retrieves the value of the 'decimals' from the contract.
 * 
 * @returns {Promise<bigint>} The decimal value of the contract retrieved as a BigInt.
 */
    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

/**
 * Generates an "approve" call object with the specified spender and amount.
 * 
 * @param {string} spender - The address of the spender being approved.
 * @param {bigint} amount - The amount the spender is approved to spend.
 * @returns {ApproveCall} The generated "approve" call object.
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
 * Transfers the specified amount to the recipient using the 'transfer' entrypoint.
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount to transfer.
 * @returns {TransferCall} Object containing contract address, entrypoint, and calldata for the transfer.
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
