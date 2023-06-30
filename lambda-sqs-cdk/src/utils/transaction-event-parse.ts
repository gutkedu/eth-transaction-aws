import { SQSEvent } from "aws-lambda";

interface ITransactionEventInput {
  event: SQSEvent;
}

interface ITransactionEventOutput {
  to: string;
  value: string;
}

export async function transactionEventParse({
  event,
}: ITransactionEventInput): Promise<ITransactionEventOutput> {
  try {
    const record = event.Records[0];
    const { body } = record;
    const { to, value } = JSON.parse(body);

    const transaction: ITransactionEventOutput = {
      to,
      value,
    };

    return transaction;
  } catch (error) {
    throw new Error("Error on parsing transaction event");
  }
}
