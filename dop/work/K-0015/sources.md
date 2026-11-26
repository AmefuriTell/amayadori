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
