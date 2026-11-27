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

## S20 Encrypt log data in CloudWatch Logs using AWS Key Management Service — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-25
> Log group data is always encrypted in CloudWatch Logs. By default, CloudWatch Logs uses server-side encryption with 256-bit Advanced Encryption Standard Galois/Counter Mode (AES-GCM) to encrypt log data at rest. As an alternative, you can use AWS Key Management Service for this encryption. If you do, the encryption is done using an AWS KMS key.
> Encryption using AWS KMS is enabled at the log group level, by associating a KMS key with a log group, either when you create the log group or after it exists.
> After you associate a KMS key with a log group, all newly ingested data for the log group is encrypted using this key. This data is stored in encrypted format throughout its retention period. CloudWatch Logs decrypts this data whenever it is requested. CloudWatch Logs must have permissions for the KMS key whenever encrypted data is requested.
> CloudWatch Logs supports only symmetric KMS keys. Do not use an asymmetric key to encrypt the data in your log groups.

## S21 Encrypt log data in CloudWatch Logs using AWS Key Management Service — Step 2: Set permissions on the KMS key
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-lg
fetched: 2026-11-25
> By default, all AWS KMS keys are private. Only the resource owner can use it to encrypt and decrypt data. However, the resource owner can grant permissions to access the KMS key to other users and resources. With this step, you give the CloudWatch Logs service principal and the caller role permission to use the key. This service principal must be in the same AWS Region where the KMS key is stored.
> As a best practice, we recommend that you restrict the use of the KMS key to only those AWS accounts or log groups you specify.
> The Condition section in this example restricts the key to a single log group ARN.

## S22 Working with log groups and log streams — Change log data retention in CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
fetched: 2026-11-25
> By default, log data is stored in CloudWatch Logs indefinitely. However, you can configure how long to store log data in a log group. Any data older than the current retention setting is deleted. You can change the log retention for each log group at any time.
> An account-level retention policy overrides the retention setting of the log group.
> CloudWatch Logs doesn’t immediately delete log events when they reach their retention setting. It typically takes up to 72 hours after that before log events are deleted, but in rare situations might take longer.
> When log events reach their retention setting they are marked for deletion. After they are marked for deletion, they do not add to your archival storage costs anymore, even if they are not actually deleted until later.

## S23 Understanding data protection policies — What are data protection policies?
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/cloudwatch-logs-data-protection-policies.html#what-are-data-protection-policies
fetched: 2026-11-25
> CloudWatch Logs uses data protection policies to select the sensitive data for which you want to scan, and the actions that you want to take to protect that data. To select the sensitive data of interest, you use data identifiers. CloudWatch Logs data protection then detects the sensitive data by using machine learning and pattern matching. To act upon data identifiers that are found, you can define audit and de-identify operations. These operations let you log the sensitive data that is found (or not found), and to mask the sensitive data when the log events are viewed.

## S24 Creating metrics from log events using filters - Amazon CloudWatch Logs — Creating metrics from log events using filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
fetched: 2026-11-26
> You can search and filter the log data coming into CloudWatch Logs by creating one or more metric filters.
> Metric filters define the terms and patterns to look for in log data as it is sent to CloudWatch Logs.
> CloudWatch Logs uses these metric filters to turn log data into numerical CloudWatch metrics that you can graph or set an alarm on.
> Metric filters are supported only for log groups in the Standard log class.
> Filters do not retroactively filter data.
> Filters only publish the metric data points for events that happen after the filter was created.

## S25 Creating metrics from log events using filters - Amazon CloudWatch Logs — Concepts
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
fetched: 2026-11-26
> The value reported to the metric filter during a period when logs are ingested but no matching logs are found.
> If you assign dimensions to a metric created by a metric filter, you can't assign a default value for that metric.
> Because dimensions are part of the unique identifier for a metric, whenever a unique name/value pair is extracted from your logs, you are creating a new variation of that metric.
> The numerical value to publish to the metric each time a matching log is found.

## S26 Filter pattern syntax for metric filters - Amazon CloudWatch Logs — Configuring metric values for a metric filter
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntaxForMetricFilters.html#changing-default-increment-value
fetched: 2026-11-26
> When a metric filter matches a term, it increments the metric's count by a specified numerical value.
> You can set metric values to numbers, named identifiers, or numeric identifiers.
> If you don't specify a default value, CloudWatch won't report data when your metric filter doesn't find a match.
> We recommend that you specify a default value, even if the value is 0.
> If your metric filter doesn't find a match, CloudWatch reports the metric's default value.
> If you assign dimensions to metrics that metric filters generate, you can't specify default values for those metrics.

