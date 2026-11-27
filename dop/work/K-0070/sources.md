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

## S21 Managing capacity automatically with Amazon RDS storage autoscaling — 自動拡張が起きる条件
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html
fetched: 2026-11-25
> With storage autoscaling enabled, when Amazon RDS detects that you are running out of free database space it automatically scales up your storage.
> Amazon RDS starts a storage modification for an autoscaling-enabled DB instance when these factors apply:
> - Free available space is less than or equal to 10 percent of the allocated storage.
> - The low-storage condition lasts at least five minutes.
> - Storage optimization has completed on the instance for the previous storage modification, and fewer than four storage modifications have occurred in the past 24 hours.
> The additional storage is in increments of whichever of the following is greater:
> - 10 GiB
> - 10 percent of currently allocated storage
> - Predicted storage growth exceeding the current allocated storage size in the next 7 hours based on the FreeStorageSpace metrics from the past hour.

## S22 Managing capacity automatically with Amazon RDS storage autoscaling — 最大のしきい値と制限
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#autoscaling-limitations
fetched: 2026-11-25
> The maximum storage threshold is the limit that you set for autoscaling the DB instance.
> You must set the maximum storage threshold to at least 10% more than the current allocated storage.
> We recommend setting it to at least 26% more to avoid receiving an event notification that the storage size is approaching the maximum storage threshold.
> You can't set the maximum storage threshold for autoscaling-enabled instances to a value greater than the maximum allocated storage for the database engine and DB instance class.
> Autoscaling doesn't occur if the maximum storage threshold would be exceeded by the storage increment.
> Autoscaling can't decrease the allocated storage.
> Autoscaling can't completely prevent storage-full situations for large data loads.

## S23 Automatically manage Amazon ECS capacity with cluster auto scaling — クラスターの EC2 の増減
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-25
> Amazon ECS can manage the scaling of Amazon EC2 instances that are registered to your cluster.
> You turn on managed scaling when you create the Amazon ECS Auto Scaling group capacity provider.
> Then, you set a target percentage (the targetCapacity) for the instance utilization in this Auto Scaling group.
> Amazon ECS creates two custom CloudWatch metrics and a target tracking scaling policy for your Auto Scaling group.
> Amazon ECS then manages the scale-in and scale-out actions based on the resource utilization that your tasks use.
> Don't change or manage the desired capacity for the Auto Scaling group that's associated with a capacity provider with any scaling policies other than the one Amazon ECS manages.
> When Amazon ECS scales out from 0 instances, it automatically launches 2 instances.
> Cluster auto scaling doesn't modify the MinimumCapacity or MaximumCapacity for the group.
> For the group to scale out, the value for MaximumCapacity must be greater than zero.

## S24 Managing throughput capacity automatically with DynamoDB auto scaling — 目標の使用率による調整
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html#AutoScaling
fetched: 2026-11-25
> Amazon DynamoDB auto scaling uses the AWS Application Auto Scaling service to dynamically adjust provisioned throughput capacity on your behalf, in response to actual traffic patterns.
> This enables a table or a global secondary index (GSI) to increase its provisioned read and write capacity to handle sudden increases in traffic, without throttling.
> When the workload decreases, Application Auto Scaling decreases the throughput so that you don't pay for unused provisioned capacity.
> With Application Auto Scaling, you create a scaling policy for a table or a global secondary index.
> The scaling policy also contains a target utilization—the percentage of consumed provisioned throughput at a point in time.
> Application Auto Scaling uses a target tracking algorithm to adjust the provisioned throughput of the table (or index) upward or downward in response to actual workloads, so that the actual capacity utilization remains at or near your target utilization.
> DynamoDB outputs consumed provisioned throughput for one-minute periods.
> Auto scaling triggers when your consumed capacity breaches the configured target utilization for two consecutive minutes.
> You can set the auto scaling target utilization values between 20 and 90 percent for your read and write capacity.
> If you use the AWS Management Console to create a table or a global secondary index, DynamoDB auto scaling is enabled by default.
> DynamoDB auto scaling doesn't prevent you from manually modifying provisioned throughput settings.

