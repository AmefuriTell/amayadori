## S1 AWS Systems Manager Run Command — AWS Systems Manager Run Command
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command
fetched: 2026-11-27
> Using Run Command, you can remotely and securely manage the configuration of your managed nodes.
> With Run Command, you can automate common administrative tasks and perform one-time configuration changes at scale.

## S2 Understanding how State Manager works — Understanding how State Manager works
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
fetched: 2026-11-27
> State Manager is a secure and scalable service that automates the process of keeping managed nodes in a hybrid and multicloud infrastructure in a state that you define.
> A State Manager association is a configuration that you assign to your AWS resources. The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.

## S3 Choosing between State Manager and Maintenance Windows — State Manager and Maintenance Windows: Key use cases
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html#sm-mw-use-cases
fetched: 2026-11-27
> State Manager sets and maintains the targeted state configuration for managed nodes and AWS resources within your AWS account.
> Auto Scaling scenarios: State Manager can monitor all new nodes launched within an account either manually or through Auto Scaling groups.
> Use State Manager if you want to maintain a consistent state across all managed nodes, use Amazon EC2 Auto Scaling to generate new nodes, or have strict compliance reporting requirements.
> Use Maintenance Windows if your priorities include patching managed nodes, running multiple task types during an update period, or controlling when updates run.

## S4 Running Auto Scaling groups with associations — Running Auto Scaling groups with associations
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-asg.html#systems-manager-state-manager-asg
fetched: 2026-11-27
> The best practice when using associations to run Auto Scaling groups is to use tag targets.
> If all nodes are tagged with the same key and value, you only need one association to run your Auto Scaling group.

## S5 How an instance refresh works in an Auto Scaling group — How it works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
fetched: 2026-11-27
> To refresh instances in an Auto Scaling group, you can define a new configuration that contains the latest version of your application and any other updates you want to make.
> Rolling strategy (default) — Terminates instances and launches new ones in batches according to your preferences.
> This ensures that your Auto Scaling group maintains its desired capacity and availability throughout the update process.

## S6 Undo changes with a manual or auto rollback — Undo changes with a manual or auto rollback
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
fetched: 2026-11-27
> You can roll back an instance refresh that is still in progress. You can't roll it back after it's finished.
> When rolling back, Amazon EC2 Auto Scaling replaces the instances that have been deployed so far.
> Auto rollback: Amazon EC2 Auto Scaling automatically reverses what was deployed if the instance refresh fails for some reason or if any CloudWatch alarms you specify go into the ALARM state.

## S7 How lifecycle hooks work in Auto Scaling groups — How lifecycle hooks work in Auto Scaling groups
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks-overview.html#lifecycle-hooks-overview
fetched: 2026-11-27
> You can create custom actions for your Auto Scaling group to act when an instance transitions into a wait state due to a lifecycle hook.
> The Auto Scaling group responds to a scale-in event and begins terminating an instance.

## S8 What Is AWS Config? — What Is AWS Config?
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-27
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account.
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources.
> When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.

## S9 Evaluating Resources with AWS Config Rules — Evaluating Resources with AWS Config Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html#evaluate-config
fetched: 2026-11-27
> Use AWS Config to evaluate the configuration settings of your AWS resources.
> You do this by creating AWS Config rules, which represent your ideal configuration settings.
> AWS Config provides customizable, predefined rules called managed rules to help you get started.

## S10 Remediating Noncompliant Resources with AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-27
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.
> These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.
> You can also create and associate custom automation documents with AWS Config rules.

## S11 AWS Systems Manager Automation — AWS Systems Manager Automation
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#systems-manager-automation
fetched: 2026-11-27
> Automation helps you to build automated solutions to deploy, configure, and manage AWS resources at scale.
> Automation also integrates with Amazon EventBridge to help you build event-driven architecture at scale.

## S12 Run automations based on EventBridge events — Run automations based on EventBridge events
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-event-bridge.html#running-automations-event-bridge
fetched: 2026-11-27
> You can start an automation by specifying a runbook as the target of an Amazon EventBridge event.
> You can start automations according to a schedule, or when a specific AWS system event occurs.

## S13 Run an automation that requires approvals — Run an automation that requires approvals
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-require-approvals.html#running-automations-require-approvals
fetched: 2026-11-27
> The automation uses the automation action aws:approve, which temporarily pauses the automation until the designated principals either approve or deny the action.

## S14 AWS Systems Manager OpsCenter — AWS Systems Manager OpsCenter
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
fetched: 2026-11-27
> OpsCenter provides a central location where operations engineers and IT professionals can view, investigate, and resolve operational work items (OpsItems) related to AWS resources.
> OpsCenter also provides Systems Manager Automation runbooks that you can use to quickly resolve issues.