## S27 Embedding metrics within logs - Amazon CloudWatch — Embedding metrics within logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
fetched: 2026-11-26
> The CloudWatch embedded metric format allows you to generate custom metrics asynchronously in the form of logs written to CloudWatch Logs.
> No setup is required to use the embedded metric format.
> To generate metrics from logs with embedded metric format, you need the logs:PutLogEvents permission but you don't need to also have the cloudwatch:PutMetricData permission.

## S28 Use metric streams - Amazon CloudWatch — Use metric streams
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
fetched: 2026-11-25

> You can use metric streams to continually stream CloudWatch metrics to a
> destination of your choice, with near-real-time delivery and low latency. Supported
> destinations include AWS destinations such as Amazon Simple Storage Service and several third-party service
> provider destinations.
> There are three main usage scenarios for CloudWatch metric streams:
> - Custom setup with Firehose— Create a metric stream and direct it to an
> Amazon Data Firehose delivery stream that delivers your CloudWatch metrics to where you want them to go.
> JSON, OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0 formats are supported natively,
> or you can configure transformations in your Firehose delivery stream to convert the data to a different format such as Parquet.
> - Quick S3 setup— Stream to Amazon Simple Storage Service with a quick
> setup process. By default, CloudWatch creates the resources needed for the stream. JSON, OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0 formats
> are supported.
> You can stream all of your CloudWatch metrics, or use filters to stream only specified metrics. Each metric
> stream can include up to 1000 filters that
> either include or exclude metric namespaces or specific metrics. A single metric stream can have only include or
> exclude filters, but not both.
> After a metric stream is created, if new metrics are created that match the filters in place,
> the new metrics are automatically included in the stream.
> Each stream can use either JSON format, OpenTelemetry 1.0.0, or OpenTelemetry 0.7.0 format.

## S29 Set up a metric stream - Amazon CloudWatch — Set up a metric stream
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
fetched: 2026-11-25

> After a metric stream is created, the time it takes for metric data to appear at the
> destination depends on the configured buffering settings on
> the Firehose delivery stream. The buffering is expressed in maximum payload size or maximum wait time, whichever
> is reached first. If these are set to the minimum values (60 seconds, 1MB) the expected
> latency is within 3 minutes if
> the selected CloudWatch namespaces have active metric updates.
> In a CloudWatch metric stream, data is sent every minute. Data might arrive at the final
> destination out of order. All specified metrics in the specified namespaces are sent in the metric
> stream, except metrics with a timestamp that is more than two days old.
> For each combination of metric name and namespace that you stream, all dimension combinations
> of that metric name and namespace are streamed.
> A user with the cloudwatch:PutMetricStream has access to the CloudWatch metric data that is being streamed, even if they don't have
> the cloudwatch:GetMetricData permission.

## S30 Real-time processing of log data with subscriptions - Amazon CloudWatch Logs — Real-time processing of log data with subscriptions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-25

> You can use subscriptions to get access to a real-time feed of log events from CloudWatch Logs and
> have it delivered to other services such as an Amazon Kinesis stream, an Amazon Data Firehose stream, or
> AWS Lambda for custom processing, analysis, or loading to other systems. When log events are
> sent to the receiving service, they are compressed with the gzip format.
> To begin subscribing to log events, create the receiving resource, such as a Amazon Kinesis Data Streams stream,
> where the events will be delivered. A subscription filter defines the filter pattern to use
> for filtering which log events get delivered to your AWS resource, as well as information
> about where to send matching log events to. Log events are sent to the receiving resource
> soon after being ingested, usually less than three minutes.
> You can create subscriptions at the account level and at the log group level. Each account
> can have one account-level subscription filter per Region. Each log group can have up to five
> subscription filters associated with it.
> Subscription filters ensure at least one time delivery of events, while duplicate events may occasionally occur.

## S31 Log group-level subscription filters - Amazon CloudWatch Logs — Log group-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-25

> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip
> format. AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S32 Collect metrics, logs, and traces using the CloudWatch agent — Install-CloudWatch-Agent
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
fetched: 2026-11-26
> The CloudWatch agent is a software component that collects metrics, logs, and traces from your Amazon EC2 instances, on-premises servers, and containerized applications.
> The agent publishes metrics as CloudWatch metrics in a namespace, CWAgent by default, which are billed as custom metrics.
> The Classic configuration also provides StatsD, collectd, procstat, JMX, NVIDIA GPU, EFA, NVMe, and network performance metrics, and CloudWatch Application Signals.

