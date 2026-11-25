## S1 Logging data events - AWS CloudTrail — Logging data events
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events-with-cloudtrail
fetched: 2026-11-26
> By default, trails and event data stores do not log data events. Additional charges apply for data events. For more information, see AWS CloudTrail Pricing.
> Data events provide information about the resource operations performed on or in a resource. These are also known as data plane operations. Data events are often high-volume activities.
> Example data events include:
> Amazon S3 object-level API activity (for example, GetObject, DeleteObject, and PutObject API operations) on objects in S3 buckets.
> AWS Lambda function execution activity (the Invoke API).
> You can use advanced event selectors to create fine-grained selectors, which help you control costs by only logging the specific events of interest for your use cases.

## S2 Logging data events - AWS CloudTrail — Data events
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html#logging-data-events
fetched: 2026-11-26
> For trails, you can use basic or advanced event selectors to log data events for Amazon S3 objects in general purpose buckets, Lambda functions, and DynamoDB tables (shown in the first three rows of the table). You can use only advanced event selectors to log the resource types shown in the remaining rows.
> For event data stores, you can use only advanced event selectors to include data events.

## S3 Logging IP traffic using VPC Flow Logs - Amazon Virtual Private Cloud — Logging IP traffic using VPC Flow Logs
url: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
fetched: 2026-11-26
> VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC.
> Flow log data can be published to the following locations: Amazon CloudWatch Logs, Amazon S3, or Amazon Data Firehose.

## S4 Flow logs basics - Amazon Virtual Private Cloud — Flow logs basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-basics.html#flow-logs-basics
fetched: 2026-11-26
> You can create a flow log for a VPC, a subnet, or a network interface.
> To create a flow log, you specify:
> The resource for which to create the flow log
> The type of traffic to capture (accepted traffic, rejected traffic, or all traffic)
> The destinations to which you want to publish the flow log data

## S5 Flow log records - Amazon Virtual Private Cloud — Aggregation interval
url: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-aggregration-interval
fetched: 2026-11-26
> By default, the maximum aggregation interval is 10 minutes. When you create a flow log, you can optionally specify a maximum aggregation interval of 1 minute.

## S6 Access logs for your Application Load Balancer - Elastic Load Balancing — Access logs for your Application Load Balancer
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#load-balancer-access-logs
fetched: 2026-11-26
> Access logs is an optional feature of Elastic Load Balancing that is disabled by default. After you enable access logs for your load balancer, Elastic Load Balancing captures the logs and stores them in the Amazon S3 bucket that you specify as compressed files.
> Elastic Load Balancing publishes a log file for each load balancer node every 5 minutes.

## S7 Collect metrics, logs, and traces using the CloudWatch agent - Amazon CloudWatch — Collect metrics, logs, and traces using the CloudWatch agent
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
fetched: 2026-11-26
> The CloudWatch agent is a software component that collects metrics, logs, and traces from your Amazon EC2 instances, on-premises servers, and containerized applications.
> In all three models, the agent collects logs from Amazon EC2 instances and on-premises servers into Amazon CloudWatch Logs.
