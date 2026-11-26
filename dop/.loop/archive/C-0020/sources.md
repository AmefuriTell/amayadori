## S1 What is AWS AppConfig? — What is AWS AppConfig?
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-26
> AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags, dynamic free-form configurations, and AI configurations, you can control how your application runs in real time. This approach reduces risk, accelerates releases, and enables faster responses to issues. You can gradually roll out new features to specific users, monitor their impact, and expand availability with confidence.

## S2 What is AWS AppConfig? — AWS AppConfig use cases
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig-when-to-use
fetched: 2026-11-26
> Feature flags and toggles – Gradually release new capabilities to targeted users, monitor impact, and instantly roll back changes if issues occur.
> Centralized configuration storage – Manage configuration data consistently across workloads. AWS AppConfig can deploy configuration from the AWS AppConfig hosted configuration store, AWS Secrets Manager, Systems Manager Parameter Store, or Amazon S3.

## S3 What is AWS AppConfig? — Benefits overview
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-benefits-overview
fetched: 2026-11-26
> AWS AppConfig includes safety features that help prevent configuration changes from causing application failures:
> Validators: Ensure that configuration data is syntactically and semantically correct before deployment.
> Deployment strategies: Gradually roll out changes over a defined period of time to reduce risk.
> Monitoring and automatic rollback: AWS AppConfig integrates with Amazon CloudWatch, Datadog, New Relic, and other observability solutions to monitor application health. If a configuration change triggers an alarm, AWS AppConfig automatically rolls back the change to minimize impact.

## S4 What is AWS AppConfig? — How AWS AppConfig works
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig-how-it-works
fetched: 2026-11-26
> If your configuration data already exists in cloud services such as SSM Parameter Store or Amazon S3, you can use AWS AppConfig to validate, deploy, and manage that data more effectively.
> You can also add optional validators to ensure that configuration data is syntactically and semantically correct. During deployment, AWS AppConfig evaluates these validators and automatically rolls back changes if validation fails.
> When you start a deployment, AWS AppConfig:
> Retrieves configuration data from the source defined in the configuration profile
> Validates the data using the configured validators
> Delivers the validated configuration to AWS AppConfig Agent

## S5 Understanding validators — Understanding validators
url: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators
fetched: 2026-11-26
> When you create a configuration profile, you have the option to specify up to two validators. A validator ensures that your configuration data is syntactically and semantically correct. If you plan to use a validator, you must create it before you create the configuration profile.
> AWS Lambda functions: Supported for feature flags and free form configurations.
> AWS AppConfig verifies that the Lambda X-Amz-Function-Error header is set in the response.
> AWS AppConfig calls your validation Lambda when calling the StartDeployment and ValidateConfigurationActivity API operations.
> AWS AppConfig limits the validation Lambda run time to 15 seconds, including start-up latency.
> Configuration data stored in SSM documents must validate against an associated JSON Schema before you can add the configuration to the system. SSM parameters do not require a validation method, but we recommend that you create a validation check for new or updated SSM parameter configurations by using AWS Lambda.
> AWS AppConfig supports JSON Schema version 4.X for inline schema. If your application configuration requires a different version of JSON Schema, then you must create a Lambda validator.

## S6 Monitoring deployments for automatic rollback — Monitoring deployments for automatic rollback
url: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html#monitoring-deployments
fetched: 2026-11-26
> During a deployment, you can mitigate situations where malformed or incorrect configuration data causes errors in your application by using a combination of AWS AppConfig deployment strategies and automatic rollbacks based on Amazon CloudWatch alarms. Once configured, if one or more CloudWatch alarms go into the ALARM or INSUFFICIENT_DATAstate during a deployment, AWS AppConfig automatically rolls back your configuration data to the previous version, thereby preventing application outages or errors.
> A deployment doesn't automatically roll back if actions have been disabled in an associated CloudWatch alarm.
> To configure automatic rollbacks, you specify the Amazon Resource Name (ARN) of one or more CloudWatch metrics in the CloudWatch alarms field when you create (or edit) an AWS AppConfig environment.
> You can also roll back a configuration by calling the StopDeployment API operation while a deployment is still in progress.

## S7 AWS Systems Manager State Manager — AWS Systems Manager State Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#systems-manager-state
fetched: 2026-11-26
> State Manager is a secure and scalable configuration management service that automates the process of keeping your managed nodes and other AWS resources in a state that you define.
> Which one you choose depends on whether you need to automate system compliance or perform high-priority, time-sensitive tasks during periods you specify.
> A State Manager association is a configuration that you assign to your AWS resources. The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> State Manager supports targeting AWS resources by using tags, AWS Resource Groups, individual node IDs, or all managed nodes in the current AWS Region and AWS account.
> State Manager is appropriate for any AWS customer that wants to improve the management and governance of their AWS resources and reduce configuration drift.
> State Manager is available at no additional charge.

## S8 What Is AWS Config? — What Is AWS Config? / Resource Administration / Features
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-26
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account.
> To exercise better governance over your resource configurations and to detect resource misconfigurations, you need fine-grained visibility into what resources exist and how these resources are configured at any time.
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources.
> When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.
> Specify the rules that you want AWS Config to use to evaluate compliance information for the recorded resource types.
> Use conformance packs, or a collection of rules that can be deployed and monitored as a single entity in your AWS account.
> Remediate noncompliant resources that are evaluated by AWS Config Rules.
