## S1 AWS Systems Manager Patch Manager — AWS Systems Manager Patch Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager
fetched: 2026-11-26
> Patch Manager automates the process of patching managed nodes with both security-related updates and other types of updates.
> Systems Manager provides support for patch policies in Quick Setup, a tool in AWS Systems Manager.
> Using patch policies is the recommended method for configuring your patching operations.
> You can scan instances to see only a report of missing patches, or you can scan and automatically install all missing patches.
> AWS doesn't test patches before making them available in Patch Manager.

## S2 What is compliance in Patch Manager? — What is compliance in Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager-definition-of-compliance
fetched: 2026-11-26
> The benchmark for what constitutes patch compliance for the managed nodes in your Systems Manager fleets is not defined by AWS, by operating system (OS) vendors, or by third parties such as security consulting firms.
> Instead, you define what patch compliance means for managed nodes in your organization or account in a patch baseline.
> A patch baseline is a configuration that specifies rules for which patches must be installed on a managed node.
> A managed node is patch compliant when it is up to date with all the patches that meet the approval criteria that you specify in the patch baseline.
> Compliant means that the patches defined by the patch baseline that are both available and approved have been installed on the node.

## S3 Predefined and custom patch baselines — Predefined and custom patch baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-predefined-and-custom-patch-baselines
fetched: 2026-11-26
> Patch Manager provides predefined patch baselines for each of the operating systems supported by Patch Manager.
> You can use these baselines as they are currently configured (you can't customize them) or you can create your own custom patch baselines.
> Custom patch baselines allows you greater control over which patches are approved or rejected for your environment.

## S4 Predefined and custom patch baselines — Predefined baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-baselines-pre-defined
fetched: 2026-11-26
> Patches are auto-approved seven days after release.
> Immediately approves all operating system security-related patches that have a priority of "Required", "Important", "Standard," "Optional," or "Extra." There is no wait before approval because reliable release dates aren't available in the repositories.

## S5 Predefined and custom patch baselines — Using auto-approvals in custom baselines
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#baselines-auto-approvals
fetched: 2026-11-26
> For each approval rule that you create, you can choose to specify an auto-approval delay or specify a patch approval cutoff date.
> An auto-approval delay is the number of days to wait after the patch was released or last updated, before the patch is automatically approved for patching.
> For example, if you create a rule using the CriticalUpdates classification and configure it for 7 days auto-approval delay, then a new critical patch released on July 7 is automatically approved on July 14.

## S6 Patch policy configurations in Quick Setup — Patch policy configurations in Quick Setup
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
fetched: 2026-11-26
> AWS recommends the use of patch policies to configure patching for your organization and AWS accounts.
> A patch policy is a configuration you set up using Quick Setup.
> Patch policies provide more extensive and more centralized control over your patching operations than is available with previous methods of configuring patching.
> However, if you use AWS Organizations, you can set up one patch policy that applies to all your managed nodes in all AWS Regions in all your AWS accounts.
> Using a patch policy, you can specify different schedules for scanning and installing.

## S7 AWS Systems Manager Maintenance Windows — AWS Systems Manager Maintenance Windows
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

## S8 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-26
> AWS Systems Manager Inventory provides visibility into your AWS computing environment.
> You can use Inventory to collect metadata from your managed nodes.
> You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.
> Systems Manager Inventory collects only metadata from your managed nodes.
> Inventory doesn't access proprietary information or data.
