export interface ITransferEthDTO {
  privateKey: string;
  fromAddress: string;
  toAddress: string;
  amountInWei: string;
}

export interface ITransferEthResponse {
  transactionHash: string;
}

export interface IGetBalanceFromWalletResponse {
  balance: string;
}
