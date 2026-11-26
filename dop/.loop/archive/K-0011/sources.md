# 講義の根拠: task 4.1（ログとメトリクスの収集・集約・保存の設定）

## S1 Log classes - Amazon CloudWatch Logs — Log classes
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html#CloudWatch_Logs_Log_Classes
fetched: 2026-11-27
> CloudWatch Logs Standard log class is a full-featured option for logs that require real-time monitoring or logs that you access frequently.
> The Essentials log class is ideal for ad-hoc querying and after-the-fact forensic analysis on infrequently accessed logs.
> After a log group is created, its log class can't be changed.

## S2 Publish custom metrics (PutMetricData / EMF) — High-resolution metrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#high-resolution-metrics
fetched: 2026-11-27
> When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds.
> High-resolution metrics can give you more immediate insight into your application's sub-minute activity.

## S3 Publish custom metrics (PutMetricData / EMF) — Use dimensions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#usingDimensions
fetched: 2026-11-27
> You can have up to 30 dimensions assigned to one metric, and each dimension is defined by a name and value pair.

## S4 Publish custom metrics (PutMetricData / EMF) — 冒頭
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#publishingMetrics
fetched: 2026-11-27
> This approach uses CloudWatch namespaces, metric names, and dimensions.
> For new implementations, we recommend using OpenTelemetry to publish custom metrics.

## S5 Use metric streams — Use metric streams
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
fetched: 2026-11-27
> You can use metric streams to continually stream CloudWatch metrics to a destination of your choice, with near-real-time delivery and low latency.
> You can stream all of your CloudWatch metrics, or use filters to stream only specified metrics.

## S6 Use metric streams — 利用の 3 つの形（Firehose・S3）
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
fetched: 2026-11-27
> Create a metric stream and direct it to an Amazon Data Firehose delivery stream that delivers your CloudWatch metrics to where you want them to go.
> Stream to Amazon Simple Storage Service with a quick setup process.

## S7 Filter pattern syntax for metric filters — 概要
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntaxForMetricFilters.html#FilterAndPatternSyntaxForMetricFilters
fetched: 2026-11-27
> Metric filters are assigned to log groups, and all of the filters assigned to a log group are applied to their log streams.
> When a metric filter matches a term, it increments the metric's count by a specified numerical value.
> For information about how to query your log groups with the Amazon CloudWatch Logs Insights query language, see CloudWatch Logs Insights language query syntax.

## S8 Filter pattern syntax for metric filters — Configuring metric values for a metric filter
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntaxForMetricFilters.html#changing-default-increment-value
fetched: 2026-11-27
> If you don't specify a default value, CloudWatch won't report data when your metric filter doesn't find a match.
> We recommend that you specify a default value, even if the value is 0.

## S9 Configure the CloudWatch agent with the Classic configuration — 概要
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Classic-configuration.html#CloudWatch-Agent-Classic-configuration
fetched: 2026-11-27
> Use the Classic configuration for the agent features that only it offers, such as the configuration wizard, StatsD, collectd, procstat, JMX, NVIDIA GPU, EFA, NVMe, network performance metrics, and Application Signals.

## S10 Install the CloudWatch agent using AWS Systems Manager — 概要
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#installing-cloudwatch-agent-ssm
fetched: 2026-11-27
> You can download the agent into one server and create your CloudWatch agent configuration file for all servers in the fleet.
> Then you can use Systems Manager to install the agent on the other servers, using the configuration file that you created.

## S11 Install the CloudWatch agent using AWS Systems Manager — IAM ロール
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#installing-cloudwatch-agent-ssm
fetched: 2026-11-27
> You must also make sure that the IAM role attached to the instance has the CloudWatchAgentServerPolicy attached.

## S12 Log group-level subscription filters — 概要
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-27
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip format.
> AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S13 Log group-level subscription filters — Example 1: Kinesis Data Streams（流量の制限）
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-27
> By default, the stream filter distribution is by log stream and this can cause throttling.
> Throttled deliverables are retried for up to 24 hours.
> After 24 hours, the failed deliverables are dropped.

## S14 Streaming CloudWatch Logs data to Amazon OpenSearch Service — 概要
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
fetched: 2026-11-27
> Streaming to OpenSearch Service is supported only for log groups in the Standard log class.
> Because streaming large amounts of CloudWatch Logs data to OpenSearch Service might result in high usage charges, we recommend that you create a budget in the AWS Billing and Cost Management console.

## S15 Working with log groups and log streams — ログの保持期間（retention）
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
fetched: 2026-11-27
> A log group is a group of log streams that share the same retention, monitoring, and access control settings.
> Any data older than the current retention setting is deleted.
> CloudWatch Logs doesn’t immediately delete log events when they reach their retention setting.

## S16 Managing the lifecycle of objects — Amazon S3 Lifecycle
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html#object-lifecycle-mgmt
fetched: 2026-11-27
> An S3 Lifecycle configuration is a set of rules that define actions that Amazon S3 applies to a group of objects.
> These actions define when objects transition to another storage class.
> Amazon S3 deletes expired objects on your behalf.
> When you add a Lifecycle configuration to a bucket, the configuration rules apply to both existing objects and objects that you add later.

## S17 CloudWatch Logs Insights language query syntax — 概要と注意
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-27
> To create queries that contain multiple commands, separate the commands with the pipe character (|).
> Always specify the narrowest possible time range for your queries.
> All Logs Insights QL query commands are supported on log groups in the Standard log class.
> Log groups in the Essentials log class (formerly Infrequent Access) support all Logs Insights QL query commands except pattern, diff, and unmask.

## S18 Encrypt log data in CloudWatch Logs using AWS Key Management Service — 暗号化の既定と KMS
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-27
> Log group data is always encrypted in CloudWatch Logs.
> By default, CloudWatch Logs uses server-side encryption with 256-bit Advanced Encryption Standard Galois/Counter Mode (AES-GCM) to encrypt log data at rest.
> As an alternative, you can use AWS Key Management Service for this encryption.
> After you associate a KMS key with a log group, all newly ingested data for the log group is encrypted using this key.
> We recommend that you use different KMS keys for each of your encrypted log groups.

## S19 Encrypt log data in CloudWatch Logs using AWS Key Management Service — 権限
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-association
fetched: 2026-11-27
> The IAM principal that calls CreateLogGroup with a kmsKeyId parameter, or calls AssociateKmsKey, must have kms:DescribeKey permission on the specified KMS key.
> CloudWatch Logs must have permissions for the KMS key whenever encrypted data is requested.

### 覆えなかった行
- Encryption options: in-transit（転送中）のログとメトリクスの暗号化（client-side / server-side の区別）は、今回取った 11 ページの原文に無い。
- Skills「Creating CloudWatch metric streams」の Kinesis Data Firehose 以外の細かい設定（S3 の形式など）は、metric streams の設定ページ（CloudWatch-metric-streams-setup.html）を取ったが原文を写していない。必要なら次の回で写す。
- Skills「Searching log data by using filter and pattern syntax」の、フィルターパターンの書き方そのもの（構文の表）は、今回の原文に無い（S7 は metric filter の概要と Logs Insights への案内だけ）。
- Skills「Processing log data ... Amazon Kinesis」の Kinesis Data Streams の作成手順・Lambda 関数の例は写していない（S12・S13 で選び方と流量の注意だけ）。
