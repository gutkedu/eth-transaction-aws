import {
  IGetBalanceFromWalletResponse,
  ITransferEthDTO,
  ITransferEthResponse,
} from "./web3.dtos";

export interface IWeb3Provider {
  transferEth(payload: ITransferEthDTO): Promise<ITransferEthResponse>;
  getBalanceFromWallet(
    walletAddress: string
  ): Promise<IGetBalanceFromWalletResponse>;
}