## S33 Metrics collected by the CloudWatch agent — Linux and macOS instances
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html#linux-metrics-enabled-by-CloudWatch-agent
fetched: 2026-11-26
> You can collect metrics from servers by installing the CloudWatch agent on the server.
> The default namespace for metrics collected by the CloudWatch agent is CWAgent, although you can specify a different namespace when you configure the agent.
> The following table lists the metrics that you can collect with the CloudWatch agent on Linux servers and macOS computers.
> mem_used_percent The percentage of memory currently in use.
> disk_used_percent The percentage of total disk space that is used.

## S34 Publish custom metrics (PutMetricData / EMF) — publishingMetrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#publishingMetrics
fetched: 2026-11-26
> You can publish your own custom metrics to CloudWatch using the PutMetricData API or the AWS CLI.
> For new implementations, we recommend using OpenTelemetry to publish custom metrics.

## S35 Publish custom metrics (PutMetricData / EMF) — High-resolution metrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#high-resolution-metrics
fetched: 2026-11-26
> When you publish a custom metric, you can define it as either standard resolution or high resolution.
> When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds.
> Keep in mind that every PutMetricData call for a custom metric is charged, so calling PutMetricData more often on a high-resolution metric can lead to higher charges.

## S36 Publish custom metrics (PutMetricData / EMF) — Use dimensions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#usingDimensions
fetched: 2026-11-26
> You can have up to 30 dimensions assigned to one metric, and each dimension is defined by a name and value pair.

## S37 Publish custom metrics (PutMetricData / EMF) — Stop publishing metrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#CloudWatch-Stop-Publishing-Metrics
fetched: 2026-11-26
> CloudWatch doesn't pull metrics from applications, it only receives what is pushed to it, so to stop publishing your metrics you must stop them at the source.

## S38 Embedding metrics within logs — CloudWatch_Embedded_Metric_Format
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
fetched: 2026-11-26
> The CloudWatch embedded metric format allows you to generate custom metrics asynchronously in the form of logs written to CloudWatch Logs.
> OpenTelemetry (OTLP) metrics are the recommended path for ingesting metrics into CloudWatch.
> For most new workloads, publish custom metrics to the CloudWatch OTLP endpoint, for example by using the CloudWatch agent.
> To generate metrics from logs with embedded metric format, you need the logs:PutLogEvents permission but you don't need to also have the cloudwatch:PutMetricData permission.
> If you unintentionally create metrics based on high-cardinality dimensions (such as requestId), the embedded metric format will by design create a custom metric corresponding to each unique dimension combination.

## S39 Configure the CloudWatch agent with the Classic configuration — CloudWatch-Agent-Classic-configuration
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Classic-configuration.html#CloudWatch-Agent-Classic-configuration
fetched: 2026-11-26
> With the Classic configuration, the agent publishes metrics as CloudWatch metrics in a namespace, CWAgent by default, and you query them with CloudWatch metric queries and Metrics Insights.

## S40 Install the CloudWatch agent using AWS Systems Manager — installing-cloudwatch-agent-ssm
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#installing-cloudwatch-agent-ssm
fetched: 2026-11-26
> Using AWS Systems Manager makes it easier to install the CloudWatch agent on a fleet of Amazon EC2 instances.
> You can download the agent into one server and create your CloudWatch agent configuration file for all servers in the fleet.

## S41 Install the CloudWatch agent using AWS Systems Manager — Create and modify the agent configuration file
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#CW-Agent-Instance-Create-Configuration-File-first
fetched: 2026-11-26
> If you're going to save your agent configuration file in the Systems Manager Parameter Store, you must use an EC2 instance to save to the Parameter Store.

## S42 Install the CloudWatch agent using AWS Systems Manager — Install on additional EC2 instances
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#install-CloudWatch-Agent-on-EC2-Instance-fleet-ssm
fetched: 2026-11-26
> After you have a CloudWatch agent configuration saved in Parameter Store, you can use it when you install the agent on other servers.
> In the Optional Configuration Location box, enter the name of the Parameter Store parameter that contains your agent configuration file.
> The name must start with AmazonCloudWatch-, because the CloudWatchAgentServerPolicy managed policy can read only those parameters.

