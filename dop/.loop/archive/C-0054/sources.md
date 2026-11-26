## S1 Real-time processing of log data with subscriptions — Real-time processing of log data with subscriptions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> You can use subscriptions to get access to a real-time feed of log events from CloudWatch Logs and have it delivered to other services such as an Amazon Kinesis stream, an Amazon Data Firehose stream, or AWS Lambda for custom processing, analysis, or loading to other systems. When log events are sent to the receiving service, they are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field. Amazon Kinesis Data Streams records contain the gzip bytes; the AWS CLI and AWS Lambda event sources display them base64 encoded.

## S2 Real-time processing of log data with subscriptions — Subscription filters and delivery time
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> To begin subscribing to log events, create the receiving resource, such as a Amazon Kinesis Data Streams stream, where the events will be delivered. A subscription filter defines the filter pattern to use for filtering which log events get delivered to your AWS resource, as well as information about where to send matching log events to. Log events are sent to the receiving resource soon after being ingested, usually less than three minutes.

## S3 Real-time processing of log data with subscriptions — Account-level and log group-level limits
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> You can create subscriptions at the account level and at the log group level. Each account can have one account-level subscription filter per Region. Each log group can have up to five subscription filters associated with it.

## S4 Real-time processing of log data with subscriptions — Retries and disabled period
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> If the destination service returns a retryable error such as a throttling exception or a retryable service exception (HTTP 5xx for example), CloudWatch Logs continues to retry delivery for up to 24 hours. CloudWatch Logs doesn't try to re-deliver if the error is a non-retryable error, such as AccessDeniedException or ResourceNotFoundException. In these cases the subscription filter is disabled for up to 10 minutes, and then CloudWatch Logs retries sending logs to the destination. During this disabled period, logs are skipped.

## S5 Real-time processing of log data with subscriptions — Delivery guarantee
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> Subscription filters ensure at least one time delivery of events, while duplicate events may occasionally occur.

## S6 Log group-level subscription filters — Supported destinations
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-26
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service. Logs sent to a service through a subscription filter are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S7 Example 1: Subscription filters with Amazon Kinesis Data Streams — Before you create the stream
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Before you create the stream, calculate the volume of log data that will be generated. Be sure to create a stream with enough shards to handle this volume. If the stream does not have enough shards, the log stream will be throttled. For more information about stream volume limits, see Quotas and Limits. Throttled deliverables are retried for up to 24 hours. After 24 hours, the failed deliverables are dropped.

## S8 Example 1: Subscription filters with Amazon Kinesis Data Streams — Reducing throttling
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Specify random for distribution when you create the subscription filter with PutSubscriptionFilter or put-subscription-filter. By default, the stream filter distribution is by log stream and this can cause throttling.

## S9 Example 1: Subscription filters with Amazon Kinesis Data Streams — Monitoring throttling
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Monitor your stream using CloudWatch metrics. This helps you identify any throttling and adjust your configuration accordingly. For example, the DeliveryThrottling metric can be used to track the number of log events for which CloudWatch Logs was throttled when forwarding data to the subscription destination.

## S10 Example 1: Subscription filters with Amazon Kinesis Data Streams — Record format
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> The Data attribute in a Amazon Kinesis Data Streams record is base64 encoded and compressed with the gzip format. You can examine the raw data from the command line using the following Unix commands:

## S11 Cross-account cross-Region subscriptions — Cross-account data sharing
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> You can collaborate with an owner of a different AWS account and receive their log events on your AWS resources, such as an Amazon Kinesis or Amazon Data Firehose stream (this is known as cross-account data sharing). For example, this log event data can be read from a centralized Amazon Kinesis Data Streams or Firehose stream to perform custom processing and analysis. Custom processing is especially useful when you collaborate and analyze data across many accounts.

## S12 Cross-account cross-Region subscriptions — Same Region for log group and destination
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> The log group and the destination must be in the same AWS Region. However, the AWS resource that the destination points to can be located in a different Region.

## S13 Cross-account cross-Region subscriptions — Centralized logs and system fields
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> If you have configured AWS Organizations and are working with member accounts you can use log centralization to collect log data from source accounts into a central monitoring account.

## S14 What is Amazon Kinesis Data Streams? — What can I do with Kinesis Data Streams?
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#use-service-for-what
fetched: 2026-11-26
> You can have producers push data directly into a stream. For example, push system and application logs and they are available for processing in seconds. This prevents the log data from being lost if the front end or application server fails. Kinesis Data Streams provides accelerated data feed intake because you don't batch the data on the servers before you submit it for intake.

## S15 What is Amazon Kinesis Data Streams? — Benefits of using Kinesis Data Streams
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#using-the-service
fetched: 2026-11-26
> Kinesis Data Streams durably stores the records your producers write and makes them available for consumption in real time. The delay between the time a record is put into the stream and the time it can be retrieved is typically less than 1 second.

## S16 What is Amazon Kinesis Data Streams? — Stream consumers and queue consumers
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-26
> A stream consumer reads the records of a shard in order, which suits stateful processing, where processing one record depends on the records before it, for use cases such as live analytics, personalization, and anomaly and pattern detection. Each shard is processed by one stream consumer instance at a time, which preserves the order of the records in that shard so that the stream consumer can keep an accurate state.

## S17 What is Amazon Data Firehose? — What is Amazon Data Firehose?
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
fetched: 2026-11-26
> Amazon Data Firehose is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch Serverless, Splunk, Apache Iceberg Tables, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, Coralogix, and Elastic. With Amazon Data Firehose, you don't need to write applications or manage resources. You configure your data producers to send data to Amazon Data Firehose, and it automatically delivers the data to the destination that you specified.

## S18 What is Amazon Data Firehose? — Buffer size and buffer interval
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#key-concepts
fetched: 2026-11-26
> Amazon Data Firehose buffers incoming streaming data to a certain size or for a certain period of time before delivering it to destinations. Buffer Size is in MBs and Buffer Interval is in seconds.
