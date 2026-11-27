## S0 Amazon X-Ray — SDK と Daemon の保守モードの告知（Lambda and X-Ray の注記）
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html#xray-services-lambda
fetched: 2026-11-27
> On February 25th, 2026, the AWS X-Ray SDKs/Daemon will enter maintenance mode, where AWS will limit X-Ray SDK and Daemon releases to address security issues only.
> We recommend to migrate to OpenTelemetry.

## S1 Using CloudWatch anomaly detection — Using CloudWatch anomaly detection
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection
fetched: 2026-11-27
> When you enable anomaly detection for a metric, CloudWatch applies statistical and machine learning algorithms.
> Create anomaly detection alarms based on a metric's expected value. These types of alarms don't have a static threshold for determining alarm state.

## S2 Using CloudWatch anomaly detection — How CloudWatch anomaly detection works
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
fetched: 2026-11-27
> The machine learning model is specific to a metric and a statistic.
> After you enable anomaly detection on a metric, you can choose to exclude specified time periods of the metric from being used to train the model.

## S3 Create a CloudWatch alarm based on a metric math expression — Create a CloudWatch alarm based on a metric math expression
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create-alarm-on-metric-math-expression.html#Create-alarm-on-metric-math-expression
fetched: 2026-11-27
> Metric alarms are designed to evaluate time series that you define from either a single metric, or a metric math expression that combines or transforms one or more metrics into a time series that deliver insights more closely aligned to your unique needs.
> You can't create an alarm based on the SEARCH expression. Only alarms based on Metrics Insights SQL queries can operate on multiple time series.

## S4 Stop, terminate, reboot, or recover an EC2 instance — Using CloudWatch alarm actions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-27
> Using Amazon CloudWatch alarm actions, you can create alarms that automatically stop, terminate, reboot, or recover your EC2 instances.
> You can use the stop or terminate actions to help you save money when you no longer need an instance to be running.

## S5 AWS services that publish CloudWatch metrics — Namespaces
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html#aws-services-cloudwatch-metrics
fetched: 2026-11-27
> You can use the following table to learn which AWS services publish metrics to CloudWatch.
> Amazon EC2 AWS/EC2 Monitoring Your Instances Using CloudWatch
> Elastic Load Balancing AWS/ApplicationELB CloudWatch Metrics for your Application Load Balancer
> Amazon Relational Database Service AWS/RDS Monitoring Amazon RDS metrics with Amazon CloudWatch

## S6 Using Amazon CloudWatch dashboards — Using Amazon CloudWatch dashboards
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
fetched: 2026-11-27
> Amazon CloudWatch includes automatic pre-built dashboards and also enables you to create your own dashboards.
> Dashboards help you to monitor your resources in a single view, even those resources that are spread across different Regions.
> If you have multiple AWS accounts, you can set up CloudWatch cross-account observability and then create rich cross-account dashboards in your monitoring accounts.

## S7 CloudWatch Logs Insights language query syntax — Query syntax
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-27
> To create queries that contain multiple commands, separate the commands with the pipe character (|).
> anomaly Identifies unusual patterns in your log data using machine learning.
> filter Filters the query to return only the log events that match one or more conditions.

## S8 Use partition projection with Amazon Athena — Use partition projection with Amazon Athena
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection
fetched: 2026-11-27
> You can use partition projection in Athena to speed up query processing of highly partitioned tables and automate partition management.

## S9 What is Amazon Kinesis Data Streams? — What is Amazon Kinesis Data Streams?
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-27
> You can use Amazon Kinesis Data Streams to collect and process large streams of data records in real time.
> A stream consumer reads the records of a shard in order, which suits stateful processing, where processing one record depends on the records before it, for use cases such as live analytics, personalization, and anomaly and pattern detection.
> A queue consumer receives each record independently, which suits stateless processing, for use cases such as microservice integration, order processing, and per-record inference.

## S10 Log group-level subscription filters — Log group-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-27
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip format.