## S43 Working with log groups and log streams — Change log data retention in CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
fetched: 2026-11-26
> By default, log data is stored in CloudWatch Logs indefinitely. However, you can configure how long to store log data in a log group. Any data older than the current retention setting is deleted. You can change the log retention for each log group at any time.
> An account-level retention policy overrides the retention setting of the log group.
> CloudWatch Logs doesn’t immediately delete log events when they reach their retention setting.
> It typically takes up to 72 hours after that before log events are deleted, but in rare situations might take longer.
> When log events reach their retention setting they are marked for deletion. After they are marked for deletion, they do not add to your archival storage costs anymore, even if they are not actually deleted until later.

## S44 Working with log groups and log streams — Set log data retention for your account with account-level retention policies
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#account-level-retention-policies
fetched: 2026-11-26
> You can have as many as 20 account-level retention policies in a Region.
> Valid values are 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, and 3653.
> To retain log events indefinitely, specify NEVER_EXPIRE.
> Account-level retention policies require a minimum retention period of 30 days.
> Specify RETROACTIVE to apply the policy to every log group that matches the prefix, including log groups that existed before you created the policy.
> Specify NEW_ONLY to apply the policy only to log groups that are created after you create the policy.
> Retention policies can apply to overlapping sets of log groups.
> When more than one policy applies to a log group, the policy with the longest retention period is used, and a policy that specifies NEVER_EXPIRE is treated as the longest retention period.
> An account-level retention policy replaces the retention period set on a log group, including when the log group's own retention period is longer.
> For example, suppose a log group is set to retain log events for 10 years.
> If you create a retention policy that sets a 90-day retention period for that log group, CloudWatch Logs deletes the log events in that log group that are older than 90 days.
> A retention policy takes effect 24 hours after you create it.

## S45 Exporting log data to Amazon S3 — Exporting log data to Amazon S3
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
fetched: 2026-11-26
> You can export to an S3 bucket in the same account or a different account.
> We recommend that you don't regularly export to Amazon S3 as a way to continuously archive your logs.
> For that use case, we instead recommend that you use subscriptions.
> You can store the exported files in your S3 bucket and define Amazon S3 lifecycle rules to archive or delete exported files automatically.
> Log data can take up to 12 hours to become available for export.
> Export tasks time out after 24 hours.
> If your export tasks are timing out, reduce the time range when you create the export task.
> You can export to S3 buckets that are encrypted with AES-256 or with SSE-KMS.
> Exporting to buckets encrypted with DSSE-KMS is not supported.

## S46 Log classes — Log classes
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html#CloudWatch_Logs_Log_Classes
fetched: 2026-11-26
> CloudWatch Logs Standard log class is a full-featured option for logs that require real-time monitoring or logs that you access frequently.
> The Essentials log class is ideal for ad-hoc querying and after-the-fact forensic analysis on infrequently accessed logs.
> For charges, the Standard and Essentials (formerly Infrequent Access) log classes differ in ingestion costs only.
> Storage charges and CloudWatch Logs Insights charges are the same in each log class.
> After a log group is created, its log class can't be changed.
> Log events in log groups in the Delivery class are kept in CloudWatch Logs for two days.
> This retention period is fixed and cannot be changed.

## S47 Managing the lifecycle of objects — Managing the lifecycle of objects
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html#object-lifecycle-mgmt
fetched: 2026-11-26
> S3 Lifecycle helps you store objects cost effectively throughout their lifecycle by transitioning them to lower-cost storage classes, or, deleting expired objects on your behalf.
> An S3 Lifecycle configuration is a set of rules that define actions that Amazon S3 applies to a group of objects.
> Expiration actions – These actions define when objects expire.
> Amazon S3 deletes expired objects on your behalf.
> When you add a Lifecycle configuration to a bucket, the configuration rules apply to both existing objects and objects that you add later.
> For example, if you add a Lifecycle configuration rule today with an expiration action that causes objects to expire 30 days after creation, Amazon S3 will queue for removal any existing objects that are more than 30 days old.
> You can't use a bucket policy to prevent deletions or transitions by an S3 Lifecycle rule.
> For example, even if your bucket policy denies all actions for all principals, your S3 Lifecycle configuration still functions as normal.
> There are potential costs associated with lifecycle expiration only when you expire objects in a storage class with a minimum storage duration.
> There are no data retrieval charges for lifecycle transitions.
> However, there are per-request ingestion charges when using PUT, COPY, or lifecycle rules to move data into any S3 storage class.

