## S1 Alarm actions — Alarm actions and notifications (SNS・Lambda)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-actions.html#alarm-actions
fetched: 2026-11-27
> Notify one or more subscribers by using an Amazon Simple Notification Service topic. Subscribers can be applications as well as persons. Invoke a Lambda function. This is the easiest way for you to automate custom actions on alarm state changes.

## S2 Alarm actions — EC2 actions (recover)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-actions.html#alarm-actions
fetched: 2026-11-27
> Alarms based on EC2 metrics can also perform EC2 actions, such as stopping, terminating, rebooting, or recovering an EC2 instance.

## S3 Alarm actions — Auto Scaling actions (ASG と Application Auto Scaling)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-actions.html#alarm-actions-auto-scaling
fetched: 2026-11-27
> Amazon EC2 Auto Scaling scales the EC2 instances in an Auto Scaling group. Application Auto Scaling scales other resources, such as Amazon ECS services, Amazon DynamoDB tables, Amazon Aurora replicas, and Spot Fleets.

## S4 Alarm actions — Auto Scaling actions (CloudWatch alarm が scaling policy を動かす)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-actions.html#alarm-actions-auto-scaling
fetched: 2026-11-27
> A CloudWatch metric alarm can trigger an Auto Scaling scaling policy to add or remove capacity.

## S5 Alarm evaluation — Metric alarm states
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-states
fetched: 2026-11-27
> ALARM – The metric or expression is outside of the defined threshold. INSUFFICIENT_DATA – The alarm has just started, the metric is not available, or not enough data is available for the metric to determine the alarm state.

## S6 Composite alarms — Composite alarms
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html#alarm-combining
fetched: 2026-11-27
> You can use composite alarms to reduce alarm noise by taking actions only at an aggregated level. For example, you can create a composite alarm to send a notification to your web server team if any alarm related to your web server triggers.

## S7 Publish custom metrics — Publish custom metrics (PutMetricData / EMF)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#publishingMetrics
fetched: 2026-11-27
> You can publish your own custom metrics to CloudWatch using the PutMetricData API or the AWS CLI.

## S8 Collect metrics, logs, and traces using the CloudWatch agent — CloudWatch agent
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
fetched: 2026-11-27
> The CloudWatch agent is a software component that collects metrics, logs, and traces from your Amazon EC2 instances, on-premises servers, and containerized applications. It enables you to monitor your infrastructure and applications more comprehensively than the basic monitoring provided by default.

## S9 Working with SSM Agent — SSM Agent
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html#ssm-agent
fetched: 2026-11-27
> AWS Systems Manager Agent (SSM Agent) is Amazon software that runs on Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, on-premises servers, and virtual machines (VMs). SSM Agent makes it possible for Systems Manager to update, manage, and configure these resources.

## S10 Evaluating Resources with AWS Config Rules — AWS Config rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html#evaluate-config
fetched: 2026-11-27
> Use AWS Config to evaluate the configuration settings of your AWS resources. You do this by creating AWS Config rules, which represent your ideal configuration settings.

## S11 Remediating Noncompliant Resources with AWS Config — Remediation
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-27
> AWS Config applies remediation using AWS Systems Manager Automation documents. These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.

## S12 Types of Amazon Route 53 health checks — Public endpoint
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html#health-checks-types
fetched: 2026-11-27
> At regular intervals that you specify, Route 53 submits automated requests over the internet to your application, server, or other resource to verify that it's reachable, available, and functional.

## S13 Types of Amazon Route 53 health checks — CloudWatch alarms
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html#health-checks-types
fetched: 2026-11-27
> You can create CloudWatch alarms that monitor the status of CloudWatch metrics, such as the number of throttled read events for an Amazon DynamoDB database or the number of Elastic Load Balancing hosts that are considered healthy. After you create an alarm, you can create a health check that monitors the same data stream that CloudWatch monitors for the alarm.

## S14 Automatically manage Amazon ECS capacity with cluster auto scaling — Cluster auto scaling
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-27
> Amazon ECS creates two custom CloudWatch metrics and a target tracking scaling policy for your Auto Scaling group. Amazon ECS then manages the scale-in and scale-out actions based on the resource utilization that your tasks use.

## S15 Managing capacity automatically with Amazon RDS storage autoscaling — Storage autoscaling
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
fetched: 2026-11-27
> With storage autoscaling enabled, when Amazon RDS detects that you are running out of free database space it automatically scales up your storage.

## S16 Managing throughput capacity automatically with DynamoDB auto scaling — DynamoDB auto scaling
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html#AutoScaling
fetched: 2026-11-27
> Amazon DynamoDB auto scaling uses the AWS Application Auto Scaling service to dynamically adjust provisioned throughput capacity on your behalf, in response to actual traffic patterns.

## S17 Amazon S3 Event Notifications — Overview
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
fetched: 2026-11-27
> Amazon S3 event notifications are designed to be delivered at least once. Typically, event notifications are delivered in seconds but can sometimes take a minute or longer.

## S18 Event notification types and destinations — Lambda function
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#lambda-function
fetched: 2026-11-27
> Lambda can run custom code in response to Amazon S3 bucket events. You upload your custom code to Lambda and create what's called a Lambda function. When Amazon S3 detects an event of a specific type, it can publish the event to AWS Lambda and invoke your function in Lambda.

## S19 Event notification types and destinations — Amazon EventBridge
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#eventbridge-dest
fetched: 2026-11-27
> Unlike other destinations, you can either enable or disable events to be delivered to EventBridge for a bucket. If you enable delivery, all events are sent to EventBridge. Moreover, you can use EventBridge rules to route events to additional targets.

## S20 Amazon EventBridge event patterns — Event patterns
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
fetched: 2026-11-27
> To specify which events to send to a target, you create an event pattern. An event pattern defines the data EventBridge uses to determine whether to send the event to the target. If the event pattern matches the event, EventBridge sends the event to the target. Event patterns have the same structure as the events they match. An event pattern either matches an event or it doesn't.

### 覆えなかった行

- 知識「Capabilities of auto scaling」の EC2 Auto Scaling groups（EC2 Auto Scaling 自体のページは未取得。S4 はアラームからの呼び出しだけ）と Amazon EKS autoscalers（未取得）。
- 知識「Health check capabilities」と技能「Configuring health checks (for example, Route 53, ALB)」の ALB target groups（ページ未取得。Route 53 の分は S12・S13）。
- 技能「Configuring solutions for auto scaling」の EC2 Auto Scaling groups の設定（未取得。ECS・RDS・DynamoDB の分は S14・S15・S16）。
- 技能「Creating CloudWatch custom metrics and metric filters ... alarms, and notifications」の metric filters（未取得。custom metrics・alarm・notification の分は S4・S7・S1）。
- 技能「Configuring S3 events to process log files ... deliver log files to another destination (for example, OpenSearch Service, CloudWatch Logs)」の配送先 OpenSearch Service・CloudWatch Logs（未取得。Lambda の分は S18）。
- 技能「Installing and configuring agents on EC2 instances」の導入と設定の手順（資料は概要だけ。S8・S9）。
- 技能「Configuring AWS Config rules to remediate issues」の rule ごとの remediation 設定（資料は概要だけ。S10・S11）。
