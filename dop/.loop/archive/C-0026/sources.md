# C-0026 sources

## S1 AWS Systems Manager Patch Manager — What are the main features of Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#what-are-the-main-features-of-patch-manager
fetched: 2026-11-25
> Patch Manager offers several key features:
> Patch policies – Configure patching operations across multiple AWS accounts and Regions using a single policy through integration with AWS Organizations.
> Custom patch baselines – Define rules for auto-approving patches within days of their release, along with approved and rejected patch lists.
> Multiple patching methods – Choose from patch policies, maintenance windows, or on-demand "Patch now" operations to meet your specific needs.
> Scheduling flexibility – Set different schedules for scanning and installing patches using custom CRON or Rate expressions.

## S2 AWS Systems Manager Patch Manager — What is compliance in Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager-definition-of-compliance
fetched: 2026-11-25
> A managed node is patch compliant when it is up to date with all the patches that meet the approval criteria that you specify in the patch baseline.
> Note that being compliant with a patch baseline doesn't mean that a managed node is necessarily secure.
> Compliant means that the patches defined by the patch baseline that are both available and approved have been installed on the node.
> When a patching operation runs, Patch Manager compares the patches currently applied to a managed node to those that should be applied according to the rules set up in the patch baseline or an Install Override list.
> You can choose for Patch Manager to show you only a report of missing patches (a Scan operation), or you can choose for Patch Manager to automatically install all patches it find are missing from a managed node (a Scan and install operation).

## S3 AWS Systems Manager State Manager — What are the features of State Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-features
fetched: 2026-11-25
> A State Manager association is a configuration that you assign to your AWS resources.
> The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> For example, an association for antivirus software might run once a day on all managed nodes in an AWS account.
> If the software isn't installed on a node, then the association could instruct State Manager to install it.
> State Manager supports targeting AWS resources by using tags, AWS Resource Groups, individual node IDs, or all managed nodes in the current AWS Region and AWS account.

## S4 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-25
> AWS Systems Manager Inventory provides visibility into your AWS computing environment.
> You can use Inventory to collect metadata from your managed nodes.
> You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.
> Systems Manager Inventory collects only metadata from your managed nodes.

## S5 AWS Config — Resource Administration (AWS Config rules)
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#scenarios-resource-administration
fetched: 2026-11-25
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources.
> When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.
> AWS Config continuously evaluates your resources as they are created, changed, or deleted.

## S6 AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-25
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.
> These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.
> AWS Config provides a set of managed automation documents with remediation actions.