## S48 Transitioning objects using Amazon S3 Lifecycle — Constraints and considerations for transitions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
fetched: 2026-11-26
> Lifecycle storage class transitions have the following constraints:
> Objects smaller than 128 KB will not transition by default to any storage class.
> Amazon S3 applies a default behavior to S3 Lifecycle configurations that prevents objects smaller than 128 KB from being transitioned to any storage class.
> We don't recommend transitioning objects less than 128 KB because you are charged a transition request for each object.
> This means, for smaller objects, the transition costs can outweigh the storage savings.

## S49 Log group-level subscription filters — Log group-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-26
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S50 Log group-level subscription filters — Example 2: Subscription filters with AWS Lambda
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs subscription filter that sends log data to your AWS Lambda function.
> Grant CloudWatch Logs the permission to execute your function. Use the following command, replacing the placeholder account with your own account and the placeholder log group with the log group to process:
> aws lambda add-permission \ --function-name "helloworld" \ --statement-id "helloworld" \ --principal "logs.amazonaws.com" \ --action "lambda:InvokeFunction" \ --source-arn "arn:aws:logs:region:123456789123:log-group:TestLambda:*" \ --source-account "123456789012"
> The actual payload that Lambda receives is in the following format { "awslogs": {"data": "BASE64ENCODED_GZIP_COMPRESSED_DATA"} } You can examine the raw data from the command line using the following Unix commands:

## S51 Log group-level subscription filters — Example 3: Subscription filters with Amazon Data Firehose
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs subscription that sends any incoming log events that match your defined filters to your Amazon Data Firehose delivery stream.
> Data sent from CloudWatch Logs to Amazon Data Firehose is already compressed with gzip level 6 compression, so you do not need to use compression within your Firehose delivery stream. You can then use the decompression feature in Firehose to automatically decompress the logs.
> Create the IAM role that grants CloudWatch Logs permission to put data into your Firehose delivery stream.
> Create a permissions policy to define what actions CloudWatch Logs can do on your account.
> After the Amazon Data Firehose delivery stream is in active state and you have created the IAM role, you can create the CloudWatch Logs subscription filter.

## S52 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Streaming CloudWatch Logs data to Amazon OpenSearch Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
fetched: 2026-11-26
> You can configure a log group in Amazon CloudWatch Logs, so you can stream data to your Amazon OpenSearch Service cluster in near real-time.
> Streaming to OpenSearch Service is supported only for log groups in the Standard log class.
> Depending on the amount of log data that's streamed, consider setting a function-level concurrency limit.

## S53 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Prerequisites
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Domain
fetched: 2026-11-26
> Before you begin, create an OpenSearch Service domain. The domain can have either public access or VPC access, but you can't then modify the type of access after the domain is created.

## S54 Streaming CloudWatch Logs data to Amazon OpenSearch Service — Subscribe a log group to OpenSearch Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_LG
fetched: 2026-11-26
> For Lambda IAM Execution Role, choose the IAM role that Lambda should use when executing calls to OpenSearch.
> The IAM role you choose must fulfill these requirements:
> It must have lambda.amazonaws.com in the trust relationship.
> If the target OpenSearch Service domain uses VPC access, the role must have the AWSLambdaVPCAccessExecutionRole policy attached. This Amazon-managed policy grants Lambda access to the customer's VPC, enabling Lambda to write to the OpenSearch endpoint in the VPC.

## S55 Account-level subscription filters — Account-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
fetched: 2026-11-26
> You can set an account-level subscription policy that includes a subset of log groups in the account.
> The account subscription policy can work with Amazon Kinesis Data Streams, AWS Lambda, or Amazon Data Firehose.
> There is a risk of causing an infinite recursive loop with subscription filters that can lead to a large increase in ingestion billing if not addressed.
> To mitigate this risk, we recommend that you use selection criteria in your account-level subscription filters to exclude log groups that ingest log data from resources that are part of the subscription delivery workflow.

## S56 Account-level subscription filters — Example 2: Subscription filters with AWS Lambda
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#LambdaFunctionExample-AccountLevel
fetched: 2026-11-26
> In this example, you'll create a CloudWatch Logs account-level subscription filter policy that sends log data to your AWS Lambda function.
> Note The account-level subscription filter will not be applied to the destination Lambda function’s log group. This is to prevent an infinite log recursion that can lead to an increase in ingestion billing.

