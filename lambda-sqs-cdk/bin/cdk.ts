#!/usr/bin/env node
import "source-map-support/register";
import { App, Environment } from "aws-cdk-lib";
import { EthTransactionStack } from "../lib/eth-transaction-stack";

const app = new App();

const env: Environment = {
  account: "683803546978",
  region: "us-east-1",
};

const tags = {
  cost: "lambda-sqs-cdk",
  team: "gutkedu",
};

new EthTransactionStack(app, "EthTransactionStack", {
  env,
  tags,
});
