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

## S20 AWS Systems Manager Patch Manager — What are the main features of Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#what-are-the-main-features-of-patch-manager
fetched: 2026-11-25
> Patch Manager offers several key features:
> Patch policies – Configure patching operations across multiple AWS accounts and Regions using a single policy through integration with AWS Organizations.
> Custom patch baselines – Define rules for auto-approving patches within days of their release, along with approved and rejected patch lists.
> Multiple patching methods – Choose from patch policies, maintenance windows, or on-demand "Patch now" operations to meet your specific needs.
> Scheduling flexibility – Set different schedules for scanning and installing patches using custom CRON or Rate expressions.

## S21 AWS Systems Manager Patch Manager — What is compliance in Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager-definition-of-compliance
fetched: 2026-11-25
> A managed node is patch compliant when it is up to date with all the patches that meet the approval criteria that you specify in the patch baseline.
> Note that being compliant with a patch baseline doesn't mean that a managed node is necessarily secure.
> Compliant means that the patches defined by the patch baseline that are both available and approved have been installed on the node.
> When a patching operation runs, Patch Manager compares the patches currently applied to a managed node to those that should be applied according to the rules set up in the patch baseline or an Install Override list.
> You can choose for Patch Manager to show you only a report of missing patches (a Scan operation), or you can choose for Patch Manager to automatically install all patches it find are missing from a managed node (a Scan and install operation).

## S22 AWS Systems Manager State Manager — What are the features of State Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-features
fetched: 2026-11-25
> A State Manager association is a configuration that you assign to your AWS resources.
> The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> For example, an association for antivirus software might run once a day on all managed nodes in an AWS account.
> If the software isn't installed on a node, then the association could instruct State Manager to install it.
> State Manager supports targeting AWS resources by using tags, AWS Resource Groups, individual node IDs, or all managed nodes in the current AWS Region and AWS account.

## S23 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-25
> AWS Systems Manager Inventory provides visibility into your AWS computing environment.
> You can use Inventory to collect metadata from your managed nodes.
> You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.
> Systems Manager Inventory collects only metadata from your managed nodes.

## S24 AWS Config — Resource Administration (AWS Config rules)
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#scenarios-resource-administration
fetched: 2026-11-25
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources.
> When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.
> AWS Config continuously evaluates your resources as they are created, changed, or deleted.

## S25 AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-25
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.
> These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.
> AWS Config provides a set of managed automation documents with remediation actions.

## S26 What is Step Functions? — Standard and Express workflows types
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-workflows
fetched: 2026-11-26
> Standard workflows are ideal for long-running, auditable workflows, as they show execution history and visual debugging.
> Standard workflows have exactly-once workflow execution and can run for up to one year.
> This means that each step in a Standard workflow will execute exactly once.
> Express workflows are ideal for high-event-rate workloads, such as streaming data processing and IoT data ingestion.
> Express workflows have at-least-once workflow execution and can run for up to five minutes.
> This means that one or more steps in an Express Workflow can potentially run more than once, while each step in the workflow executes at least once.

## S27 What is Step Functions? — Integrating with other services
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-service-integrations
fetched: 2026-11-26
> To combine Step Functions with other services, there are three service integration patterns:
> Call a service, and let Step Functions progress to the next state after it gets an HTTP response.
> Call a service, and have Step Functions wait for a job to complete.
> Call a service with a task token, and have Step Functions wait until the task token returns with a callback.
> Standard Workflows and Express Workflows support the same integrations but not the same integration patterns.
> Express Workflows only support Request Response integrations.

## S28 Discover service integration patterns in Step Functions — Wait for a Callback with Task Token
url: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
fetched: 2026-11-26
> Callback tasks provide a way to pause a workflow until a task token is returned.
> To use .waitForTaskToken with an AWS SDK integration, the API you use must have a parameter field in which to place the task token.
> The task will pause until it receives that task token back with a SendTaskSuccess or SendTaskFailure call.
> If a Task state using the callback task token times out, a new random token is generated.
> You must pass task tokens from principals within the same AWS account.

