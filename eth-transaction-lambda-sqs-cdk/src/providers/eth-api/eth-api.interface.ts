import { GetEthWalletResponse, GetKeysResponse } from "./eth-api.dtos";

export interface IEthApiProvider {
  getRandomKeys(): Promise<GetKeysResponse>;
  getEthWalletFromPublicKey(publicKey: string): Promise<GetEthWalletResponse>;
}
