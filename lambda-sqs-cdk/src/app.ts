import { SQSHandler } from "aws-lambda";
import { EthApiProvider } from "./providers/eth-api/eth-api.provider";
import { Web3Provider } from "./providers/web3/web3.provider";
import { transactionEventParse } from "./utils/transaction-event-parse";

export const handler: SQSHandler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const { to: toEthAddress, value } = await transactionEventParse({ event });

  console.log("To Eth Address:", toEthAddress);
  console.log("Value:", value);

  const web3Provider = new Web3Provider();

  const apiProvider = new EthApiProvider();

  const { privateKey, publicKey } = await apiProvider.getRandomKeys();

  console.log("Private Key:", privateKey);
  console.log("Public Key:", publicKey);

  const { address: EthAddress } = await apiProvider.getEthWalletFromPublicKey(
    publicKey
  );

  console.log("Eth Address:", EthAddress);

  const { transactionHash } = await web3Provider.transferEth({
    privateKey,
    fromAddress: EthAddress,
    toAddress: toEthAddress,
    amountInWei: value,
  });

  console.log("Transaction Hash:", transactionHash);
};