## S15 Stop, terminate, reboot, or recover an EC2 instance — Stop, terminate, reboot, or recover an EC2 instance
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-27
> Using Amazon CloudWatch alarm actions, you can create alarms that automatically stop, terminate, reboot, or recover your EC2 instances.
> You can use the reboot and recover actions to automatically reboot those instances or recover them onto new hardware if a system impairment occurs.

## S16 Automatic instance recovery — Key concepts of automatic instance recovery
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-automatic-instance-recovery-key-concepts
fetched: 2026-11-27
> Automatic instance recovery is an Amazon EC2 feature that automatically restores instance availability when underlying hardware or software failures occur, enhancing the resilience and reliability of your EC2 instances.
> Simplified automatic recovery: Enabled by default on supported instances.
> CloudWatch action based recovery: Requires manual configuration on supported instances.

## S17 Automatic instance recovery — Differences between simplified automatic recovery and CloudWatch action based recovery
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#differences
fetched: 2026-11-27
> Fixed recovery behavior managed by AWS
> Customizable actions and conditions
> Requires manual configuration of CloudWatch alarms and actions

## S18 What is AWS AppConfig? — What is AWS AppConfig?
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-27
> AWS AppConfig helps you safely change application behavior in production without redeploying code.
> If a configuration change triggers an alarm, AWS AppConfig automatically rolls back the change to minimize impact.

## S19 What is AWS AppConfig? — What is AWS AppConfig? #what-is-appconfig
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-25
> AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags, dynamic free-form configurations, and AI configurations, you can control how your application runs in real time. This approach reduces risk, accelerates releases, and enables faster responses to issues. You can gradually roll out new features to specific users, monitor their impact, and expand availability with confidence.

## S20 Working with deployment strategies — Bake time #appconfig-creating-deployment-strategy
url: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html#appconfig-creating-deployment-strategy
fetched: 2026-11-25
> This setting specifies the amount of time AWS AppConfig monitors for Amazon CloudWatch alarms after the configuration has been deployed to 100% of its targets, before considering the deployment to be complete. If an alarm is triggered during this time, AWS AppConfig rolls back the deployment. You must configure permissions for AWS AppConfig to roll back based on CloudWatch alarms.

## S21 Monitoring deployments for automatic rollback — Monitoring deployments for automatic rollback #monitoring-deployments
url: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html#monitoring-deployments
fetched: 2026-11-25
> During a deployment, you can mitigate situations where malformed or incorrect configuration data causes errors in your application by using a combination of AWS AppConfig deployment strategies and automatic rollbacks based on Amazon CloudWatch alarms. Once configured, if one or more CloudWatch alarms go into the ALARM or INSUFFICIENT_DATAstate during a deployment, AWS AppConfig automatically rolls back your configuration data to the previous version, thereby preventing application outages or errors.

## S22 Run automations based on EventBridge events — Run automations based on EventBridge events #running-automations-event-bridge
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-event-bridge.html#running-automations-event-bridge
fetched: 2026-11-25
> You can start an automation by specifying a runbook as the target of an Amazon EventBridge event. You can start automations according to a schedule, or when a specific AWS system event occurs.

## S23 Run an automation that requires approvals — Run an automation that requires approvals #running-automations-require-approvals
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-require-approvals.html#running-automations-require-approvals
fetched: 2026-11-25
> The following procedures describe how to use the AWS Systems Manager console and AWS Command Line Interface (AWS CLI) to run an automation with approvals using simple execution. The automation uses the automation action aws:approve, which temporarily pauses the automation until the designated principals either approve or deny the action.

## S24 Run automated operations at scale — Run automated operations at scale #running-automations-scale
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-scale.html#running-automations-scale
fetched: 2026-11-25
> The concurrency value determines how many resources are allowed to run the automation simultaneously. Automation also provides an adaptive concurrency mode you can opt in to. Adaptive concurrency automatically scales your automation quota from 100 concurrently running automations up to 500. An error threshold determines how many automations are allowed to fail before Systems Manager stops sending the automation to other resources.

## S25 Setting up notifications or triggering actions based on Parameter Store events — Setting up notifications or triggering actions based on Parameter Store events #sysman-paramstore-cwe
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-cwe.html#sysman-paramstore-cwe
fetched: 2026-11-25
> You can use Amazon EventBridge and Amazon Simple Notification Service (Amazon SNS) to notify you about changes to AWS Systems Manager parameters. Events are emitted on a best effort basis. For example, you can create rules that do the following: Notify you when a parameter or a parameter label version is created, updated, or deleted.

