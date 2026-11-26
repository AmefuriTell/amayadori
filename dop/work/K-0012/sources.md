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

### 覆えなかった行
- K（knowledge）「Common CloudWatch metrics and logs」: 業務の例（EC2 の CPU 使用率、RDS の queue 長、ALB の 5xx）の指標名の段落は取った raw に無い。S5 は名前空間の表だけ。
- K「Amazon Inspector and common assessment templates」: Inspector 本体（ユーザーガイド）と assessment templates のページは取れなかった。S17 は Config の検査ルールだけ。
- S（skill）「Building CloudWatch dashboards and Amazon Quick Sight visualizations」: Amazon Quick Sight のページは取れなかった（S6 は CloudWatch のダッシュボードだけ）。
