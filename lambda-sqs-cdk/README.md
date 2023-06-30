## Deploy
```bash
cdk deploy
```
## Testing

1. Send the SQS message: aws sqs send-message --queue-url ENTER_YOUR_SQS_QUEUE_URL --message-body "Test message"
2. Retrieve the logs from the Lambda function: sam logs -n ENTER_YOUR_CONSUMER_FUNCTION_NAME.

https://sqs.us-east-1.amazonaws.com/683803546978/CdkStack-MySqsQueue317E6770-ElTWXH1UM9el

## Cleanup
```bash
cdk destroy
```

{
  "to": "0x455E5AA18469bC6ccEF49594645666C587A3a71B",
  "value": "1000"
}