## S26 Amazon EC2 Auto Scaling lifecycle hooks — Amazon EC2 Auto Scaling lifecycle hooks
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
fetched: 2026-11-26
> Amazon EC2 Auto Scaling offers the ability to add lifecycle hooks to your Auto Scaling groups. These hooks let you create solutions that are aware of events in the Auto Scaling instance lifecycle, and then perform a custom action on instances when the corresponding lifecycle event occurs. A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
> When a scale-in event occurs, a lifecycle hook pauses the instance before it is terminated and sends you a notification using Amazon EventBridge. While the instance is in the wait state, you can invoke an AWS Lambda function or connect to the instance to download logs or other data before the instance is fully terminated.

## S27 How lifecycle hooks work in Auto Scaling groups — Wait state and heartbeat
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks-overview.html#lifecycle-hooks-overview
fetched: 2026-11-26
> The lifecycle hook puts the instance into a wait state (Pending:Wait) and then performs a custom action. The instance remains in a wait state until you either complete the lifecycle action, or the timeout period ends. By default, the instance remains in a wait state for one hour, and then the Auto Scaling group continues the launch process (Pending:Proceed). If you need more time, you can restart the timeout period by recording a heartbeat.
> The lifecycle hook puts the instance into a wait state (Terminating:Wait) and then performs a custom action.
> The instance remains in a wait state either until you complete the lifecycle action, or until the timeout period ends (one hour by default). After you complete the lifecycle hook or the timeout period expires, the instance transitions to the next state (Terminating:Proceed).

## S28 Considerations and limitations for lifecycle hooks — Termination, timeouts, and EventBridge
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
fetched: 2026-11-26
> By default, termination lifecycle hooks operate on a best-effort basis. If a termination lifecycle hook times out, or is abandoned, Amazon EC2 Auto Scaling proceeds with terminating the instance immediately.
> Instances can remain in a wait state for a finite period of time. The default timeout for a lifecycle hook is one hour (heartbeat timeout). There is also a global timeout that specifies the maximum amount of time that you can keep an instance in a wait state. The global timeout is 48 hours or 100 times the heartbeat timeout, whichever is smaller.
> The result of the lifecycle hook can be either abandon or continue.
> Creating and updating lifecycle hooks using the AWS CLI, CloudFormation, or an SDK provides options not available when creating a lifecycle hook from the AWS Management Console. For example, the field to specify the ARN of an SNS topic or SQS queue doesn't appear in the console, because Amazon EC2 Auto Scaling already sends events to Amazon EventBridge. These events can be filtered and redirected to AWS services such as Lambda, Amazon SNS, and Amazon SQS as needed.

## S29 Use an instance refresh to update instances in an Auto Scaling group — Core concepts (minimum and maximum healthy percentage)
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
fetched: 2026-11-26
> The minimum healthy percentage is the percentage of the desired capacity to keep in service, healthy, and ready to use during an instance refresh so that the refresh can continue.
> For example, if the minimum healthy percentage is 90 percent and the maximum healthy percentage is 100 percent, then 10 percent of capacity will be replaced at a time.
> If the new instances don't pass their health checks, Amazon EC2 Auto Scaling terminates and replaces them.
> To replace one instance at a time, set both the minimum and maximum healthy percentage to 100 percent.
> To replace all instances at once, set a minimum healthy percentage of 0 percent.

## S30 Add checkpoints to an instance refresh — How it works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-adding-checkpoints-instance-refresh.html#instance-refresh-checkpoints-how-it-works
fetched: 2026-11-26
> When starting an instance refresh, you specify checkpoints as percentages of the total number of instances in the Auto Scaling group.
> These checkpoints indicate the minimum percentage of instances in the Auto Scaling group that must be new instances before the checkpoint is considered reached.
> Amazon EC2 Auto Scaling emits events for each checkpoint except for the 100 percent complete checkpoint.
> You can add an EventBridge rule to send the events to a target such as Amazon SNS.
> Canceling the operation stops any further replacements from being made.
> If you cancel the operation or it fails before reaching the last checkpoint, any instances that were already replaced are not rolled back to their previous configuration.
> If multiple checkpoints are enabled, the instance refresh checkpoint must be set to 100% to ensure complete replacement of all instances.

## S31 Undo changes with a manual or auto rollback — Rollback of an instance refresh
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
fetched: 2026-11-26
> You can roll back an instance refresh that is still in progress.
> You can't roll it back after it's finished.
> When rolling back, Amazon EC2 Auto Scaling replaces the instances that have been deployed so far.
> The new instances match the configuration that you last saved on the Auto Scaling group before starting the instance refresh.
> Auto rollback: Amazon EC2 Auto Scaling automatically reverses what was deployed if the instance refresh fails for some reason or if any CloudWatch alarms you specify go into the ALARM state.
> If you enable auto rollback, and there are errors while replacing instances, the instance refresh attempts to complete all replacements for one hour before it fails and rolls back.

