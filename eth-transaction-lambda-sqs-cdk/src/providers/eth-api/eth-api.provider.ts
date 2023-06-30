import axios from "axios";
import { env } from "../../env";
import { GetEthWalletResponse, GetKeysResponse } from "./eth-api.dtos";
import { IEthApiProvider } from "./eth-api.interface";

export class EthApiProvider implements IEthApiProvider {
  async getEthWalletFromPublicKey(
    publicKey: string
  ): Promise<GetEthWalletResponse> {
    try {
      const { data } = await axios.post<GetEthWalletResponse>(
        `${env.ETH_API_URL}/address`,
        {
          publicKey,
        },
        {
          timeout: 5000,
        }
      );
      return data;
    } catch (error) {
      throw new Error("Integration error with EthApi");
    }
  }

  async getRandomKeys(): Promise<GetKeysResponse> {
    try {
      const { data } = await axios.get<GetKeysResponse>(
        `${env.ETH_API_URL}/keys`,
        {
          timeout: 5000,
        }
      );
      return data;
    } catch (error) {
      throw new Error("Integration error with EthApi");
    }
  }
}