## S57 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in unstructured log events
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-unstructured-log-events
fetched: 2026-11-26
> Filter patterns only return the log events that contain the terms you define.
> Filter patterns are case sensitive.
> Enclose exact phrases and terms that include non-alphanumeric characters in double quotation marks ("").
> Example: Match multiple terms The following code snippet shows an example of a multiple-term filter pattern that returns all log events where messages contain the words ERROR and ARGUMENTS.
> This filter pattern doesn't return the following log event messages because they don't contain both of the terms specified in the filter pattern.
> Example: Match exact phrases The following code snippet shows an example of a filter pattern that returns log events where messages contain the exact phrase INTERNAL SERVER ERROR.
> Example: Include and exclude terms You can create filter patterns that return log events where messages include some terms and exclude other terms.
> Place a minus symbol ("-") before the terms that you want to exclude.
> This filter pattern doesn't return the following log event messages because they contain the word ARGUMENTS.

## S58 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in JSON log events (strings and numbers)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-json-log-events
fetched: 2026-11-26
> Enclose filter patterns in curly braces ("{}").
> Set off property selectors with a dollar sign followed by a period ("$.").
> Property selectors are alphanumeric strings that support hyphen ("-") and underscore ("_") characters.
> If a property selector points to an array or object, the filter pattern won't match the log format.
> Set off equality operators with one of the following symbols: equal ("=") or not equal ("!=").
> Strings that contain types other than alphanumeric characters and the underscore symbol must be placed in double quotation marks.
> The following code snippet contains an example of a filter pattern showing how you can format a filter pattern to match a JSON term with a string.
> { $.eventType = "UpdateTrail" }
> Set off numeric operators with one of the following symbols: greater than (">"), less than ("<"), equal ("="), not equal ("!="), greater than or equal to (">="), or less than or equal to ("<=").
> You can use integers that contain plus ("+") or minus ("-") symbols and follow scientific notation.
> You can only use up to one wildcard selector in a property selector.
> If the JSON property contains a period ("."), then the bracket notation may be used to select that property.
> Example: Filter pattern that matches a JSON property with a period (.) in the key You can create filter patterns to match JSON property names that contain a period (.) by using bracket notation.
> Double quotation marks (") aren't supported inside bracket notation and cause the filter pattern to fail with a syntax error.

## S59 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in JSON log events (IS, NOT EXISTS, and compound expressions)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-json-log-events
fetched: 2026-11-26
> The IS variable can match fields that contain the values NULL, TRUE, or FALSE.
> The following filter pattern returns JSON logs where the value of SomeObject is NULL.
> { $.SomeObject IS NULL }
> You can create filter patterns with the NOT EXISTS variable to return JSON logs that don't contain specific fields in the log data.
> The following filter pattern uses NOT EXISTS to return JSON logs that don't contain the field SomeOtherObject.
> { $.SomeOtherObject NOT EXISTS }
> The variables IS NOT and EXISTS currently aren't supported.
> You can use the logical operators AND ("&&") and OR ("||") in filter patterns to create compound expressions that match log events where two or more conditions are true.
> Compound expressions support the use of parentheses ("()") and the following standard order of operations: () > && > ||.
> Quotas You can only use up to one wildcard selector in a property selector, and up to three wildcard selectors in a filter pattern with compound expressions.

## S60 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in space-delimited log events
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-term-space-delimited-log-events
fetched: 2026-11-26
> Characters between brackets ("[]") and double quotation marks ("") are considered single fields.
> To create a filter pattern that matches terms in a space-delimited log event, enclose the filter pattern in brackets ("[]"), and specify fields with names that are separated by commas (",").
> The following filter pattern parses seven fields.
> [ip=%127\.0\.0\.[1-9]%, user, username, timestamp, request =*.html*, status_code = 4*, bytes]
> If you don't know the number of fields that you're parsing in a space-delimited log event, you can use ellipsis (...) to reference any unnamed field.
> Elipsis can reference as many fields as needed.
> Use w1 to represent your first term and w2 and so on to represent the order of your subsequent terms.
> Example: Match terms in order The following space-delimited filter pattern returns log events where the first word in the log events is ERROR.
> When you create space-delimited filter patterns that use pattern matching, you must include a blank indicator after you specify the order of your terms.
> Place a not equal symbol ("!=") before the term or terms that you want to exclude.

## S61 Creating metrics from log events using filters — Concepts
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
fetched: 2026-11-26
> Metric filters define the terms and patterns to look for in log data as it is sent to CloudWatch Logs.
> CloudWatch Logs uses these metric filters to turn log data into numerical CloudWatch metrics that you can graph or set an alarm on.
> When you create a metric from a log filter, you can also choose to assign dimensions and a unit to the metric.
> If you specify a unit, be sure to specify the correct one when you create the filter.
> Changing the unit for the filter later will have no effect.
> Each metric filter is made up of the following key elements:
> The value reported to the metric filter during a period when logs are ingested but no matching logs are found.
> If you assign dimensions to a metric created by a metric filter, you can't assign a default value for that metric.
> The numerical value to publish to the metric each time a matching log is found.
> Filters do not retroactively filter data.
> Filters only publish the metric data points for events that happen after the filter was created.
> Metric filters are supported only for log groups in the Standard log class.
> If a log group with a subscription uses log transformation, the filter pattern is applied to the transformed versions of the log events.
> You can use any type of CloudWatch statistic, including percentile statistics, when viewing these metrics or setting alarms.
> Metric filters ensure at least one time delivery of log events to the specified metric, while duplicate deliveries may occasionally occur.

## S62 Search log data using filter patterns — Search log entries using the AWS CLI
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SearchDataFilterPattern.html#search-log-entries-cli
fetched: 2026-11-26
> You can search for log entries that meet a specified criteria using the AWS CLI.
> At a command prompt, run the following filter-log-events command.
> Use --filter-pattern to limit the results to the specified filter pattern and --log-stream-names to limit the results to the specified log streams.
> aws logs filter-log-events --log-group-name my-group [--log-stream-names LIST_OF_STREAMS_TO_SEARCH] [--filter-pattern VALID_METRIC_FILTER_PATTERN]
> When each search runs, it returns up to the first page of data found and a token to retrieve the next page of data or to continue searching.
> If you are using the AWS CLI, you can limit the search to just the log streams you are interested in.
> You can also pivot directly from your logs-extracted metrics to the corresponding logs.

## S63 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> Log group data is always encrypted in CloudWatch Logs.
> By default, CloudWatch Logs uses server-side encryption with 256-bit Advanced Encryption Standard Galois/Counter Mode (AES-GCM) to encrypt log data at rest.
> As an alternative, you can use AWS Key Management Service for this encryption.
> If you do, the encryption is done using an AWS KMS key.
> Encryption using AWS KMS is enabled at the log group level, by associating a KMS key with a log group, either when you create the log group or after it exists.

## S64 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> CloudWatch Logs supports only symmetric KMS keys.
> Do not use an asymmetric key to encrypt the data in your log groups.

## S65 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> After you associate a KMS key with a log group, all newly ingested data for the log group is encrypted using this key.
> This data is stored in encrypted format throughout its retention period.
> CloudWatch Logs decrypts this data whenever it is requested.
> CloudWatch Logs must have permissions for the KMS key whenever encrypted data is requested.
> If you later disassociate a KMS key from a log group, CloudWatch Logs encrypts newly ingested data using the CloudWatch Logs default encryption method.
> All previously ingested data that was encrypted with the KMS key remains encrypted with the KMS key.

## S66 Encrypt log data in CloudWatch Logs using AWS KMS — Limits
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encryption-limits
fetched: 2026-11-26
> To perform the following steps, you must have the following permissions: kms:CreateKey, kms:GetKeyPolicy, and kms:PutKeyPolicy.
> After you associate or disassociate a key from a log group, it can take up to five minutes for the operation to take effect.
> If you revoke CloudWatch Logs access to an associated key or delete an associated KMS key, your encrypted data in CloudWatch Logs can no longer be retrieved.
> You can't associate a KMS key with an existing log group using the CloudWatch console.

## S67 Encrypt log data in CloudWatch Logs using AWS KMS — Step 2: Set permissions on the KMS key
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-lg
fetched: 2026-11-26
> By default, all AWS KMS keys are private.
> Only the resource owner can use it to encrypt and decrypt data.
> However, the resource owner can grant permissions to access the KMS key to other users and resources.
> With this step, you give the CloudWatch Logs service principal and the caller role permission to use the key.
> This service principal must be in the same AWS Region where the KMS key is stored.
> As a best practice, we recommend that you restrict the use of the KMS key to only those AWS accounts or log groups you specify.

## S68 Encrypt log data in CloudWatch Logs using AWS KMS — Permissions for associating a KMS key with a log group
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-association
fetched: 2026-11-26
> The IAM principal that calls CreateLogGroup with a kmsKeyId parameter, or calls AssociateKmsKey, must have kms:DescribeKey permission on the specified KMS key.
> If the caller does not have this permission, the API call will fail with an AccessDeniedException.

## S69 Encrypt log data in CloudWatch Logs using AWS KMS — Permissions for reading and writing encrypted log data
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-readwrite
fetched: 2026-11-26
> If the IAM principal also needs to read or write encrypted log data (for example, calling PutLogEvents, GetLogEvents, FilterLogEvents, or StartQuery on a log group encrypted with a customer managed KMS key), the principal needs additional AWS KMS permissions.

## S70 Encrypt log data in CloudWatch Logs using AWS KMS — AWS KMS keys and encryption context
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms-policy
fetched: 2026-11-26
> To enhance the security of your AWS Key Management Service keys and your encrypted log groups, CloudWatch Logs now puts log group ARNs as part of the encryption context used to encrypt your log data.
> Encryption context is a set of key-value pairs that are used as additional authenticated data.
> The encryption context enables you to use IAM policy conditions to limit access to your AWS KMS key by AWS account and log group.
> We recommend that you use different KMS keys for each of your encrypted log groups.

## S71 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS)
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
fetched: 2026-11-26
> By default, the log files and digest files delivered by CloudTrail to your bucket are encrypted by using server-side encryption with a KMS key (SSE-KMS).
> If you don't enable SSE-KMS encryption, your log files and digest files are encrypted using SSE-S3 encryption.
> To use SSE-KMS with CloudTrail, you create and manage a AWS KMS key.
> You attach a policy to the key that determines which users can use the key for encrypting and decrypting CloudTrail log files and digest files.
> By default, event data stores are encrypted by CloudTrail.
> You have the option to use your own KMS key for encryption when you create or update an event data store.

## S72 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS)
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
fetched: 2026-11-26
> If you're using an existing S3 bucket with an S3 bucket Key, CloudTrail must be allowed permission in the key policy to use the AWS KMS actions GenerateDataKey and DescribeKey.
> If cloudtrail.amazonaws.com is not granted those permissions in the key policy, you cannot create or update a trail.
> The KMS key that you choose must be created in the same AWS Region as the Amazon S3 bucket that receives your log files and digest files.

## S73 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Enabling log file encryption
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms-enabling
fetched: 2026-11-26
> Be sure to include decrypt permissions in the policy for all users who need to read log files or digest files.
> If you do not perform this step before adding the key to your trail configuration, users without decrypt permissions cannot read encrypted files until you grant them those permissions.
> Add policy sections to the key that enable CloudTrail to encrypt and users to decrypt log files and digest files.
> Update your trail or event data store to use the KMS key whose policy you modified for CloudTrail.

## S74 Configuring default encryption — Configuring default encryption
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html#default-bucket-encryption
fetched: 2026-11-26
> Amazon S3 buckets have bucket encryption enabled by default, and new objects are automatically encrypted by using server-side encryption with Amazon S3 managed keys (SSE-S3).
> If you need more control over your encryption keys, such as managing key rotation and access policy grants, you can elect to use server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS), or dual-layer server-side encryption with AWS KMS keys (DSSE-KMS).
> When you set default bucket encryption to SSE-KMS, you can also configure an S3 Bucket Key to reduce your AWS KMS request costs.
> Server-side encryption with customer-provided keys (SSE-C) is not supported for default encryption.