## S29 Handling errors in Step Functions workflows — Retrying after an error
url: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
fetched: 2026-11-26
> Task, Parallel, and Map states can have a field named Retry, whose value must be an array of objects known as retriers.
> When one of these states reports an error and there's a Retry field, Step Functions scans through the retriers in the order listed in the array.
> When the error name appears in the value of a retrier's ErrorEquals field, the state machine makes retry attempts as defined in the Retry field.
> A positive integer that represents the number of seconds before the first retry attempt (1 by default).
> A positive integer that represents the maximum number of retry attempts (3 by default).
> If the error recurs more times than specified, retries cease and normal error handling resumes.
> A value of 0 specifies that the error is never retried.
> The multiplier by which the retry interval denoted by IntervalSeconds increases after each retry attempt.
> By default, the BackoffRate value increases by 2.0.
> For example, say your IntervalSeconds is 3, MaxAttempts is 3, and BackoffRate is 2.
> The first retry attempt takes place three seconds after the error occurs.
> While the third retry takes place 12 seconds after the second retry attempt.
> This string accepts FULL or NONE as its values.
> The default value is NONE.
> Retries are treated as state transitions.

## S30 Handling errors in Step Functions workflows — Fallback states
url: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-fallback-states
fetched: 2026-11-26
> Task, Map and Parallel states can each have a field named Catch.
> When a state reports an error and either there is no Retry field, or if retries fail to resolve the error, Step Functions scans through the catchers in the order listed in the array.
> When the error name appears in the value of a catcher's ErrorEquals field, the state machine transitions to the state named in the Next field.
> The reserved name States.ALL that appears in a catcher's ErrorEquals field is a wildcard that matches any error name.
> It must appear alone in the ErrorEquals array and must appear in the last catcher in the Catch array.
> The name States.TaskFailed also acts a wildcard and matches any error except for States.Timeout.

## S31 How Lambda handles errors and retries with asynchronous invocation
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
fetched: 2026-11-26
> If the function returns an error, by default Lambda attempts to run it two more times, with a one-minute wait between the first two attempts, and two minutes between the second and third attempts.
> Event Function errors include errors returned by the function's code and errors returned by the function's runtime, such as timeouts.
> For throttling errors (429) and system errors (500-series), Lambda returns the event to the queue and attempts to run the function again for up to 6 hours by default.
> The retry interval increases exponentially from 1 second after the first attempt to a maximum of 5 minutes.
> Ensure that your function code gracefully handles duplicate events, and that you have enough concurrency available to handle all invocations.
> When an event expires or fails all processing attempts, Lambda discards it.
> To capture records of failed invocations (such as timeouts or runtime errors), create an on-failure destination.

## S32 Capturing records of Lambda asynchronous invocations — Adding a destination
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
fetched: 2026-11-26
> You can choose to send either successful or failed invocations to a destination.
> Each function can have multiple destinations, so you can configure separate destinations for successful and failed events.
> Each record sent to the destination is a JSON document with details about the invocation.
> For Lambda to successfully send records to your chosen destination, ensure that your Event Function's execution role also contains the relevant permissions.

## S33 AWS Certified DevOps Engineer - Professional（試験ガイド Content Domain 2）— Task Statement 2.3 Knowledge of
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02-domain2.html#dop-02-task-2-3-knowledge
fetched: 2026-11-26
> AWS services and solutions to automate tasks and processes
> Methods and strategies to interact with the AWS software-defined infrastructure

## S34 AWS Certified DevOps Engineer - Professional（試験ガイド Content Domain 2）— Task Statement 2.3 Skills in
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02-domain2.html#dop-02-task-2-3-skills
fetched: 2026-11-26
> Automating system inventory, configuration, and patch management (for example, Systems Manager, AWS Config)
> Automating the configuration of software applications to the desired state (for example, OpsWorks, Systems Manager State Manager)
> Maintaining software compliance (for example, Systems Manager)