## S25 Alarm evaluation — Alarm evaluation settings
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
fetched: 2026-11-26
> When you configure Evaluation Periods and Datapoints to Alarm as different values, you're setting an "M out of N" alarm. Datapoints to Alarm is ("M") and Evaluation Periods is ("N").The evaluation interval is the number of evaluation periods multiplied by the period length. For example, if you configure 4 out of 5 data points with a period of 1 minute, the evaluation interval is 5 minutes. If you configure 3 out of 3 data points with a period of 10 minutes, the evaluation interval is 30 minutes.

## S26 Configuring how CloudWatch alarms treat missing data — Configuring how CloudWatch alarms treat missing data
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
fetched: 2026-11-26
> For each alarm, you can specify CloudWatch to treat missing data points as any of the following:
> notBreaching – Missing data points are treated as "good" and within the threshold
> breaching – Missing data points are treated as "bad" and breaching the threshold
> ignore – The current alarm state is maintained
> missing – If all data points in the alarm evaluation range are missing, the alarm transitions to INSUFFICIENT_DATA.
> The best choice depends on the type of metric and the purpose of the alarm. For example, if you are creating an application rollback alarm using a metric that continually reports data, you might want to treat missing data points as breaching, because it might indicate that something is wrong. But for a metric that generates data points only when an error occurs, such as ThrottledRequests in Amazon DynamoDB, you would want to treat missing data as notBreaching. The default behavior is missing.
> Important
> Alarms configured on Amazon EC2 metrics can temporarily enter the INSUFFICIENT_DATA state if there are missing metric data points. This is rare, but can happen when the metric reporting is interrupted, even when the Amazon EC2 instance is healthy. For alarms on Amazon EC2 metrics that are configured to take stop, terminate, reboot, or recover actions, we recommend that you configure those alarms to treat missing data as missing, and to have these alarms trigger only when in the ALARM state.

## S27 Composite alarms — Composite alarms (actions, rule functions)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html#alarm-combining
fetched: 2026-11-26
> Composite alarms can take only the following actions:
> Notify Amazon SNS topics
> Invoke Lambda functions
> Create OpsItems in Systems Manager Ops Center
> Create incidents in Systems Manager Incident Manager
> Note
> All the underlying alarms in your composite alarm must be in the same account and the same Region as your composite alarm. However, if you set up a composite alarm in a CloudWatch cross-account observability monitoring account, the underlying alarms can watch metrics in different source accounts and in the monitoring account itself. For more information, see CloudWatch cross-account observability.
> A single composite alarm can monitor 100 underlying alarms, and 150 composite alarms can monitor a single underlying alarm.
> Rule expressions
> All composite alarms contain rule expressions. Rule expressions tell composite alarms which other alarms to monitor and determine their states from. Rule expressions can refer to metric alarms and composite alarms. When you reference an alarm in a rule expression, you designate a function to the alarm that determines which of the following three states the alarm will be in:
> ALARM ("alarm-name or alarm-ARN") is TRUE if the alarm is in ALARM state.
> OK ("alarm-name or alarm-ARN") is TRUE if the alarm is in OK state.
> INSUFFICIENT_DATA ("alarm-name or alarm-ARN") is TRUE if the named alarm is in INSUFFICIENT_DATA state.
> Note
> TRUE always evaluates to TRUE, and FALSE always evaluates to FALSE.