## S11 AWS Lambda and AWS X-Ray — AWS Lambda and AWS X-Ray
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html#xray-services-lambda
fetched: 2026-11-27
> You can use AWS X-Ray to trace your AWS Lambda functions.
> Lambda runs the X-Ray daemon and records a segment with details about invoking and running the function.
> For further instrumentation, you can bundle the X-Ray SDK with your function to record outgoing calls and add annotations and metadata.

## S12 Amazon API Gateway active tracing support for AWS X-Ray — Amazon API Gateway active tracing support for AWS X-Ray
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html#xray-services-apigateway
fetched: 2026-11-27
> Amazon API Gateway provides active tracing support for AWS X-Ray. Enable active tracing on your API stages to sample incoming requests and send traces to X-Ray.
> X-Ray only supports tracing for REST APIs through API Gateway.

## S13 Running the X-Ray daemon on Amazon ECS — Running the X-Ray daemon on Amazon ECS
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html#xray-daemon-ecs
fetched: 2026-11-27
> In Amazon ECS, create a Docker image that runs the X-Ray daemon, upload it to a Docker image repository, and then deploy it to your Amazon ECS cluster.
> X-Ray provides a Docker container image on Amazon ECR that you can deploy alongside your application.

## S14 Configuring sampling rules — Configuring sampling rules
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling
fetched: 2026-11-27
> You can use the AWS X-Ray console to configure sampling rules for your services.
> The AWS Distro for OpenTelemetry, X-Ray SDK, and AWS services that support active tracing with sampling configurations use sampling rules to determine which requests to record.

## S15 What Is AWS Config? — What Is AWS Config?
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-27
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account.
> This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time.

## S16 Evaluating Resources with AWS Config Rules — Evaluating Resources with AWS Config Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html#evaluate-config
fetched: 2026-11-27
> Use AWS Config to evaluate the configuration settings of your AWS resources.
> You do this by creating AWS Config rules, which represent your ideal configuration settings.
> AWS Config provides customizable, predefined rules called managed rules to help you get started.

## S17 inspector-ec2-scan-enabled — inspector-ec2-scan-enabled
url: https://docs.aws.amazon.com/config/latest/developerguide/inspector-ec2-scan-enabled.html#inspector-ec2-scan-enabled
fetched: 2026-11-27
> Checks if Amazon Inspector V2 EC2 scanning is activated for your single or multi-account environment to detect potential vulnerabilities and network reachability issues on your EC2 instances.
> The rule is NON_COMPLIANT if EC2 scanning is not activated.

## S18 How CloudTrail works — CloudTrail Event history
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/how-cloudtrail-works.html#how-cloudtrail-works-eventhistory
fetched: 2026-11-27
> The Event history provides a viewable, searchable, downloadable, and immutable record of the past 90 days of recorded management events in an AWS Region.
> For an ongoing record of events in your AWS account past 90 days, create a trail or a CloudTrail Lake event data store.

## S19 Sending events to CloudWatch Logs — Sending events to CloudWatch Logs
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cw_send_ct_events.html#send-cloudtrail-events-to-cloudwatch-logs
fetched: 2026-11-27
> When you configure your trail to send events to CloudWatch Logs, CloudTrail sends only the events that match your trail settings.
> CloudTrail supports sending data, Insights, and management events to CloudWatch Logs.

## S20 Using Amazon CloudWatch dashboards — Using Amazon CloudWatch dashboards
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
fetched: 2026-11-25
> Amazon CloudWatch includes automatic pre-built dashboards and also enables you to create your own dashboards.
> Dashboards help you to monitor your resources in a single view, even those resources that are spread across different Regions.
> You can use CloudWatch dashboards to create customized views of the telemetry data for your AWS resources.
> If you have multiple AWS accounts, you can set up CloudWatch cross-account observability and then create rich cross-account dashboards in your monitoring accounts.
> You can seamlessly search, visualize, and analyze your metrics, logs, and traces without account boundaries.
> With CloudWatch cross-account observability, you can do the following in a dashboard in a monitoring account:
> Search, view, and create graphs of metrics that reside in source accounts. A single graph can include metrics from multiple accounts.
> Create alarms in the monitoring account that watch metrics in source accounts.
> View the log events from log groups located in source accounts, and run CloudWatch Logs Insights queries of log groups in source accounts.
> A single CloudWatch Logs Insights query in a monitoring account can query multiple log groups in multiple source accounts at once.