## S35 AWS Certified DevOps Engineer - Professional（In-Scope AWS Services）— Management and Governance
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/dop-02-in-scope-services.html#dop-02-management-governance
fetched: 2026-11-26
> AWS OpsWorks
> AWS Systems Manager

## S36 Understanding how State Manager works — Understanding how State Manager works
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
fetched: 2026-11-26
> State Manager is a secure and scalable service that automates the process of keeping managed nodes in a hybrid and multicloud infrastructure in a state that you define.
> A State Manager association is a configuration that you assign to your AWS resources.
> The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> Preconfigured documents are ready to perform common tasks like installing applications, configuring Amazon CloudWatch, running AWS Systems Manager automations, running PowerShell and Shell scripts, and joining managed nodes to a directory service domain for Active Directory.
> Here are two examples: AWS-ConfigureAWSPackage and AWS-InstallApplication.
> If your targets include more than 1,000 nodes, the system uses an hourly throttling mechanism.
> If you create a new association that is scheduled to run while an earlier association is still running, the earlier association times out and the new association runs.

## S37 Understanding when associations are applied to resources — Understanding when associations are applied to resources
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about-scheduling
fetched: 2026-11-26
> By default, State Manager runs the association when you create it and then according to your schedule.

## S38 Creating associations that run Ansible playbooks — Creating associations that run Ansible playbooks
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-ansible.html#systems-manager-state-manager-ansible
fetched: 2026-11-26
> You can create State Manager associations that run Ansible playbooks by using the AWS-ApplyAnsiblePlaybooks SSM document.
> The AWS-RunAnsiblePlaybook document is deprecated.
> We recommend that you use the AWS-ApplyAnsiblePlaybooks document because of the enhancements described here.
> The AWS-ApplyAnsiblePlaybooks document supports bundled, complex playbooks because it copies the entire file structure to a local directory before executing the specified main playbook.
> Associations that run Ansible playbooks aren't supported on macOS.

## S39 AWS Systems Manager Compliance — AWS Systems Manager Compliance
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html#systems-manager-compliance
fetched: 2026-11-26
> You can use Compliance to scan your fleet of managed nodes for patch compliance and configuration inconsistencies.
> By default, Compliance displays current compliance data about patching in Patch Manager and associations in State Manager.
> Remediate issues by using Run Command, another tool in AWS Systems Manager, State Manager, or Amazon EventBridge.
> Systems Manager integrates with Chef InSpec.

## S40 AWS Systems Manager Distributor — AWS Systems Manager Distributor
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/distributor.html#distributor
fetched: 2026-11-26
> Distributor helps you package and publish software to AWS Systems Manager managed nodes.
> One time by using AWS Systems Manager Run Command
> On a schedule by using AWS Systems Manager State Manager
> When you create a package in Distributor, the system creates an AWS Systems Manager document (SSM document).
> You can use Run Command or State Manager to control which of your managed nodes get a package and which version of that package.

## S41 Run commands at scale — Using rate controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-velocity
fetched: 2026-11-26
> You can control the number of managed nodes that run a command simultaneously by using the max-concurrency parameter (the Concurrency options in the Run a command page).
> You can specify either an absolute number of managed nodes, for example 10, or a percentage of the target set, for example 10%.
> The default for value max-concurrency is 50.

## S42 Run commands at scale — Using error controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
fetched: 2026-11-26
> The parameter specifies how many errors are allowed before the system stops sending the command to additional managed nodes.
> If you specify 0, then the system stops sending the command to additional managed nodes after the first error result is returned.
> If you send a command to 50 managed nodes and set max-errors to 10%, then the system stops sending the command to additional nodes when the sixth error is received.

## S43 AWS Systems Manager Run Command — AWS Systems Manager Run Command
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command
fetched: 2026-11-26
> Using Run Command, you can remotely and securely manage the configuration of your managed nodes.
> With Run Command, you can automate common administrative tasks and perform one-time configuration changes at scale.