## S28 Composite alarms — Composite alarms (AND, OR, NOT, AT_LEAST syntax)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html#alarm-combining
fetched: 2026-11-26
> The syntax of the expression you use to combine several alarms into one composite alarm uses boolean logic and functions. The following table describes the operators and functions available in rule expressions:
> AND
> Logical AND operator. Returns TRUE when all specified conditions are TRUE.
> OR
> Logical OR operator. Returns TRUE when at least one of the specified conditions is TRUE.
> NOT
> Logical NOT operator. Returns TRUE when the specified condition is FALSE.
> AT_LEAST
> Function that returns TRUE when a minimum number or percentage of specified alarms are in the required state. Format: AT_LEAST(M, STATE_CONDITION, (alarm1, alarm2, ...alarmN)) where M can be an absolute number or percentage (for example, 50%), and STATE_CONDITION can be ALARM, OK, INSUFFICIENT_DATA, NOT ALARM, NOT OK, or NOT INSUFFICIENT_DATA.
> You can use parentheses to group conditions and control the order of evaluation in complex expressions.

## S29 Amazon S3 Event Notifications — Amazon S3 Event Notifications
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
fetched: 2026-11-26
> Amazon S3 event notifications are designed to be delivered at least once. Typically, event notifications are delivered in seconds but can sometimes take a minute or longer.

## S30 Amazon S3 Event Notifications — Overview of Amazon S3 Event Notifications
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#notification-how-to-overview
fetched: 2026-11-26
> Amazon S3 can send event notification messages to the following destinations. You specify the Amazon Resource Name (ARN) value of these destinations in the notification configuration.
> Amazon Simple Queue Service FIFO (First-In-First-Out) queues aren't supported as an Amazon S3 event notification destination. To send a notification for an Amazon S3 event to an Amazon SQS FIFO queue, you can use Amazon EventBridge.

## S31 Event notification types and destinations — Amazon EventBridge
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#eventbridge-dest
fetched: 2026-11-26
> Unlike other destinations, you can either enable or disable events to be delivered to EventBridge for a bucket. If you enable delivery, all events are sent to EventBridge. Moreover, you can use EventBridge rules to route events to additional targets.

## S32 Configuring event notifications using object key name filtering — Configuring event notifications using object key name filtering
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html#notification-how-to-filtering
fetched: 2026-11-26
> You can configure notifications to be filtered by the prefix and suffix of the key name of objects.
> For example, you can set up a configuration where you're sent a notification only when image files with a ".jpg" file name extension are added to a bucket.
> Notification configurations that use Filter cannot define filtering rules with overlapping prefixes, overlapping suffixes, or prefix and suffix overlapping.

## S33 Process Amazon S3 event notifications with Lambda — Process Amazon S3 event notifications with Lambda
url: https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html#with-s3
fetched: 2026-11-26
> Amazon S3 can send an event to a Lambda Event Function when an object is created or deleted.
> Amazon S3 invokes your function asynchronously with an event that contains details about the object.
> To invoke your function, Amazon S3 needs permission from the function's resource-based policy.
> If your function uses the AWS SDK to manage Amazon S3 resources, it also needs Amazon S3 permissions in its execution role.
> If your Lambda Event Function uses the same bucket that triggers it, it could cause the function to run in a loop.
> To avoid this, use two buckets, or configure the trigger to only apply to a prefix used for incoming objects.

## S34 Amazon EventBridge event patterns — Amazon EventBridge event patterns
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
fetched: 2026-11-26
> Chances are you won't want to process every single event that gets delivered to a given event bus or pipe. Rather, you'll likely want to select a subset of all the events delivered, based on the source of the event, the event type, and/or attributes of those events.
> To specify which events to send to a target, you create an event pattern. An event pattern defines the data EventBridge uses to determine whether to send the event to the target. If the event pattern matches the event, EventBridge sends the event to the target. Event patterns have the same structure as the events they match. An event pattern either matches an event or it doesn't.

## S35 Amazon EventBridge event patterns — Amazon EventBridge event patterns (example)
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
fetched: 2026-11-26
> The following event pattern selects all Amazon EC2 instance-termination events. The event pattern does this by specifying three requirements to match an event:
> - The event source must be Amazon EC2.
> - The event must be an Amazon EC2 state-change notification.
> - The state of the Amazon EC2 instance must be terminated.
> Note that in this example, the event pattern includes fields about the event--source and detail-type--as well as a field from the event body--state.