## S21 Using Amazon CloudWatch dashboards — Create a cross-account cross-Region dashboard programmatically
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#create_xaxr_dashboard_API
fetched: 2026-11-25
> You can use the AWS APIs and SDKs to create dashboards programmatically.
> To enable cross-account cross-Region dashboards, we have added new parameters to the dashboard body structure, as shown in the following table and examples.
> This example sets the accountId field to the ID of the sharing account at the widget level.
> This specifies that all metrics in this widget will come from that sharing account and Region.
> This example sets the accountId field differently at the level of each metric.
> In this example, the different metrics in this metric math expression come from different sharing accounts and different Regions.
> This example is for a CloudWatch Logs Insights widget.
> Another way to create dashboards programmatically is to first create one in the AWS Management Console, and then copy the JSON source of this dashboard.

## S22 Dashboard Body Structure and Syntax — Properties of a Log Widget Object
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Dashboard-Body-Structure.html#CloudWatch-Dashboard-Properties-Log-Widget-Object
fetched: 2026-11-25
> A widget of type log represents the results of a CloudWatch Logs Insights query.
> The account ID of the AWS account containing the logs, if this is a cross-account query.
> The query string starts with the names of the log groups that are to be queried.
> You must pre-pend each log group name with SOURCE.
> Separate multiple log groups with a pipe character (|).
> Add another pipe character after the list of log groups, and then specify the query syntax.
> Specify table to view the results as a table.
> If you omit this parameter, the results are displayed as a table.

## S23 CloudWatch cross-account observability — CloudWatch cross-account observability
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
fetched: 2026-11-25
> With Amazon CloudWatch cross-account observability, you can monitor and troubleshoot applications that span multiple accounts within a Region.
> A monitoring account is a central AWS account that can view and interact with observability data generated from source accounts.
> Source accounts share their observability data with the monitoring account.
> Metrics in Amazon CloudWatch. You can choose to share the metrics from all namespaces with the monitoring account, or filter to a subset of namespaces.
> Log groups in Amazon CloudWatch Logs. You can choose to share all log groups with the monitoring account, or filter to a subset of log groups.

## S24 Creating a CloudWatch cross-account cross-Region dashboard with the AWS Management Console — Creating a CloudWatch cross-account cross-Region dashboard with the AWS Management Console
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create_xaxr_dashboard.html#create_xaxr_dashboard
fetched: 2026-11-25
> You can create cross-account cross-Region dashboards, which summarize your CloudWatch data from multiple AWS accounts and multiple Regions into one dashboard.
> Before you can create a cross-account cross-Region dashboard, you must enable at least one sharing account and at least one monitoring account.
> As you create your dashboard, you can include widgets from multiple accounts and Regions.
> Widgets include graphs, alarms, and CloudWatch Logs Insights widgets.

## S25 Metrics concepts — Resolution
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Resolution_definition
fetched: 2026-11-26
> When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds. If you set an alarm on a high-resolution metric, you can specify a high-resolution alarm with a period of 10 seconds or 30 seconds, or you can set a regular alarm with a period of any multiple of 60 seconds. There is a higher charge for high-resolution alarms with a period of 10 or 30 seconds.

## S26 Metrics concepts — Dimension combinations
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#dimension-combinations
fetched: 2026-11-26
> CloudWatch treats each unique combination of dimensions as a separate metric, even if the metrics have the same metric name. You can only retrieve statistics using combinations of dimensions that you specifically published. When you retrieve statistics, specify the same values for the namespace, metric name, and dimension parameters that were used when the metrics were created.

