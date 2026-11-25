# 出典: C-0065 Applying configuration changes to systems

## S1 What is AWS AppConfig? — What is AWS AppConfig? #what-is-appconfig
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-25
> AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags, dynamic free-form configurations, and AI configurations, you can control how your application runs in real time. This approach reduces risk, accelerates releases, and enables faster responses to issues. You can gradually roll out new features to specific users, monitor their impact, and expand availability with confidence.

## S2 Working with deployment strategies — Bake time #appconfig-creating-deployment-strategy
url: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html#appconfig-creating-deployment-strategy
fetched: 2026-11-25
> This setting specifies the amount of time AWS AppConfig monitors for Amazon CloudWatch alarms after the configuration has been deployed to 100% of its targets, before considering the deployment to be complete. If an alarm is triggered during this time, AWS AppConfig rolls back the deployment. You must configure permissions for AWS AppConfig to roll back based on CloudWatch alarms.

## S3 Monitoring deployments for automatic rollback — Monitoring deployments for automatic rollback #monitoring-deployments
url: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html#monitoring-deployments
fetched: 2026-11-25
> During a deployment, you can mitigate situations where malformed or incorrect configuration data causes errors in your application by using a combination of AWS AppConfig deployment strategies and automatic rollbacks based on Amazon CloudWatch alarms. Once configured, if one or more CloudWatch alarms go into the ALARM or INSUFFICIENT_DATAstate during a deployment, AWS AppConfig automatically rolls back your configuration data to the previous version, thereby preventing application outages or errors.

## S4 Run automations based on EventBridge events — Run automations based on EventBridge events #running-automations-event-bridge
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-event-bridge.html#running-automations-event-bridge
fetched: 2026-11-25
> You can start an automation by specifying a runbook as the target of an Amazon EventBridge event. You can start automations according to a schedule, or when a specific AWS system event occurs.

## S5 Run an automation that requires approvals — Run an automation that requires approvals #running-automations-require-approvals
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-require-approvals.html#running-automations-require-approvals
fetched: 2026-11-25
> The following procedures describe how to use the AWS Systems Manager console and AWS Command Line Interface (AWS CLI) to run an automation with approvals using simple execution. The automation uses the automation action aws:approve, which temporarily pauses the automation until the designated principals either approve or deny the action.

## S6 Run automated operations at scale — Run automated operations at scale #running-automations-scale
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-scale.html#running-automations-scale
fetched: 2026-11-25
> The concurrency value determines how many resources are allowed to run the automation simultaneously. Automation also provides an adaptive concurrency mode you can opt in to. Adaptive concurrency automatically scales your automation quota from 100 concurrently running automations up to 500. An error threshold determines how many automations are allowed to fail before Systems Manager stops sending the automation to other resources.

## S7 Setting up notifications or triggering actions based on Parameter Store events — Setting up notifications or triggering actions based on Parameter Store events #sysman-paramstore-cwe
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-cwe.html#sysman-paramstore-cwe
fetched: 2026-11-25
> You can use Amazon EventBridge and Amazon Simple Notification Service (Amazon SNS) to notify you about changes to AWS Systems Manager parameters. Events are emitted on a best effort basis. For example, you can create rules that do the following: Notify you when a parameter or a parameter label version is created, updated, or deleted.