## S36 Amazon EventBridge event patterns — Event patterns for event buses
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns-buses
fetched: 2026-11-26
> For event buses, you can specify an event pattern for each rule you create for the bus. In this way, you can select which events to send to specific targets. Event patterns for event buses can match against the event source, event metadata, and/or event detail values.

## S37 Comparison operators for use in event patterns in Amazon EventBridge — Comparison operators for use in event patterns in Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
fetched: 2026-11-26
> Below a summary of all the comparison operators available in EventBridge.
> Comparison operators only work on leaf nodes, with the exception of $or and anything-but.

## S38 Comparison operators for use in event patterns in Amazon EventBridge — Prefix matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-prefix-matching
fetched: 2026-11-26
> You can match an event depending on the prefix of a value in the event source. You can use prefix matching for string values.

## S39 Comparison operators for use in event patterns in Amazon EventBridge — Anything-but matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-anything-but
fetched: 2026-11-26
> Anything-but matching matches anything except what's specified in the rule.
> You can use anything-but matching with strings and numeric values, including lists that contain only strings, or only numbers.

## S40 Comparison operators for use in event patterns in Amazon EventBridge — Exists matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-exists-matching
fetched: 2026-11-26
> Exists matching works on the presence or absence of a field in the JSON of the event.
> Exists matching only works on leaf nodes. It does not work on intermediate nodes.

## S41 Amazon EventBridge input transformation — Amazon EventBridge input transformation
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html#eb-transform-target-input
fetched: 2026-11-26
> You can customize the text from an event before EventBridge passes the information to the target of a rule. Using the input transformer in the console or the API, you define variables that use JSON path to reference values in the original event source. The transformed event is sent to a target instead of the original event. However, dynamic path parameters must reference the original event, not the transformed event.
> You can define up to 100 variables, assigning each a value from the input. Then you can use those variables in the Input Template as <variable-name>.

## S42 Amazon EventBridge input transformation — Input path
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html#eb-transform-target-input-path
fetched: 2026-11-26
> Input Path is used to define variables. Use JSON path to reference items in your event and store those values in variables.
> EventBridge replaces input transformers at runtime to ensure a valid JSON output. Because of this, put quotes around variables that refer to JSON path parameters, but do not put quotes around variables that refer to JSON objects or arrays.

## S43 Using resource-based policies for Amazon EventBridge — Amazon SNS permissions
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-use-resource-based.html#eb-sns-permissions
fetched: 2026-11-26
> To allow EventBridge to publish to an Amazon SNS topic, use the aws sns get-topic-attributes and the aws sns set-topic-attributes commands.

## S44 Working with SSM Agent - AWS Systems Manager — Working with SSM Agent
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html#ssm-agent
fetched: 2026-11-26
> AWS Systems Manager Agent (SSM Agent) is Amazon software that runs on Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, on-premises servers, and virtual machines (VMs). SSM Agent makes it possible for Systems Manager to update, manage, and configure these resources. The agent processes requests from the Systems Manager service in the AWS Cloud, and then runs them as specified in the request. SSM Agent then sends status and execution information back to the Systems Manager service by using the Amazon Message Gateway Service (ssmmessages).
> If you monitor traffic, you see that your managed nodes communicate with ssmmessages.* endpoints and possibly ec2messages.* endpoints.

## S45 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#fleet-manager-default-host-management-configuration
fetched: 2026-11-26
> The Default Host Management Configuration setting allows AWS Systems Manager to manage your Amazon EC2 instances automatically as managed instances. Using Default Host Management Configuration, you can manage EC2 instances without having to manually create an AWS Identity and Access Management (IAM) instance profile. Instead, Default Host Management Configuration creates and applies a default IAM role to make sure that Systems Manager has permissions to manage all instances in the AWS account and AWS Region where it's activated.
> Removing these directories or their files will prevent the instance from acquiring the necessary credentials to connect to Systems Manager using Default Host Management Configuration.