## S27 Metrics concepts — Percentiles
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
fetched: 2026-11-26
> Some CloudWatch metrics support percentiles as a statistic. For these metrics, you can monitor your system and applications using percentiles as you would when using the other CloudWatch statistics (Average, Minimum, Maximum, and Sum). For example, when you create an alarm, you can use percentiles as the statistical function. Percentile statistics are available for custom metrics as long as you publish the raw, unsummarized data points for your custom metric. Percentile statistics are not available for metrics when any of the metric values are negative numbers.

## S28 Create a CloudWatch alarm based on a metric math expression — Create-alarm-on-metric-math-expression
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create-alarm-on-metric-math-expression.html#Create-alarm-on-metric-math-expression
fetched: 2026-11-26
> Metric alarms are designed to evaluate time series that you define from either a single metric, or a metric math expression that combines or transforms one or more metrics into a time series that deliver insights more closely aligned to your unique needs. To create an alarm based on a metric math expression, choose one or more CloudWatch metrics to use in the expression. Then, specify the expression, threshold, and evaluation periods. You can't create an alarm based on the SEARCH expression. The expression that you choose for the alarm must produce a single time series and show only one line on the graph.

## S29 Stop, terminate, reboot, or recover an EC2 instance — UsingAlarmActions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-26
> You can add the stop, terminate, or reboot, actions to any alarm that is set on an Amazon EC2 per-instance metric, including basic and detailed monitoring metrics provided by Amazon CloudWatch (in the AWS/EC2 namespace), in addition to any custom metrics that include the "InstanceId=" dimension, as long as the InstanceId value refers to a valid running Amazon EC2 instance. You can also add the recover action to alarms that is set on any Amazon EC2 per-instance metric except for StatusCheckFailed_Instance. The main difference between using the stop and the terminate alarm actions is that you can easily restart a stopped instance if you need to run it again later.

## S30 Stop, terminate, reboot, or recover an EC2 instance — Adding recover actions to Amazon CloudWatch alarms
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRecoverActions
fetched: 2026-11-26
> The recover action can be used only with StatusCheckFailed_System, not with StatusCheckFailed_Instance. The recover action is supported only on some instance types.

## S31 X-Ray SDK and Daemon Support timeline — Maintenance mode
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-daemon-timeline.html
fetched: 2026-11-26
> AWS will limit X-Ray SDK and Daemon releases to address security issues only. The SDKs/Daemon will not receive new feature enhancements. We recommend that you migrate to OpenTelemetry solutions for instrumenting your application and sending traces to AWS X-Ray.

## S32 AWS Lambda and AWS X-Ray — AWS Lambda and AWS X-Ray
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html#xray-services-lambda
fetched: 2026-11-26
> You can use AWS X-Ray to trace your AWS Lambda functions. If your Lambda function is called by another instrumented service, Lambda traces requests that have already been sampled without any additional configuration. If your Lambda function runs on a schedule, or is invoked by a service that is not instrumented, you can configure Lambda to sample and record invocations with active tracing. Under AWS X-Ray, enable Active tracing. On runtimes with a corresponding X-Ray SDK, Lambda also runs the X-Ray daemon. To use the X-Ray SDK on Lambda, bundle it with your function code each time you create a new version. The primary difference is that you don't use the SDK to instrument incoming requests, make sampling decisions, and create segments.

## S33 Visualize Lambda Event Function invocations using AWS X-Ray — Active tracing and permissions
url: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray
fetched: 2026-11-26
> If you've enabled Active tracing for your Event Function, Lambda automatically sends traces to X-Ray for sampled requests. Your Event Function needs permission to upload trace data to X-Ray. When you activate tracing in the Lambda console, Lambda adds the required permissions to your Event Function's execution role. Otherwise, add the AWSXRayDaemonWriteAccess policy to the execution role. X-Ray doesn't trace all requests to your application. The sampling rate is 1 request per second and 5 percent of additional requests. You can't configure the X-Ray sampling rate for your functions.

