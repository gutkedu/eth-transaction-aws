## Deploy
```bash
cdk deploy
```
## Testing

1. Send the SQS message: aws sqs send-message --queue-url ENTER_YOUR_SQS_QUEUE_URL --message-body "Test message"
2. Retrieve the logs from the Lambda function: sam logs -n ENTER_YOUR_CONSUMER_FUNCTION_NAME.

## Cleanup
```bash
cdk destroy
```