## S46 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Prerequisites
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#dhmc-prerequisites
fetched: 2026-11-26
> An instance to be managed must use Instance Metadata Service Version 2 (IMDSv2). Default Host Management Configuration doesn't support Instance Metadata Service Version 1. SSM Agent version 3.2.582.0 or later must be installed on the instance to be managed.

## S47 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Activating the Default Host Management Configuration setting
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#dhmc-activate
fetched: 2026-11-26
> After turning on Default Host Management Configuration, it might take up to 30 minutes for your instances to use the credentials of the role you choose in step 5 in the following procedure. We recommend using the default role provided by Default Host Management Configuration. It contains the minimum set of permissions necessary to manage your Amazon EC2 instances using Systems Manager.

## S48 Configure instance permissions required for Systems Manager - AWS Systems Manager — Recommended and alternative configuration for EC2 instance permissions
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#default-host-management
fetched: 2026-11-26
> After you've turned on this setting, all instances using Instance Metadata Service Version 2 (IMDSv2) in the AWS Region and AWS account with SSM Agent version 3.2.582.0 or later installed automatically become managed instances.
> You can create an instance profile for Systems Manager by attaching one or more IAM policies that define the necessary permissions to a new role or to a role you already created.
> Use the Search field to locate the AmazonSSMManagedInstanceCore policy. Select the check box next to its name, as shown in the following illustration.

## S49 Automating updates to SSM Agent - AWS Systems Manager — Automating updates to SSM Agent
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-automatic-updates.html#ssm-agent-automatic-updates
fetched: 2026-11-26
> AWS releases a new version of AWS Systems Manager Agent (SSM Agent) when we add or update Systems Manager tools. If your managed nodes use an older version of the agent, then you can't use the new tools or benefit from the updated tools. SSM Agent on the Bottlerocket operating system can't be updated using the Systems Manager Command document AWS-UpdateSSMAgent.
> You can configure all managed nodes in your AWS account to automatically check for and download new versions of SSM Agent.

## S50 Improve the security of EC2 instances by using VPC endpoints for Systems Manager - AWS Systems Manager — Improve the security of EC2 instances by using VPC endpoints for Systems Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#setup-create-vpc
fetched: 2026-11-26
> The alternative to using a VPC endpoint is to allow outbound internet access on your managed instances. In this case, the managed instances must also allow HTTPS (port 443) outbound traffic to the following endpoints: ssm.region.amazonaws.com, ssmmessages.region.amazonaws.com, ec2messages.region.amazonaws.com.
> SSM Agent initiates all connections to the Systems Manager service in the cloud. For this reason, you don't need to configure your firewall to allow inbound traffic to your instances for Systems Manager.

## S51 Setting Up Auto Remediation for AWS Config — Setting Up Auto Remediation (Console)
url: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
fetched: 2026-11-26
> In the AWS Management Console, you can either choose to automatically remediate noncompliant resources by associating remediation actions with AWS Config rules.
> With all remediation actions, you can either choose manual or automatic remediation.
> From the Actions dropdown list, choose Manage remediation. Select "Automatic remediation" and then choose the appropriate remediation action from the list.
> Depending on the selected remediation action, you see specific parameters or no parameters.
> Choose Auto remediation to automatically remediate noncompliant resources.
> If a resource is still noncompliant after auto remediation, you can set the rule to try auto remediation again. Enter the desired retries and seconds.
> Retries only occur if remediation fails and work within the specified time period; for example, 5 retries in 300 seconds.
> Each parameter has either a static value or a dynamic value.
> You can only manage remediations for non-service linked AWS Config rules.

## S52 Setting Up Auto Remediation for AWS Config — Setting Up Auto Remediation (API)
url: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
fetched: 2026-11-26
> PutRemediationConfigurations, adds or updates the remediation configuration with a specific AWS Config rule with the selected target or action.
> If you enable auto remediation for a specific AWS Config rule using the PutRemediationConfigurations API or the AWS Config console, it initiates the remediation process for all noncompliant resources for that specific rule.
> The auto remediation process relies on the compliance data snapshot which is captured on a periodic basis.
> DescribeRemediationExecutionStatus, provides a detailed view of a Remediation Execution for a set of resources including state, timestamps for when steps for the remediation execution occur, and any error messages for steps that have failed.