> If you do not have Active tracing turned on, Lambda defaults to PassThrough tracing mode. In PassThrough mode, Lambda forwards the X-Ray tracing header to downstream services, but does not send traces automatically. Lambda needs the following permissions to send trace data to X-Ray. Add them to your Event Function's execution role. These permissions are included in the AWSXRayDaemonWriteAccess managed policy. If your solution depends on this passive tracing behavior, switch to Active tracing.

> The following example AWS CLI command enables active tracing on a function named my-function. Tracing mode is part of the version-specific configuration when you publish a version of your function. You can't change the tracing mode on a published version.

## S34 Amazon API Gateway active tracing support for AWS X-Ray — Enabling active tracing on a stage
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html#xray-services-apigateway
fetched: 2026-11-26
> Amazon API Gateway provides active tracing support for AWS X-Ray. Enable active tracing on your API stages to sample incoming requests and send traces to X-Ray. On the Logs/Tracing tab, choose Enable X-Ray Tracing and then choose Save Changes. To redeploy the API with the new settings, choose the Actions dropdown, and then choose Deploy API. API Gateway uses sampling rules that you define in the X-Ray console to determine which requests to record. X-Ray only supports tracing for REST APIs through API Gateway. If active tracing is disabled, the stage still records a segment if the request comes from a service that sampled the request and started a trace. For all incoming requests, API Gateway adds a tracing header to incoming HTTP requests that don't already have one.

## S35 Running the X-Ray daemon on Amazon ECS — Daemon as a container in an ECS task
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html#xray-daemon-ecs
fetched: 2026-11-26
> In Amazon ECS, create a Docker image that runs the X-Ray daemon, upload it to a Docker image repository, and then deploy it to your Amazon ECS cluster. You can use port mappings and network mode settings in your task definition file to allow your application to communicate with the daemon container. X-Ray provides a Docker container image on Amazon ECR that you can deploy alongside your application. Add managed policies to your task role to grant the daemon permission to upload trace data to X-Ray.

## S36 Configuring sampling rules — Sampling rules for ADOT and the X-Ray SDK
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling
fetched: 2026-11-26
> You can use the AWS X-Ray console to configure sampling rules for your services. The AWS Distro for OpenTelemetry, X-Ray SDK, and AWS services that support active tracing with sampling configurations use sampling rules to determine which requests to record. Sampling rules tell the AWS Distro for OpenTelemetry (ADOT) or X-Ray SDK how many requests to record for a set of criteria. By default, the SDK records the first request each second, and five percent of any additional requests. The AWS Distro for OpenTelemetry (ADOT) and X-Ray SDK requires additional configuration to use sampling rules that you configure in the console. For API Gateway, see Amazon API Gateway active tracing support for AWS X-Ray.

> Instrument AWS Distro for OpenTelemetry on compute platforms – When using compute platforms such as Amazon EC2, Amazon ECS, or AWS Elastic Beanstalk, sampling is supported when the application has been instrumented with the latest AWS Distro for OpenTelemetry or X-Ray SDK.

## S37 Real-time processing of log data with subscriptions — Real-time processing of log data with subscriptions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> You can use subscriptions to get access to a real-time feed of log events from CloudWatch Logs and have it delivered to other services such as an Amazon Kinesis stream, an Amazon Data Firehose stream, or AWS Lambda for custom processing, analysis, or loading to other systems. When log events are sent to the receiving service, they are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field. Amazon Kinesis Data Streams records contain the gzip bytes; the AWS CLI and AWS Lambda event sources display them base64 encoded.

## S38 Real-time processing of log data with subscriptions — Subscription filters and delivery time
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> To begin subscribing to log events, create the receiving resource, such as a Amazon Kinesis Data Streams stream, where the events will be delivered. A subscription filter defines the filter pattern to use for filtering which log events get delivered to your AWS resource, as well as information about where to send matching log events to. Log events are sent to the receiving resource soon after being ingested, usually less than three minutes.

