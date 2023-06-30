import Web3 from "web3";
import { env } from "../../env";
import { IWeb3Provider } from "./web3.interface";
import {
  IGetBalanceFromWalletResponse,
  ITransferEthDTO,
  ITransferEthResponse,
} from "./web3.dtos";

export class Web3Provider implements IWeb3Provider {
  private web3: Web3;
  private GOERLI_CHAIN_ID = 5;

  constructor() {
    this.web3 = new Web3(env.INFURA_GOERLI_URL);
  }

  async transferEth({
    privateKey,
    amountInWei,
    toAddress,
    fromAddress,
  }: ITransferEthDTO): Promise<ITransferEthResponse> {
    const nonce = await this.web3.eth.getTransactionCount(
      fromAddress,
      "latest"
    );

    const gasPrice = await this.web3.eth.getGasPrice();

    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      {
        to: toAddress,
        value: amountInWei,
        gas: "21000",
        gasPrice,
        nonce,
        chainId: this.GOERLI_CHAIN_ID,
        chain: "goerli",
      },
      privateKey
    );

    const { transactionHash } = await this.web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    const formatTransactionHash = this.web3.utils.toHex(transactionHash);

    return {
      transactionHash: formatTransactionHash,
    };
  }

  async getBalanceFromWallet(
    walletAddress: string
  ): Promise<IGetBalanceFromWalletResponse> {
    const request = await this.web3.eth.getBalance(walletAddress);
    return {
      balance: this.web3.utils.fromWei(request, "ether"),
    };
  }
}