## S75 Configuring default encryption — Configuring default encryption (変更の注意: サーバアクセスログの送り先)
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html#default-bucket-encryption
fetched: 2026-11-26
> If this bucket is used as a destination for server access logging, the destination bucket must use Amazon S3 managed keys (SSE-S3).
> If the destination bucket uses SSE-KMS default encryption, Amazon S3 might deliver log objects that are encrypted with a key that you can't access.
> To resolve this, change the destination bucket's default encryption to SSE-S3.
> Objects uploaded before default encryption was enabled will not be encrypted.

### 覆えなかった行
- Encryption options: in-transit（転送中）のログとメトリクスの暗号化（client-side / server-side の区別）は、今回取った 11 ページの原文に無い。
- Skills「Creating CloudWatch metric streams」の Kinesis Data Firehose 以外の細かい設定（S3 の形式など）は、metric streams の設定ページ（CloudWatch-metric-streams-setup.html）を取ったが原文を写していない。必要なら次の回で写す。
- Skills「Searching log data by using filter and pattern syntax」の、フィルターパターンの書き方そのもの（構文の表）は、今回の原文に無い（S7 は metric filter の概要と Logs Insights への案内だけ）。
- Skills「Processing log data ... Amazon Kinesis」の Kinesis Data Streams の作成手順・Lambda 関数の例は写していない（S12・S13 で選び方と流量の注意だけ）。