## S39 Real-time processing of log data with subscriptions — Account-level and log group-level limits
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> You can create subscriptions at the account level and at the log group level. Each account can have one account-level subscription filter per Region. Each log group can have up to five subscription filters associated with it.

## S40 Real-time processing of log data with subscriptions — Retries and disabled period
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> If the destination service returns a retryable error such as a throttling exception or a retryable service exception (HTTP 5xx for example), CloudWatch Logs continues to retry delivery for up to 24 hours. CloudWatch Logs doesn't try to re-deliver if the error is a non-retryable error, such as AccessDeniedException or ResourceNotFoundException. In these cases the subscription filter is disabled for up to 10 minutes, and then CloudWatch Logs retries sending logs to the destination. During this disabled period, logs are skipped.

## S41 Real-time processing of log data with subscriptions — Delivery guarantee
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-26
> Subscription filters ensure at least one time delivery of events, while duplicate events may occasionally occur.

## S42 Log group-level subscription filters — Supported destinations
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-26
> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service. Logs sent to a service through a subscription filter are compressed with the gzip format. AWS Lambda receives the data base64 encoded in the awslogs.data field.

## S43 Example 1: Subscription filters with Amazon Kinesis Data Streams — Before you create the stream
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Before you create the stream, calculate the volume of log data that will be generated. Be sure to create a stream with enough shards to handle this volume. If the stream does not have enough shards, the log stream will be throttled. For more information about stream volume limits, see Quotas and Limits. Throttled deliverables are retried for up to 24 hours. After 24 hours, the failed deliverables are dropped.

## S44 Example 1: Subscription filters with Amazon Kinesis Data Streams — Reducing throttling
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Specify random for distribution when you create the subscription filter with PutSubscriptionFilter or put-subscription-filter. By default, the stream filter distribution is by log stream and this can cause throttling.

## S45 Example 1: Subscription filters with Amazon Kinesis Data Streams — Monitoring throttling
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> Monitor your stream using CloudWatch metrics. This helps you identify any throttling and adjust your configuration accordingly. For example, the DeliveryThrottling metric can be used to track the number of log events for which CloudWatch Logs was throttled when forwarding data to the subscription destination.

## S46 Example 1: Subscription filters with Amazon Kinesis Data Streams — Record format
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
fetched: 2026-11-26
> The Data attribute in a Amazon Kinesis Data Streams record is base64 encoded and compressed with the gzip format. You can examine the raw data from the command line using the following Unix commands:

## S47 Cross-account cross-Region subscriptions — Cross-account data sharing
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> You can collaborate with an owner of a different AWS account and receive their log events on your AWS resources, such as an Amazon Kinesis or Amazon Data Firehose stream (this is known as cross-account data sharing). For example, this log event data can be read from a centralized Amazon Kinesis Data Streams or Firehose stream to perform custom processing and analysis. Custom processing is especially useful when you collaborate and analyze data across many accounts.

## S48 Cross-account cross-Region subscriptions — Same Region for log group and destination
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> The log group and the destination must be in the same AWS Region. However, the AWS resource that the destination points to can be located in a different Region.

## S49 Cross-account cross-Region subscriptions — Centralized logs and system fields
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
fetched: 2026-11-26
> If you have configured AWS Organizations and are working with member accounts you can use log centralization to collect log data from source accounts into a central monitoring account.

## S50 What is Amazon Kinesis Data Streams? — What can I do with Kinesis Data Streams?
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#use-service-for-what
fetched: 2026-11-26
> You can have producers push data directly into a stream. For example, push system and application logs and they are available for processing in seconds. This prevents the log data from being lost if the front end or application server fails. Kinesis Data Streams provides accelerated data feed intake because you don't batch the data on the servers before you submit it for intake.

## S51 What is Amazon Kinesis Data Streams? — Benefits of using Kinesis Data Streams
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#using-the-service
fetched: 2026-11-26
> Kinesis Data Streams durably stores the records your producers write and makes them available for consumption in real time. The delay between the time a record is put into the stream and the time it can be retrieved is typically less than 1 second.