## S32 Detect unmanaged configuration changes to stacks and resources with drift detection — What is drift?
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#using-cfn-stack-drift
fetched: 2026-11-26
> Even as you manage your resources through CloudFormation, users can change those resources outside of CloudFormation.
> Some changes may be accidental, and some may be made intentionally to respond to time-sensitive operational events.
> You can use drift detection to identify stack resources to which configuration changes have been made outside of CloudFormation management.
> Drift detection enables you to detect whether a stack's actual configuration differs, or has drifted, from its expected configuration.
> A resource is considered to have drifted if one or more of its properties have been deleted, or had their value changed.
> A stack is considered to have drifted if one or more of its resources have drifted.

## S33 Remediating Noncompliant Resources with AWS Config — Remediation
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-26
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules. AWS Config applies remediation using AWS Systems Manager Automation documents. These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules. You can associate SSM documents by using AWS Management Console or by using APIs. AWS Config provides a set of managed automation documents with remediation actions. You can also create and associate custom automation documents with AWS Config rules.

## S34 AWS Systems Manager Automation — Automation overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#systems-manager-automation
fetched: 2026-11-26
> Automation simplifies common maintenance, deployment, and remediation tasks for AWS services like Amazon Elastic Compute Cloud (Amazon EC2), Amazon Relational Database Service (Amazon RDS), Amazon Redshift, Amazon Simple Storage Service (Amazon S3), and many more.

## S35 AWS Systems Manager Automation — What is an automation?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#what-is-an-automation
fetched: 2026-11-26
> An automation consists of all of the tasks that are defined in a runbook, and are performed by the Automation service. A Systems Manager Automation runbook defines the automation (the actions that Systems Manager performs on your managed nodes and AWS resources). Automation includes several pre-defined runbooks that you can use to perform common tasks like restarting one or more Amazon EC2 instances or creating an Amazon Machine Image (AMI).

## S36 AWS Systems Manager Automation — Benefits
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html#automation-benefits
fetched: 2026-11-26
> Automation helps you to build automated solutions to deploy, configure, and manage AWS resources at scale. With Automation, you have granular control over the concurrency of your automations. This means you can specify how many resources to target concurrently, and how many errors can occur before an automation is stopped.

## S37 Run automations based on EventBridge events — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-event-bridge.html#running-automations-event-bridge
fetched: 2026-11-26
> You can start an automation by specifying a runbook as the target of an Amazon EventBridge event. You can start automations according to a schedule, or when a specific AWS system event occurs. When a new instance starts, the system runs the automation and installs software.

## S38 Stop, terminate, reboot, or recover an EC2 instance — Overview
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-26
> Using Amazon CloudWatch alarm actions, you can create alarms that automatically stop, terminate, reboot, or recover your EC2 instances. You can also add the recover action to alarms that is set on any Amazon EC2 per-instance metric except for StatusCheckFailed_Instance. If you are using an AWS Identity and Access Management (IAM) account to create or modify an alarm that performs EC2 actions or Systems Manager OpsItem actions, you must have the iam:CreateServiceLinkedRole permission.

## S39 Stop, terminate, reboot, or recover an EC2 instance — Adding recover actions to Amazon CloudWatch alarms
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRecoverActions
fetched: 2026-11-26
> You can create an Amazon CloudWatch alarm that monitors an Amazon EC2 instance and automatically recovers the instance if it becomes impaired due to an underlying hardware failure or a problem that requires AWS involvement to repair. When the StatusCheckFailed_System alarm is triggered, and the recover action is initiated, you will be notified by the Amazon SNS topic that you chose when you created the alarm and associated the recover action.

## S40 Automatic instance recovery — Overview
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
fetched: 2026-11-26
> If AWS detects that an instance is unavailable due to an underlying hardware or software issue, there are two mechanisms that can automatically restore instance availability—simplified automatic recovery and Amazon CloudWatch action based recovery. If the recovery process is unsuccessful, the instance might continue running on the host with the underlying hardware or software issue. In this case, manual intervention is required. By default, simplified automatic recovery is enabled during instance launch.

## S41 AWS Systems Manager OpsCenter — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
fetched: 2026-11-26
> OpsCenter also provides Systems Manager Automation runbooks that you can use to quickly resolve issues. OpsCenter is integrated with Amazon EventBridge and Amazon CloudWatch. This means you can configure these services to automatically create an OpsItem in OpsCenter when a CloudWatch alarm enters the ALARM state or when EventBridge processes an event from any AWS service that publishes events. Configuring CloudWatch alarms and EventBridge events to automatically create OpsItems lets you quickly diagnose and remediate issues with AWS resources from a single console.
