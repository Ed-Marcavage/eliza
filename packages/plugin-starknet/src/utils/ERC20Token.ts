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
 * Type representing an approve call on a smart contract.
 * @typedef {object} ApproveCall
 * @property {string} contractAddress - The address of the smart contract.
 * @property {"approve"} entrypoint - The specific entrypoint called on the contract.
 * @property {Calldata} calldata - The data associated with the call.
 */
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};

/**
 * Type representing a transfer call to a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract
 * @property {"transfer"} entrypoint - The function entrypoint, always "transfer"
 * @property {Calldata} calldata - The data to be sent as part of the call
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
 * Constructor for initializing a new instance of the class.
 * 
 * @param {string} token - The ERC-20 token contract address or name.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - The provider or account.
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
 */
    public address() {
        return this.contract.address;
    }

/**
 * Retrieve the balance of a specific account.
 * @param {string} account - The account address to retrieve the balance for.
 * @returns {Promise<bigint>} The balance of the specified account.
 */
    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

/**
 * Get the decimals of the token by calling the "decimals" function on the contract.
 * @returns {Promise<bigint>} The number of decimal places for the token.
 */
    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

/**
 * Returns an object representing an 'approve' call request.
 *
 * @param {string} spender - The address of the account or contract allowed to spend the tokens.
 * @param {bigint} amount - The amount of tokens that the spender is allowed to spend.
 * @returns {ApproveCall} An object with contractAddress, entrypoint, and calldata properties representing the approve call request.
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
 * Transfers a specified amount of tokens to a recipient.
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount of tokens to transfer.
 * @returns {TransferCall} Information about the transfer call.
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
