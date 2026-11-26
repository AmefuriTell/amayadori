## S1 Log group-level subscription filters — Log group-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-26
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S2 Log group-level subscription filters — Example 2: Subscription filters with AWS Lambda
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs subscription filter that sends log data to your AWS Lambda function.
> Grant CloudWatch Logs the permission to execute your function. Use the following command, replacing the placeholder account with your own account and the placeholder log group with the log group to process:
> aws lambda add-permission \ --function-name "helloworld" \ --statement-id "helloworld" \ --principal "logs.amazonaws.com" \ --action "lambda:InvokeFunction" \ --source-arn "arn:aws:logs:region:123456789123:log-group:TestLambda:*" \ --source-account "123456789012"
> The actual payload that Lambda receives is in the following format { "awslogs": {"data": "BASE64ENCODED_GZIP_COMPRESSED_DATA"} } You can examine the raw data from the command line using the following Unix commands:

## S3 Log group-level subscription filters — Example 3: Subscription filters with Amazon Data Firehose
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs subscription that sends any incoming log events that match your defined filters to your Amazon Data Firehose delivery stream.
> Data sent from CloudWatch Logs to Amazon Data Firehose is already compressed with gzip level 6 compression, so you do not need to use compression within your Firehose delivery stream. You can then use the decompression feature in Firehose to automatically decompress the logs.
> Create the IAM role that grants CloudWatch Logs permission to put data into your Firehose delivery stream.
> Create a permissions policy to define what actions CloudWatch Logs can do on your account.
> After the Amazon Data Firehose delivery stream is in active state and you have created the IAM role, you can create the CloudWatch Logs subscription filter.

## S4 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Streaming CloudWatch Logs data to Amazon OpenSearch Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
fetched: 2026-11-26
> You can configure a log group in Amazon CloudWatch Logs, so you can stream data to your Amazon OpenSearch Service cluster in near real-time.
> Streaming to OpenSearch Service is supported only for log groups in the Standard log class.
> Depending on the amount of log data that's streamed, consider setting a function-level concurrency limit.

## S5 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Prerequisites
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Domain
fetched: 2026-11-26
> Before you begin, create an OpenSearch Service domain. The domain can have either public access or VPC access, but you can't then modify the type of access after the domain is created.

## S6 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Subscribe a log group to OpenSearch Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_LG
fetched: 2026-11-26
> For Lambda IAM Execution Role, choose the IAM role that Lambda should use when executing calls to OpenSearch.
> The IAM role you choose must fulfill these requirements:
> It must have lambda.amazonaws.com in the trust relationship.
> If the target OpenSearch Service domain uses VPC access, the role must have the AWSLambdaVPCAccessExecutionRole policy attached. This Amazon-managed policy grants Lambda access to the customer's VPC, enabling Lambda to write to the OpenSearch endpoint in the VPC.

## S7 Account-level subscription filters — Account-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
fetched: 2026-11-26
> You can set an account-level subscription policy that includes a subset of log groups in the account.
> The account subscription policy can work with Amazon Kinesis Data Streams, AWS Lambda, or Amazon Data Firehose.
> There is a risk of causing an infinite recursive loop with subscription filters that can lead to a large increase in ingestion billing if not addressed.
> To mitigate this risk, we recommend that you use selection criteria in your account-level subscription filters to exclude log groups that ingest log data from resources that are part of the subscription delivery workflow.

## S8 Account-level subscription filters — Example 2: Subscription filters with AWS Lambda
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#LambdaFunctionExample-AccountLevel
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs account-level subscription filter policy that sends log data to your AWS Lambda function.
> Note The account-level subscription filter will not be applied to the destination Lambda function’s log group. This is to prevent an infinite log recursion that can lead to an increase in ingestion billing.
