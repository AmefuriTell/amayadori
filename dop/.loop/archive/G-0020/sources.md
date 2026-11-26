## S1 AWS Systems Manager Patch Manager — AWS Systems Manager Patch Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#patch-manager
fetched: 2026-11-26
> Patch Manager automates the process of patching managed nodes with both security-related updates and other types of updates.
> You can use Patch Manager to apply patches for both operating systems and applications.
> You can patch fleets of Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, on-premises servers, and virtual machines (VMs) by operating system type.

## S2 AWS Systems Manager Patch Manager — What are the main features of Patch Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html#what-are-the-main-features-of-patch-manager
fetched: 2026-11-26
> Patch Manager offers several key features:
> Patch policies – Configure patching operations across multiple AWS accounts and Regions using a single policy through integration with AWS Organizations.
> Multiple patching methods – Choose from patch policies, maintenance windows, or on-demand "Patch now" operations to meet your specific needs.
> Security focus – By default, Patch Manager focuses on security-related updates rather than installing all available patches.

## S3 Amazon OpenSearch Service — What is Amazon OpenSearch Service?
url: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
fetched: 2026-11-26
> Amazon OpenSearch Service is a managed service that makes it easy to deploy, operate, and scale OpenSearch clusters in the AWS Cloud.
> Amazon OpenSearch Service provisions all the resources for your OpenSearch cluster and launches it.
> It also automatically detects and replaces failed OpenSearch Service nodes, reducing the overhead associated with self-managed infrastructures.

## S4 Amazon OpenSearch Service — Features of Amazon OpenSearch Service
url: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is-features
fetched: 2026-11-26
> OpenSearch Service includes the following features:
> Index-level, document-level, and field-level security
> Node allocation across two or three Availability Zones in the same AWS Region, known as Multi-AZ
> Automated snapshots to back up and restore OpenSearch Service domains
> Integration with Amazon CloudWatch for monitoring OpenSearch Service domain metrics and setting alarms

## S5 AWS Systems Manager Inventory — AWS Systems Manager Inventory
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
fetched: 2026-11-26
> AWS Systems Manager Inventory provides visibility into your AWS computing environment.
> You can use Inventory to collect metadata from your managed nodes.
> You can store this metadata in a central Amazon Simple Storage Service (Amazon S3) bucket, and then use built-in tools to query the data and quickly determine which nodes are running the software and configurations required by your software policy, and which nodes need to be updated.
> If the pre-configured metadata types collected by Systems Manager Inventory don't meet your needs, then you can create custom inventory.
> Systems Manager Inventory collects only metadata from your managed nodes.
> Inventory doesn't access proprietary information or data.

## S6 AWS Systems Manager Maintenance Windows — AWS Systems Manager Maintenance Windows
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
fetched: 2026-11-26
> Maintenance Windows helps you define a schedule for when to perform potentially disruptive actions on your nodes such as patching an operating system, updating drivers, or installing software or patches.
> Each maintenance window has a schedule, a maximum duration, a set of registered targets (the managed nodes or other AWS resources that are acted upon), and a set of registered tasks.
> With maintenance windows, you can run four types of tasks:
