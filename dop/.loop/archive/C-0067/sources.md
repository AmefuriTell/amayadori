## S1 Remediating Noncompliant Resources with AWS Config — Remediation
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-26
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules. AWS Config applies remediation using AWS Systems Manager Automation documents. These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules. You can associate SSM documents by using AWS Management Console or by using APIs. AWS Config provides a set of managed automation documents with remediation actions. You can also create and associate custom automation documents with AWS Config rules.

## S2 AWS Systems Manager Automation — Automation overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#systems-manager-automation
fetched: 2026-11-26
> Automation simplifies common maintenance, deployment, and remediation tasks for AWS services like Amazon Elastic Compute Cloud (Amazon EC2), Amazon Relational Database Service (Amazon RDS), Amazon Redshift, Amazon Simple Storage Service (Amazon S3), and many more.

## S3 AWS Systems Manager Automation — What is an automation?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#what-is-an-automation
fetched: 2026-11-26
> An automation consists of all of the tasks that are defined in a runbook, and are performed by the Automation service. A Systems Manager Automation runbook defines the automation (the actions that Systems Manager performs on your managed nodes and AWS resources). Automation includes several pre-defined runbooks that you can use to perform common tasks like restarting one or more Amazon EC2 instances or creating an Amazon Machine Image (AMI).

## S4 AWS Systems Manager Automation — Benefits
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#automation-benefits
fetched: 2026-11-26
> Automation helps you to build automated solutions to deploy, configure, and manage AWS resources at scale. With Automation, you have granular control over the concurrency of your automations. This means you can specify how many resources to target concurrently, and how many errors can occur before an automation is stopped.

## S5 Run automations based on EventBridge events — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-event-bridge.html#running-automations-event-bridge
fetched: 2026-11-26
> You can start an automation by specifying a runbook as the target of an Amazon EventBridge event. You can start automations according to a schedule, or when a specific AWS system event occurs. When a new instance starts, the system runs the automation and installs software.

## S6 Stop, terminate, reboot, or recover an EC2 instance — Overview
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-26
> Using Amazon CloudWatch alarm actions, you can create alarms that automatically stop, terminate, reboot, or recover your EC2 instances. You can also add the recover action to alarms that is set on any Amazon EC2 per-instance metric except for StatusCheckFailed_Instance. If you are using an AWS Identity and Access Management (IAM) account to create or modify an alarm that performs EC2 actions or Systems Manager OpsItem actions, you must have the iam:CreateServiceLinkedRole permission.

## S7 Stop, terminate, reboot, or recover an EC2 instance — Adding recover actions to Amazon CloudWatch alarms
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRecoverActions
fetched: 2026-11-26
> You can create an Amazon CloudWatch alarm that monitors an Amazon EC2 instance and automatically recovers the instance if it becomes impaired due to an underlying hardware failure or a problem that requires AWS involvement to repair. When the StatusCheckFailed_System alarm is triggered, and the recover action is initiated, you will be notified by the Amazon SNS topic that you chose when you created the alarm and associated the recover action.

## S8 Automatic instance recovery — Overview
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
fetched: 2026-11-26
> If AWS detects that an instance is unavailable due to an underlying hardware or software issue, there are two mechanisms that can automatically restore instance availability—simplified automatic recovery and Amazon CloudWatch action based recovery. If the recovery process is unsuccessful, the instance might continue running on the host with the underlying hardware or software issue. In this case, manual intervention is required. By default, simplified automatic recovery is enabled during instance launch.

## S9 AWS Systems Manager OpsCenter — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
fetched: 2026-11-26
> OpsCenter also provides Systems Manager Automation runbooks that you can use to quickly resolve issues. OpsCenter is integrated with Amazon EventBridge and Amazon CloudWatch. This means you can configure these services to automatically create an OpsItem in OpsCenter when a CloudWatch alarm enters the ALARM state or when EventBridge processes an event from any AWS service that publishes events. Configuring CloudWatch alarms and EventBridge events to automatically create OpsItems lets you quickly diagnose and remediate issues with AWS resources from a single console.
