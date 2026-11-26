## S1 Amazon Detective — What is Amazon Detective?
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
fetched: 2026-11-26

> Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities.
> Detective automatically collects log data from your AWS resources.
> It then uses machine learning, statistical analysis, and graph theory to generate visualizations that help you to conduct faster and more efficient security investigations.
> With Detective, you can access up to a year of historical event data.
> Detective links these changes to GuardDuty findings.

## S2 Amazon Detective — How does Detective work?
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-how-works
fetched: 2026-11-26

> Detective automatically extracts time-based events such as login attempts, API calls, and network traffic from AWS CloudTrail and Amazon VPC flow logs.
> It also ingests findings detected by GuardDuty.
> From those events, Detective uses machine learning and visualization to create a unified, interactive view of your resource behaviors and the interactions between them over time.

## S3 Amazon Detective — Features of Amazon Detective
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-features
fetched: 2026-11-26

> Detective finding groups lets you examine multiple activities as they relate to a potential security event.
> You can analyze the root cause for high severity GuardDuty findings using finding groups.

## S4 Amazon DynamoDB — What is Amazon DynamoDB?
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#Introduction
fetched: 2026-11-26

> Amazon DynamoDB is a serverless, fully managed, distributed NoSQL database with single-digit millisecond performance at any scale.
> As a NoSQL database, DynamoDB provides strong read consistency and ACID transactions to build enterprise-grade applications.
> To support a wide variety of use cases, DynamoDB supports both key-value and document data models.

## S5 Amazon DynamoDB — Multi-active replication with global tables
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#ddb-capabilities-gt
fetched: 2026-11-26

> Global tables provide multi-active replication of your data across your chosen AWS Regions with 99.999% availability.
> Global tables deliver a fully managed solution for deploying a multi-Region, multi-active database, without building and maintaining your own replication solution.
> With global tables, you can specify the AWS Regions where you want the tables to be available.
> DynamoDB replicates ongoing data changes to all of these tables.

## S6 Amazon DynamoDB — Continuous backups and point-in-time recovery
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#ddb-resilience-backups-pitr
fetched: 2026-11-26

> Continuous backups provide you per-second granularity and the ability to initiate a point-in-time recovery.
> With point-in-time recovery, you can restore a table to any point in time up to the second during the last 35 days.
> Continuous backups and initiating a point-in-time restore doesn't use provisioned capacity.

## S7 Amazon EBS — What is Amazon Elastic Block Store?
url: https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#what-is-ebs
fetched: 2026-11-26

> Amazon Elastic Block Store (Amazon EBS) provides scalable, high-performance block storage resources that can be used with Amazon Elastic Compute Cloud (Amazon EC2) instances.
> Amazon EBS volumes — These are storage volumes that you attach to Amazon EC2 instances.
> After you attach a volume to an instance, you can use it in the same way you would use a local hard drive attached to a computer, for example to store files or to install applications.
> Amazon EBS snapshots — These are point-in-time backups of Amazon EBS volumes that persist independently from the volume itself.
> You can create snapshots to back up the data on your Amazon EBS volumes.
> You can then restore new volumes from those snapshots at any time.

## S8 Amazon EBS — Features of Amazon EBS
url: https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#ebs-overview
fetched: 2026-11-26

> Multiple volume types — Amazon EBS provides multiple volume types that allow you to optimize storage performance and cost for a broad range of applications.
> Backup and recovery — Use Amazon EBS snapshots to back up the data stored on your volumes.
> You can then use those snapshots to instantly restore volumes or to migrate data across AWS accounts, AWS Regions, or Availability Zones.
> Data archiving — EBS Snapshots Archive provides a low-cost storage tier to archive full, point-in-time copies of EBS Snapshots.

## S9 Amazon EBS — Related services
url: https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#related-services
fetched: 2026-11-26

> Amazon Data Lifecycle Manager — A managed service that automates the creation, retention, and deletion of EBS snapshots and EBS-backed AMIs.
> You can use Amazon Data Lifecycle Manager to automate backups for your Amazon EBS volumes and Amazon EC2 instances.
> Recycle Bin — A data recovery service that enables you to restore accidentally deleted EBS snapshots and EBS-backed AMIs.

## S10 Amazon Inspector — What is Amazon Inspector?
url: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#what-is-inspector
fetched: 2026-11-26

> Amazon Inspector is a vulnerability management service that automatically discovers workloads and continually scans them for software vulnerabilities and unintended network exposure.
> Amazon Inspector discovers and scans Amazon EC2 instances, container images in Amazon ECR, and Lambda functions.
> When Amazon Inspector detects a software vulnerability or unintended network exposure, it creates a finding, which is a detailed report about the issue.

## S11 Amazon Inspector — Continuously scan your environment for vulnerabilities and network exposure
url: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#features
fetched: 2026-11-26

> With Amazon Inspector, you don't need to manually schedule or configure assessment scans.
> Amazon Inspector automatically discovers and begins scanning your eligible resources.
> If you appropriately remediate a finding, Amazon Inspector automatically detects the remediation and closes the finding.

## S12 Amazon Kinesis Data Streams — What is Amazon Kinesis Data Streams?
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-26

> You can use Amazon Kinesis Data Streams to collect and process large streams of data records in real time.
> A consumer reads data from a data stream as data records.
> A stream consumer reads the records of a shard in order, which suits stateful processing, where processing one record depends on the records before it, for use cases such as live analytics, personalization, and anomaly and pattern detection.
> Each shard is processed by one stream consumer instance at a time, which preserves the order of the records in that shard so that the stream consumer can keep an accurate state.

## S13 Amazon Kinesis Data Streams — Benefits of using Kinesis Data Streams
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#using-the-service
fetched: 2026-11-26

> Kinesis Data Streams durably stores the records your producers write and makes them available for consumption in real time.
> The elasticity of Kinesis Data Streams enables you to scale the stream up or down, so that you never lose data records before they expire.
> Multiple consumers can consume the same records, so that multiple actions can take place concurrently and independently, and managed data delivery can land the same records in streaming tables or Amazon S3.

## S14 Amazon Kinesis Data Streams — Queue consumers
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-26

> A queue consumer receives each record independently, which suits stateless processing, for use cases such as microservice integration, order processing, and per-record inference.
> A queue delivers each record at least once and does not necessarily deliver records in the order that producers wrote them to the stream, so design your queue consumer to be idempotent, so that processing the same record more than once is safe.