## S52 What is Amazon Kinesis Data Streams? — Stream consumers and queue consumers
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-26
> A stream consumer reads the records of a shard in order, which suits stateful processing, where processing one record depends on the records before it, for use cases such as live analytics, personalization, and anomaly and pattern detection. Each shard is processed by one stream consumer instance at a time, which preserves the order of the records in that shard so that the stream consumer can keep an accurate state.

## S53 What is Amazon Data Firehose? — What is Amazon Data Firehose?
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
fetched: 2026-11-26
> Amazon Data Firehose is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch Serverless, Splunk, Apache Iceberg Tables, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, Coralogix, and Elastic. With Amazon Data Firehose, you don't need to write applications or manage resources. You configure your data producers to send data to Amazon Data Firehose, and it automatically delivers the data to the destination that you specified.

## S54 What is Amazon Data Firehose? — Buffer size and buffer interval
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#key-concepts
fetched: 2026-11-26
> Amazon Data Firehose buffers incoming streaming data to a certain size or for a certain period of time before delivering it to destinations. Buffer Size is in MBs and Buffer Interval is in seconds.

## S55 Analyzing log data with CloudWatch Logs Insights — Analyzing log data with CloudWatch Logs Insights
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
fetched: 2026-11-26
> With CloudWatch Logs Insights, you can interactively search and analyze your log data in Amazon CloudWatch Logs. You can perform queries to help you more efficiently and effectively respond to operational issues.
> In addition to querying using log groups, you can query using facets, data source, and data type. If an issue occurs, you can use CloudWatch Logs Insights to identify potential causes and validate deployed fixes.
> Automatic discovery of log fields in logs from AWS services such as Amazon Route 53, AWS Lambda, AWS CloudTrail, and Amazon VPC, and any application or custom log that emits log events as JSON.
> Creating field indexes to reduce costs and speed results, especially for queries of large number of log groups or log events.

## S56 Analyzing log data with CloudWatch Logs Insights — Analyzing log data with CloudWatch Logs Insights (quotas, charges, multiple log groups)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
fetched: 2026-11-26
> You are limited to 100 concurrent CloudWatch Logs Insights QL per account, including queries added to dashboards.
> Queries using any of the supported query languages time out after 60 minutes, if they have not completed. Query results are available for 7 days.
> CloudWatch Logs Insights queries incur charges based on the amount of uncompressed log data scanned, regardless of query language.
> If you are signed in to an account set up as a monitoring account in CloudWatch cross-account observability, you can run CloudWatch Logs Insights queries on log groups in source accounts linked to this monitoring account.
> You can run a query that queries multiple log groups located in different accounts.
> CloudWatch Logs Insights can't access log events with timestamps that pre-date the creation time of the log group.