## S53 Remediating Noncompliant Resources with AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-26
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.
> These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.
> You can associate SSM documents by using AWS Management Console or by using APIs.
> AWS Config provides a set of managed automation documents with remediation actions.

## S54 Remediating Noncompliant Resources with AWS Config — Region Support
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#region-support-config-remediation
fetched: 2026-11-26
> Currently, remediation actions for AWS Config Rules is supported in the following regions:

## S55 Evaluating Resources with AWS Config Rules — Evaluating Resources with AWS Config Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html#evaluate-config
fetched: 2026-11-26
> Use AWS Config to evaluate the configuration settings of your AWS resources.
> You do this by creating AWS Config rules, which represent your ideal configuration settings.
> If you record a global IAM resource type in at least one Region, periodic rules that report compliance on the global IAM resource type will run evaluations in all Regions where the periodic rule is added, even if you have not enabled the recording of the global IAM resource type in the Region where the periodic rule was added.

## S56 AWS Config Custom Rules — AWS Config Custom Policy Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html#evaluate-config_develop-rules-policy
fetched: 2026-11-26
> AWS Config Custom Policy rules are initiated by configuration changes.
> AWS Config Custom Policy rules allow you to create AWS Config Custom rules without needing to use Java or Python to develop Lambda functions to manage your custom rules.

## S57 AWS Config Custom Rules — AWS Config Custom Lambda Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html#evaluate-config_develop-rules-lambda
fetched: 2026-11-26
> If the Lambda function is associated with an AWS Config rule, AWS Config invokes it when the rule is initiated.
> The Lambda function then evaluates the configuration information that is sent by AWS Config, and it returns the evaluation results.

## S58 Types of Amazon Route 53 health checks — Types of Amazon Route 53 health checks
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html#health-checks-types
fetched: 2026-11-26
> You can create the following types of Amazon Route 53 health checks:
> Health checks that monitor a public endpoint
> You can configure a health check that monitors a public endpoint that you specify either by IP address or by domain name.
> Health checks that monitor a private endpoint
> You can create a health check that monitors a private endpoint.
> A private endpoint is reachable from your VPC.
> Health checks that monitor other health checks (calculated health checks)
> You can create a health check that monitors whether Route 53 considers other health checks healthy or unhealthy.
> Health checks that monitor CloudWatch alarms
> You can create CloudWatch alarms that monitor the status of CloudWatch metrics, such as the number of throttled read events for an Amazon DynamoDB database or the number of Elastic Load Balancing hosts that are considered healthy.
> After you create an alarm, you can create a health check that monitors the same data stream that CloudWatch monitors for the alarm.
> To improve resiliency and availability, Route 53 doesn't wait for the CloudWatch alarm to go into the ALARM state.
> The status of a health check changes from healthy to unhealthy based on the data stream and on the criteria in the CloudWatch alarm.
> Route 53 does not support "M out of N" alarms.
> A health check can only monitor a CloudWatch alarm that exists in the same AWS account as the health check.

## S59 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of health checks that monitor a public endpoint
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-monitor-endpoint
fetched: 2026-11-26
> Route 53 has health checkers in locations around the world.
> You can choose which locations you want Route 53 to use, and you can specify the interval between checks: every 10 seconds or every 30 seconds.
> Each health checker evaluates the health of the endpoint based on two values:
> Whether the endpoint responds to a number of consecutive health checks that you specify (the failure threshold)
> Route 53 aggregates the data from the health checkers and determines whether the endpoint is healthy:
> If more than 18% of health checkers report that an endpoint is healthy, Route 53 considers it healthy.
> If 18% of health checkers or fewer report that an endpoint is healthy, Route 53 considers it unhealthy.
> HTTP and HTTPS health checks – Route 53 must be able to establish a TCP connection with the endpoint within four seconds.
> In addition, the endpoint must respond with an HTTP status code of 2xx or 3xx within two seconds after connecting.
> TCP health checks – Route 53 must be able to establish a TCP connection with the endpoint within ten seconds.
> After a Route 53 health checker receives the HTTP status code, it must receive the response body from the endpoint within the next two seconds.
> Route 53 searches the response body for a string that you specify.
> The string must appear entirely in the first 5,120 bytes of the response body or the endpoint fails the health check.

