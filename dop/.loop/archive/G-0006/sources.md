# G-0006 サービス事典: Amazon SNS、AWS Backup、AWS Config、AWS Step Functions、Amazon Aurora

## S1 Amazon SNS / What is Amazon SNS? — What is Amazon SNS?
url: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#welcome
fetched: 2026-11-26
> Amazon Simple Notification Service (Amazon SNS) is a fully managed service that provides message delivery from publishers (producers) to subscribers (consumers). Publishers communicate asynchronously with subscribers by sending messages to a topic, which is a logical access point and communication channel.

## S2 Amazon SNS / What is Amazon SNS? — How it works
url: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#how-it-works
fetched: 2026-11-26
> In SNS, publishers send messages to a topic, which acts as a communication channel. The topic acts as a logical access point, ensuring messages are delivered to multiple subscribers across different platforms.
> SNS supports both Application-to-Application (A2A) and Application-to-Person (A2P) messaging, giving flexibility to send messages between different applications or directly to mobile phones, email addresses, and more.

## S3 Amazon SNS / What is Amazon SNS? — Application integration
url: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#SNSFanoutScenario
fetched: 2026-11-26
> The Fanout scenario is when a message published to an SNS topic is replicated and pushed to multiple endpoints, such as Firehose delivery streams, Amazon SQS queues, HTTP(S) endpoints, and Lambda functions. This allows for parallel asynchronous processing.

## S4 AWS Backup / What is AWS Backup? — What is AWS Backup?
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#whatisbackup
fetched: 2026-11-26
> AWS Backup is a fully-managed service that makes it easy to centralize and automate data protection across AWS services, in the cloud, and on premises. Using this service, you can configure backup policies and monitor activity for your AWS resources in one place.

## S5 AWS Backup / What is AWS Backup? — Policy-based backup
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#policy-based-backup-solution
fetched: 2026-11-26
> With AWS Backup, you can create backup policies known as backup plans. Use these backup plans to define your backup requirements and then apply them to the AWS resources that you want to protect across the AWS services that you use.

## S6 AWS Backup / AWS Backup Vault Lock — AWS Backup Vault Lock
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#vault-lock
fetched: 2026-11-26
> AWS Backup Vault Lock is an optional feature of a backup vault, which can be helpful in giving you additional security and control over your backup vaults. Each vault can have one vault lock in place.
> When you create a vault lock, you have a choice of two modes: Governance mode or Compliance mode.
> A vault lock in Compliance mode cannot be altered or deleted by any user or by AWS.

## S7 AWS Config / What Is AWS Config? — What Is AWS Config?
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-26
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time.

## S8 AWS Config / What Is AWS Config? — Resource Administration
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#scenarios-resource-administration
fetched: 2026-11-26
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources. When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.

## S9 AWS Config / What Is AWS Config? — Features
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#config-features
fetched: 2026-11-26
> Specify the rules that you want AWS Config to use to evaluate compliance information for the recorded resource types.
> Use conformance packs, or a collection of rules that can be deployed and monitored as a single entity in your AWS account.
> Remediate noncompliant resources that are evaluated by AWS Config Rules.
> Use an aggregator to get a centralized view of your resource inventory and compliance.
> An aggregator collects AWS Config configuration and compliance data from multiple AWS accounts and AWS Regions into a single account and Region.

## S10 AWS Step Functions / What is Step Functions? — What is Step Functions?
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome
fetched: 2026-11-26
> With AWS Step Functions, you can create workflows, also called State machines, to build distributed applications, automate processes, orchestrate microservices, and create data and machine learning pipelines.
> Step Functions is based on state machines and tasks. In Step Functions, state machines are called workflows, which are a series of event-driven steps. Each step in a workflow is called a state.

## S11 AWS Step Functions / What is Step Functions? — Standard and Express workflows types
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-workflows
fetched: 2026-11-26
> Standard workflows have exactly-once workflow execution and can run for up to one year. This means that each step in a Standard workflow will execute exactly once.
> Express workflows have at-least-once workflow execution and can run for up to five minutes. This means that one or more steps in an Express Workflow can potentially run more than once, while each step in the workflow executes at least once.

## S12 AWS Step Functions / What is Step Functions? — Example use cases for workflows
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#application
fetched: 2026-11-26
> Error handling (Retry / Catch) – You can retry failed tasks, or catch failed tasks and automatically run alternative steps.

## S13 Amazon Aurora / What is Amazon Aurora? — What is Amazon Aurora?
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html#CHAP_AuroraOverview
fetched: 2026-11-26
> Amazon Aurora (Aurora) is a fully managed relational database engine that's compatible with MySQL and PostgreSQL. Aurora includes a high-performance storage subsystem. The underlying storage grows automatically as needed.

## S14 Amazon Aurora / Aurora global databases — Supported Regions and DB engines for Aurora global databases
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.Aurora_Fea_Regions_DB-eng.Feature.GlobalDatabase.html#Concepts.Aurora_Fea_Regions_DB-eng.Feature.GlobalDatabase
fetched: 2026-11-26
> An Aurora global database is a single database that spans multiple AWS Regions, enabling low-latency global reads and disaster recovery from any Region-wide outage. It provides built-in fault tolerance for your deployment because the DB instance relies not on a single AWS Region, but upon multiple Regions and different Availability Zones.

## S15 Amazon Aurora / Failover — Failing over an Amazon Aurora DB cluster
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-failover.html#aurora-failover
fetched: 2026-11-26
> Aurora fails over to a new primary DB instance in one of two ways:
> By promoting an existing reader DB instance to the new primary instance
> If the DB cluster has one or more reader instances, then a reader is promoted to the primary instance during a failure event. To increase the availability of your DB cluster, we recommend that you create at least one or more reader instances in two or more different Availability Zones.