## S57 CloudWatch Logs Insights language query syntax — CloudWatch Logs Insights language query syntax (ベストプラクティス)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-26
> Select only the necessary log groups for each query.
> Always specify the narrowest possible time range for your queries.
> When you add a CloudWatch Logs Insights widget to a dashboard, ensure that the dashboard is not refreshing at a high frequency, because each refresh starts a new query.
> To create queries that contain multiple commands, separate the commands with the pipe character (|).
> To create queries that contain comments, set off the comments with the hash character (#).
> CloudWatch Logs Insights automatically discovers fields for different log types and generates fields that start with the @ character.

## S58 CloudWatch Logs Insights language query syntax — CloudWatch Logs Insights language query syntax (command table)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-26
> fields Displays specific fields in query results and supports functions and operations you can use to modify field values and create new fields to use in your query.
> filter Filters the query to return only the log events that match one or more conditions.
> parse Extracts data from a log field to create an extracted field that you can process in your query. parse supports both glob mode using wildcards, and regular expressions.
> sort Displays the returned log events in ascending (asc) or descending (desc) order.
> stats Calculate aggregate statistics using values in the log fields.
> limit Specifies a maximum number of log events that you want your query to return. Useful with sort to return "top 20" or "most recent 20" results. Use limit any to stop scanning early once enough results are found.

## S59 Save and re-run CloudWatch Logs Insights queries — Save and re-run CloudWatch Logs Insights queries
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_Insights-Saving-Queries.html#CWL_Insights-Saving-Queries
fetched: 2026-11-26
> After you create a query, you can save it, and run it again later. Queries are saved in a folder structure, so you can organize them. You can save as many as 1000 queries per region and per account.
> Queries are saved on a Region-specific level, not a user-specific level. If you create and save a query, other users with access to CloudWatch Logs in the same Region can see all saved queries and their folder structures in the Region.
> To save a query, you must be logged into a role that has the permission logs:PutQueryDefinition. To see a list of your saved queries, you must be logged into a role that has the permissionlogs:DescribeQueryDefinitions.
> Queries with parameters can be run by using the query name with a $ prefix and passing the parameter names as key-value pairs.

## S60 Use partition projection with Amazon Athena — Use partition projection with Amazon Athena
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection
fetched: 2026-11-26
> You can use partition projection in Athena to speed up query processing of highly partitioned tables and automate partition management.
> Because in-memory operations are often faster than remote operations, partition projection can reduce the runtime of queries against highly partitioned tables.

## S61 Use partition projection with Amazon Athena — Understand partition pruning vs. partition projection
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection-pruning-vs-projection
fetched: 2026-11-26
> Normally, when processing queries, Athena makes a GetPartitions call to the AWS Glue Data Catalog before performing partition pruning.
> Partition projection allows Athena to avoid calling GetPartitions because the partition projection configuration gives Athena all of the necessary information to build the partitions itself.

## S62 Use partition projection with Amazon Athena — Considerations and limitations
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection-considerations-and-limitations
fetched: 2026-11-26
> When you enable partition projection on a table, Athena ignores any partition metadata in the AWS Glue Data Catalog or external Hive metastore for that table.
> Partition projection is usable only when the table is queried through Athena.
> If more than half of your projected partitions are empty, it is recommended that you use traditional partitions.

## S63 Query Amazon VPC flow logs — Query Amazon VPC flow logs
url: https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html#vpc-flow-logs
fetched: 2026-11-26
> Amazon Virtual Private Cloud flow logs capture information about the IP traffic going to and from network interfaces in a VPC. Use the logs to investigate network traffic patterns and identify threats and risks across your VPC network.
> Before you begin querying the logs in Athena, enable VPC flow logs, and configure them to be saved to your Amazon S3 bucket. After you create the logs, let them run for a few minutes to collect some data. The logs are created in a GZIP compression format that Athena lets you query directly.

## S64 Query Amazon VPC flow logs — Considerations and limitations
url: https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html#vpc-flow-logs-common-considerations
fetched: 2026-11-26
> Use the names in the flow log records for the column names in Athena.
> Replace the hyphens in the Amazon VPC log field names with underscores in the Athena column names.
> Escape the flow log record names that are reserved keywords in Athena by enclosing them with backticks.
> VPC flow logs are AWS account specific. When you publish your log files to Amazon S3, the path that Amazon VPC creates in Amazon S3 includes the ID of the AWS account that was used to create the flow log.

### 覆えなかった行
- K（knowledge）「Common CloudWatch metrics and logs」: 業務の例（EC2 の CPU 使用率、RDS の queue 長、ALB の 5xx）の指標名の段落は取った raw に無い。S5 は名前空間の表だけ。
- K「Amazon Inspector and common assessment templates」: Inspector 本体（ユーザーガイド）と assessment templates のページは取れなかった。S17 は Config の検査ルールだけ。
- S（skill）「Building CloudWatch dashboards and Amazon Quick Sight visualizations」: Amazon Quick Sight のページは取れなかった（S6 は CloudWatch のダッシュボードだけ）。