## S60 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of health checks that monitor other health checks and CloudWatch alarms
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-calculated
fetched: 2026-11-26
> A health check can monitor the status of other health checks; this type of health check is known as a calculated health check.
> One parent health check can monitor the health of up to 255 child health checks.
> When you create a health check that is based on a CloudWatch alarm, Route 53 monitors the data stream for the corresponding alarm instead of monitoring the alarm state.
> If the data stream indicates that the state of the alarm is OK, the health check is considered healthy.
> If the data stream indicates that the state is Alarm, the health check is considered unhealthy.
> If the data stream doesn't provide enough information to determine the state of the alarm, the health check status depends on the setting for Health check status: healthy, unhealthy, or last known status.
> Route 53 doesn't support cross-account CloudWatch alarms.
> Because Route 53 health checks monitor CloudWatch data streams instead of the state of CloudWatch alarms, you can't force the status of a health check to change by using the CloudWatch SetAlarmState API operation.

## S61 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of a private endpoint health check
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-private-endpoint
fetched: 2026-11-26
> For a private endpoint health check, Route 53 sends requests from the health check source in your Amazon VPC to the endpoint that you specify.
> Route 53 changes the status to unhealthy after the number of consecutive failures set by the failure threshold (default 3).
> Route 53 then updates DNS so that failover routing directs traffic to a healthy endpoint.
> The health check source must be in the Available status.

## S62 Private endpoint health checks — How private endpoint health checks work
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-private-endpoints.html#health-checks-private-endpoints-how-it-works
fetched: 2026-11-26
> A private endpoint health check monitors an endpoint that is reachable from your VPC, such as a specific IP address, domain name, or port.
> You don't need to expose any endpoint to the internet.
> When an endpoint becomes unhealthy, the private endpoint health check marks any associated DNS records as unhealthy.
> Each health check source has an IP address in each of three subnets, in three Availability Zones in the same Region as the VPC.
> You set up a health check source one time and use it for up to 200 private endpoint health checks.
> A private endpoint health check runs only from the AWS Region of its health check source.
> A private endpoint health check uses a single health check source.
> A private endpoint health check and its health check source must be in the same AWS account.
> You can't reference a private endpoint health check from a calculated health check.

### 覆えなかった行

- 知識「Capabilities of auto scaling」の EC2 Auto Scaling groups（EC2 Auto Scaling 自体のページは未取得。S4 はアラームからの呼び出しだけ）と Amazon EKS autoscalers（未取得）。
- 知識「Health check capabilities」と技能「Configuring health checks (for example, Route 53, ALB)」の ALB target groups（ページ未取得。Route 53 の分は S12・S13）。
- 技能「Configuring solutions for auto scaling」の EC2 Auto Scaling groups の設定（未取得。ECS・RDS・DynamoDB の分は S14・S15・S16）。
- 技能「Creating CloudWatch custom metrics and metric filters ... alarms, and notifications」の metric filters（未取得。custom metrics・alarm・notification の分は S4・S7・S1）。
- 技能「Configuring S3 events to process log files ... deliver log files to another destination (for example, OpenSearch Service, CloudWatch Logs)」の配送先 OpenSearch Service・CloudWatch Logs（未取得。Lambda の分は S18）。
- 技能「Installing and configuring agents on EC2 instances」の導入と設定の手順（資料は概要だけ。S8・S9）。
- 技能「Configuring AWS Config rules to remediate issues」の rule ごとの remediation 設定（資料は概要だけ。S10・S11）。