## S44 AWS Systems Manager Patch Manager — AWS Systems Manager Patch Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager
fetched: 2026-11-26
> Patch Manager automates the process of patching managed nodes with both security-related updates and other types of updates.
> Systems Manager provides support for patch policies in Quick Setup, a tool in AWS Systems Manager.
> Using patch policies is the recommended method for configuring your patching operations.
> You can scan instances to see only a report of missing patches, or you can scan and automatically install all missing patches.
> AWS doesn't test patches before making them available in Patch Manager.

## S45 What is compliance in Patch Manager? — What is compliance in Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager-definition-of-compliance
fetched: 2026-11-26
> The benchmark for what constitutes patch compliance for the managed nodes in your Systems Manager fleets is not defined by AWS, by operating system (OS) vendors, or by third parties such as security consulting firms.
> Instead, you define what patch compliance means for managed nodes in your organization or account in a patch baseline.
> A patch baseline is a configuration that specifies rules for which patches must be installed on a managed node.
> A managed node is patch compliant when it is up to date with all the patches that meet the approval criteria that you specify in the patch baseline.
> Compliant means that the patches defined by the patch baseline that are both available and approved have been installed on the node.

## S46 Predefined and custom patch baselines — Predefined and custom patch baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-predefined-and-custom-patch-baselines
fetched: 2026-11-26
> Patch Manager provides predefined patch baselines for each of the operating systems supported by Patch Manager.
> You can use these baselines as they are currently configured (you can't customize them) or you can create your own custom patch baselines.
> Custom patch baselines allows you greater control over which patches are approved or rejected for your environment.

## S47 Predefined and custom patch baselines — Predefined baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-pre-defined
fetched: 2026-11-26
> Patches are auto-approved seven days after release.
> Immediately approves all operating system security-related patches that have a priority of "Required", "Important", "Standard," "Optional," or "Extra." There is no wait before approval because reliable release dates aren't available in the repositories.

## S48 Predefined and custom patch baselines — Using auto-approvals in custom baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#baselines-auto-approvals
fetched: 2026-11-26
> For each approval rule that you create, you can choose to specify an auto-approval delay or specify a patch approval cutoff date.
> An auto-approval delay is the number of days to wait after the patch was released or last updated, before the patch is automatically approved for patching.
> For example, if you create a rule using the CriticalUpdates classification and configure it for 7 days auto-approval delay, then a new critical patch released on July 7 is automatically approved on July 14.

## S49 Patch policy configurations in Quick Setup — Patch policy configurations in Quick Setup
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
fetched: 2026-11-26
> AWS recommends the use of patch policies to configure patching for your organization and AWS accounts.
> A patch policy is a configuration you set up using Quick Setup.
> Patch policies provide more extensive and more centralized control over your patching operations than is available with previous methods of configuring patching.
> However, if you use AWS Organizations, you can set up one patch policy that applies to all your managed nodes in all AWS Regions in all your AWS accounts.
> Using a patch policy, you can specify different schedules for scanning and installing.

## S50 AWS Systems Manager Maintenance Windows — AWS Systems Manager Maintenance Windows
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
fetched: 2026-11-26
> Maintenance Windows helps you define a schedule for when to perform potentially disruptive actions on your nodes such as patching an operating system, updating drivers, or installing software or patches.
> State Manager and Maintenance Windows can perform some similar types of updates on your managed nodes.
> Which one you choose depends on whether you need to automate system compliance or perform high-priority, time-sensitive tasks during periods you specify.
> Each maintenance window has a schedule, a maximum duration, a set of registered targets (the managed nodes or other AWS resources that are acted upon), and a set of registered tasks.
> With maintenance windows, you can run four types of tasks:
> Commands in Run Command, a tool in Systems Manager
> Workflows in Automation, a tool in Systems Manager
> Functions in AWS Lambda

## S51 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-26
> AWS Systems Manager Inventory provides visibility into your AWS computing environment.
> You can use Inventory to collect metadata from your managed nodes.
> You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.
> Systems Manager Inventory collects only metadata from your managed nodes.
> Inventory doesn't access proprietary information or data.
