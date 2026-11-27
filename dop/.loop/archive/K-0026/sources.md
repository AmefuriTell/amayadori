## S1 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-27
> AWS Systems Manager Inventory provides visibility into your AWS computing environment. You can use Inventory to collect metadata from your managed nodes. You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.

## S2 What Is AWS Config? — What Is AWS Config?
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-27
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time.

## S3 AWS Systems Manager Patch Manager — What are the main features of Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#what-are-the-main-features-of-patch-manager
fetched: 2026-11-27
> Patch policies – Configure patching operations across multiple AWS accounts and Regions using a single policy through integration with AWS Organizations.
> Multiple patching methods – Choose from patch policies, maintenance windows, or on-demand "Patch now" operations to meet your specific needs.

## S4 AWS Systems Manager Patch Manager — What is compliance in Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager-definition-of-compliance
fetched: 2026-11-27
> A managed node is patch compliant when it is up to date with all the patches that meet the approval criteria that you specify in the patch baseline.
> Compliant means that the patches defined by the patch baseline that are both available and approved have been installed on the node.

## S5 AWS Systems Manager Compliance — AWS Systems Manager Compliance
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html#systems-manager-compliance
fetched: 2026-11-27
> You can use Compliance to scan your fleet of managed nodes for patch compliance and configuration inconsistencies.
> By default, Compliance displays current compliance data about patching in Patch Manager and associations in State Manager.

## S6 Understanding how State Manager works — Understanding how State Manager works
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
fetched: 2026-11-27
> State Manager is a secure and scalable service that automates the process of keeping managed nodes in a hybrid and multicloud infrastructure in a state that you define.
> A State Manager association is a configuration that you assign to your AWS resources.
> The configuration defines the state that you want to maintain on your resources.

## S7 AWS Systems Manager State Manager — What are the features of State Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-features
fetched: 2026-11-27
> A State Manager association is a configuration that you assign to your AWS resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.

## S8 AWS Systems Manager State Manager — How can State Manager benefit my organization?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-benefits
fetched: 2026-11-27
> By using pre-configured Systems Manager documents (SSM documents), State Manager offers the following benefits for managing your nodes:
> To manage configuration drift across other AWS resources, you can use Automation, a tool in Systems Manager, with State Manager to perform the following types of tasks:

## S9 Remediating Noncompliant Resources with AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-27
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.

## S10 AWS Systems Manager Run Command — AWS Systems Manager Run Command
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command
fetched: 2026-11-27
> Using Run Command, you can remotely and securely manage the configuration of your managed nodes.
> With Run Command, you can automate common administrative tasks and perform one-time configuration changes at scale.
> You can use Run Command from the AWS Management Console, the AWS Command Line Interface (AWS CLI), AWS Tools for Windows PowerShell, or the AWS SDKs.

## S11 AWS Systems Manager Maintenance Windows — AWS Systems Manager Maintenance Windows
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
fetched: 2026-11-27
> Maintenance Windows helps you define a schedule for when to perform potentially disruptive actions on your nodes such as patching an operating system, updating drivers, or installing software or patches.
> State Manager and Maintenance Windows can perform some similar types of updates on your managed nodes.
> Which one you choose depends on whether you need to automate system compliance or perform high-priority, time-sensitive tasks during periods you specify.

## S12 How Lambda handles errors and retries with asynchronous invocation — How Lambda handles errors and retries with asynchronous invocation
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
fetched: 2026-11-27
> Lambda manages your function's asynchronous event queue and attempts to retry on errors.
> If the function returns an error, by default Lambda attempts to run it two more times, with a one-minute wait between the first two attempts, and two minutes between the second and third attempts.
> Ensure that your function code gracefully handles duplicate events, and that you have enough concurrency available to handle all invocations.

## S13 Capturing records of Lambda asynchronous invocations — Capturing records of Lambda asynchronous invocations
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-retain-records
fetched: 2026-11-27
> Lambda can send records of asynchronous invocations to one of the following AWS services.
> The invocation record contains details about the request and response in JSON format.
> You can configure separate destinations for events that are processed successfully, and events that fail all processing attempts.

## S14 Orchestrating Lambda Event Functions with Step Functions — When to use Step Functions with Lambda / Complex error handling
url: https://docs.aws.amazon.com/lambda/latest/dg/with-step-functions.html#with-step-functions
fetched: 2026-11-27
> The following scenarios are good examples of when Step Functions is a particularly good fit for orchestrating Lambda-based applications.
> While Lambda provides retry capabilities for asynchronous invocations and event source mappings, Step Functions offers more sophisticated error handling for complex workflows.

## S15 Using Lambda with an AWS SDK — Using Lambda with an AWS SDK
url: https://docs.aws.amazon.com/lambda/latest/dg/sdk-general-information-section.html#sdk-general-information-section
fetched: 2026-11-27
> AWS software development kits (SDKs) are available for many popular programming languages.
> Each SDK provides an API, code examples, and documentation that make it easier for developers to build applications in their preferred language.

## S16 What is Step Functions? — Integrating with other services
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-service-integrations
fetched: 2026-11-27
> AWS SDK integrations provide a way to call any AWS service directly from your state machine, giving you access to thousands of API actions.
> Optimized integrations provide custom options for using those services in your state machines.
> Standard Workflows and Express Workflows support the same integrations but not the same integration patterns.
> Express Workflows only support Request Response integrations.

## S17 Choosing workflow type in Step Functions — Choosing workflow type in Step Functions
url: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
fetched: 2026-11-27
> Standard Workflows are ideal for long-running (up to one year), durable, and auditable workflows.
> Express Workflows are ideal for high-volume, event-processing workloads such as IoT data ingestion, streaming data processing and transformation, and mobile application backends.
> Express Workflows use an at-least-once model, so an execution could potentially run more than once.

## S18 Discover service integration patterns in Step Functions — Request Response / Run a Job (.sync)
url: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-to-resource
fetched: 2026-11-27
> Request Response - Call a service and Step Functions will progress to the next state immediately after it receives an HTTP response.
> For integrated services such as AWS Batch and Amazon ECS, Step Functions can wait for a request to complete before progressing to the next state.

## S19 aws:executeAwsApi – Call and run AWS API operations — aws:executeAwsApi – Call and run AWS API operations
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-executeAwsApi.html#automation-action-executeAwsApi
fetched: 2026-11-27
> Most API operations are supported, although not all API operations have been tested.
