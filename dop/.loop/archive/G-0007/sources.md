# G-0007 サービス事典の出典（原文の抜き出し）

# Amazon ElastiCache

## S1 What is Amazon ElastiCache? — What is Amazon ElastiCache?
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html
fetched: 2026-11-26
> Amazon ElastiCache is a web service that makes it easy to set up, manage, and scale a distributed in-memory data store or cache environment in the cloud. It provides a high-performance, scalable, and cost-effective caching solution. At the same time, it helps remove the complexity associated with deploying and managing a distributed cache environment.

## S2 What is Amazon ElastiCache? — Creating a node-based cluster
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html#WhatIs.Overview.cluster
fetched: 2026-11-26
> Since ElastiCache is a fully-managed service, it automatically manages hardware provisioning, monitoring, node replacements, and software patching for your cluster. For example, you can choose to operate a cluster with single-AZ availability or multi-AZ availability depending on your needs.

## S3 High availability using replication groups — High availability using replication groups
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Replication.html
fetched: 2026-11-26
> However, if you're running a Valkey or Redis OSS engine, you can group 2 to 6 nodes into a cluster with replicas where 1 to 5 read-only nodes contain replicate data of the group's single read/write primary node. If the cluster with replicas has Multi-AZ enabled and the primary node fails, the primary fails over to a read replica. Due to replication latency, some data may be lost if it is the primary read/write node that fails.

# Amazon GuardDuty

## S4 What is Amazon GuardDuty? — What is Amazon GuardDuty?
url: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html
fetched: 2026-11-26
> Amazon GuardDuty is a threat detection service that continuously monitors, analyzes, and processes AWS data sources and logs in your AWS environment. GuardDuty uses threat intelligence feeds, such as lists of malicious IP addresses and domains, file hashes, and machine learning (ML) models to identify suspicious and potentially malicious activity in your AWS environment.

## S5 What is Amazon GuardDuty? — Features of GuardDuty
url: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
fetched: 2026-11-26
> When you enable GuardDuty in an AWS account, GuardDuty automatically starts ingesting the foundational data sources associated with that account. These data sources include AWS CloudTrail management events, VPC flow logs (from Amazon EC2 instances), and DNS logs. When GuardDuty detects potential security threats associated with your AWS resources, it starts generating security findings that provide information about the potentially compromised resource. GuardDuty consolidates your security findings across accounts and displays results in the Summary dashboard on the GuardDuty console. Protection plans help you monitor logs and events from other AWS services.

## S6 Designating a delegated GuardDuty administrator account — Designating a delegated GuardDuty administrator account
url: https://docs.aws.amazon.com/guardduty/latest/ug/delegated-admin-designate.html
fetched: 2026-11-26
> This section provides steps to designate a delegated administrator in the GuardDuty organization. Choose a preferred access method to designate a delegated GuardDuty administrator account for your organization. Only a management account can perform this step.

# AWS AppConfig

## S7 What is AWS AppConfig? — What is AWS AppConfig?
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html
fetched: 2026-11-26
> AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags, dynamic free-form configurations, and AI configurations, you can control how your application runs in real time.

## S8 Monitoring deployments for automatic rollback — Monitoring deployments for automatic rollback
url: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html
fetched: 2026-11-26
> During a deployment, you can mitigate situations where malformed or incorrect configuration data causes errors in your application by using a combination of AWS AppConfig deployment strategies and automatic rollbacks based on Amazon CloudWatch alarms. You can also roll back a configuration by calling the StopDeployment API operation while a deployment is still in progress.

## S9 Using predefined deployment strategies — AppConfig.Linear20PercentEvery6Minutes
url: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy-predefined.html
fetched: 2026-11-26
> This strategy deploys the configuration to 20% of all targets every six minutes for a 30 minute deployment. The system monitors for Amazon CloudWatch alarms for 30 minutes. If an alarm is triggered during this time, AWS AppConfig rolls back the deployment.

# AWS CodeConnections

## S10 What are connections? — What are connections?
url: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html
fetched: 2026-11-26
> Each connection is a resource that you can give to AWS services to connect to a third-party repository, such as Bitbucket. Each connection is named and associated with a unique Amazon Resource Name (ARN) that is used to reference the connection. The service name AWS CodeStar Connections has been renamed. Resources created with the previous namespace codestar-connections will still be supported.

## S11 What can I do with connections? — What can I do with connections?
url: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html#welcome-connections-what-can-I-do
fetched: 2026-11-26
> Connect to a third-party provider, such as Bitbucket, and use the third-party connection as a source integration with your AWS resources, such as CodePipeline. Uniformly manage access to your connection across your resources in CodeBuild build projects, CodeDeploy applications, and pipelines in CodePipeline for your third-party provider.

## S12 Update a pending connection — Update a pending connection
url: https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-update.html
fetched: 2026-11-26
> A connection created through the AWS Command Line Interface (AWS CLI) or AWS CloudFormation is in PENDING status by default. After you create a connection with the AWS CLI or CloudFormation, use the console to update the connection to make its status AVAILABLE. You must use the console to update a pending connection. You cannot update a pending connection using the AWS CLI.

# AWS Elastic Beanstalk

## S13 What is AWS Elastic Beanstalk? — What is AWS Elastic Beanstalk?
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html
fetched: 2026-11-26
> With Elastic Beanstalk you can deploy web applications into the AWS Cloud on a variety of supported platforms. Elastic Beanstalk provisions Amazon EC2 instances or EKS clusters, configures load balancing, sets up health monitoring, and dynamically scales your environment.

## S14 Deployment policies and settings — Deployment policies and settings
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html
fetched: 2026-11-26
> AWS Elastic Beanstalk provides several options for how deployments are processed, including deployment policies (All at once, Rolling, Rolling with additional batch, Immutable, and Traffic splitting) and options that let you configure batch size and health check behavior during deployments. By default, your environment uses all-at-once deployments. Immutable deployments perform an immutable update to launch a full set of new instances running the new version of the application in a separate Auto Scaling group, alongside the instances running the old version.

## S15 Blue/Green deployments with Elastic Beanstalk — Blue/Green deployments with Elastic Beanstalk
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
fetched: 2026-11-26
> Because AWS Elastic Beanstalk performs an in-place update when you update your application versions, your application might become unavailable to users for a short period of time. To avoid this, perform a blue/green deployment. To do this, deploy the new version to a separate environment, and then swap the CNAMEs of the two environments to redirect traffic to the new version instantly.
