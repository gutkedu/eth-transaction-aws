import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class EthTransactionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "EthTransactionQueue", {
      queueName: "EthTransactionQueue",
      visibilityTimeout: Duration.seconds(10),
    });

    const lambdaRole = new iam.Role(this, "EthTransactionLambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaSQSQueueExecutionRole"
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    const lambdaFunction = new lambdaNodejs.NodejsFunction(
      this,
      "EthTransactionLambda",
      {
        functionName: "EthTransactionLambdaFunction",
        entry: path.join(__dirname, "../src/app.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_16_X,
        role: lambdaRole,
        timeout: Duration.seconds(3),
        environment: {
          INFURA_GOERLI_URL: "",
          ETH_API_URL: "",
        },
        memorySize: 128,
      }
    );

    new lambda.EventSourceMapping(this, "SQSEvent", {
      target: lambdaFunction,
      batchSize: 10,
      eventSourceArn: queue.queueArn,
    });

    new CfnOutput(this, "FunctionName", {
      value: lambdaFunction.functionName,
      description: "function name",
    });

    new CfnOutput(this, "SQSqueueName", {
      value: queue.queueName,
      description: "SQS queue name",
    });

    new CfnOutput(this, "SQSqueueARN", {
      value: queue.queueArn,
      description: "SQS queue ARN",
    });

    new CfnOutput(this, "SQSqueueURL", {
      value: queue.queueUrl,
      description: "SQS queue URL",
    });
  }
}
